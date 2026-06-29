"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  sortOnboardings,
  type CreateOnboardingInput,
  type OnboardingRecord,
} from "@/lib/onboarding";
import {
  createOnboarding,
  listOnboardings,
  updateChecklistItemCompletion,
} from "@/lib/supabase/onboarding-repository";

interface OnboardingContextValue {
  onboardings: OnboardingRecord[];
  ongoingOnboardings: OnboardingRecord[];
  completedOnboardings: OnboardingRecord[];
  isLoading: boolean;
  error: string | null;
  createOnboarding: (input: CreateOnboardingInput) => Promise<string>;
  setChecklistItemCompleted: (
    onboardingId: string,
    itemId: string,
    completed: boolean
  ) => Promise<void>;
  getOnboarding: (id: string) => OnboardingRecord | undefined;
  refreshOnboardings: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardings, setOnboardings] = useState<OnboardingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ongoing, completed } = useMemo(
    () => sortOnboardings(onboardings),
    [onboardings]
  );

  async function refreshOnboardings() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await listOnboardings();
      setOnboardings(data);
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
    void refreshOnboardings();
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
      setChecklistItemCompleted: async (onboardingId, itemId, completed) => {
        try {
          const updatedOnboarding = await updateChecklistItemCompletion(
            onboardingId,
            itemId,
            completed
          );

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
              : "Could not update checklist item.";
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
