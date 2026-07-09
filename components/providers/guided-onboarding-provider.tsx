"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
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

const STORAGE_KEY = "onboarding-app-guided-instances";
const EMPTY_SERVER_SNAPSHOT: OnboardingInstance[] = [];

const listeners = new Set<() => void>();
let cachedSnapshot: OnboardingInstance[] = EMPTY_SERVER_SNAPSHOT;
let storeReady = false;

interface GuidedOnboardingContextValue {
  instances: OnboardingInstance[];
  isHydrated: boolean;
  getInstance: (id: string) => OnboardingInstance | undefined;
  ensureDemoInstance: () => void;
  updateStepResponse: (
    instanceId: string,
    stepId: string,
    response: StepResponse
  ) => void;
  completeStep: (
    instanceId: string,
    stepId: string,
    response: StepResponse,
    completedBy?: string
  ) => void;
  setCurrentStep: (instanceId: string, stepId: string) => void;
  resetInstance: (instanceId: string) => void;
}

const GuidedOnboardingContext =
  createContext<GuidedOnboardingContextValue | null>(null);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function loadInstancesFromStorage(): OnboardingInstance[] {
  if (typeof window === "undefined") {
    return EMPTY_SERVER_SNAPSHOT;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return EMPTY_SERVER_SNAPSHOT;
    }

    const parsed = JSON.parse(raw) as OnboardingInstance[];
    return Array.isArray(parsed) ? parsed.map(recomputeInstanceState) : EMPTY_SERVER_SNAPSHOT;
  } catch {
    return EMPTY_SERVER_SNAPSHOT;
  }
}

function saveInstancesToStorage(instances: OnboardingInstance[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(instances));
}

function initStoreFromStorage() {
  if (typeof window === "undefined" || storeReady) {
    return;
  }

  cachedSnapshot = loadInstancesFromStorage();
  storeReady = true;
}

function getSnapshot(): OnboardingInstance[] {
  return cachedSnapshot;
}

function getServerSnapshot(): OnboardingInstance[] {
  return EMPTY_SERVER_SNAPSHOT;
}

function getHydratedSnapshot(): boolean {
  return storeReady;
}

function getHydratedServerSnapshot(): boolean {
  return false;
}

function replaceGuidedInstances(nextInstances: OnboardingInstance[]) {
  cachedSnapshot = nextInstances;
  saveInstancesToStorage(nextInstances);
  emitChange();
}

function updateGuidedInstance(
  instanceId: string,
  updater: (instance: OnboardingInstance) => OnboardingInstance
) {
  replaceGuidedInstances(
    cachedSnapshot.map((instance) =>
      instance.id === instanceId
        ? recomputeInstanceState(updater(instance))
        : instance
    )
  );
}

export function GuidedOnboardingProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initStoreFromStorage();
    emitChange();
  }, []);

  const instances = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const isHydrated = useSyncExternalStore(
    subscribe,
    getHydratedSnapshot,
    getHydratedServerSnapshot
  );

  const ensureDemoInstance = useCallback(() => {
    const existing = cachedSnapshot.find(
      (instance) => instance.id === DEMO_GUIDED_ONBOARDING_ID
    );

    if (existing) {
      return;
    }

    const demo = recomputeInstanceState(createDemoGuidedOnboarding());
    replaceGuidedInstances([demo, ...cachedSnapshot]);
  }, []);

  const value = useMemo<GuidedOnboardingContextValue>(
    () => ({
      instances,
      isHydrated,
      getInstance: (id) => instances.find((instance) => instance.id === id),
      ensureDemoInstance,
      updateStepResponse: (instanceId, stepId, response) => {
        updateGuidedInstance(instanceId, (instance) =>
          withUpdatedStep(instance, stepId, (step) => ({
            ...step,
            status: step.status === "notStarted" ? "inProgress" : step.status,
            response: { ...step.response, ...response },
          }))
        );
      },
      completeStep: (instanceId, stepId, response, completedBy) => {
        updateGuidedInstance(instanceId, (instance) =>
          withUpdatedStep(instance, stepId, (step) => ({
            ...step,
            status: "completed",
            response: { ...step.response, ...response },
            completedAt: new Date().toISOString(),
            completedBy: completedBy ?? instance.participantName,
          }))
        );
      },
      setCurrentStep: (instanceId, stepId) => {
        updateGuidedInstance(instanceId, (instance) => ({
          ...instance,
          currentStepId: stepId,
          status: instance.status === "notStarted" ? "ongoing" : instance.status,
          steps: instance.steps.map((step) =>
            step.id === stepId && step.status === "notStarted"
              ? { ...step, status: "inProgress" }
              : step
          ),
        }));
      },
      resetInstance: (instanceId) => {
        if (instanceId !== DEMO_GUIDED_ONBOARDING_ID) {
          return;
        }

        const demo = recomputeInstanceState(createDemoGuidedOnboarding());
        replaceGuidedInstances([
          demo,
          ...cachedSnapshot.filter((instance) => instance.id !== instanceId),
        ]);
      },
    }),
    [ensureDemoInstance, instances, isHydrated]
  );

  return (
    <GuidedOnboardingContext.Provider value={value}>
      {children}
    </GuidedOnboardingContext.Provider>
  );
}

export function useGuidedOnboardingStore() {
  const context = useContext(GuidedOnboardingContext);

  if (!context) {
    throw new Error(
      "useGuidedOnboardingStore must be used within a GuidedOnboardingProvider"
    );
  }

  return context;
}
