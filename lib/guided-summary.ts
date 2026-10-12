import { normalizeAlarmOptionId } from "@/lib/company-facts";
import { industryById } from "@/lib/industries";
import { introductionQuestions } from "@/lib/introduction-questions";
import {
  followUpDateLabel,
  responsibleNames,
  type OnboardingInstance,
  type OnboardingStepInstance,
} from "@/lib/onboarding-steps";
import type { StoredGuidedInstance } from "@/lib/supabase/guided-repository";

export type GuidedSummaryLine = {
  label: string;
  value: string;
};

export type GuidedSummaryQuestion = {
  order: number;
  title: string;
  answer: string;
};

export type GuidedSummary = {
  title: string;
  meta: GuidedSummaryLine[];
  questions: GuidedSummaryQuestion[];
};

function stepAnswer(step: OnboardingStepInstance | undefined): string {
  if (!step || step.status === "skipped" || step.status === "notStarted") {
    return "ingår inte";
  }
  if (step.status !== "completed") {
    return "ingår inte";
  }

  if (step.type === "singleChoice") {
    const selected = normalizeAlarmOptionId(step.response.selectedOptionId);
    const option = step.options?.find(
      (item) =>
        item.id === step.response.selectedOptionId ||
        normalizeAlarmOptionId(item.id) === selected
    );
    return option?.label?.trim() || "ingår inte";
  }

  const comment = step.response.comment?.trim();
  if (comment) return comment;

  if (step.type === "confirmation" && step.response.acknowledged) {
    return step.confirmationLabel?.trim() || "Bekräftat";
  }

  if (step.type === "task" && step.response.taskConfirmed) {
    return step.confirmationLabel?.trim() || "Genomgånget";
  }

  return "ingår inte";
}

export function buildGuidedSummary(
  instance: OnboardingInstance | StoredGuidedInstance,
  industryId: string,
  companyName = ""
): GuidedSummary {
  const { managerName, mentorName } = responsibleNames(instance);
  const industryName =
    industryById(industryId)?.name || industryById("general")?.name || "Allmän verksamhet";
  const position =
    ("templateLabel" in instance && instance.templateLabel) ||
    "Befattning saknas";
  const completedDate = instance.completedAt
    ? new Date(instance.completedAt).toLocaleDateString("sv-SE")
    : new Date(instance.startedAt).toLocaleDateString("sv-SE");

  const stepsById = new Map(instance.steps.map((step) => [step.id, step]));

  return {
    title: `Introduktion för ${instance.participantName}`,
    meta: [
      { label: "Namn", value: instance.participantName },
      { label: "Företag", value: companyName.trim() || "Företag saknas" },
      { label: "Befattning", value: String(position) },
      { label: "Bransch", value: industryName },
      { label: "Ansvarig chef", value: managerName },
      { label: "Mentor", value: mentorName },
      { label: "Datum", value: completedDate },
      { label: "Uppföljning", value: followUpDateLabel(instance) },
    ],
    questions: introductionQuestions.map((question) => ({
      order: question.order,
      title: question.title,
      answer: stepAnswer(stepsById.get(question.id)),
    })),
  };
}
