# Sistema de Controle de Empresas Terceirizadas

Aplicacao web online com configuracao Supabase oficial centralizada.

## Projeto Supabase oficial

A configuracao do Supabase fica somente em `supabase-config.js`. Nao use `.env`, variaveis Vite ou URLs duplicadas para este deploy estatico.

Projeto fixado:

- `projectRef`: `gduogeegnhfimuhxfmfc`
- `url`: `https://gduogeegnhfimuhxfmfc.supabase.co`

O `app.js` valida se a URL bate com `projectRef`. Se alguem trocar a URL para outro projeto, o login online e bloqueado e o console mostra o projeto carregado.

## Usuarios

O login usa Supabase Auth. Apos autenticar, o perfil e buscado no mesmo projeto Supabase somente em `public.usuarios`.

Crie usuarios no Supabase Auth e mantenha o mesmo e-mail no cadastro de perfil.

## Base de fiscais

Execute `supabase-fiscais.sql` no SQL Editor do Supabase para criar a tabela `public.fiscais` e os vinculos opcionais com `public.companies`.

Para corrigir a base operacional completa do projeto oficial, execute `supabase-operational-tables.sql`. Ele cria/ajusta `public.companies`, `public.employees`, `public.documents`, `public.fiscais`, `public.empresa_fiscais`, `public.historico` e finaliza com `NOTIFY pgrst, 'reload schema';`.
