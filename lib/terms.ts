export interface Term {
  term: string;
  definition: string;
  template: string;
}

export const terms: Term[] = [
  { term: "Introduktion", definition: "Genomgången när en ny medarbetare börjar, från första dagen till uppföljningen.", template: "Introduktionen startar måndag. Mentorn tar emot. Uppföljning om två veckor." },
  { term: "Ansvarig chef", definition: "Den som har det övergripande ansvaret för introduktionen, arbetsuppgifterna och uppföljningen.", template: "Ansvarig chef är Anna Andersson." },
  { term: "Mentor", definition: "Den som visar rutinerna, svarar på vardagsfrågor och hjälper personen in i gruppen. Kan vara samma person som chefen.", template: "Mentor är Erik Svensson." },
  { term: "Befattning", definition: "Det jobb personen är anställd för, till exempel montör eller administratör.", template: "Befattning: Montör." },
  { term: "Roll", definition: "Typen av arbete befattningen hör till, till exempel yrkesmedarbetare eller arbetsledning. Flera befattningar kan ha samma roll.", template: "Roll: Yrkesmedarbetare." },
  { term: "Bransch", definition: "Den verksamhet exemplen anpassas efter. Allmän verksamhet används om ingen bransch är vald.", template: "Bransch: Bygg och entreprenad." },
  { term: "Medarbetare", definition: "En person i företagets register. Väljs när en introduktion startas, skrivs inte in på nytt.", template: "Medarbetare: Erik Svensson, montör." },
  { term: "Moment", definition: "En sak som ska gås igenom, till exempel tider, skydd eller policy.", template: "Momentet arbetsmiljö är genomgånget." },
  { term: "Avvikelse", definition: "Något som blev fel eller ett tillbud. Skrivs till chefen så orsaken kan ses. Inte för att sätta dit någon.", template: "Avvikelsen lämnas till chefen samma dag." },
  { term: "Skyddsombud", definition: "Den som tar emot arbetsmiljöfrågor, om ett ombud finns. Saknas det ska det stå.", template: "Skyddsombud saknas. Frågan tas med chefen." },
  { term: "Policy", definition: "Företagets egen regel. Exempeltexten i appen är inte företagets policy.", template: "Vi stoppar arbetet om skydd saknas." },
  { term: "Utrustning", definition: "Det som faktiskt lämnas ut, till exempel nyckel, kläder eller skydd. Bara det kvitteras.", template: "Hjälm och skor är utlämnade." },
  { term: "Kvittens", definition: "Att informationen har gåtts igenom. Det är inte ett godkännande av själva arbetet.", template: "Genomgången idag. Chefen informerade." },
  { term: "Uppföljning", definition: "Samtalet efter starten. Frågan är vad som varit otydligt och vad som saknas.", template: "Uppföljning med chefen om 14 dagar." },
  { term: "Friskvård", definition: "Ert bidrag, om ni har ett. Beloppet bestämmer ni. Appen hittar inte på en nivå.", template: "Inget friskvårdsbidrag. Ohälsa i jobbet tas med chefen." },
  { term: "Fack", definition: "Kontakt om ni har avtal. Saknas avtal ska det stå. Inte ett krav i appen.", template: "Inget fackligt avtal." },
  { term: "Larm", definition: "Hur lokalen låses och larmas, om ni har larm. Alla behöver inte en kod.", template: "Vi har inget larm. Sist låser." },
];

export function termByName(name: string) {
  return terms.find((item) => item.term.toLowerCase() === name.toLowerCase()) ?? null;
}
