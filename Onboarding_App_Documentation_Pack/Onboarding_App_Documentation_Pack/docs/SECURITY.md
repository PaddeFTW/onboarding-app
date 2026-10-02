# Security

> **Dokumentstatus:** TARGET  
> **Ägare:** Security Lead  
> **Uppdateras:** Minst inför varje större release.  
> **Relaterar till:** PRD.md, REQUIREMENTS.md, ARCHITECTURE.md, PROJECT_PLAN.md och relevanta ämnesdokument.

## 1. Syfte

Samla tekniska säkerhetskrav.

## 2. Dokumentets roll

Detta dokument är en del av projektets dokumenterade system. Krav och beslut här ska inte motsäga `DECISIONS.md`, `PROJECT_STATUS.md` eller de styrande innehållsreglerna. När ett senare beslut ändrar detta dokument ska ändringen registreras i `ONBOARDING_CHANGELOG.md`.

## 3. Huvudregler

- Threat model: cross-tenant access, IDOR, XSS, CSRF, injection, file abuse, prompt injection.
- Least privilege.
- Secrets i secret manager/env.
- Rate limiting på AI och känsliga endpoints.
- Audit log för behörighets- och publiceringsändringar.
- Dependency scanning och säkerhetsuppdateringar.

## 4. Struktur

Detta dokument ska alltid beskriva: **syfte → användare → regler → huvudflöden → data/behörighet → fel och edge cases → test → driftpåverkan → beslut → relationer**.

## 5. Kvalitetskrav

- Krav ska vara testbara.
- Behörighet ska beskrivas explicit.
- Fel ska ha definierat användarbeteende.
- Ändringar ska vara spårbara.

## 6. Relationer

- `PRD.md`
- `REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `ACCEPTANCE_CRITERIA.md`

## 7. Uppdateringsregel

Ändra dokumentet i samma förändring som ändrar dess beteende. Dokumentationen får inte ligga efter implementationen vid release.

## 7. File security

File uploads are untrusted input. Validate extension, MIME type, size and storage path. Never execute uploaded content. Access must be checked before issuing download access.

## 8. AI security

Treat user-provided documents and text as untrusted prompt content. Tool access must be allowlisted.
