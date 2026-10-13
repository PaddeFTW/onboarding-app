/** Map company_facts columns onto guided introduction step ids. */

export function savedFactFor(
  stepId: string,
  facts: Record<string, unknown>
): string | undefined {
  if (stepId === "hours") {
    const parts = [facts.work_hours, facts.sick_contact].filter(
      (value) => value != null && value !== ""
    );
    return parts.length ? parts.map(String).join(". ") : undefined;
  }
  if (stepId === "followup") {
    const days =
      facts.follow_up_days == null || facts.follow_up_days === ""
        ? 14
        : Number(facts.follow_up_days);
    const base = new Date();
    base.setDate(base.getDate() + (Number.isFinite(days) ? days : 14));
    return base.toISOString().slice(0, 10);
  }
  const keys: Record<string, string> = {
    safety: "safety_rep",
    policy: "policies",
    alarm: "has_alarm",
  };
  const key = keys[stepId];
  if (!key) return undefined;
  const value = facts[key];
  return value == null || value === "" ? undefined : String(value);
}

export function alarmOptionFromFact(hasAlarm: unknown): string | undefined {
  if (hasAlarm === "Vi har inget larm") return "inget-larm";
  if (hasAlarm === "Vi har larm") return "har-larm";
  return undefined;
}

/** Normalisera äldre engelska larm-id:n till svenska. */
export function normalizeAlarmOptionId(id: string | undefined): string | undefined {
  if (!id) return undefined;
  if (id === "no-alarm" || id === "inget-larm") return "inget-larm";
  if (id === "has-alarm" || id === "har-larm") return "har-larm";
  return id;
}

/** Shorten industry examples for the smallest companies. */
export function shortExample(value: string, employeeCount: string) {
  if (employeeCount !== "1–5") return value;
  return (
    value
      .replace(/[^.!?]+(ansvarig|ansvariga|chef)[^.!?]*[.!?]?/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim() || value
  );
}

/**
 * Adapt example text to company size.
 * 1–5: short. 6–20: as written. Larger: longer follow-up wording.
 */
export function sizedExample(value: string, employeeCount: string) {
  const base = value?.trim() || "";
  if (!base) return "";
  if (employeeCount === "1–5" || !employeeCount) {
    return shortExample(base, "1–5");
  }
  if (employeeCount === "6–20") {
    return base;
  }
  if (employeeCount === "21–50") {
    return base
      .replace(/om två veckor/gi, "om 14 dagar")
      .replace(/om 7 dagar/gi, "om 14 dagar");
  }
  // 51–250 and 250+
  return base
    .replace(/om två veckor/gi, "om 30 dagar")
    .replace(/om 14 dagar/gi, "om 30 dagar")
    .replace(/om 7 dagar/gi, "om 30 dagar");
}

export function isSmallCompany(employeeCount: string) {
  return employeeCount === "1–5";
}

/** Suggested follow-up days for each size band. */
export function followUpDaysForSize(employeeCount: string): string {
  if (employeeCount === "1–5") return "7";
  if (employeeCount === "6–20") return "14";
  if (employeeCount === "21–50") return "14";
  return "30";
}
