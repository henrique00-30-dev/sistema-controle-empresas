create table if not exists public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  perfil text not null check (
    perfil in (
      'administrador',
      'fiscal',
      'medicina',
      'ehs',
      'patrimonial',
      'fornecedor',
      'visitante'
    )
  ),
  empresa_id uuid null references public.companies(id) on delete set null,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists usuarios_perfil_idx on public.usuarios (perfil);
create index if not exists usuarios_empresa_id_idx on public.usuarios (empresa_id);
