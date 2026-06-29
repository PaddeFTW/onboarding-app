import {
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

async function main() {
  const stamp = Date.now();
  const input = {
    firstName: "QA",
    lastName: `Smoke-${stamp}`,
    position: "Testperson",
    manager: "Maria Lindqvist",
    startDate: "2026-06-29",
  };

  const before = await listOnboardings();
  const created = await createOnboarding(input);
  const createdReloaded = await getOnboarding(created.id);

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
