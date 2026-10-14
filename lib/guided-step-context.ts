/**
 * Assembles company facts + knowledge-base support for a guided introduction step.
 * No network calls — callers pass already-loaded facts/settings.
 */

import { sizedExample } from "@/lib/company-facts";
import {
  exampleFor,
  helpTextFor,
  questionById,
} from "@/lib/introduction-questions";
import {
  knowledgeModules,
  type KnowledgeModule,
} from "@/lib/knowledge-modules";
import { termsForQuestion, type Term } from "@/lib/terms";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import type { OnboardingStepInstance, StepOption } from "@/lib/onboarding-steps";

/** Map introduction question ids → knowledge module step ids. */
const KNOWLEDGE_ALIAS: Record<string, string> = {
  plan: "welcome",
  company: "welcome",
  hours: "work-hours",
  wellness: "work-hours",
  safety: "work-environment",
  improvement: "accident-routines",
  union: "work-practices",
  rules: "work-practices",
  policy: "work-environment",
  receipt: "ppe",
  alarm: "accident-routines",
  confirm: "confirm-introductions",
  followup: "complete",
};

export interface CompanyFactRow {
  label: string;
  value: string;
}

export interface GuidedStepSupport {
  explanation: string;
  example: string;
  companyFacts: CompanyFactRow[];
  knowledge: KnowledgeModule | null;
  terms: Term[];
  options: StepOption[];
}

export function knowledgeForIntroStep(stepId: string): KnowledgeModule | null {
  const direct = knowledgeModules.find((item) => item.stepId === stepId);
  if (direct) return direct;
  const alias = KNOWLEDGE_ALIAS[stepId];
  if (!alias) return null;
  return knowledgeModules.find((item) => item.stepId === alias) ?? null;
}

function nonEmpty(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  return String(value).trim() || undefined;
}

/** Företagsunika rader som hör till steget (visas när de finns). */
export function companyFactsForStep(
  stepId: string,
  facts: Record<string, unknown>,
  companyName = ""
): CompanyFactRow[] {
  const rows: CompanyFactRow[] = [];
  const push = (label: string, value: unknown) => {
    const text = nonEmpty(value);
    if (text) rows.push({ label, value: text });
  };

  if (stepId === "plan") {
    push("Företag", companyName);
    push("Startdatum", facts.start_date);
    push("Plats", facts.start_place);
    push("Första dagen", facts.first_day);
  }
  if (stepId === "hours") {
    push("Arbetstid", facts.work_hours);
    push("Sjukanmälan", facts.sick_contact);
  }
  if (stepId === "safety") {
    push("Skyddsombud / kontakt", facts.safety_rep);
  }
  if (stepId === "policy") {
    push("Företagets policytext", facts.policies);
  }
  if (stepId === "alarm") {
    push("Larm", facts.has_alarm);
  }
  if (stepId === "receipt") {
    push("Utrustning (register)", facts.equipment);
  }
  if (stepId === "company") {
    push("Konton / system", facts.accounts);
  }
  if (stepId === "followup") {
    push("Uppföljning (dagar)", facts.follow_up_days);
  }

  return rows;
}

export function buildGuidedStepSupport(input: {
  step: OnboardingStepInstance;
  industry: string;
  employeeCount: string;
  companyName: string;
  facts: Record<string, unknown>;
  locale?: Locale;
}): GuidedStepSupport {
  const locale = input.locale ?? DEFAULT_LOCALE;
  const industryKey = input.industry || "general";
  const question = questionById(input.step.id);
  const explanation =
    helpTextFor(input.step.id, industryKey, locale) ||
    input.step.helpText ||
    question?.helpText ||
    "";
  const rawExample = exampleFor(input.step.id, industryKey, locale);
  const example = sizedExample(rawExample, input.employeeCount);
  const options =
    input.step.options?.length
      ? input.step.options
      : question?.options ?? [];

  return {
    explanation,
    example,
    companyFacts: companyFactsForStep(
      input.step.id,
      input.facts,
      input.companyName
    ),
    knowledge: knowledgeForIntroStep(input.step.id),
    terms: termsForQuestion(input.step.id),
    options,
  };
}
