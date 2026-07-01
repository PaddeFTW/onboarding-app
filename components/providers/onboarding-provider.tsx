"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  sortOnboardings,
  type ChecklistItemDetailData,
  type CreateOnboardingInput,
  type OnboardingRecord,
} from "@/lib/onboarding";
import {
  createOnboarding,
  listOnboardings,
  saveChecklistItem,
} from "@/lib/supabase/onboarding-repository";

interface OnboardingContextValue {
  onboardings: OnboardingRecord[];
  ongoingOnboardings: OnboardingRecord[];
  completedOnboardings: OnboardingRecord[];
  isLoading: boolean;
  error: string | null;
  createOnboarding: (input: CreateOnboardingInput) => Promise<string>;
  saveChecklistItem: (
    onboardingId: string,
    itemId: string,
    input: {
      comment: string;
      completed: boolean;
      detailData: ChecklistItemDetailData;
    }
  ) => Promise<void>;
  getOnboarding: (id: string) => OnboardingRecord | undefined;
  refreshOnboardings: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardings, setOnboardings] = useState<OnboardingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mutationVersionRef = useRef(0);

  const { ongoing, completed } = useMemo(
    () => sortOnboardings(onboardings),
    [onboardings]
  );

  async function refreshOnboardings() {
    const refreshVersion = mutationVersionRef.current;

    try {
      setIsLoading(true);
      setError(null);
      const data = await listOnboardings();

      if (refreshVersion === mutationVersionRef.current) {
        setOnboardings(data);
      }
    } catch (refreshError) {
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : "Could not load onboardings."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    const refreshVersion = mutationVersionRef.current;

    async function loadInitialOnboardings() {
      try {
        const data = await listOnboardings();

        if (active && refreshVersion === mutationVersionRef.current) {
          setOnboardings(data);
          setError(null);
        }
      } catch (refreshError) {
        if (active) {
          setError(
            refreshError instanceof Error
              ? refreshError.message
              : "Could not load onboardings."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialOnboardings();

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      onboardings,
      ongoingOnboardings: ongoing,
      completedOnboardings: completed,
      isLoading,
      error,
      createOnboarding: async (input) => {
        try {
          const onboarding = await createOnboarding(input);
          mutationVersionRef.current += 1;
          setOnboardings((current) => [onboarding, ...current]);
          setError(null);
          return onboarding.id;
        } catch (createError) {
          const message =
            createError instanceof Error
              ? createError.message
              : "Could not create onboarding.";
          setError(message);
          throw new Error(message);
        }
      },
      saveChecklistItem: async (onboardingId, itemId, input) => {
        try {
          const updatedOnboarding = await saveChecklistItem(
            onboardingId,
            itemId,
            input
          );

          mutationVersionRef.current += 1;
          setOnboardings((current) =>
            current.map((item) =>
              item.id === updatedOnboarding.id ? updatedOnboarding : item
            )
          );
          setError(null);
        } catch (updateError) {
          const message =
            updateError instanceof Error
              ? updateError.message
              : "Could not save checklist item.";
          setError(message);
          throw new Error(message);
        }
      },
      getOnboarding: (id) => onboardings.find((item) => item.id === id),
      refreshOnboardings,
    }),
    [completed, error, isLoading, onboardings, ongoing]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingStore() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboardingStore must be used within an OnboardingProvider"
    );
  }

  return context;
}
