import { formatDate, type ChecklistItem, type OnboardingRecord } from "@/lib/onboarding";

export interface ExportIncludeOptions {
  checklist: boolean;
  policy: boolean;
  "work-env": boolean;
  signatures: boolean;
  attachments: boolean;
  comments: boolean;
}

interface ExportDocument {
  baseFileName: string;
  fileName: string;
  html: string;
  text: string;
  title: string;
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getChecklistItem(onboarding: OnboardingRecord, templateKey: string) {
  return onboarding.checklist.find((item) => item.templateKey === templateKey) ?? null;
}

function getDetailValue(item: ChecklistItem | null, key: string) {
  if (!item) {
    return "";
  }

  return item.detailData[key]?.trim() ?? "";
}

function section(title: string, lines: string[]) {
  if (lines.length === 0) {
    return "";
  }

  return [title, ...lines].join("\n");
}

function buildChecklistSection(
  onboarding: OnboardingRecord,
  includeComments: boolean
) {
  const lines = onboarding.checklist.map((item) => {
    const status = item.completedAt ? "Klar" : "Ej klar";
    const parts = [`- ${item.title}: ${status}`];

    if (item.completedAt) {
      parts.push(`(${formatDate(item.completedAt)})`);
    }

    return parts.join(" ");
  });

  if (includeComments) {
    for (const item of onboarding.checklist) {
      if (item.comment.trim()) {
        lines.push(`  Kommentar (${item.title}): ${item.comment.trim()}`);
      }
    }
  }

  return section("Checklista", lines);
}

function buildPolicySection(onboarding: OnboardingRecord) {
  const item = getChecklistItem(onboarding, "policies");
  if (!item) {
    return "";
  }

  const lines = [
    `Status: ${item.completedAt ? "Genomgången" : "Inte genomgången"}`,
  ];

  if (item.comment.trim()) {
    lines.push(`Kommentar: ${item.comment.trim()}`);
  }

  return section("Policy", lines);
}

function buildWorkEnvironmentSection(onboarding: OnboardingRecord) {
  const item = getChecklistItem(onboarding, "work-environment");
  if (!item) {
    return "";
  }

  const lines = [
    `Status: ${item.completedAt ? "Genomgången" : "Inte genomgången"}`,
  ];

  if (item.comment.trim()) {
    lines.push(`Kommentar: ${item.comment.trim()}`);
  }

  return section("Arbetsmiljöguide", lines);
}

function buildSignaturesSection(onboarding: OnboardingRecord) {
  const receipts = getChecklistItem(onboarding, "receipts");
  const followUp = getChecklistItem(onboarding, "follow-up");
  const lines = [
    `Datum (kvittenser): ${getDetailValue(receipts, "receiptDate") || "-"}`,
    `Namnteckning (anställd): ${getDetailValue(receipts, "employeeSignature") || "-"}`,
    `Namnteckning (företag): ${getDetailValue(receipts, "companySignature") || "-"}`,
    `Datum (uppföljning): ${getDetailValue(followUp, "confirmationDate") || "-"}`,
    `Ansvarig: ${getDetailValue(followUp, "responsiblePerson") || "-"}`,
  ];

  return section("Signaturer och ansvar", lines);
}

function buildAttachmentsSection(onboarding: OnboardingRecord) {
  const documents = onboarding.checklist.flatMap((item) =>
    item.documents.map((document) => `${item.title}: ${document.name}`)
  );

  return section("Bilagor", documents);
}

function buildReceiptsSummary(onboarding: OnboardingRecord) {
  const item = getChecklistItem(onboarding, "receipts");
  if (!item) {
    return "";
  }

  const lines = [
    `Nycklar: ${getDetailValue(item, "keyReceipt") || "-"}`,
    `Mobil: ${getDetailValue(item, "mobileReceipt") || "-"}`,
    `Verktyg: ${getDetailValue(item, "toolReceipt") || "-"}`,
    `Arbetskläder och skyddsutrustning: ${getDetailValue(item, "clothingReceipt") || "-"}`,
  ];

  if (item.comment.trim()) {
    lines.push(`Kommentar: ${item.comment.trim()}`);
  }

  return section("Kvittenser", lines);
}

function buildFollowUpSummary(onboarding: OnboardingRecord) {
  const item = getChecklistItem(onboarding, "follow-up");
  if (!item) {
    return "";
  }

  const lines = [
    `Bekräftelse på genomgång: ${getDetailValue(item, "confirmationSummary") || "-"}`,
    `Trivsel och arbetssituation: ${getDetailValue(item, "wellBeing") || "-"}`,
    `Arbetsmiljö: ${getDetailValue(item, "workEnvironmentNotes") || "-"}`,
    `Förbättringsförslag: ${getDetailValue(item, "improvementSuggestions") || "-"}`,
  ];

  if (item.comment.trim()) {
    lines.push(`Kommentar: ${item.comment.trim()}`);
  }

  return section("Bekräftelse och uppföljning", lines);
}

export function buildOnboardingExport(
  onboarding: OnboardingRecord,
  include: ExportIncludeOptions
): ExportDocument {
  const employeeName = `${onboarding.firstName} ${onboarding.lastName}`;
  const completedDate = onboarding.completedAt ? formatDate(onboarding.completedAt) : "-";

  const sections = [
    section("Onboarding-rapport", [
      `Medarbetare: ${employeeName}`,
      `Befattning: ${onboarding.position}`,
      `Ansvarig chef: ${onboarding.manager}`,
      `Startdatum: ${formatDate(onboarding.startDate)}`,
      `Slutförd: ${completedDate}`,
    ]),
    include.checklist ? buildChecklistSection(onboarding, include.comments) : "",
    buildReceiptsSummary(onboarding),
    buildFollowUpSummary(onboarding),
    include.policy ? buildPolicySection(onboarding) : "",
    include["work-env"] ? buildWorkEnvironmentSection(onboarding) : "",
    include.signatures ? buildSignaturesSection(onboarding) : "",
    include.attachments ? buildAttachmentsSection(onboarding) : "",
  ].filter(Boolean);

  const text = sections.join("\n\n");
  const htmlSections = sections.map(
    (sectionText) =>
      `<section style="margin-bottom:24px; white-space:pre-wrap;"><p style="margin:0; line-height:1.6;">${escapeHtml(
        sectionText
      )}</p></section>`
  );

  const baseFileName = `onboarding-${employeeName.replaceAll(" ", "-").toLowerCase()}`;
  const fileName = `${baseFileName}.txt`;

  return {
    baseFileName,
    title: `Onboarding-rapport – ${employeeName}`,
    fileName,
    text,
    html: `<!DOCTYPE html>
<html lang="sv">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(`Onboarding-rapport – ${employeeName}`)}</title>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 40px; color: #18181b;">
    <h1 style="font-size: 28px; margin-bottom: 32px;">${escapeHtml(
      `Onboarding-rapport – ${employeeName}`
    )}</h1>
    ${htmlSections.join("\n")}
  </body>
</html>`,
  };
}
