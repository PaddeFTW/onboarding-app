export interface Term {
  term: string;
  definition: string;
  template: string;
}

export const terms: Term[] = [
  {
    term: "Introduktion",
    definition:
      "Genomgången när en ny medarbetare börjar, från första dagen till uppföljningen.",
    template: "Introduktionen startar måndag. Mentorn tar emot. Uppföljning om två veckor.",
  },
  {
    term: "Ansvarig chef",
    definition:
      "Följer upp att introduktionen genomförs. Ansvarar för arbetsuppgifter och förväntningar. Följer upp efter första tiden.",
    template: "Ansvarig chef är Anna Andersson.",
  },
  {
    term: "Mentor",
    definition:
      "Visar rutiner och arbetsplatsen. Svarar på vardagliga frågor. Hjälper in i arbetsgruppen. Samma person kan vara både chef och mentor.",
    template: "Mentor är Erik Svensson.",
  },
  {
    term: "Fadder",
    definition:
      "Namngiven person som tar emot och lär upp. Används särskilt i mindre bolag. Samma roll som mentor.",
    template: "Fadder är Erik Svensson.",
  },
  {
    term: "Nyanställd",
    definition: "Den person som får introduktionen.",
    template: "Nyanställd: Lisa Berg.",
  },
  {
    term: "Befattning",
    definition: "Det jobb personen är anställd för, till exempel montör eller administratör.",
    template: "Befattning: Montör.",
  },
  {
    term: "Roll",
    definition:
      "Typen av arbete befattningen hör till, till exempel yrkesmedarbetare eller arbetsledning. Flera befattningar kan ha samma roll.",
    template: "Roll: Yrkesmedarbetare.",
  },
  {
    term: "Bransch",
    definition:
      "Den verksamhet exemplen anpassas efter. Allmän verksamhet används om ingen bransch är vald.",
    template: "Bransch: Allmän verksamhet.",
  },
  {
    term: "Medarbetare",
    definition:
      "En person i företagets register. Väljs när en introduktion startas, skrivs inte in på nytt.",
    template: "Medarbetare: Erik Svensson, montör.",
  },
  {
    term: "Moment",
    definition: "En sak som ska gås igenom, till exempel tider, skydd eller policy.",
    template: "Momentet arbetsmiljö är genomgånget.",
  },
  {
    term: "Avvikelse",
    definition:
      "Något som blev fel eller ett tillbud. Skrivs till chefen så orsaken kan ses. Inte för att sätta dit någon.",
    template: "Avvikelsen lämnas till chefen samma dag.",
  },
  {
    term: "Skyddsombud",
    definition:
      "Den som tar emot arbetsmiljöfrågor, om ett ombud finns. Saknas det ska det stå.",
    template: "Skyddsombud saknas. Frågan tas med chefen.",
  },
  {
    term: "Policy",
    definition: "Företagets egen regel. Exempeltexten i appen är inte företagets policy.",
    template: "Vi stoppar arbetet om skydd saknas.",
  },
  {
    term: "Utrustning",
    definition:
      "Det som faktiskt lämnas ut, till exempel nyckel, kläder eller skydd. Bara det kvitteras.",
    template: "Hjälm och skor är utlämnade.",
  },
  {
    term: "Kvittens",
    definition:
      "Signerad bekräftelse på att information gåtts igenom eller utrustning lämnats ut.",
    template: "Genomgången idag. Chefen informerade.",
  },
  {
    term: "Uppföljning",
    definition:
      "Samtal efter några veckor om trivsel, förståelse och nästa upplärning.",
    template: "Uppföljning med chefen om 14 dagar.",
  },
  {
    term: "Friskvård",
    definition:
      "Ert bidrag, om ni har ett. Beloppet bestämmer ni. Appen hittar inte på en nivå.",
    template: "Inget friskvårdsbidrag. Ohälsa i jobbet tas med chefen.",
  },
  {
    term: "Fack",
    definition: "Kontakt om ni har avtal. Saknas avtal ska det stå. Inte ett krav i appen.",
    template: "Inget fackligt avtal.",
  },
  {
    term: "Larm",
    definition:
      "Hur lokalen låses och larmas, om ni har larm. Alla behöver inte en kod.",
    template: "Vi har inget larm. Sist låser.",
  },
];

export function termByName(name: string) {
  return terms.find((item) => item.term.toLowerCase() === name.toLowerCase()) ?? null;
}

/** Which glossary entries belong to which introduction question. */
const TERMS_BY_QUESTION: Record<string, readonly string[]> = {
  plan: ["Mentor", "Ansvarig chef", "Nyanställd"],
  wellness: ["Friskvård"],
  safety: ["Skyddsombud"],
  improvement: ["Avvikelse"],
  union: ["Fack"],
  policy: ["Policy"],
  receipt: ["Utrustning", "Kvittens"],
  confirm: ["Kvittens"],
  followup: ["Uppföljning"],
  alarm: ["Larm"],
};

export function termsForQuestion(questionId: string): Term[] {
  const names = TERMS_BY_QUESTION[questionId];
  if (!names) return [];
  const found: Term[] = [];
  for (const name of names) {
    const term = termByName(name);
    if (term) found.push(term);
  }
  return found;
}
