/** Korta policykort från kunskapsbanken. Inte fulla pärmtexter. */

export type PolicyCard = {
  title: string;
  sentence: string;
  example: string;
};

/** Gemensamma kort. Exempel anpassas lätt efter bransch i vyn. */
export const POLICY_CARDS: PolicyCard[] = [
  {
    title: "Arbetsmiljö",
    sentence: "Stoppa arbetet om det är farligt. Säg till chefen samma dag.",
    example: "Vi stoppar arbetet om skydd saknas.",
  },
  {
    title: "Kvalitet",
    sentence: "Gör om jobb som blivit fel innan det går till kunden.",
    example: "Vi gör om jobb som blivit fel.",
  },
  {
    title: "Miljö",
    sentence: "Sortera avfall och följ rutinen som gäller hos er.",
    example: "Spill och emballage i rätt kärl.",
  },
  {
    title: "Sekretess",
    sentence: "Dela inte kund- eller brukaruppgifter utan behov.",
    example: "Inga brukaruppgifter i privat telefon.",
  },
];

/** Branschanpassat exempel till policykortet, saknas bransch → allmän. */
export function policyExampleFor(industry: string): string {
  const key = industry || "general";
  const byIndustry: Record<string, string> = {
    general: "Vi gör om jobb som blivit fel och stoppar farligt arbete.",
    cleaning: "Rätt kemikalie. Inget som skadar kunden.",
    construction: "Vi stoppar arbetet om skydd saknas.",
    electrical: "Inget spänningssatt arbete utan behörighet.",
    hvac: "Vi stoppar om tryck eller het yta inte är säkrad.",
    facility: "Fel anmäls. Energi och avfall följer rutinen.",
    transport: "Nykter och utvilad förare.",
    manufacturing: "Osäker maskin stoppas.",
    consulting: "Kundkrav före genväg.",
    it: "Lösenord delas inte.",
    healthcare: "Brukarens säkerhet och sekretess går före takt.",
  };
  return byIndustry[key] ?? byIndustry.general;
}
