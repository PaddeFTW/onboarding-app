# Systemarkitektur

> **Dokumentstatus:** TARGET  
> **Ägare:** Tech Lead  
> **Uppdateras:** Vid arkitekturbeslut, större teknikbyte eller minst inför varje större release.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Definiera målarkitekturen för en säker, multi-tenant och versionssäker SaaS-produkt.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Arkitekturprincip

Systemet ska byggas som en modulär webbapplikation med tydlig separation mellan UI, applikationslogik, domänregler, dataåtkomst och externa tjänster.

## 4. Målstack

- Frontend: Next.js + TypeScript.
- UI: befintligt designsystem, återanvändbara komponenter.
- Auth: Supabase Auth.
- Databas: PostgreSQL via Supabase.
- Row Level Security (RLS): företagsisolering och behörighetskontroll på databasnivå.
- Fillagring: Supabase Storage.
- Deployment: Vercel eller motsvarande Next.js-kompatibel plattform.
- AI: separat provider-abstraktion så modell/provider kan bytas.

## 5. Lager

```text
UI
↓
Application Services
↓
Domain Rules
↓
Repositories / Supabase
↓
PostgreSQL + Storage

External:
AI Provider | Email | Export | Analytics
```

## 6. Multi-tenancy

Alla företagsbundna objekt ska ha `company_id` där det är relevant. RLS ska neka åtkomst över företagsgränser även om en klient manipulerar ett API-anrop.

## 7. Versionssäkerhet

Publicerade mallar är skrivskyddade. En onboardinginstans skapar en snapshot av mallversion, stegversioner och kopplade dokumentversioner. Avslutad onboarding ändras inte retroaktivt.

## 8. Modularkitektur

Moduler registreras genom metadata och behörigheter. En modul får inte själv kringgå centrala regler för auth, RLS, audit log eller AI-governance.

## 9. Nuvarande kontra mål

Nuvarande prototyp har lokal sparning och mockdata i det guidade flödet. Målarkitekturen ersätter detta stegvis med permanent lagring och företagsisolering. Dokumentation ska inte låtsas att målarkitekturen redan är fullt implementerad.
