# Database Model

## Syfte

Detta är en första logisk datamodell för nästa version. Den innehåller inga SQL-satser. SQL betyder Structured Query Language, språket som används för att skapa och fråga databastabeller.

Målet är att beskriva ansvar, relationer, företagsägande och versionssäkerhet innan implementation.

## Övergripande principer

- All företagsägd data ska ha `company_id`.
- Systemmallar ägs av systemet, inte av ett företag.
- Företagsmallversioner är versionssäkrade.
- Onboardingar får frysta snapshots.
- Dokumentversioner får inte skrivas över.
- Audit events sparar viktiga händelser.

## Tabeller

### companies

Syfte: Representerar ett kundföretag.

Viktigaste fält:

- `id`
- `name`
- `status`
- `created_at`
- `updated_at`

Relationer:

- har många `company_memberships`
- har många `company_templates`
- har många `onboardings`
- har många `documents`

Företagsägt innehåll: Företaget är ägare till sina mallar, onboardingar, dokument och medlemskap.

Versionssäkras: Nej, men viktiga ändringar bör skapa audit events.

### profiles

Syfte: Representerar en inloggad användares produktprofil.

Viktigaste fält:

- `id`
- `auth_user_id`
- `display_name`
- `email`
- `created_at`
- `updated_at`

Relationer:

- har många `company_memberships`
- kan vara deltagare eller ansvarig i `onboardings`

Företagsägt innehåll: Profilen är användarägd, men åtkomst inom företag styrs via medlemskap.

Versionssäkras: Nej.

### company_memberships

Syfte: Kopplar användare till företag och roll.

Viktigaste fält:

- `id`
- `company_id`
- `profile_id`
- `role`
- `status`
- `created_at`

Relationer:

- tillhör `companies`
- tillhör `profiles`

Företagsägt innehåll: Ja.

Versionssäkras: Nej, men rolländringar ska skapa audit events.

### system_templates

Syfte: Produktens grundmallar.

Viktigaste fält:

- `id`
- `name`
- `status`
- `created_at`

Relationer:

- har många `system_template_versions`

Företagsägt innehåll: Nej.

Versionssäkras: Ja, via versionstabeller.

### system_template_versions

Syfte: Versioner av systemmallar.

Viktigaste fält:

- `id`
- `system_template_id`
- `version`
- `status`
- `published_at`
- `created_at`

Relationer:

- tillhör `system_templates`
- har många `system_template_sections`

Företagsägt innehåll: Nej.

Versionssäkras: Ja. Publicerade versioner är skrivskyddade.

### system_template_sections

Syfte: Sektioner i en systemmallversion.

Viktigaste fält:

- `id`
- `system_template_version_id`
- `title`
- `description`
- `sort_order`

Relationer:

- tillhör `system_template_versions`
- har många `system_template_items`

Företagsägt innehåll: Nej.

Versionssäkras: Ja som del av publicerad systemmallversion.

### system_template_items

Syfte: Moment i en systemmallsektion.

Viktigaste fält:

- `id`
- `system_template_section_id`
- `title`
- `description`
- `content`
- `sort_order`
- `is_required`

Relationer:

- tillhör `system_template_sections`

Företagsägt innehåll: Nej.

Versionssäkras: Ja som del av publicerad systemmallversion.

### company_templates

Syfte: Företagets mallhuvud.

Viktigaste fält:

- `id`
- `company_id`
- `name`
- `status`
- `created_at`

Relationer:

- tillhör `companies`
- har många `company_template_versions`

Företagsägt innehåll: Ja.

Versionssäkras: Själva huvudposten nej, innehållet ja via versioner.

### company_template_versions

Syfte: En konkret företagsmallversion.

Viktigaste fält:

- `id`
- `company_template_id`
- `company_id`
- `source_system_template_version_id`
- `version`
- `status`
- `published_at`
- `created_by_profile_id`

Relationer:

- tillhör `company_templates`
- kan utgå från `system_template_versions`
- har många `company_template_sections`

Företagsägt innehåll: Ja.

Versionssäkras: Ja. Publicerade versioner är skrivskyddade.

### company_template_sections

Syfte: Företagets sektioner i en specifik mallversion.

Viktigaste fält:

- `id`
- `company_id`
- `company_template_version_id`
- `title`
- `description`
- `sort_order`

Relationer:

- tillhör `company_template_versions`
- har många `company_template_items`

Företagsägt innehåll: Ja.

Versionssäkras: Ja som del av mallversion.

### company_template_items

Syfte: Företagets moment i en specifik mallversion.

Viktigaste fält:

- `id`
- `company_id`
- `company_template_section_id`
- `title`
- `description`
- `content`
- `sort_order`
- `is_required`
- `completion_mode`

Relationer:

- tillhör `company_template_sections`
- kan kopplas till dokument via `template_item_documents`

Företagsägt innehåll: Ja.

Versionssäkras: Ja som del av mallversion.

### onboardings

Syfte: En individuell onboardingprocess.

Viktigaste fält:

- `id`
- `company_id`
- `company_template_version_id`
- `participant_profile_id`
- `responsible_profile_id`
- `status`
- `started_at`
- `completed_at`
- `created_at`

Relationer:

- tillhör `companies`
- skapas från `company_template_versions`
- har många `onboarding_sections`
- har många `onboarding_comments`

Företagsägt innehåll: Ja.

Versionssäkras: Ja genom snapshot-tabeller.

### onboarding_sections

Syfte: Snapshot av sektioner för en onboarding.

Viktigaste fält:

- `id`
- `company_id`
- `onboarding_id`
- `source_company_template_section_id`
- `title`
- `description`
- `sort_order`

Relationer:

- tillhör `onboardings`
- har många `onboarding_items`

Företagsägt innehåll: Ja.

Versionssäkras: Ja. Ändras inte när mall ändras.

### onboarding_items

Syfte: Snapshot av moment för en onboarding.

Viktigaste fält:

- `id`
- `company_id`
- `onboarding_section_id`
- `source_company_template_item_id`
- `title`
- `description`
- `content`
- `sort_order`
- `is_required`
- `completed_at`
- `completed_by_profile_id`

Relationer:

- tillhör `onboarding_sections`
- har dokument via `onboarding_item_documents`
- har kommentarer via `onboarding_comments`

Företagsägt innehåll: Ja.

Versionssäkras: Ja. Innehåll fryses vid skapandet.

### documents

Syfte: Dokumentmetadata och versioner.

Viktigaste fält:

- `id`
- `company_id`
- `parent_document_id`
- `title`
- `version`
- `storage_path`
- `mime_type`
- `status`
- `uploaded_by_profile_id`
- `created_at`

Relationer:

- tillhör `companies` om företagsdokument
- kan kopplas till mallmoment och onboardingmoment
- `parent_document_id` kopplar versioner av samma dokument

Företagsägt innehåll: Ja för företagsdokument. Nej för framtida systemdokument.

Versionssäkras: Ja. Filer skrivs inte över.

### template_item_documents

Syfte: Kopplar dokumentversioner till företagsmallmoment.

Viktigaste fält:

- `id`
- `company_id`
- `company_template_item_id`
- `document_id`
- `sort_order`

Relationer:

- tillhör `company_template_items`
- tillhör `documents`

Företagsägt innehåll: Ja.

Versionssäkras: Ja genom publicerad mallversion.

### onboarding_item_documents

Syfte: Snapshot-koppling mellan onboardingmoment och dokumentversion.

Viktigaste fält:

- `id`
- `company_id`
- `onboarding_item_id`
- `document_id`
- `title_snapshot`
- `sort_order`

Relationer:

- tillhör `onboarding_items`
- pekar på specifik `documents`-version

Företagsägt innehåll: Ja.

Versionssäkras: Ja. Historiska dokumentreferenser ändras inte.

### onboarding_comments

Syfte: Kommentarer och anteckningar på onboarding eller moment.

Viktigaste fält:

- `id`
- `company_id`
- `onboarding_id`
- `onboarding_item_id`
- `author_profile_id`
- `body`
- `created_at`

Relationer:

- tillhör `onboardings`
- kan tillhöra `onboarding_items`
- skapad av `profiles`

Företagsägt innehåll: Ja.

Versionssäkras: Kommentarer ska bevaras. Redigering kräver separat framtida beslut.

### audit_events

Syfte: Spårbar historik över viktiga händelser.

Viktigaste fält:

- `id`
- `company_id`
- `actor_profile_id`
- `event_type`
- `resource_type`
- `resource_id`
- `metadata`
- `created_at`

Relationer:

- tillhör `companies` när händelsen är företagsspecifik
- kan peka på valfri resurstyp via `resource_type` och `resource_id`

Företagsägt innehåll: Ja när `company_id` finns.

Versionssäkras: Ja. Audit events ska inte ändras i efterhand.
