"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  INITIAL_ONBOARDINGS,
  createOnboardingRecord,
  getOnboardingById,
  sortOnboardings,
  type CreateOnboardingInput,
  type OnboardingRecord,
} from "@/lib/onboarding";

interface OnboardingState {
  onboardings: OnboardingRecord[];
}

type OnboardingAction =
  | {
      type: "create";
      payload: OnboardingRecord;
    }
  | {
      type: "set-checklist-item-completed";
      payload: {
        onboardingId: string;
        itemId: string;
        completed: boolean;
      };
    };

interface OnboardingContextValue {
  onboardings: OnboardingRecord[];
  ongoingOnboardings: OnboardingRecord[];
  completedOnboardings: OnboardingRecord[];
  createOnboarding: (input: CreateOnboardingInput) => string;
  setChecklistItemCompleted: (
    onboardingId: string,
    itemId: string,
    completed: boolean
  ) => void;
  getOnboarding: (id: string) => OnboardingRecord | undefined;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case "create":
      return {
        onboardings: [action.payload, ...state.onboardings],
      };
    case "set-checklist-item-completed":
      return {
        onboardings: state.onboardings.map((onboarding) => {
          if (onboarding.id !== action.payload.onboardingId) {
            return onboarding;
          }

          const checklist = onboarding.checklist.map((item) => {
            if (item.id !== action.payload.itemId) {
              return item;
            }

            return {
              ...item,
              completedAt: action.payload.completed
                ? new Date().toISOString()
                : null,
            };
          });

          const allCompleted = checklist.every(
            (item) => item.completedAt !== null
          );

          return {
            ...onboarding,
            checklist,
            completedAt: allCompleted ? new Date().toISOString() : null,
          };
        }),
      };
    default:
      return state;
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, {
    onboardings: INITIAL_ONBOARDINGS,
  });

  const { ongoing, completed } = useMemo(
    () => sortOnboardings(state.onboardings),
    [state.onboardings]
  );

  const value = useMemo<OnboardingContextValue>(
    () => ({
      onboardings: state.onboardings,
      ongoingOnboardings: ongoing,
      completedOnboardings: completed,
      createOnboarding: (input) => {
        const onboarding = createOnboardingRecord(input);
        dispatch({ type: "create", payload: onboarding });
        return onboarding.id;
      },
      setChecklistItemCompleted: (onboardingId, itemId, completed) => {
        dispatch({
          type: "set-checklist-item-completed",
          payload: { onboardingId, itemId, completed },
        });
      },
      getOnboarding: (id) => getOnboardingById(state.onboardings, id),
    }),
    [completed, ongoing, state.onboardings]
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
