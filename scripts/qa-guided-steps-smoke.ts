import {
  BUILD_CO_STEP_DEFINITIONS,
  calcGuidedProgress,
  canCompleteGuidedOnboarding,
  createDemoGuidedOnboarding,
  createStepInstancesFromDefinitions,
  getVisibleSteps,
  isStepResponseComplete,
  recomputeInstanceState,
  withUpdatedStep,
} from "../lib/onboarding-steps";

function expect(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  expect(BUILD_CO_STEP_DEFINITIONS.length === 10, "Expected 10 demo steps.");
  expect(
    BUILD_CO_STEP_DEFINITIONS.every((step) => step.order >= 1),
    "Expected all steps to have order."
  );

  const demo = createDemoGuidedOnboarding();
  expect(demo.id === "demo-byggco", "Expected demo instance id.");
  expect(demo.steps.length === 10, "Expected 10 step instances.");
  expect(demo.status === "notStarted", "Expected demo to start as notStarted.");
  expect(demo.currentStepId === "welcome", "Expected first step to be welcome.");

  const visibleBefore = getVisibleSteps(demo);
  expect(visibleBefore.length === 9, "Expected 9 initially visible steps before workplace answer.");
  expect(
    !visibleBefore.some((step) => step.id === "ppe"),
    "Expected PPE to stay hidden until workplace is construction-site."
  );

  let working = withUpdatedStep(demo, "workplace", (step) => ({
    ...step,
    status: "completed",
    response: { selectedOptionId: "office" },
    completedAt: new Date().toISOString(),
    completedBy: demo.participantName,
  }));
  working = recomputeInstanceState(working);

  const visibleOffice = getVisibleSteps(working);
  expect(
    !visibleOffice.some((step) => step.id === "ppe"),
    "Expected PPE step to be hidden for office workers."
  );

  working = withUpdatedStep(working, "workplace", (step) => ({
    ...step,
    response: { selectedOptionId: "construction-site" },
  }));
  working = recomputeInstanceState(working);

  const visibleSite = getVisibleSteps(working);
  expect(
    visibleSite.some((step) => step.id === "ppe"),
    "Expected PPE step for construction-site workers."
  );

  const informationStep = createStepInstancesFromDefinitions([
    BUILD_CO_STEP_DEFINITIONS[0],
  ])[0];
  expect(
    isStepResponseComplete(informationStep),
    "Information steps should be completable without extra input."
  );

  const confirmationStep = createStepInstancesFromDefinitions([
    BUILD_CO_STEP_DEFINITIONS[3],
  ])[0];
  expect(
    !isStepResponseComplete(confirmationStep),
    "Confirmation requires acknowledgement."
  );
  expect(
    isStepResponseComplete({
      ...confirmationStep,
      response: { acknowledged: true },
    }),
    "Confirmation should complete after acknowledgement."
  );

  expect(calcGuidedProgress(demo) === 0, "Expected zero progress at start.");

  let completed = demo;
  let guard = 0;

  while (guard < 20) {
    const visible = getVisibleSteps(completed);
    const pending = visible.find((step) => step.status !== "completed");

    if (!pending) {
      break;
    }

    completed = recomputeInstanceState(
      withUpdatedStep(completed, pending.id, (entry) => ({
        ...entry,
        status: "completed",
        response:
          entry.type === "confirmation"
            ? { acknowledged: true }
            : entry.type === "singleChoice"
              ? {
                  selectedOptionId:
                    entry.id === "workplace"
                      ? "construction-site"
                      : entry.options?.[0]?.id ?? "",
                }
              : entry.type === "task"
                ? { taskConfirmed: true }
                : {},
        completedAt: new Date().toISOString(),
        completedBy: completed.participantName,
      }))
    );
    guard += 1;
  }

  expect(
    canCompleteGuidedOnboarding(completed),
    "Expected onboarding to be completable after all required visible steps."
  );
  expect(completed.progress === 100, "Expected full progress after completion.");

  console.log("Guided steps smoke test passed.");
}

main();
