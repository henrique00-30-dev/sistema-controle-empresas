# Sistema de Controle de Empresas Terceirizadas

Aplicacao web preparada para funcionar localmente ou online com Supabase.

## Modo local

Abra `index.html` no navegador. Os dados ficam salvos no `localStorage`.

Acessos de demonstracao:

- `admin@sistema.com` / `admin123`
- `fiscal@sistema.com` / `fiscal123`
- `fornecedor@sistema.com` / `fornecedor123`
- `visitante@sistema.com` / `visitante123`

## Ativar Supabase

1. Crie um projeto no Supabase.
2. Execute o arquivo `supabase-schema.sql` no SQL Editor.
3. Crie usuarios no Supabase Auth.
4. Para cada usuario, cadastre/ajuste o perfil na tabela `profiles` com um dos perfis:
   - `administrador`
   - `fiscal`
   - `fornecedor`
   - `visitante`
5. Para fornecedores, preencha `company_id` no perfil.
6. Edite `supabase-config.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://SEU-PROJETO.supabase.co",
  anonKey: "SUA_ANON_KEY",
};
```

Quando essas chaves estiverem preenchidas, o sistema usa Supabase Auth, tabelas com RLS e armazenamento preparado no bucket `documents`.

## Tabela profiles

A tabela `profiles` fica vinculada ao `auth.users` pelo campo `id`.

Campos principais:

- `id`: mesmo ID do usuario em `auth.users`
- `nome`: nome exibido no sistema
- `email`: email de login
- `perfil`: `administrador`, `fiscal`, `fornecedor` ou `visitante`
- `company_id`: empresa vinculada ao fornecedor

Quando um usuario novo for criado no Supabase Auth, o SQL cria um perfil inicial como `visitante`. Depois o administrador pode alterar o perfil.
