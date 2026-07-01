import { loadEnvConfig } from "@next/env";

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
  saveChecklistItem,
} from "../lib/supabase/onboarding-repository";

function expect(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  loadEnvConfig(process.cwd());

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
    await saveChecklistItem(created.id, item.id, {
      completed: true,
      comment: "",
      detailData: {},
    });
  }

  const afterPartial = await getOnboarding(created.id);
  const partialChecks = {
    progress: calcProgress(afterPartial.checklist),
    completedCount: countCompleted(afterPartial.checklist),
    status: getOnboardingStatus(afterPartial),
    completedAt: afterPartial.completedAt,
  };

  const receiptsItem = afterPartial.checklist.find(
    (item) => item.templateKey === "receipts"
  );
  const followUpItem = afterPartial.checklist.find(
    (item) => item.templateKey === "follow-up"
  );

  if (!receiptsItem || !followUpItem) {
    throw new Error("Expected receipts and follow-up items to exist.");
  }

  await saveChecklistItem(created.id, receiptsItem.id, {
    completed: true,
    comment: "Nycklar och utrustning utlämnad.",
    detailData: {
      receiptDate: "2026-07-01",
      keyReceipt: "1 huvudnyckel",
      employeeSignature: "QA Smoke",
      companySignature: "Chef Test",
    },
  });

  await saveChecklistItem(created.id, followUpItem.id, {
    completed: true,
    comment: "Uppföljning planerad.",
    detailData: {
      confirmationDate: "2026-07-10",
      responsiblePerson: "Chef Test",
      confirmationSummary: "Introduktionen har bekräftats.",
      wellBeing: "Bra start på arbetsplatsen.",
      improvementSuggestions: "Inga förbättringsförslag just nu.",
    },
  });

  for (const item of afterPartial.checklist.filter(
    (entry) =>
      !entry.completedAt && entry.id !== receiptsItem.id && entry.id !== followUpItem.id
  )) {
    await saveChecklistItem(created.id, item.id, {
      completed: true,
      comment: item.templateKey === "policies" ? "Policy genomgången." : "",
      detailData: {},
    });
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
    receiptsComment: afterComplete.checklist.find(
      (item) => item.templateKey === "receipts"
    )?.comment,
    followUpResponsible: afterComplete.checklist.find(
      (item) => item.templateKey === "follow-up"
    )?.detailData.responsiblePerson,
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
