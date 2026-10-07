export const industries = [
  { id: "cleaning", name: "Städ och service", positions: [["Arbetsledare", "Arbetsledning"], ["Städare", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "construction", name: "Bygg och entreprenad", positions: [["Platschef", "Arbetsledning"], ["Arbetsledare", "Arbetsledning"], ["Projektledare", "Projektledning"], ["Montör", "Yrkesmedarbetare"], ["Snickare", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "electrical", name: "Elinstallation", positions: [["Arbetsledare", "Arbetsledning"], ["Elektriker", "Yrkesmedarbetare"], ["Serviceelektriker", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "hvac", name: "VVS", positions: [["Arbetsledare", "Arbetsledning"], ["Montör", "Yrkesmedarbetare"], ["Servicetekniker", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "facility", name: "Fastighet", positions: [["Förvaltare", "Ledning"], ["Drifttekniker", "Yrkesmedarbetare"], ["Fastighetsskötare", "Yrkesmedarbetare"], ["Administratör", "Administration"]] },
  { id: "transport", name: "Transport och logistik", positions: [["Trafikledare", "Arbetsledning"], ["Chaufför", "Yrkesmedarbetare"], ["Terminalmedarbetare", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "manufacturing", name: "Tillverkning", positions: [["Produktionsledare", "Arbetsledning"], ["Operatör", "Yrkesmedarbetare"], ["Underhåll", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "consulting", name: "Konsult och tjänster", positions: [["Uppdragsansvarig", "Projektledning"], ["Konsult", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "it", name: "IT och teknik", positions: [["Uppdragsansvarig", "Projektledning"], ["Tekniker", "Yrkesmedarbetare"], ["Support", "Yrkesmedarbetare"], ["Administratör", "Administration"], ["VD", "Ledning"]] },
  { id: "healthcare", name: "Vård och omsorg", positions: [["Verksamhetschef", "Ledning"], ["Samordnare", "Arbetsledning"], ["Undersköterska", "Yrkesmedarbetare"], ["Stödassistent", "Yrkesmedarbetare"], ["Administratör", "Administration"]] },
] as const;

export function industryById(id: string) {
  return industries.find((item) => item.id === id) ?? null;
}
