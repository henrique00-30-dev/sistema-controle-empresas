create extension if not exists "pgcrypto";

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cnpj text not null,
  fiscal text,
  responsible text,
  phone text,
  email text,
  start_date date,
  end_date date,
  status text not null default 'Ativa',
  contract_number text,
  risk text default 'Medio',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  email text unique,
  perfil text not null default 'visitante' check (perfil in ('administrador', 'fiscal', 'fornecedor', 'visitante')),
  active boolean not null default true,
  company_id uuid references public.companies(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  cpf text not null,
  job_role text not null,
  aso_validity date,
  training_validity date,
  document_status text not null default 'Pendente',
  address text,
  notes text,
  hiring_status text not null default 'Em analise',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete set null,
  type text not null,
  due_date date,
  status text not null default 'Pendente',
  notes text,
  file_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select perfil from public.profiles where id = auth.uid() and active = true
$$;

create or replace function public.current_profile_company()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select company_id from public.profiles where id = auth.uid() and active = true
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.current_profile_role() = 'administrador'
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email, perfil)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    'visitante'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

drop trigger if exists touch_companies_updated_at on public.companies;
create trigger touch_companies_updated_at before update on public.companies
for each row execute function public.touch_updated_at();

drop trigger if exists touch_profiles_updated_at on public.profiles;
create trigger touch_profiles_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();

drop trigger if exists touch_employees_updated_at on public.employees;
create trigger touch_employees_updated_at before update on public.employees
for each row execute function public.touch_updated_at();

drop trigger if exists touch_documents_updated_at on public.documents;
create trigger touch_documents_updated_at before update on public.documents
for each row execute function public.touch_updated_at();

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.employees enable row level security;
alter table public.documents enable row level security;

drop policy if exists "profiles_select_by_role" on public.profiles;
create policy "profiles_select_by_role" on public.profiles
for select using (
  public.is_admin()
  or id = auth.uid()
);

drop policy if exists "profiles_admin_write" on public.profiles;
create policy "profiles_admin_write" on public.profiles
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "companies_select_by_role" on public.companies;
create policy "companies_select_by_role" on public.companies
for select using (
  public.current_profile_role() in ('administrador', 'fiscal', 'visitante')
  or id = public.current_profile_company()
);

drop policy if exists "companies_admin_insert" on public.companies;
create policy "companies_admin_insert" on public.companies
for insert with check (public.is_admin());

drop policy if exists "companies_update_by_role" on public.companies;
create policy "companies_update_by_role" on public.companies
for update using (
  public.is_admin()
  or (public.current_profile_role() = 'fornecedor' and id = public.current_profile_company())
) with check (
  public.is_admin()
  or (public.current_profile_role() = 'fornecedor' and id = public.current_profile_company())
);

drop policy if exists "companies_admin_delete" on public.companies;
create policy "companies_admin_delete" on public.companies
for delete using (public.is_admin());

drop policy if exists "employees_select_by_role" on public.employees;
create policy "employees_select_by_role" on public.employees
for select using (
  public.current_profile_role() in ('administrador', 'fiscal', 'visitante')
  or company_id = public.current_profile_company()
);

drop policy if exists "employees_insert_by_role" on public.employees;
create policy "employees_insert_by_role" on public.employees
for insert with check (
  public.is_admin()
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
);

drop policy if exists "employees_update_by_role" on public.employees;
create policy "employees_update_by_role" on public.employees
for update using (
  public.is_admin()
  or public.current_profile_role() = 'fiscal'
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
) with check (
  public.is_admin()
  or public.current_profile_role() = 'fiscal'
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
);

drop policy if exists "employees_admin_delete" on public.employees;
create policy "employees_admin_delete" on public.employees
for delete using (public.is_admin());

drop policy if exists "documents_select_by_role" on public.documents;
create policy "documents_select_by_role" on public.documents
for select using (
  public.current_profile_role() in ('administrador', 'fiscal', 'visitante')
  or company_id = public.current_profile_company()
);

drop policy if exists "documents_insert_by_role" on public.documents;
create policy "documents_insert_by_role" on public.documents
for insert with check (
  public.is_admin()
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
);

drop policy if exists "documents_update_by_role" on public.documents;
create policy "documents_update_by_role" on public.documents
for update using (
  public.is_admin()
  or public.current_profile_role() = 'fiscal'
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
) with check (
  public.is_admin()
  or public.current_profile_role() = 'fiscal'
  or (public.current_profile_role() = 'fornecedor' and company_id = public.current_profile_company())
);

drop policy if exists "documents_admin_delete" on public.documents;
create policy "documents_admin_delete" on public.documents
for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "documents_storage_read" on storage.objects;
create policy "documents_storage_read" on storage.objects
for select using (
  bucket_id = 'documents'
  and public.current_profile_role() in ('administrador', 'fiscal', 'fornecedor', 'visitante')
);

drop policy if exists "documents_storage_write" on storage.objects;
create policy "documents_storage_write" on storage.objects
for insert with check (
  bucket_id = 'documents'
  and public.current_profile_role() in ('administrador', 'fornecedor')
);
