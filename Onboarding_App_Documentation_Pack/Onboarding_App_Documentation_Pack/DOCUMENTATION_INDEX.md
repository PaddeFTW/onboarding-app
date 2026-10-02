# Onboarding App – Documentation Pack

## Purpose

This folder is a complete planning, architecture, UX, development, QA, deployment and operations baseline for Onboarding App, plus a reusable Template Framework for future SaaS products.

## Important source rule

The existing project governance files are copied unchanged under `docs/governance/`. They remain authoritative for the current onboarding content process. This pack does not replace those source documents.

The project materials state that original source files must remain unchanged, onboarding text must be source-traceable, and publication follows `DRAFT → SOURCE_VERIFIED → DOMAIN_REVIEWED → COPYRIGHT_REVIEWED → APPROVED → PUBLISHED`.

## Structure

- `docs/*.md` — app-specific product and engineering documentation.
- `docs/template/*.md` — reusable generic framework.
- `docs/governance/*.md` — existing project governance/source documents supplied with the project.

## Reuse model

When creating a new product:

1. Copy `docs/template/` into the new repository.
2. Keep core architecture, security, workspace, module, AI and deployment patterns.
3. Replace domain requirements, modules, content, terminology and brand profile.
4. Add project-specific documentation under `docs/`.
5. Never copy customer data into the template repository.

## Missing source material

The current supplied package contains Batch 03 and the governing files listed above. Earlier referenced files such as Batch 01, Batch 02 and the earlier SV/EN step files are referenced by the project context but were not supplied in this package. They must be merged into `ONBOARDING_STEPBANK_MASTER.md` only from their actual contents; no IDs or text have been invented here.

## Status vocabulary

- `CURRENT` = implemented or verified in supplied project status.
- `TARGET` = intended architecture/product behavior.
- `DRAFT` = not approved for publication.
- `VERIFIED` = verified against its stated source/process.
- `TBD` = decision genuinely still required.

## Minimum handover set

Start with:
`README.md`, `PRD.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, `DATABASE.md`, `AUTHORIZATION.md`, `USER_FLOWS.md`, `DESIGN_SYSTEM.md`, `SMART_WORKSPACE.md`, `MODULE_ASSISTANT.md`, `AI_GOVERNANCE.md`, `TEST_STRATEGY.md`, `DEPLOYMENT.md`, `GDPR.md`, `OPERATIONS.md`.

