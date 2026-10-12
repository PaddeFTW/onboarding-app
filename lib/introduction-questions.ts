import {
  constructionExampleFor,
  DEFAULT_LOCALE,
  questionText,
  type Locale,
} from "@/lib/i18n";
import type { OnboardingStepDefinition } from "@/lib/onboarding-steps";

export interface IntroductionQuestion extends OnboardingStepDefinition {
  placeholder: string;
  examples: Record<string, string>;
}

export const introductionQuestions: IntroductionQuestion[] = [
  { id: "plan", order: 1, type: "confirmation", required: true, title: "Stämmer företagsnamn, startdatum, plats, chef och mentor?", description: "Inledning", helpText: "Kontrollera det som sparats i registret. Bekräfta att det stämmer innan ni går vidare.", placeholder: "Bekräfta uppgifterna", confirmationLabel: "Uppgifterna stämmer.", content: "", examples: { general: "Företag, datum, plats, chef och mentor är ifyllda.", cleaning: "Företag, datum, plats, chef och mentor är ifyllda.", construction: "Företag, datum, plats, chef och mentor är ifyllda.", electrical: "Företag, datum, plats, chef och mentor är ifyllda.", hvac: "Företag, datum, plats, chef och mentor är ifyllda.", facility: "Företag, datum, plats, chef och mentor är ifyllda.", transport: "Företag, datum, plats, chef och mentor är ifyllda.", manufacturing: "Företag, datum, plats, chef och mentor är ifyllda.", consulting: "Företag, datum, plats, chef och mentor är ifyllda.", it: "Företag, datum, plats, chef och mentor är ifyllda.", healthcare: "Företag, datum, plats, chef och mentor är ifyllda." } },
  { id: "company", order: 2, type: "task", required: true, title: "Vad behöver personen veta om företaget och sitt jobb?", description: "Företaget", helpText: "En halv sida: vad ni gör, vilka ni jobbar för och vad rollen ansvarar för. Verksamhet och roller, ISO 9001.", placeholder: "Verksamhet, kunder och den egna rollen", confirmationLabel: "Företaget är genomgånget.", content: "", examples: { general: "Vi berättar vad företaget gör, vilka kunderna är och vem som är chef.", cleaning: "Vi städar kontor och trapphus. Objekten och vad som ingår gås igenom.", construction: "Vi bygger åt privata kunder. Platschefen leder platsen.", electrical: "Vi installerar och servar el. Arbetsledaren fördelar jobben.", hvac: "Vi monterar och servar värme och vatten. Servicechefen tar kundfrågan.", facility: "Vi sköter beståndet. Felanmälan går till driftteknikern.", transport: "Vi kör linjer och gods. Trafikledaren planerar dagen.", manufacturing: "Vi tillverkar och någon namngiven godkänner innan leverans.", consulting: "Vi gör uppdrag. Uppdragsansvarig granskar innan det går till kunden.", it: "Vi driftar kundernas system. Support är första kontakten.", healthcare: "Vi berättar vilka brukare vi har och vad som dokumenteras." } },
  { id: "hours", order: 3, type: "task", required: true, title: "Vilka tider gäller, och vem tar emot sjukanmälan?", description: "Arbetstid", helpText: "Pärmens funktion. Skriv bara era tider och vem som tar emot sjukanmälan.", placeholder: "Tider och vem man ringer vid sjukdom", confirmationLabel: "Tider och frånvaro är genomgångna.", content: "", examples: { general: "08.00–16.30. Sjuk anmäls till chefen före klockan 8.", cleaning: "Tider per objekt. Sjuk anmäls till arbetsledaren före start.", construction: "07.00–16.00 på plats. Sjuk anmäls till arbetsledaren före 06.30.", electrical: "07.00–16.00. Sjuk anmäls till arbetsledaren före start.", hvac: "07.00–16.00. Sjuk anmäls till servicechefen.", facility: "Schema per fastighet. Sjuk anmäls till förvaltaren.", transport: "Kör- och vilotider gäller utöver kontorstid. Sjuk anmäls till trafikledaren.", manufacturing: "Skift enligt schema. Sjuk anmäls till produktionsledaren före skiftet.", consulting: "Flextid. Tid rapporteras till uppdragsansvarig varje fredag.", it: "Flextid. Tid rapporteras i systemet senast fredag.", healthcare: "Schema och vab samma dag till samordnaren." } },
  { id: "wellness", order: 4, type: "task", required: false, title: "Vad gäller för friskvård, och vart vänder man sig om jobbet påverkar hälsan?", description: "Friskvård", helpText: "Valfritt. Bidraget är ert beslut. Skriv om ni har något, eller att det saknas. Hitta inte på ett belopp.", placeholder: "Bidrag och vem man kontaktar", confirmationLabel: "Friskvård är genomgången.", content: "", examples: { general: "Friskvård enligt ert beslut, eller ingen. Ohälsa i jobbet tas med chefen. Inget belopp anges här.", cleaning: "Företagshälsovård om riskbedömningen säger att kontroll behövs. Inget belopp anges här.", construction: "Företagshälsovård vid arbete med fall, damm eller buller. Inget belopp anges här.", electrical: "Ohälsa och elolycka tas med arbetsledaren samma dag.", hvac: "Ohälsa tas med servicechefen. Företagshälsovård om ni har avtal.", facility: "Ensamarbete och belastning tas med förvaltaren.", transport: "Trötthet och olycka tas med trafikledaren.", manufacturing: "Buller och belastning tas med produktionsledaren.", consulting: "Friskvård om ni har det. Stress tas med uppdragsansvarig. Inget belopp anges här.", it: "Friskvård om ni har det. Stress och skärm tas med närmaste chef. Inget belopp anges här.", healthcare: "Belastning och hot tas med verksamhetschefen." } },
  { id: "safety", order: 5, type: "confirmation", required: true, title: "Har faror, skyddsombud och vad man gör vid olycka gåtts igenom?", description: "Arbetsmiljö", helpText: "Visa förbandslåda och utrymning. Använd er farolista. Läs inte upp en lag.", placeholder: "Skyddsombud och vad man gör vid olycka", confirmationLabel: "Arbetsmiljön är genomgången.", content: "", examples: { general: "112, första hjälpen och vem som är skyddsombud.", cleaning: "Halka, lyft, kemikalier och var ögonduschen finns.", construction: "Fall, skyddsskor och att heta arbeten kräver tillstånd.", electrical: "Spänning, säkring och att arbete utan behörighet stoppas.", hvac: "Heta arbeten, tryck och var avstängningen sitter.", facility: "Ensamarbete, nycklar och hiss.", transport: "Lastning, trafik och vad man gör vid olycka.", manufacturing: "Maskiner, buller, hörselskydd och nödstopp.", consulting: "Skärm, stress och vem man säger till.", it: "Skärm, stress och vad man gör vid en incident.", healthcare: "Förflyttning, hot, ensamarbete och sekretess vid olycka." } },
  { id: "improvement", order: 6, type: "confirmation", required: true, title: "Vet personen hur man lämnar förslag och skriver en avvikelse?", description: "Förbättring", helpText: "Visa vem som tar emot. Det ska inte användas för att sätta dit någon. ISO 9001.", placeholder: "Vem som tar emot förslag och avvikelser", confirmationLabel: "Förslag och avvikelser är genomgångna.", content: "", examples: { general: "Förslag lämnas till chefen. Vi tittar på orsaken.", cleaning: "Missat moment hos kund skrivs till arbetsledaren.", construction: "Fel mot ritning eller tillbud sägs till platschefen samma dag.", electrical: "Felsökning som återkommer skrivs till arbetsledaren.", hvac: "Läcka eller fel montage skrivs till servicechefen.", facility: "Felanmälan som inte följts upp tas med förvaltaren.", transport: "Skada på gods skrivs till trafikledaren.", manufacturing: "Kassation skrivs till produktionsledaren.", consulting: "Fel i leverans tas med uppdragsansvarig.", it: "Incident skrivs till den som tar emot driftlarm.", healthcare: "Avvikelse kring brukare skrivs med sekretess." } },
  { id: "union", order: 7, type: "task", required: false, title: "Vart vänder man sig om ni har fackligt avtal?", description: "Fack", helpText: "Valfritt. Skriv kontakt eller att avtal saknas. Skyddsombud ligger i arbetsmiljöfrågan.", placeholder: "Kontakt eller inget avtal", confirmationLabel: "Facklig information är lämnad.", content: "", examples: { general: "Inget avtal. Närmaste fråga tas med chefen.", cleaning: "Kontakt eller inget avtal. Hitta inte på ett ombud.", construction: "Lokal facklig kontakt, eller inget avtal.", electrical: "Lokal kontakt, eller inget avtal.", hvac: "Lokal kontakt, eller inget avtal.", facility: "Kontakt eller inget avtal.", transport: "Kontakt för förare, eller inget avtal.", manufacturing: "Lokal klubb, eller inget avtal.", consulting: "Ofta inget avtal. Skriv det om det stämmer.", it: "Ofta inget avtal. Skriv det om det stämmer.", healthcare: "Kontakt på arbetsplatsen, eller inget avtal." } },
  { id: "rules", order: 8, type: "confirmation", required: true, title: "Vet personen hur ni håller ordning och sorterar avfall?", description: "Ordning", helpText: "Peka på kärlen. Sortering hör till ISO 14001 där ni har avfall.", placeholder: "Kärl och vem som äger rutinen", confirmationLabel: "Ordning och sortering är genomgångna.", content: "", examples: { general: "Var och en lämnar ytan som hen vill finna den.", cleaning: "Kundens sortering och egna kemikalier. Inte i samma kärl.", construction: "Spill plockas undan och transportvägar hålls fria.", electrical: "Kabelrester och emballage i rätt kärl.", hvac: "Metall, isolering och spillolja skiljs åt.", facility: "Miljörummet visas. Hyresgästens kärl rörs inte.", transport: "Spill och verkstadsavfall i märkta kärl.", manufacturing: "Kärl vid linjen. Farligt avfall separat.", consulting: "Papper och mappar. Inget kundmaterial i papperskorgen.", it: "Elektronik lämnas till den som tar emot avfallet, inte i soporna.", healthcare: "Smittförande avfall separat från hushållssopor." } },
  { id: "policy", order: 9, type: "confirmation", required: true, title: "Har era policyer gåtts igenom, och vad betyder de i jobbet?", description: "Policy", helpText: "Använd era egna policyer. Exempel i pärmen är inte era texter. ISO 9001, 14001 och 45001.", placeholder: "Vilka policyer och en vardagsmening", confirmationLabel: "Policyerna är genomgångna.", content: "", examples: { general: "Vi gör om jobb som blivit fel och stoppar farligt arbete.", cleaning: "Rätt kemikalie. Inget som skadar kunden.", construction: "Vi stoppar arbetet om skydd saknas.", electrical: "Inget spänningssatt arbete utan behörighet.", hvac: "Vi stoppar om tryck eller het yta inte är säkrad.", facility: "Fel anmäls. Energi och avfall följer rutinen.", transport: "Nykter och utvilad förare.", manufacturing: "Osäker maskin stoppas.", consulting: "Kundkrav före genväg.", it: "Lösenord delas inte.", healthcare: "Brukarens säkerhet och sekretess går före takt." } },
  { id: "receipt", order: 10, type: "task", required: true, title: "Vilken utrustning har lämnats ut?", description: "Kvittens", helpText: "Kvittera bara det ni lämnar. Skydd är det jobbet kräver, ISO 45001, inte en standardlista.", placeholder: "Nyckel, telefon, kläder eller skydd", confirmationLabel: "Utrustningen är kvitterad.", content: "", examples: { general: "Nyckel och telefon. Återlämnas när anställningen slutar.", cleaning: "Skor, handskar och nyckel till objektet.", construction: "Hjälm, skor och nyckel till boden.", electrical: "Skruvdragare, testinstrument och varsel.", hvac: "Verktyg, skor och nyckel till förrådet.", facility: "Nycklar och larmdosa.", transport: "Bilnyckel, kort och varsel.", manufacturing: "Hörselskydd, skor och egna verktyg.", consulting: "Dator. Återlämnas när uppdraget slutar.", it: "Dator och eget konto. Inget delat lösenord.", healthcare: "Arbetskläder och larm. Inga brukaruppgifter i privat telefon." } },
  { id: "alarm", order: 11, type: "singleChoice", required: false, title: "Hur låses och larmas lokalen, och vad gör man vid falsklarm?", description: "Larm", helpText: "Valfritt. Bara den som får kod behöver kunna larma. Välj att larm saknas om ni inte har något.", placeholder: "På, av och falsklarm, eller inget larm", confirmationLabel: "Larmrutinen är genomgången.", content: "", examples: { general: "Vi har inget larm. Sist låser.", cleaning: "Kundens larm, inte ert. Koden lämnas bara till den som ska in.", construction: "Bod och etablering låses. Ofta inget centralt larm.", electrical: "Förråd låses. Larm om lokalen har det.", hvac: "Förråd låses. Larm om lokalen har det.", facility: "Kod per hus. Inte alla får alla koder.", transport: "Verkstad och nyckelskåp. Falsklarm till bevakningen om ni har en.", manufacturing: "Port och brandlarm. Falsklarm enligt skylten.", consulting: "Kontoret låses. Larm om ni har det.", it: "Kontor och serverrum. Inte alla får serverkoden.", healthcare: "Personallarm är inte samma som brandlarm." }, options: [{ id: "inget-larm", label: "Vi har inget larm" }, { id: "har-larm", label: "Vi har larm" }] },
  { id: "confirm", order: 12, type: "confirmation", required: true, title: "Har den nya medarbetaren tagit del av informationen?", description: "Bekräftelse", helpText: "Den nya medarbetaren bekräftar att informationen är genomgången.", placeholder: "Bekräfta genomgången", confirmationLabel: "Jag har tagit del av informationen.", content: "", examples: { general: "Genomgången idag. Den nya medarbetaren har bekräftat.", cleaning: "Objekt, kemikalier och nyckel är genomgångna.", construction: "Platsintroduktion och skydd är genomgångna.", electrical: "Behörighet och egenkontroll är genomgångna.", hvac: "Verktyg och hetarbete är genomgångna om de ingår.", facility: "Nycklar och larm är genomgångna.", transport: "Fordon och vilotider är genomgångna.", manufacturing: "Maskiner hen får köra är genomgångna.", consulting: "Kundkrav och sekretess är genomgångna.", it: "Konto och incidentrutin är genomgångna.", healthcare: "Sekretess och dokumentation är genomgångna." } },
  { id: "followup", order: 13, type: "task", required: true, title: "När bokar ni uppföljningen?", description: "Uppföljning", helpText: "Välj datum för uppföljningen. Fråga då vad som varit otydligt och vad som saknas.", placeholder: "Välj datum för uppföljning", confirmationLabel: "Uppföljningen är bokad.", content: "", examples: { general: "Uppföljning med chefen om två veckor.", cleaning: "Uppföljning när objektet klaras utan mentor.", construction: "Uppföljning om skydd och vad som är otydligt på platsen.", electrical: "Uppföljning om vilka jobb personen får göra själv.", hvac: "Uppföljning om vilka servicejobb personen får ta själv.", facility: "Uppföljning när rundan och felanmälan sitter.", transport: "Uppföljning om körning och tidrapport.", manufacturing: "Uppföljning om vilka maskiner personen får köra.", consulting: "Uppföljning efter första kundmöte med stöd.", it: "Uppföljning när behörighet och incidentrutin sitter.", healthcare: "Uppföljning när dokumentation och sekretess sitter." } },
];

const NON_CONSTRUCTION_INDUSTRIES = new Set(["consulting", "it", "healthcare"]);

export function questionById(id: string) {
  return introductionQuestions.find((item) => item.id === id) ?? null;
}

/** Industry example; consulting, IT and healthcare never get construction text. Missing industry → allmän. */
export function exampleFor(id: string, industry: string, locale: Locale = DEFAULT_LOCALE) {
  const question = questionById(id);
  if (!question) return "";
  const key = industry || "general";
  if (key === "construction") {
    return constructionExampleFor(id, locale) ?? question.examples.construction ?? "";
  }
  if (NON_CONSTRUCTION_INDUSTRIES.has(key)) {
    return question.examples[key] ?? question.examples.general ?? "";
  }
  const value = question.examples[key] ?? question.examples.general ?? "";
  if (value === question.examples.construction && key !== "construction") {
    return question.examples.general ?? "";
  }
  return value;
}

const PLACEHOLDERS: Record<string, Partial<Record<string, string>>> = {
  company: {
    general: "Verksamhet, kunder och den egna befattningen",
    cleaning: "Objekt, kunder och den egna befattningen",
    construction: "Verksamhet, platsen och den egna befattningen",
    electrical: "Installation, service och den egna befattningen",
    hvac: "Montage, service och den egna befattningen",
    facility: "Bestånd, felanmälan och den egna befattningen",
    transport: "Linjer, gods och den egna befattningen",
    manufacturing: "Tillverkning, linjen och den egna befattningen",
    consulting: "Uppdrag, kunder och den egna befattningen",
    it: "System, support och den egna befattningen",
    healthcare: "Brukare, dokumentation och den egna befattningen",
  },
  hours: {
    general: "Tider och vem som tar emot sjukanmälan",
    cleaning: "Tider per objekt och vem som tar emot sjukanmälan",
    construction: "Tider på plats och vem som tar emot sjukanmälan",
    electrical: "Tider och vem som tar emot sjukanmälan",
    hvac: "Tider och vem som tar emot sjukanmälan",
    facility: "Schema och vem som tar emot sjukanmälan",
    transport: "Körtider och vem som tar emot sjukanmälan",
    manufacturing: "Skift och vem som tar emot sjukanmälan",
    consulting: "Arbetstid och hur tid rapporteras",
    it: "Arbetstid och hur tid rapporteras",
    healthcare: "Schema och vem som tar emot frånvaro",
  },
  wellness: {
    general: "Friskvård om ni har det, och vem man kontaktar",
    cleaning: "Friskvård eller företagshälsovård, om ni har det",
    construction: "Friskvård eller företagshälsovård, om ni har det",
    electrical: "Vem man kontaktar vid ohälsa i jobbet",
    hvac: "Vem man kontaktar vid ohälsa i jobbet",
    facility: "Vem man kontaktar vid ohälsa i jobbet",
    transport: "Vem man kontaktar vid trötthet eller olycka",
    manufacturing: "Vem man kontaktar vid ohälsa i jobbet",
    consulting: "Friskvård om ni har det, och vem man kontaktar",
    it: "Friskvård om ni har det, och vem man kontaktar",
    healthcare: "Vem man kontaktar vid belastning eller hot",
  },
  receipt: {
    general: "Nyckel, telefon, kläder eller skydd",
    cleaning: "Skor, handskar och nyckel till objektet",
    construction: "Hjälm, skor och nyckel till boden",
    electrical: "Verktyg, testinstrument och varsel",
    hvac: "Verktyg, skor och nyckel till förrådet",
    facility: "Nycklar och larmdosa",
    transport: "Bilnyckel, kort och varsel",
    manufacturing: "Hörselskydd, skor och egna verktyg",
    consulting: "Dator och tillbehör",
    it: "Dator och eget konto",
    healthcare: "Arbetskläder och larm",
  },
  followup: {
    general: "Datum för uppföljning med ansvarig chef",
    cleaning: "Datum för uppföljning med arbetsledaren",
    construction: "Datum för uppföljning med platschefen",
    electrical: "Datum för uppföljning med arbetsledaren",
    hvac: "Datum för uppföljning med servicechefen",
    facility: "Datum för uppföljning med förvaltaren",
    transport: "Datum för uppföljning med trafikledaren",
    manufacturing: "Datum för uppföljning med produktionsledaren",
    consulting: "Datum för uppföljning med uppdragsansvarig",
    it: "Datum för uppföljning med närmaste chef",
    healthcare: "Datum för uppföljning med verksamhetschefen",
  },
};

/** Placeholder for the answer field; missing industry → allmän. */
export function placeholderFor(id: string, industry: string) {
  const question = questionById(id);
  const key = industry || "general";
  return (
    PLACEHOLDERS[id]?.[key] ??
    PLACEHOLDERS[id]?.general ??
    question?.placeholder ??
    "Skriv svaret"
  );
}

/** Help text adapted to industry. No invented amounts, sick pay or legal claims. */
export function helpTextFor(
  id: string,
  industry: string,
  locale: Locale = DEFAULT_LOCALE
) {
  const question = questionById(id);
  if (!question) return "";
  const key = industry || "general";
  const translatedHelp = questionText(locale, id, "help");

  if (locale !== "sv") {
    return translatedHelp ?? question.helpText;
  }

  if (key === "healthcare") {
    if (id === "plan") {
      return "Kontrollera företagsnamn, datum, plats, chef och mentor. Bekräfta att det stämmer.";
    }
    if (id === "safety") {
      return "Visa förbandslåda och utrymning. Ta upp sekretess kring brukare. Använd er egen lista.";
    }
    if (id === "improvement") {
      return "Visa vem som tar emot. Avvikelse kring brukare skrivs med sekretess.";
    }
    if (id === "policy") {
      return "Använd era egna policyer. Sekretess och brukarens säkerhet hör hit.";
    }
    if (id === "receipt") {
      return "Kvittera bara det ni lämnar. Inga brukaruppgifter i privat telefon. Sekretess gäller.";
    }
    if (id === "confirm") {
      return "Den nya medarbetaren bekräftar att informationen är genomgången, inklusive sekretess.";
    }
  }

  if (key === "construction") {
    if (id === "plan") {
      return "Kontrollera företagsnamn, datum, plats, chef och mentor. Bekräfta att det stämmer.";
    }
    if (id === "safety") {
      return "Visa förbandslåda och utrymning. Gå igenom skydd och heta arbeten. Använd er farolista.";
    }
    if (id === "policy") {
      return "Använd era egna policyer. Skydd och heta arbeten hör till vardagen på platsen.";
    }
    if (id === "receipt") {
      return "Kvittera bara det ni lämnar. Skydd och det som behövs för heta arbeten, inte en standardlista.";
    }
  }

  return question.helpText;
}
