import type { Locale } from "@/lib/i18n/types";

/**
 * Construction-industry examples for the 13 introduction questions.
 * Available in Swedish, English, Polish and German.
 * Other locales fall back to Swedish via the i18n layer.
 */
export const constructionExamples: Partial<
  Record<Locale, Record<string, string>>
> = {
  sv: {
    plan: "Företag, datum, plats, chef och mentor är ifyllda.",
    company: "Vi bygger åt privata kunder. Platschefen leder platsen.",
    hours: "07.00–16.00 på plats. Sjuk anmäls till arbetsledaren före 06.30.",
    wellness: "Företagshälsovård vid arbete med fall, damm eller buller. Inget belopp anges här.",
    safety: "Fall, skyddsskor och att heta arbeten kräver tillstånd.",
    improvement: "Fel mot ritning eller tillbud sägs till platschefen samma dag.",
    union: "Lokal facklig kontakt, eller inget avtal.",
    rules: "Spill plockas undan och transportvägar hålls fria.",
    policy: "Vi stoppar arbetet om skydd saknas.",
    receipt: "Hjälm, skor och nyckel till boden.",
    alarm: "Bod och etablering låses. Ofta inget centralt larm.",
    confirm: "Platsintroduktion och skydd är genomgångna.",
    followup: "Uppföljning om skydd och vad som är otydligt på platsen.",
  },
  en: {
    plan: "Company, date, site, manager and mentor are filled in.",
    company: "We build for private customers. The site manager leads the site.",
    hours: "07:00–16:00 on site. Sick leave is reported to the supervisor before 06:30.",
    wellness: "Occupational health for work with falls, dust or noise. No amount is stated here.",
    safety: "Falls, safety shoes, and hot works require a permit.",
    improvement: "Drawing errors or near misses are reported to the site manager the same day.",
    union: "Local union contact, or no agreement.",
    rules: "Spill is cleared and transport routes are kept free.",
    policy: "We stop the work if protection is missing.",
    receipt: "Helmet, shoes and key to the site hut.",
    alarm: "Hut and site compound are locked. Often no central alarm.",
    confirm: "Site introduction and protection have been covered.",
    followup: "Follow-up on protection and what is unclear on site.",
  },
  pl: {
    plan: "Firma, data, miejsce, kierownik i mentor są uzupełnione.",
    company: "Budujemy dla klientów prywatnych. Kierownik budowy prowadzi plac.",
    hours: "07:00–16:00 na placu. Chorobę zgłasza się przełożonemu przed 06:30.",
    wellness: "Medycyna pracy przy pracy z upadkami, pyłem lub hałasem. Tu nie podajemy kwoty.",
    safety: "Upadki, obuwie ochronne oraz prace gorące wymagają zezwolenia.",
    improvement: "Błąd względem rysunku lub prawie wypadek zgłasza się kierownikowi budowy tego samego dnia.",
    union: "Lokalny kontakt związkowy albo brak umowy.",
    rules: "Rozlane materiały się sprząta, a drogi transportowe są wolne.",
    policy: "Zatrzymujemy pracę, jeśli brakuje ochrony.",
    receipt: "Kask, buty i klucz do kontenera na placu.",
    alarm: "Kontener i plac są zamykane. Często nie ma centralnego alarmu.",
    confirm: "Wprowadzenie na plac i ochrona zostały omówione.",
    followup: "Follow-up dotyczący ochrony i tego, co jest niejasne na placu.",
  },
  de: {
    plan: "Firma, Datum, Baustelle, Führungskraft und Mentor sind ausgefüllt.",
    company: "Wir bauen für private Kunden. Die Bauleitung führt die Baustelle.",
    hours: "07:00–16:00 auf der Baustelle. Krankheit wird dem Vorarbeiter vor 06:30 gemeldet.",
    wellness: "Betriebsarzt bei Arbeit mit Absturz, Staub oder Lärm. Hier wird kein Betrag genannt.",
    safety: "Absturz, Sicherheitsschuhe und Heißarbeiten brauchen eine Erlaubnis.",
    improvement: "Fehler gegenüber der Zeichnung oder Beinaheunfälle werden der Bauleitung am selben Tag gemeldet.",
    union: "Lokaler Gewerkschaftskontakt oder keine Vereinbarung.",
    rules: "Verschüttetes wird weggeräumt und Transportwege bleiben frei.",
    policy: "Wir stoppen die Arbeit, wenn Schutz fehlt.",
    receipt: "Helm, Schuhe und Schlüssel zur Bauwagen.",
    alarm: "Bauwagen und Einrichtung werden abgeschlossen. Oft kein zentraler Alarm.",
    confirm: "Baustelleneinführung und Schutz sind besprochen.",
    followup: "Nachverfolgung zu Schutz und dem, was auf der Baustelle unklar ist.",
  },
};

export function constructionExampleFor(
  questionId: string,
  locale: Locale
): string | undefined {
  return (
    constructionExamples[locale]?.[questionId] ??
    constructionExamples.sv?.[questionId]
  );
}
