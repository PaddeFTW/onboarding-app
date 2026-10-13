"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEMO_GUIDED_ONBOARDING_ID,
  createDemoGuidedOnboarding,
  recomputeInstanceState,
  withUpdatedStep,
  type OnboardingInstance,
  type StepResponse,
} from "@/lib/onboarding-steps";
import {
  listGuidedInstances,
  upsertGuidedInstance,
  type StoredGuidedInstance,
} from "@/lib/supabase/guided-repository";

interface GuidedOnboardingContextValue {
  instances: StoredGuidedInstance[];
  isHydrated: boolean;
  error: string;
  getInstance: (id: string) => StoredGuidedInstance | undefined;
  ensureDemoInstance: () => void;
  rememberInstance: (instance: StoredGuidedInstance) => void;
  addInstance: (instance: StoredGuidedInstance) => void;
  updateStepResponse: (instanceId: string, stepId: string, response: StepResponse) => void;
  completeStep: (instanceId: string, stepId: string, response: StepResponse, completedBy?: string) => void;
  skipStep: (instanceId: string, stepId: string) => void;
  setCurrentStep: (instanceId: string, stepId: string) => void;
  updateParticipantNote: (instanceId: string, note: string) => void;
  resetInstance: (instanceId: string) => void;
}

const GuidedOnboardingContext = createContext<GuidedOnboardingContextValue | null>(null);

function asStored(instance: OnboardingInstance): StoredGuidedInstance {
  return instance as StoredGuidedInstance;
}

export function GuidedOnboardingProvider({ children }: { children: ReactNode }) {
  const [instances, setInstances] = useState<StoredGuidedInstance[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listGuidedInstances()
      .then((rows) => {
        if (!active) return;
        setInstances(rows);
        setError("");
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Kunde inte ladda guidningar.");
      })
      .finally(() => {
        if (active) setIsHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const persistLatest = useCallback(
    (instanceId: string, updater: (current: StoredGuidedInstance) => StoredGuidedInstance) => {
      setInstances((current) => {
        const existing = current.find((instance) => instance.id === instanceId);
        if (!existing) return current;
        const previousStatus = existing.status;
        const next = asStored(recomputeInstanceState(updater(existing)));
        void upsertGuidedInstance(next).catch((saveError: unknown) => {
          setError(saveError instanceof Error ? saveError.message : "Kunde inte spara guidningen.");
        });
        if (previousStatus !== "completed" && next.status === "completed") {
          void import("@/lib/history")
            .then(({ recordEvent }) =>
              recordEvent({
                eventType: "introduction.completed",
                resourceType: "guided_instance",
                resourceId: next.id,
                summary: `Introduktion slutförd: ${next.participantName}`,
              })
            )
            .catch(() => undefined);
        }
        return [next, ...current.filter((item) => item.id !== instanceId)];
      });
    },
    []
  );

  const persist = useCallback((instance: StoredGuidedInstance) => {
    setInstances((current) => [
      instance,
      ...current.filter((existing) => existing.id !== instance.id),
    ]);
    void upsertGuidedInstance(instance).catch((saveError: unknown) => {
      setError(saveError instanceof Error ? saveError.message : "Kunde inte spara guidningen.");
    });
  }, []);

  const ensureDemoInstance = useCallback(() => {
    setInstances((current) => {
      if (current.some((instance) => instance.id === DEMO_GUIDED_ONBOARDING_ID)) {
        return current;
      }
      const demo = asStored(recomputeInstanceState(createDemoGuidedOnboarding()));
      void upsertGuidedInstance(demo);
      return [demo, ...current];
    });
  }, []);

  const value = useMemo<GuidedOnboardingContextValue>(() => ({
    instances,
    isHydrated,
    error,
    getInstance: (id) => instances.find((instance) => instance.id === id),
    ensureDemoInstance,
    rememberInstance: (instance) => {
      setInstances((current) => [
        instance,
        ...current.filter((existing) => existing.id !== instance.id),
      ]);
    },
    addInstance: persist,
    updateStepResponse: (instanceId, stepId, response) => {
      persistLatest(instanceId, (current) =>
        withUpdatedStep(current, stepId, (step) => ({
          ...step,
          status: step.status === "notStarted" ? "inProgress" : step.status,
          response: { ...step.response, ...response },
        })) as StoredGuidedInstance
      );
    },
    completeStep: (instanceId, stepId, response, completedBy) => {
      persistLatest(instanceId, (current) =>
        withUpdatedStep(current, stepId, (step) => ({
          ...step,
          status: "completed",
          response: { ...step.response, ...response },
          completedAt: new Date().toISOString(),
          completedBy: completedBy ?? current.participantName,
        })) as StoredGuidedInstance
      );
    },
    skipStep: (instanceId, stepId) => {
      persistLatest(instanceId, (current) => {
        const step = current.steps.find((item) => item.id === stepId);
        if (!step || step.required) return current;
        return withUpdatedStep(current, stepId, (item) => ({
          ...item,
          status: "skipped",
          completedAt: null,
          completedBy: null,
        })) as StoredGuidedInstance;
      });
    },
    setCurrentStep: (instanceId, stepId) => {
      persistLatest(instanceId, (current) => ({
        ...current,
        currentStepId: stepId,
        status: current.status === "notStarted" ? "ongoing" : current.status,
        steps: current.steps.map((step) =>
          step.id === stepId && step.status === "notStarted"
            ? { ...step, status: "inProgress" }
            : step
        ),
      }));
    },
    updateParticipantNote: (instanceId, note) => {
      persistLatest(instanceId, (current) => ({
        ...current,
        participantNote: note,
      }));
    },
    resetInstance: (instanceId) => {
      if (instanceId !== DEMO_GUIDED_ONBOARDING_ID) return;
      persist(asStored(recomputeInstanceState(createDemoGuidedOnboarding())));
    },
  }), [ensureDemoInstance, instances, isHydrated, error, persist, persistLatest]);

  return (
    <GuidedOnboardingContext.Provider value={value}>
      {children}
    </GuidedOnboardingContext.Provider>
  );
}

export function useGuidedOnboardingStore() {
  const context = useContext(GuidedOnboardingContext);
  if (!context) {
    throw new Error("useGuidedOnboardingStore must be used within a GuidedOnboardingProvider");
  }
  return context;
}
