export function swedishAuthError(message: string) {
  const text = message.toLowerCase();
  if (text.includes("invalid login")) return "Fel e-post eller lösenord.";
  if (text.includes("already registered") || text.includes("already been registered")) {
    return "Det finns redan ett konto med den e-posten. Logga in i stället.";
  }
  if (text.includes("email not confirmed")) return "Bekräfta mejlen innan du loggar in.";
  if (text.includes("rate limit")) return "För många försök. Vänta en stund och prova igen.";
  return "Inloggningen gick inte igenom. Prova igen.";
}
