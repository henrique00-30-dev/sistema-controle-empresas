create table if not exists public.fiscais (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text null,
  matricula text null,
  telefone text null,
  setor text null,
  status text not null default 'sem_acesso' check (status in ('sem_acesso', 'com_acesso', 'inativo')),
  usuario_email text null,
  usuario_id uuid null references public.usuarios(id) on delete set null,
  data_fim timestamptz null,
  motivo_inativacao text null,
  substituto_id uuid null references public.fiscais(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.companies
  add column if not exists fiscal_id uuid null references public.fiscais(id) on delete set null,
  add column if not exists fiscais_adicionais uuid[] not null default '{}';

create index if not exists fiscais_status_idx on public.fiscais(status);
create index if not exists fiscais_email_idx on public.fiscais(lower(email));
create index if not exists companies_fiscal_id_idx on public.companies(fiscal_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_fiscais_updated_at on public.fiscais;
create trigger touch_fiscais_updated_at before update on public.fiscais
for each row execute function public.touch_updated_at();

alter table public.fiscais enable row level security;

drop policy if exists "fiscais_select_authenticated" on public.fiscais;
create policy "fiscais_select_authenticated" on public.fiscais
for select to authenticated
using (true);

drop policy if exists "fiscais_admin_write" on public.fiscais;
create policy "fiscais_admin_write" on public.fiscais
for all to authenticated
using (
  exists (
    select 1 from public.usuarios
    where usuarios.id = auth.uid()
      and usuarios.ativo = true
      and usuarios.perfil in ('administrador', 'super_admin')
  )
)
with check (
  exists (
    select 1 from public.usuarios
    where usuarios.id = auth.uid()
      and usuarios.ativo = true
      and usuarios.perfil in ('administrador', 'super_admin')
  )
);
