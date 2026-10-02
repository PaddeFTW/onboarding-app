# Onboarding Decisions

> **Dokumentstatus:** TARGET  
> **Ägare:** Produktägare + Tech Lead  
> **Uppdateras:** Direkt när ett beslut fattas, ändras eller ersätts.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Samla endast onboardingrelaterade beslut så att beslut kan spåras utan att blanda dem med generell projektstatus.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Beslut som gäller

| ID | Beslut | Status |
|---|---|---|
| D-001 | Hybridmodell med stegbank används | Beslutat |
| D-002 | Ett huvudsakligt steg visas per skärm i guidat flöde | Implementerat |
| D-003 | Steg används i stället för ren frågebank | Beslutat |
| D-004 | Mall och onboardinginstans är separata begrepp | Beslutat |
| D-005 | Publicerad onboarding använder snapshot | Målbeslut |
| D-006 | Multi-tenancy med `company_id` | Rekommenderat/mål |
| D-007 | Tre ursprungliga kundroller: admin, chef, deltagare | Rekommenderat; kompletterat i denna målmodell med handledare |
| D-008 | Supabase för auth, databas och storage | Rekommenderat/mål |
| D-009 | Row Level Security (RLS) ska användas | Rekommenderat/mål |
| D-010 | PDF prioriteras före Word/e-post för export | Rekommenderat |

## 4. Ändringsregel

Ingen funktionell förändring av låst Version 1.0 görs utan ett nytt uttryckligt beslut. Nya beslut ska ha ID, datum, ägare, påverkan och berörda dokument.
