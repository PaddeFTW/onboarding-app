export interface KnowledgeModule {
  stepId: string;
  title: string;
  module: string;
  text: string;
  source: string;
}

export const knowledgeModules: KnowledgeModule[] = [
  { stepId: "welcome", title: "Planera introduktionen", module: "Planering", source: "onboarding_process", text: "Planera introduktionen tillsammans med dem som ska lära upp. Utse ansvariga, skicka material i förväg och ställ i ordning arbetsplats, passerkort och kläder innan första dagen." },
  { stepId: "contact-person", title: "Mentor", module: "Mentor", source: "onboarding_process", text: "Utse en mentor. Mentorn visar de praktiska rutinerna. Chefen är fortfarande den person deltagaren vänder sig till i första hand." },
  { stepId: "work-practices", title: "Ordningsregler", module: "Ordningsregler", source: "ordnings_skotselregler", text: "Gemensamma ordningsregler gäller i lokalen och i arbetet. Kontrollera att de är aktuella innan introduktionen." },
  { stepId: "work-environment", title: "Arbetsmiljö", module: "Arbetsmiljö", source: "foretagspolicy", text: "Gå igenom nödutgångar, första hjälpen och skyddsutrustning. Arbetsmiljöpolicyn är företagets egen regel, inte en allmän text." },
  { stepId: "ppe", title: "Skyddsutrustning", module: "Skyddsutrustning", source: "onboarding_process", text: "Kontrollera om ny skyddsutrustning har tillkommit. På en byggarbetsplats behövs den utrustning som momentet kräver." },
  { stepId: "accident-routines", title: "Larm och tillbud", module: "Larm", source: "larmrutiner", text: "Vid en olycka: säkra platsen, hjälp den som skadats och larma. Vid ett tillbud: rapportera till chefen även om ingen skadades. Kontrollera att larmrutinerna fortfarande gäller." },
  { stepId: "work-hours", title: "Arbetstid", module: "Arbetstid", source: "arbetstid_administration", text: "Kontrollera att arbetstider, sjukfrånvaro och ersättningar stämmer innan de gås igenom." },
  { stepId: "confirm-introductions", title: "Bekräftelse", module: "Bekräftelse", source: "bekraftelse_information", text: "Bekräftelsen visar att deltagaren har tagit del av informationen. Den är inte ett godkännande av själva arbetet." },
  { stepId: "complete", title: "Uppföljning", module: "Uppföljning", source: "uppfoljning", text: "Chefen följer upp starten under de första veckorna. Notera vad som saknas, inte bara att introduktionen är klar." },
];

export function knowledgeForStep(stepId: string) {
  return knowledgeModules.find((item) => item.stepId === stepId) ?? null;
}

export function swedishStepStatus(status: string) {
  if (status === "completed") return "klart";
  if (status === "inProgress" || status === "ongoing") return "pågår";
  if (status === "skipped") return "ingår inte";
  return "inte påbörjat";
}
