begin;

alter table public.checklist_items
  add column if not exists comment text,
  add column if not exists detail_data jsonb not null default '{}'::jsonb;

update public.checklist_items
set detail_data = '{}'::jsonb
where detail_data is null;

commit;
