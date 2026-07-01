import {
  CHECKLIST_TEMPLATE,
  calcProgress,
  countCompleted,
  getOnboardingStatus,
} from "../lib/onboarding";
import {
  createOnboarding,
  getOnboarding,
  listOnboardings,
  updateChecklistItemCompletion,
} from "../lib/supabase/onboarding-repository";

function expect(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const stamp = Date.now();
  const expectedTitles = CHECKLIST_TEMPLATE.map((item) => item.title);
  const input = {
    firstName: "QA",
    lastName: `Smoke-${stamp}`,
    position: "Testperson",
    manager: "Maria Lindqvist",
    startDate: "2026-06-29",
  };

  const before = await listOnboardings();
  expect(
    before.every((item) => item.checklist.length === CHECKLIST_TEMPLATE.length),
    "Expected all existing onboardings to use the 12-chapter checklist."
  );
  expect(
    before.every(
      (item) =>
        JSON.stringify(item.checklist.map((entry) => entry.title)) ===
        JSON.stringify(expectedTitles)
    ),
    "Expected all existing onboardings to follow the canonical checklist order."
  );
  const created = await createOnboarding(input);
  const createdReloaded = await getOnboarding(created.id);
  expect(
    JSON.stringify(createdReloaded.checklist.map((item) => item.title)) ===
      JSON.stringify(expectedTitles),
    "New onboarding did not get the canonical 12-chapter checklist."
  );

  const initialChecks = {
    checklistCount: createdReloaded.checklist.length,
    progress: calcProgress(createdReloaded.checklist),
    completedCount: countCompleted(createdReloaded.checklist),
    status: getOnboardingStatus(createdReloaded),
  };

  for (const item of createdReloaded.checklist.slice(0, 3)) {
    await updateChecklistItemCompletion(created.id, item.id, true);
  }

  const afterPartial = await getOnboarding(created.id);
  const partialChecks = {
    progress: calcProgress(afterPartial.checklist),
    completedCount: countCompleted(afterPartial.checklist),
    status: getOnboardingStatus(afterPartial),
    completedAt: afterPartial.completedAt,
  };

  for (const item of afterPartial.checklist.slice(3)) {
    await updateChecklistItemCompletion(created.id, item.id, true);
  }

  const afterComplete = await getOnboarding(created.id);
  const afterList = await listOnboardings();
  expect(
    afterList.every((item) => item.checklist.length === CHECKLIST_TEMPLATE.length),
    "Expected all onboardings to still use the 12-chapter checklist after mutations."
  );
  expect(
    afterList.every(
      (item) =>
        JSON.stringify(item.checklist.map((entry) => entry.title)) ===
        JSON.stringify(expectedTitles)
    ),
    "Expected checklist order to remain canonical after mutations."
  );

  const completedChecks = {
    progress: calcProgress(afterComplete.checklist),
    completedCount: countCompleted(afterComplete.checklist),
    status: getOnboardingStatus(afterComplete),
    completedAt: afterComplete.completedAt,
    stillPresentAfterRefresh: afterList.some((item) => item.id === created.id),
    beforeCount: before.length,
    afterCount: afterList.length,
  };

  console.log(
    JSON.stringify(
      {
        createdId: created.id,
        input,
        initialChecks,
        partialChecks,
        completedChecks,
      },
      null,
      2
    )
  );
}

void main();
