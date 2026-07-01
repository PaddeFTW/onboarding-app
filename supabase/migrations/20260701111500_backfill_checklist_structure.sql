begin;

drop table if exists temp_outdated_onboardings;
create temporary table temp_outdated_onboardings as
select ci.onboarding_id
from public.checklist_items ci
group by ci.onboarding_id
having count(*) <> 12
   or count(*) filter (
     where ci.template_key in (
       'introduction',
       'company-information',
       'administration',
       'wellness',
       'work-environment',
       'improvement-work',
       'union-questions',
       'house-rules',
       'policies',
       'receipts',
       'alarms',
       'follow-up'
     )
   ) <> 12
   or count(distinct ci.template_key) <> 12;

drop table if exists temp_old_completion;
create temporary table temp_old_completion as
select
  o.id as onboarding_id,
  o.completed_at as onboarding_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'presentation') as presentation_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'tour') as tour_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'work-env') as work_env_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'risks') as risks_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'safety-rep') as safety_rep_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'first-aid') as first_aid_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'fire') as fire_completed_at,
  max(ci.completed_at) filter (where ci.template_key = 'substance') as substance_completed_at
from public.onboarding o
left join public.checklist_items ci on ci.onboarding_id = o.id
where o.id in (select onboarding_id from temp_outdated_onboardings)
group by o.id, o.completed_at;

delete from public.checklist_items
where onboarding_id in (select onboarding_id from temp_outdated_onboardings);

insert into public.checklist_items (
  onboarding_id,
  template_key,
  sort_order,
  title,
  description,
  info,
  documents,
  completed_at
)
select
  c.onboarding_id,
  t.template_key,
  t.sort_order,
  t.title,
  t.description,
  t.info,
  t.documents,
  case
    when c.onboarding_completed_at is not null then c.onboarding_completed_at
    when t.template_key = 'introduction' then c.presentation_completed_at
    when t.template_key = 'company-information' then c.tour_completed_at
    when t.template_key = 'work-environment'
      and c.work_env_completed_at is not null
      and c.risks_completed_at is not null
      and c.safety_rep_completed_at is not null
      and c.first_aid_completed_at is not null
      and c.fire_completed_at is not null
    then greatest(
      c.work_env_completed_at,
      c.risks_completed_at,
      c.safety_rep_completed_at,
      c.first_aid_completed_at,
      c.fire_completed_at
    )
    when t.template_key = 'policies' then c.substance_completed_at
    else null
  end as completed_at
from temp_old_completion c
cross join (
  values
    (
      'introduction',
      0,
      'Introduktion',
      'Planering, ansvar, förberedelser och kontroll inför varje ny introduktion.',
      'Detta moment bygger på kapitel 1 i introduktionsunderlaget och säkerställer att introduktionen är förberedd, att ansvariga är utsedda och att rätt material finns klart innan första arbetsdagen.',
      jsonb_build_array(jsonb_build_object('name', 'Introduktion', 'sourcePath', 'docs/onboarding/01-introduktion.md'))
    ),
    (
      'company-information',
      1,
      'Företagsinformation',
      'Historik, affärsidé, organisation och den nyanställdes roll i företaget.',
      'Detta moment utgår från kapitel 2 och används för att förankra företagets bakgrund, affärsidé, organisation och ansvarsfördelning hos den nyanställde.',
      jsonb_build_array(jsonb_build_object('name', 'Företagsinformation', 'sourcePath', 'docs/onboarding/02-foretagsinformation.md'))
    ),
    (
      'administration',
      2,
      'Arbetstid och administration',
      'Arbetstider, lön, ledigheter, tidrapportering och viktiga administrativa rutiner.',
      'Detta moment bygger på kapitel 3 och samlar den information som den nyanställde behöver om arbetstid, rapportering, ersättningar, sjukfrånvaro och familjerelaterade ledigheter.',
      jsonb_build_array(jsonb_build_object('name', 'Arbetstid och administration', 'sourcePath', 'docs/onboarding/03-administration.md'))
    ),
    (
      'wellness',
      3,
      'Friskvård',
      'Företagshälsovård, vårdcentralsavtal och företagets friskvårdsförmåner.',
      'Detta moment utgår från kapitel 4 och förklarar företagshälsovårdens roll, medicinska kontroller i arbetslivet och vilka friskvårdsförmåner som erbjuds.',
      jsonb_build_array(jsonb_build_object('name', 'Friskvård', 'sourcePath', 'docs/onboarding/04-friskvard.md'))
    ),
    (
      'work-environment',
      4,
      'Arbetsmiljö',
      'Skyddsorganisation, krisberedskap, akuta rutiner och ordnings- och skyddsregler.',
      'Detta moment bygger på kapitel 5 och samlar arbetsmiljöorganisation, nödnummer, agerande vid olyckor och brand samt de säkerhetsregler som gäller på arbetsplatsen.',
      jsonb_build_array(jsonb_build_object('name', 'Arbetsmiljö', 'sourcePath', 'docs/onboarding/05-arbetsmiljo.md'))
    ),
    (
      'improvement-work',
      5,
      'Förbättringsverksamhet',
      'Förbättringsförslag, utbildningsutvärdering och avvikelsehantering.',
      'Detta moment utgår från kapitel 6 och beskriver hur medarbetare deltar i förbättringsarbete, lämnar förslag och rapporterar avvikelser.',
      jsonb_build_array(jsonb_build_object('name', 'Förbättringsverksamhet', 'sourcePath', 'docs/onboarding/06-forbattringsarbete.md'))
    ),
    (
      'union-questions',
      6,
      'Fackliga frågor',
      'Facklig kontaktväg, avtal och information om fackets roll i verksamheten.',
      'Detta moment bygger på kapitel 7 och används för att visa vem som representerar facket eller vart den nyanställde ska hänvisas om lokalt avtal saknas.',
      jsonb_build_array(jsonb_build_object('name', 'Fackliga frågor', 'sourcePath', 'docs/onboarding/07-fackliga-fragor.md'))
    ),
    (
      'house-rules',
      7,
      'Ordnings- och skötselregler',
      'Källsortering, städning, ordning och praktiska regler i arbetsmiljön.',
      'Detta moment bygger på kapitel 8 och omfattar de vardagliga regler som skapar ordning, trivsel och tydlighet i produktion, kontor och gemensamma utrymmen.',
      jsonb_build_array(jsonb_build_object('name', 'Ordnings- och skötselregler', 'sourcePath', 'docs/onboarding/08-ordningsregler.md'))
    ),
    (
      'policies',
      8,
      'Policy',
      'Arbetsmiljöpolicy samt alkohol- och drogpolicy som gäller i företaget.',
      'Detta moment utgår från kapitel 9 och används för att göra företagets policys kända, förstådda och praktiskt förankrade hos den nyanställde.',
      jsonb_build_array(jsonb_build_object('name', 'Policy', 'sourcePath', 'docs/onboarding/09-policy.md'))
    ),
    (
      'receipts',
      9,
      'Kvittenser',
      'Nycklar, mobil, verktyg, arbetskläder och personlig skyddsutrustning.',
      'Detta moment bygger på kapitel 10 och samlar de kvittenser som behövs när företagets egendom lämnas ut till den nyanställde.',
      jsonb_build_array(jsonb_build_object('name', 'Kvittenser', 'sourcePath', 'docs/onboarding/10-kvittenser.md'))
    ),
    (
      'alarms',
      10,
      'Larm',
      'Öppning, stängning, inbrottslarm och rutiner vid falskt eller utlöst larm.',
      'Detta moment utgår från kapitel 11 och tydliggör hur lokaler larmas på och av, vad som gäller vid falsklarm och hur personalen ska agera om larmet går.',
      jsonb_build_array(jsonb_build_object('name', 'Larm', 'sourcePath', 'docs/onboarding/11-larm.md'))
    ),
    (
      'follow-up',
      11,
      'Bekräftelse och uppföljning',
      'Bekräftelse på genomförd introduktion samt stöd för uppföljningssamtal.',
      'Detta moment bygger på kapitel 12 och används för att bekräfta vilka områden som har gåtts igenom samt för att följa upp trivsel, arbetsmiljö och introduktionsupplevelse.',
      jsonb_build_array(jsonb_build_object('name', 'Bekräftelse och uppföljning', 'sourcePath', 'docs/onboarding/12-uppfoljning.md'))
    )
) as t(template_key, sort_order, title, description, info, documents);

update public.onboarding o
set completed_at = case
  when exists (
    select 1
    from public.checklist_items ci
    where ci.onboarding_id = o.id
      and ci.completed_at is null
  ) then null
  else coalesce(o.completed_at, now())
end
where o.id in (select onboarding_id from temp_outdated_onboardings);

drop table if exists temp_old_completion;
drop table if exists temp_outdated_onboardings;

commit;
