# Sistema de Controle de Empresas Terceirizadas

Aplicacao web online com configuracao Supabase oficial centralizada.

## Projeto Supabase oficial

A configuracao do Supabase fica somente em `supabase-config.js`. Nao use `.env`, variaveis Vite ou URLs duplicadas para este deploy estatico.

```js
window.SUPABASE_CONFIG = Object.freeze({
  projectRef: "aqubdvkxkmpuztqglkqi",
  url: "https://aqubdvkxkmpuztqglkqi.supabase.co",
  anonKey: "CHAVE_PUBLICA_OFICIAL",
  locked: true,
});
```

O `app.js` valida se a URL bate com `projectRef`. Se alguem trocar a URL para outro projeto, o login online e bloqueado e o console mostra o projeto carregado.

## Usuarios

O login usa Supabase Auth. Apos autenticar, o perfil e buscado no mesmo projeto Supabase em `public.usuarios`; se essa tabela nao estiver exposta no REST, o sistema usa `public.profiles` como compatibilidade.

Crie usuarios no Supabase Auth e mantenha o mesmo e-mail no cadastro de perfil.
