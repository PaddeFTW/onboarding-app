export interface KnowledgeModule {
  stepId: string;
  module: string;
  text: string;
  source: string;
}

export const knowledgeModules: KnowledgeModule[] = [
  { stepId: "welcome", module: "Planering", source: "onboarding_process", text: "Planera introduktionen med dem som ska lära upp. Utse ansvariga, skicka material i förväg och ställ i ordning arbetsplats, passerkort och kläder innan första dagen." },
  { stepId: "contact-person", module: "Fadder", source: "onboarding_process", text: "Utse en fadder. Faddern visar de praktiska rutinerna. Chefen är fortfarande den primära kontakten." },
  { stepId: "work-practices", module: "Ordningsregler", source: "ordnings_skotselregler", text: "Gemensamma ordningsregler gäller i lokalen och på arbetet. De ska vara aktuella innan introduktionen." },
  { stepId: "work-environment", module: "Arbetsmiljö", source: "foretagspolicy", text: "Gå igenom nödutgångar, första hjälpen och skyddsutrustning. Policy för arbetsmiljö är företagets regel, inte en generell text." },
  { stepId: "ppe", module: "Skyddsutrustning", source: "onboarding_process", text: "Kontrollera om ny skyddsutrustning har tillkommit. På byggarbetsplats krävs den utrustning momentet behöver." },
  { stepId: "accident-routines", module: "Larm", source: "larmrutiner", text: "Vid olycka: säkra platsen, hjälp och larma. Vid tillbud: rapportera till chefen även om ingen skadades. Kontrollera att larmrutinerna fortfarande gäller." },
  { stepId: "work-hours", module: "Arbetstid", source: "arbetstid_administration", text: "Kontrollera att arbetstider, sjukfrånvaro och ersättningar i materialet stämmer innan de gås igenom." },
  { stepId: "confirm-introductions", module: "Bekräftelse", source: "bekraftelse_information", text: "Bekräftelsen visar att deltagaren har tagit del av informationen. Den godkänner inte själva arbetet." },
  { stepId: "complete", module: "Uppföljning", source: "uppfoljning", text: "Chefen följer upp starten de första veckorna. Notera vad som saknas, inte bara att introduktionen är klar." },
];

export function knowledgeForStep(stepId: string) {
  return knowledgeModules.find((item) => item.stepId === stepId) ?? null;
}
