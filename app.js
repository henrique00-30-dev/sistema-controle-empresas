const STORAGE_KEY = "sctempresas.v1";
const ONLINE_STORAGE_NOTE =
  "Modo online preparado. Configure supabase-config.js para usar autenticacao, banco e armazenamento online.";

const PROFILE_LABELS = {
  admin: "Administrador",
  fiscal: "Fiscal",
  supplier: "Fornecedor",
  visitor: "Visitante",
};

const DB_PROFILE_TO_APP_ROLE = {
  administrador: "admin",
  fiscal: "fiscal",
  fornecedor: "supplier",
  visitante: "visitor",
  admin: "admin",
  supplier: "supplier",
  visitor: "visitor",
};

const APP_ROLE_TO_DB_PROFILE = {
  admin: "administrador",
  fiscal: "fiscal",
  supplier: "fornecedor",
  visitor: "visitante",
};

const ROLE_PERMISSIONS = {
  admin: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "thirdparty", "compliance", "approvals", "blocks", "reports", "integrations", "settings", "users"],
    create: ["company", "employee", "document", "user"],
    edit: ["company", "employee", "document", "user"],
    delete: ["company", "employee", "document", "user"],
    approveDocuments: true,
    updateHiringStatus: true,
    addObservations: true,
    reports: true,
  },
  fiscal: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "thirdparty", "compliance", "approvals", "blocks", "reports", "integrations", "settings"],
    create: [],
    edit: ["document", "employeeStatus"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: true,
    addObservations: true,
    reports: true,
  },
  supplier: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "thirdparty", "compliance", "blocks", "integrations", "settings"],
    create: ["employee", "document"],
    edit: ["companyOwn", "employeeOwn", "documentOwn"],
    delete: [],
    approveDocuments: false,
    updateHiringStatus: false,
    addObservations: true,
    reports: false,
  },
  visitor: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "thirdparty", "compliance", "blocks", "settings"],
    create: [],
    edit: [],
    delete: [],
    approveDocuments: false,
    updateHiringStatus: false,
    addObservations: false,
    reports: false,
  },
};

const defaultData = {
  session: null,
  users: [
    {
      id: crypto.randomUUID(),
      name: "Administrador",
      email: "admin@sistema.com",
      password: "admin123",
      role: "admin",
      active: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Fiscal de Fornecedor",
      email: "fiscal@sistema.com",
      password: "fiscal123",
      role: "fiscal",
      active: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Fornecedor Demo",
      email: "fornecedor@sistema.com",
      password: "fornecedor123",
      role: "supplier",
      active: true,
      companyId: null,
    },
    {
      id: crypto.randomUUID(),
      name: "Visitante",
      email: "visitante@sistema.com",
      password: "visitante123",
      role: "visitor",
      active: true,
    },
  ],
  companies: [
    {
      id: crypto.randomUUID(),
      name: "Alfa Manutencao Industrial",
      cnpj: "12.345.678/0001-90",
      contact: "Marina Lopes",
      fiscal: "Patricia Nunes",
      responsible: "Marina Lopes",
      email: "contratos@alfa.com",
      phone: "(11) 98888-1000",
      contract: "CT-2026-014",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      risk: "Medio",
      status: "Ativa",
    },
    {
      id: crypto.randomUUID(),
      name: "Beta Servicos Gerais",
      cnpj: "33.112.998/0001-55",
      contact: "Renato Alves",
      fiscal: "Eduardo Rocha",
      responsible: "Renato Alves",
      email: "rh@betaservicos.com",
      phone: "(31) 97777-2300",
      contract: "CT-2026-019",
      startDate: "2026-02-10",
      endDate: "2027-02-09",
      risk: "Baixo",
      status: "Ativa",
    },
  ],
  employees: [],
  documents: [],
};

const employeeSeed = [
  ["Carlos Mendes", "Alfa Manutencao Industrial", "Eletricista", "123.456.789-10", "Aprovado"],
  ["Joana Ribeiro", "Alfa Manutencao Industrial", "Tecnica de seguranca", "987.654.321-00", "Documentos pendente"],
  ["Paulo Martins", "Beta Servicos Gerais", "Auxiliar operacional", "456.789.123-33", "Aguardando exames"],
];

const documentTypes = [
  "Contrato social",
  "Certidao negativa",
  "ASO",
  "Ficha de EPI",
  "Treinamento NR-10",
  "Treinamento NR-35",
  "Comprovante de vinculo",
  "Seguro de vida",
];

const hiringStatuses = [
  "Em analise",
  "Documentos pendente",
  "Aguardando exames",
  "Em treinamento",
  "Aguardando aprovacao do fiscal",
  "Aprovado",
  "Bloqueado",
  "Inativo",
];

const documentStatuses = ["Regular", "Pendente", "A vencer", "Vencido", "Reprovado"];

const app = document.querySelector("#app") || document.querySelector("#root");
const supabaseConfig = window.SUPABASE_CONFIG || {};
const supabaseClient =
  supabaseConfig.url && supabaseConfig.anonKey && window.supabase
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;
let state = loadState();
let currentView = "dashboard";
let searchTerm = "";
let editingCompanyId = null;
let editingEmployeeId = null;
let employeeStatusFilter = "Todos";
let contractStatusFilter = "Todos";
let contractPage = 1;
let authMode = supabaseClient ? "supabase" : "local";
let isLoading = Boolean(supabaseClient);
let darkMode = localStorage.getItem("sctempresas.theme") !== "light";
let sidebarCollapsed = localStorage.getItem("sctempresas.sidebar") === "collapsed";

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return migrateState(JSON.parse(saved));

  const data = structuredClone(defaultData);
  data.employees = employeeSeed.map(([name, companyName, role, cpf, status]) => ({
    id: crypto.randomUUID(),
    name,
    companyId: data.companies.find((company) => company.name === companyName).id,
    role,
    cpf,
    admission: "2026-01-15",
    asoValidity: "2026-10-15",
    trainingValidity: "2026-09-20",
    docStatus: status === "Aprovado" ? "Regular" : "Pendente",
    address: "Rua Central, 100",
    status,
  }));
  data.documents = [
    makeDoc(data.companies[0].id, null, "Contrato social", "2026-12-31", "Aprovado"),
    makeDoc(data.companies[0].id, data.employees[0].id, "ASO", "2026-06-07", "Aprovado"),
    makeDoc(data.companies[0].id, data.employees[1].id, "Treinamento NR-10", "2026-05-18", "Aprovado"),
    makeDoc(data.companies[1].id, data.employees[2].id, "Ficha de EPI", "2026-07-04", "Pendente"),
  ];
  const supplier = data.users.find((user) => user.role === "supplier");
  if (supplier) supplier.companyId = data.companies[0].id;
  saveState(data);
  return data;
}

function migrateState(data) {
  data.users ||= [];
  data.companies ||= [];
  data.employees ||= [];
  data.documents ||= [];

  if (!data.users.some((user) => user.role === "supplier")) {
    data.users.push({
      id: crypto.randomUUID(),
      name: "Fornecedor Demo",
      email: "fornecedor@sistema.com",
      password: "fornecedor123",
      role: "supplier",
      active: true,
      companyId: data.companies[0]?.id || null,
    });
  }
  if (!data.users.some((user) => user.role === "visitor")) {
    data.users.push({
      id: crypto.randomUUID(),
      name: "Visitante",
      email: "visitante@sistema.com",
      password: "visitante123",
      role: "visitor",
      active: true,
    });
  }

  data.users = data.users.map((user) =>
    user.role === "supplier" && !user.companyId ? { ...user, companyId: data.companies[0]?.id || null } : user,
  );
  data.companies = data.companies.map((company) => ({
    ...company,
    fiscal: company.fiscal || "Nao informado",
    responsible: company.responsible || company.contact || "Nao informado",
    startDate: company.startDate || "",
    endDate: company.endDate || "",
    status: company.status || "Ativa",
  }));
  data.employees = data.employees.map((employee) => ({
    ...employee,
    role: employee.role || "",
    companyId: employee.companyId || data.companies[0]?.id || "",
    asoValidity: employee.asoValidity || employee.admission || "",
    trainingValidity: employee.trainingValidity || "",
    docStatus: employee.docStatus || "Pendente",
    address: employee.address || "",
    notes: employee.notes || "",
    status: employee.status || "Em analise",
  }));
  saveState(data);
  return data;
}

function makeDoc(companyId, employeeId, type, dueDate, status) {
  return {
    id: crypto.randomUUID(),
    companyId,
    employeeId,
    type,
    dueDate,
    status,
    notes: "",
  };
}

function saveState(nextState = state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function isOnlineMode() {
  return authMode === "supabase" && supabaseClient;
}

async function boot() {
  if (!supabaseClient) {
    render();
    return;
  }

  try {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    if (session?.user) {
      await hydrateSupabaseSession(session.user);
    }
  } catch (error) {
    console.warn("Falha ao iniciar Supabase:", error);
  } finally {
    isLoading = false;
    render();
  }
}

async function hydrateSupabaseSession(authUser) {
  const profile = await fetchProfile(authUser.id);
  state.session = profile.id;
  state.users = upsertById(state.users, profile);
  await loadRemoteData();
  saveState();
}

async function fetchProfile(userId) {
  const { data, error } = await supabaseClient.from("profiles").select("*").eq("id", userId).single();
  if (error) throw error;
  return mapProfileFromDb(data);
}

async function loadRemoteData() {
  const [companies, employees, documents, profiles] = await Promise.all([
    supabaseClient.from("companies").select("*").order("name"),
    supabaseClient.from("employees").select("*").order("name"),
    supabaseClient.from("documents").select("*").order("due_date"),
    can("users.view") ? supabaseClient.from("profiles").select("*").order("nome") : Promise.resolve({ data: state.users, error: null }),
  ]);

  for (const result of [companies, employees, documents, profiles]) {
    if (result.error) throw result.error;
  }

  state.companies = companies.data.map(mapCompanyFromDb);
  state.employees = employees.data.map(mapEmployeeFromDb);
  state.documents = documents.data.map(mapDocumentFromDb);
  state.users = profiles.data.map(mapProfileFromDb);
}

async function syncCollection(collection, item) {
  if (!isOnlineMode()) return;
  const table = {
    companies: "companies",
    employees: "employees",
    documents: "documents",
    users: "profiles",
  }[collection];
  const mapper = {
    companies: mapCompanyToDb,
    employees: mapEmployeeToDb,
    documents: mapDocumentToDb,
    users: mapProfileToDb,
  }[collection];
  const { error } = await supabaseClient.from(table).upsert(mapper(item));
  if (error) throw error;
}

async function deleteRemote(collection, id) {
  if (!isOnlineMode()) return;
  const table = {
    companies: "companies",
    employees: "employees",
    documents: "documents",
    users: "profiles",
  }[collection];
  const { error } = await supabaseClient.from(table).delete().eq("id", id);
  if (error) throw error;
}

function upsertById(items, item) {
  return items.some((current) => current.id === item.id)
    ? items.map((current) => (current.id === item.id ? { ...current, ...item } : current))
    : [...items, item];
}

function icon(name) {
  const icons = {
    dashboard: "M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Zm10 0h6v-5h-6v5Z",
    company: "M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 7h1m-1 4h1m-1 4h1m5-6h3a2 2 0 0 1 2 2v10m-4-6h1",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    docs: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5",
    contracts: "M9 12h6M9 16h6M8 3h8l2 2h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2l2-2Z",
    approve: "M9 12l2 2 4-5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    block: "M18.36 5.64 5.64 18.36M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    reports: "M3 3v18h18M8 17V9m5 8V5m5 12v-6",
    integrations: "M13 2 3 14h8l-2 8 10-12h-8l2-8Z",
    settings: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82V22a2 2 0 1 1-4 0v-.18A1.65 1.65 0 0 0 8.6 20a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33H2a2 2 0 1 1 0-4h.18A1.65 1.65 0 0 0 4 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.44 3.9l.06.06A1.65 1.65 0 0 0 8.6 4.6a1.65 1.65 0 0 0 1-.6A1.65 1.65 0 0 0 9.93 2.18V2a2 2 0 1 1 4 0v.18A1.65 1.65 0 0 0 15 4a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8.6a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 0 1.82.33H22a2 2 0 1 1 0 4h-.18A1.65 1.65 0 0 0 20 13.4a1.65 1.65 0 0 0-.6 1Z",
    workflow: "M4 7h5l2 3h9M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M8 14h8M8 17h5",
    factory: "M3 21V9l6 4V9l6 4V5h5v16H3Zm4-4h2m3 0h2m3 0h2",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-5",
    search: "M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
    sun: "M12 1v2m0 18v2m11-11h-2M3 12H1m18.36 6.36-1.41-1.41M6.05 6.05 4.64 4.64m14.72 0-1.41 1.41M6.05 17.95l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    plus: "M12 5v14M5 12h14",
    edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
    trash: "M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14",
    close: "M18 6 6 18M6 6l12 12",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9",
    save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM17 21v-8H7v8M7 3v5h8",
  };
  return `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name]}"/></svg>`;
}

function currentUser() {
  return state.users.find((user) => user.id === state.session);
}

function render() {
  if (isLoading) {
    app.innerHTML = `<div class="loading-screen"><strong>Carregando sistema...</strong><span>${ONLINE_STORAGE_NOTE}</span></div>`;
    return;
  }
  if (!currentUser()) {
    renderLogin();
    return;
  }
  renderApp();
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-shell">
      <div class="login-panel">
        <div class="login-brand">
          <div class="logo-mark">CI</div>
          <div>
            <span class="eyebrow">Portal Enterprise de Terceiros</span>
            <h1>Gestao Operacional de Terceiros</h1>
            <p>Plataforma corporativa para fornecedores, funcionarios, contratos, documentos e conformidade operacional.</p>
          </div>
        </div>
        <form class="login-form" id="loginForm">
          <label>E-mail
            <input name="email" type="email" autocomplete="username" value="admin@sistema.com" required />
          </label>
          <label>Senha
            <input name="password" type="password" autocomplete="current-password" value="admin123" required />
          </label>
          <button class="btn primary" type="submit">${icon("logout")} Entrar</button>
        </form>
        <div class="login-note">
          ${isOnlineMode() ? "Use um usuario criado no ambiente online." : "Modo demonstracao local"}<br />
          Admin: admin@sistema.com / admin123<br />
          Fiscal: fiscal@sistema.com / fiscal123<br />
          Fornecedor: fornecedor@sistema.com / fornecedor123<br />
          Visitante: visitante@sistema.com / visitante123
        </div>
      </div>
      <div class="login-intel">
        <div class="intel-topline">
          <span>OPERATIONAL CONTROL ROOM</span>
          <strong>LIVE</strong>
        </div>
        <div class="intel-orbit">
          <div class="orbit-core">
            <strong>360</strong>
            <span>Compliance</span>
          </div>
        </div>
        <div class="intel-grid">
          <div><strong>24/7</strong><span>Monitoramento</span></div>
          <div><strong>ACL</strong><span>Perfis</span></div>
          <div><strong>EHS</strong><span>Seguranca</span></div>
          <div><strong>BI</strong><span>Indicadores</span></div>
        </div>
      </div>
    </section>
  `;

  document.querySelector("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;

    if (isOnlineMode()) {
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: String(form.get("email")),
          password: String(form.get("password")),
        });
        if (error) throw error;
        await hydrateSupabaseSession(data.user);
        currentView = "dashboard";
        render();
      } catch (error) {
        alert(`Nao foi possivel entrar: ${error.message}`);
      } finally {
        submit.disabled = false;
      }
      return;
    }

    const user = state.users.find(
      (item) =>
        item.email.toLowerCase() === String(form.get("email")).toLowerCase() &&
        item.password === form.get("password") &&
        item.active,
    );
    if (!user) {
      alert("E-mail ou senha invalidos.");
      submit.disabled = false;
      return;
    }
    state.session = user.id;
    saveState();
    currentView = "dashboard";
    render();
    submit.disabled = false;
  });
}

function renderApp() {
  const user = currentUser();
  document.body.classList.toggle("dark", darkMode);
  const groups = [
    {
      title: "Operacao",
      items: [
        ["dashboard", "Dashboard", "dashboard"],
        ["companies", "Empresas", "company"],
        ["contracts", "Contratos", "contracts"],
        ["employees", "Funcionarios", "users"],
        ["documents", "Documentos", "docs"],
        ["workflow", "Workflow Docs", "workflow"],
        ["thirdparty", "Gestao de Terceiros", "factory"],
        ["compliance", "Conformidade", "shield"],
      ],
    },
    {
      title: "Controle",
      items: [
        ["approvals", "Aprovacoes", "approve"],
        ["blocks", "Bloqueios", "block"],
        ["reports", "Relatorios", "reports"],
      ],
    },
    {
      title: "Sistema",
      items: [
        ["integrations", "Integracoes", "integrations"],
        ["settings", "Configuracoes", "settings"],
      ],
    },
  ];
  if (canView("users")) groups[2].items.unshift(["users", "Usuarios", "users"]);
  const views = groups.flatMap((group) => group.items).filter(([id]) => canView(id));
  if (!canView(currentView)) currentView = views[0]?.[0] || "dashboard";

  app.innerHTML = `
    <section class="app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}">
      <aside class="sidebar">
        <div class="side-head">
          <div class="logo-mark">CI</div>
          <div>
            <strong>Gestao 360</strong>
            <span>Portal de Terceiros</span>
          </div>
        </div>
        <nav class="nav">
          ${groups
            .map((group) => {
              const items = group.items.filter(([id]) => canView(id));
              if (!items.length) return "";
              return `
                <div class="nav-group">
                  <span class="nav-label">${group.title}</span>
                  ${items
                    .map(
                      ([id, label, iconName]) =>
                        `<button class="${currentView === id ? "active" : ""}" data-view="${id}" title="${label}">${icon(iconName)} <span>${label}</span></button>`,
                    )
                    .join("")}
                </div>
              `;
            })
            .join("")}
        </nav>
        <div class="side-user">
          <button class="btn ghost sidebar-toggle" id="sidebarToggle" type="button">${icon("menu")} <span>Recolher menu</span></button>
          <div class="user-mini">
            <div class="avatar">${user.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <strong>${user.name}</strong>
              <span>${roleName(user.role)}</span>
            </div>
          </div>
        </div>
      </aside>
      <div class="main">
        <header class="topbar">
          <div>
            <span class="breadcrumb">Gestao Operacional / ${viewTitle()}</span>
            <h1>${viewTitle()}</h1>
            <span class="muted">${isOnlineMode() ? "Armazenamento online ativo" : "Modo local com armazenamento preparado"}</span>
          </div>
          <div class="top-actions">
            <div class="global-search">
              ${icon("search")}
              <input class="search-control" placeholder="Pesquisa" value="${escapeAttr(searchTerm)}" />
            </div>
            <button class="btn icon" id="themeToggle" type="button" title="Alternar tema">${darkMode ? icon("sun") : icon("moon")}</button>
            <span class="role-pill">${roleName(user.role)}</span>
            <button class="btn secondary" id="logoutBtn">${icon("logout")} Sair</button>
          </div>
        </header>
        <div class="content">${renderView()}</div>
      </div>
    </section>
  `;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      searchTerm = "";
      render();
    });
  });

  document.querySelector("#logoutBtn").addEventListener("click", async () => {
    if (isOnlineMode()) await supabaseClient.auth.signOut();
    state.session = null;
    saveState();
    render();
  });

  document.querySelector("#themeToggle")?.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("sctempresas.theme", darkMode ? "dark" : "light");
    renderApp();
  });

  document.querySelector("#sidebarToggle")?.addEventListener("click", () => {
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem("sctempresas.sidebar", sidebarCollapsed ? "collapsed" : "expanded");
    renderApp();
  });

  bindViewEvents();
}

function roleName(role) {
  return PROFILE_LABELS[role] || "Visitante";
}

function viewTitle() {
  return {
    dashboard: "Painel de conformidade",
    companies: "Empresas terceirizadas",
    contracts: "Contratos",
    employees: "Funcionarios",
    documents: "Documentos",
    workflow: "Workflow de documentos",
    thirdparty: "Gestao de terceiros",
    compliance: "Conformidade",
    approvals: "Aprovacoes",
    blocks: "Bloqueios",
    users: "Usuarios administrativos",
    reports: "Relatorios",
    integrations: "Integracoes",
    settings: "Configuracoes",
  }[currentView];
}

function renderView() {
  return {
    dashboard: renderDashboard,
    companies: renderCompanies,
    contracts: renderContracts,
    employees: renderEmployees,
    documents: renderDocuments,
    workflow: renderDocumentWorkflow,
    thirdparty: renderThirdPartyManagement,
    compliance: renderCompliance,
    approvals: renderApprovals,
    blocks: renderBlocks,
    users: renderUsers,
    reports: renderReports,
    integrations: renderIntegrations,
    settings: renderSettings,
  }[currentView]();
}

function filtered(items, fields) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return items;
  return items.filter((item) => fields.some((field) => String(field(item) || "").toLowerCase().includes(term)));
}

function canView(view) {
  return ROLE_PERMISSIONS[currentUser()?.role || "visitor"].view.includes(view);
}

function can(permission, item = null) {
  const user = currentUser();
  const role = user?.role || "visitor";
  const permissions = ROLE_PERMISSIONS[role];
  const [action, subject] = permission.split(".");

  if (action === "users" && subject === "view") return canView("users");
  if (action === "reports") return permissions.reports;
  if (action === "approveDocuments") return permissions.approveDocuments;
  if (action === "updateHiringStatus") return permissions.updateHiringStatus;
  if (action === "addObservations") return permissions.addObservations;

  if (["create", "edit", "delete"].includes(action)) {
    if (permissions[action].includes(subject)) return true;
    if (subject === "employee" && action === "edit" && permissions.updateHiringStatus) return true;
    if (subject === "company" && permissions[action].includes("companyOwn")) return item?.id === user?.companyId;
    if (subject === "employee" && permissions[action].includes("employeeOwn")) return item?.companyId === user?.companyId;
    if (subject === "document" && permissions[action].includes("documentOwn")) return item?.companyId === user?.companyId;
  }

  return false;
}

function visibleCompanies() {
  const user = currentUser();
  if (user?.role === "supplier") return state.companies.filter((company) => company.id === user.companyId);
  return state.companies;
}

function visibleEmployees() {
  const allowedCompanies = new Set(visibleCompanies().map((company) => company.id));
  return state.employees.filter((employee) => allowedCompanies.has(employee.companyId));
}

function visibleDocuments() {
  const allowedCompanies = new Set(visibleCompanies().map((company) => company.id));
  return state.documents.filter((doc) => allowedCompanies.has(doc.companyId));
}

function operationalMetrics(companies = visibleCompanies(), employees = visibleEmployees(), documents = visibleDocuments()) {
  const normalizedCompanies = companies.map((company) => ({ ...normalizeCompany(company), raw: company }));
  const normalizedEmployees = employees.map((employee) => ({ ...normalizeEmployee(employee), raw: employee }));
  return {
    activeContracts: normalizedCompanies.filter((company) => company.status === "Ativa").map((company) => company.raw),
    expiringContracts: normalizedCompanies.filter((company) => contractDays(company.raw) >= 0 && contractDays(company.raw) <= 60).map((company) => company.raw),
    blockedContracts: normalizedCompanies.filter((company) => ["Bloqueada", "Bloqueado", "Inativa", "Desmobilizada"].includes(company.status)).map((company) => company.raw),
    activeEmployees: normalizedEmployees.filter((employee) => ["Aprovado", "Ativo"].includes(employee.status)).map((employee) => employee.raw),
    blockedEmployees: normalizedEmployees.filter((employee) => ["Bloqueado"].includes(employee.status)).map((employee) => employee.raw),
    inactiveEmployees: normalizedEmployees.filter((employee) => ["Inativo", "Desmobilizado", "Desmobilizada"].includes(employee.status)).map((employee) => employee.raw),
    medicinePendencies: normalizedEmployees
      .filter((employee) => employee.status === "Aguardando exames" || ["Vencido", "A vencer"].includes(employee.docStatus) || employeeMedicineStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    ehsPendencies: normalizedEmployees
      .filter((employee) => ["Em treinamento", "Documentos pendente"].includes(employee.status) || employeeEhsStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    patrimonialPendencies: normalizedEmployees.filter((employee) => employee.status === "Aguardando aprovacao do fiscal" || employeePatrimonialStatus(employee.raw) === "Pendente").map((employee) => employee.raw),
    expiredDocs: documents.filter((doc) => docStatus(doc) === "Vencido"),
    expiringDocs: documents.filter((doc) => docStatus(doc) === "A vencer"),
  };
}

function renderDashboard() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const documents = visibleDocuments();
  const metrics = operationalMetrics(companies, employees, documents);
  const criticalDocs = visibleDocuments().filter((doc) => ["Vencido", "A vencer", "Pendente"].includes(docStatus(doc))).slice(0, 6);
  const dashboardCards = [
    ["Contratos ativos", metrics.activeContracts.length, "Contratos em operacao", "contracts", "success", "contracts", "", "Ativa"],
    ["Contratos vencendo", metrics.expiringContracts.length, "Proximos 60 dias", "contracts", "warning", "contracts", "", "Todos"],
    ["Funcionarios ativos", metrics.activeEmployees.length, "Liberados para atividade", "users", "success", "employees", "Aprovado", "Todos"],
    ["Funcionarios bloqueados", metrics.blockedEmployees.length, "Restricao operacional", "block", "danger", "employees", "Bloqueado", "Bloqueado"],
    ["Pendencias Medicina", metrics.medicinePendencies.length, "ASO, exames e vencimentos", "shield", "warning", "employees", "Aguardando exames", "Todos"],
    ["Pendencias EHS", metrics.ehsPendencies.length, "Treinamentos e seguranca", "factory", "info", "employees", "Em treinamento", "Todos"],
    ["Pendencias Patrimonial", metrics.patrimonialPendencies.length, "Liberacao final", "approve", "special", "employees", "Aguardando aprovacao do fiscal", "Todos"],
    ["Documentos vencidos", metrics.expiredDocs.length, "Itens fora da validade", "docs", "danger", "documents", "Vencido", "Todos"],
  ];
  const operationalRows = employees.slice(0, 6).map((employee) => {
    const item = normalizeEmployee(employee);
    return `
      <tr>
        <td><strong>${item.name}</strong><span>${item.role}</span></td>
        <td>${companyName(item.companyId)}</td>
        <td>${statusBadge(item.docStatus)}</td>
        <td>${statusBadge(item.status)}</td>
      </tr>
    `;
  }).join("");

  return `
    <section class="hero-panel dashboard-hero">
      <div>
        <span class="eyebrow">Gestao operacional de terceiros</span>
        <h2>Painel executivo de contratos, documentos e conformidade</h2>
        <p>Visao enterprise moderna com indicadores operacionais, riscos documentais e acompanhamento de fornecedores.</p>
        <div class="hero-command-row">
          <span>Armazenamento ${isOnlineMode() ? "online" : "local"}</span>
          <span>${companies.length} fornecedores</span>
          <span>${documents.length} documentos rastreados</span>
        </div>
      </div>
      <div class="hero-status">
        <span>Perfil ativo</span>
        <strong>${roleName(currentUser().role)}</strong>
        <i>Vercel Static Ready</i>
      </div>
    </section>
    <section class="enterprise-strip">
      <div><span>Planta</span><strong>Operacao segura</strong></div>
      <div><span>Auditoria</span><strong>Rastreavel</strong></div>
      <div><span>Contratos</span><strong>Monitorados</strong></div>
      <div><span>Documentos</span><strong>Workflow ativo</strong></div>
    </section>
    <div class="kpi-grid">
      ${dashboardCards.map(([label, value, helper, iconName, tone, view, query, filter]) => `
        <article class="kpi-card clickable-kpi ${tone}" role="button" tabindex="0" data-dashboard-card data-target-view="${view}" data-target-search="${escapeAttr(query)}" data-target-filter="${escapeAttr(filter)}" title="Abrir ${label}">
          <div class="kpi-icon">${icon(iconName)}</div>
          <div>
            <span>${label}</span>
            <strong>${value}</strong>
            <small>${helper}</small>
          </div>
        </article>
      `).join("")}
    </div>
    <div class="dashboard-grid">
      <section class="bi-card wide">
        <div class="bi-head">
          <div><span class="eyebrow">Power panel</span><h2>Distribuicao por contratacao</h2></div>
          <span class="mini-pill">${employees.length} registros</span>
        </div>
        <div class="bi-chart">
          ${hiringStatuses
            .map((status) => {
              const count = employees.filter((employee) => normalizeEmployee(employee).status === status).length;
              if (!count) return "";
              const width = Math.max(8, (count / Math.max(1, employees.length)) * 100);
              return `<div class="power-row"><div><strong>${status}</strong><span>${count}</span></div><i style="--bar:${width}%"></i></div>`;
            })
            .join("") || `<div class="empty">Sem funcionarios cadastrados.</div>`}
        </div>
      </section>
      <section class="bi-card">
        <div class="bi-head"><div><span class="eyebrow">Contratos</span><h2>Vencimentos proximos</h2></div><span class="mini-pill">${metrics.expiringContracts.length}</span></div>
        <div class="item-list dense-list">
          ${metrics.expiringContracts.slice(0, 5).map((company) => `<div class="item-card"><div class="item-row"><strong>${company.contract || company.name}</strong>${statusBadge(normalizeCompany(company).status)}</div><span class="muted">${company.name} - fim em ${formatDate(normalizeCompany(company).endDate)}</span></div>`).join("") || `<div class="empty">Nenhum contrato vencendo nos proximos 60 dias.</div>`}
        </div>
      </section>
      <section class="bi-card gauge-card">
        <div class="bi-head"><div><span class="eyebrow">Compliance</span><h2>Score documental</h2></div></div>
        <div class="gauge" style="--score:${Math.round((documents.filter((doc) => docStatus(doc) === "Aprovado").length / Math.max(1, documents.length)) * 100)}">
          <strong>${Math.round((documents.filter((doc) => docStatus(doc) === "Aprovado").length / Math.max(1, documents.length)) * 100)}%</strong>
          <span>aprovado</span>
        </div>
      </section>
      <section class="bi-card">
        <div class="bi-head"><div><span class="eyebrow">Radar</span><h2>Alertas documentais</h2></div><span class="mini-pill">${criticalDocs.length}</span></div>
        <div class="item-list dense-list">${criticalDocs.length ? criticalDocs.map(renderDocCard).join("") : `<div class="empty">Nenhum alerta documental agora.</div>`}</div>
      </section>
      <section class="bi-card wide">
        <div class="bi-head"><div><span class="eyebrow">Mesa operacional</span><h2>Funcionarios em monitoramento</h2></div></div>
        <div class="ops-table">
          <table>
            <thead><tr><th>Funcionario</th><th>Empresa</th><th>Documental</th><th>Contratacao</th></tr></thead>
            <tbody>${operationalRows || emptyRow(4)}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderRiskLine(risk) {
  const count = visibleCompanies().filter((company) => company.risk === risk).length;
  return `
    <div class="item-card">
      <div class="item-row">
        <strong>Risco ${risk}</strong>
        <span class="mini-pill">${count} empresa(s)</span>
      </div>
    </div>
  `;
}

function renderDocCard(doc) {
  const company = companyName(doc.companyId);
  const employee = doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa";
  return `
    <div class="item-card">
      <div class="item-row">
        <strong>${doc.type}</strong>
        ${statusBadge(docStatus(doc))}
      </div>
      <span class="muted">${company} - ${employee}</span>
      <span class="muted">Vencimento: ${formatDate(doc.dueDate)}</span>
    </div>
  `;
}

function renderCompanies() {
  const items = filtered(visibleCompanies(), [
    (item) => item.name,
    (item) => item.cnpj,
    (item) => item.fiscal,
    (item) => item.responsible || item.contact,
    (item) => item.contract,
  ]);
  const editingCompany = editingCompanyId
    ? state.companies.find((company) => company.id === editingCompanyId)
    : currentUser()?.role === "supplier"
      ? visibleCompanies()[0]
      : null;
  return `
    ${sectionHead("Empresas terceirizadas", "Cadastre fornecedores e acompanhe contrato, responsaveis e situacao.", "Nova empresa", "company")}
    ${renderCompanyEditor(editingCompany)}
    ${toolbar("Buscar por empresa, CNPJ, fiscal, responsavel ou contrato")}
    <section class="panel table-wrap">
      <table>
        <thead><tr><th>Empresa</th><th>CNPJ</th><th>Fiscal</th><th>Responsavel</th><th>Contrato</th><th>Periodo</th><th>Status</th><th>Acoes</th></tr></thead>
        <tbody>
          ${items.length ? items.map(renderCompanyRow).join("") : emptyRow(8)}
        </tbody>
      </table>
    </section>
  `;
}

function renderCompanyEditor(company = null) {
  if (!can("create.company") && !can("edit.company", company)) {
    return "";
  }
  const item = normalizeCompany(company || {});
  return `
    <section class="panel company-editor">
      <div class="editor-head">
        <div>
          <h2>${company ? "Editar cadastro da empresa" : "Cadastro de empresa"}</h2>
          <span class="muted">${company ? "Atualize os dados contratuais e salve as alteracoes." : "Preencha os dados para registrar uma empresa terceirizada."}</span>
        </div>
        ${company ? `<button class="btn secondary" type="button" data-new-company>${icon("plus")} Novo cadastro</button>` : ""}
      </div>
      <form id="companyEditorForm" class="form-grid company-form">
        <input type="hidden" name="id" value="${escapeAttr(company?.id || "")}" />
        ${inputField("name", "Nome da empresa", item.name, "required")}
        ${inputField("cnpj", "CNPJ", item.cnpj, "required")}
        ${inputField("fiscal", "Fiscal do contrato", item.fiscal, "required")}
        ${inputField("responsible", "Responsavel", item.responsible, "required")}
        ${inputField("phone", "Telefone", item.phone, "required")}
        ${inputField("email", "E-mail", item.email, "type='email' required")}
        ${inputField("startDate", "Data de inicio do contrato", item.startDate, "type='date' required")}
        ${inputField("endDate", "Data de fim do contrato", item.endDate, "type='date' required")}
        ${selectField("status", "Status da empresa", item.status || "Ativa", ["Ativa", "Pendente", "Inativa", "Desmobilizada"].map(option))}
        ${inputField("contract", "Numero do contrato", item.contract)}
        <div class="form-actions wide">
          <button class="btn primary" type="submit">${icon("save")} Salvar</button>
          ${company ? `<button class="btn warning" type="button" data-demobilize="company" data-id="${company.id}">Desmobilizar contrato</button>` : ""}
        </div>
      </form>
    </section>
  `;
}

function renderCompanyRow(company) {
  const item = normalizeCompany(company);
  return `
    <tr>
      <td><strong>${item.name}</strong><br><span class="muted">${item.email}</span></td>
      <td>${item.cnpj}</td>
      <td>${item.fiscal}</td>
      <td>${item.responsible}<br><span class="muted">${item.phone}</span></td>
      <td>${item.contract || "Nao informado"}</td>
      <td>${formatDate(item.startDate)}<br><span class="muted">ate ${formatDate(item.endDate)}</span></td>
      <td>${statusBadge(item.status)}</td>
      <td>${companyRowActions(company.id)}</td>
    </tr>
  `;
}

function companyRowActions(id) {
  const company = state.companies.find((item) => item.id === id);
  return `
    <div class="actions wrap">
      ${can("edit.company", company) ? `<button class="btn secondary compact" type="button" data-edit="company" data-id="${id}">${icon("edit")} Editar</button>` : ""}
      ${can("edit.company", company) ? `<button class="btn warning compact" type="button" data-demobilize="company" data-id="${id}">Desmobilizar</button>` : ""}
      ${can("delete.company", company) ? `<button class="btn danger compact" type="button" data-delete="company" data-id="${id}">${icon("trash")} Excluir</button>` : ""}
      ${!can("edit.company", company) && !can("delete.company", company) ? `<span class="mini-pill">Somente leitura</span>` : ""}
    </div>
  `;
}

function renderEmployees() {
  const editingEmployee = editingEmployeeId ? state.employees.find((employee) => employee.id === editingEmployeeId) : null;
  const filteredByText = filtered(visibleEmployees(), [
    (item) => item.name,
    (item) => item.cpf,
    (item) => item.role,
    (item) => companyName(item.companyId),
    (item) => normalizeEmployee(item).docStatus,
    (item) => normalizeEmployee(item).status,
  ]);
  const items =
    employeeStatusFilter === "Todos"
      ? filteredByText
      : filteredByText.filter((employee) => normalizeEmployee(employee).status === employeeStatusFilter);
  return `
    ${sectionHead("Funcionarios terceirizados", "Controle integracao, documentos, exames, treinamento e aprovacao fiscal.", "Novo funcionario", "employee")}
    ${renderEmployeeEditor(editingEmployee)}
    ${toolbar("Buscar por funcionario, CPF, funcao, empresa ou status")}
    ${renderEmployeeStatusFilters()}
    <section class="panel table-wrap">
      <table>
        <thead><tr><th>Funcionario</th><th>CPF</th><th>Funcao</th><th>Empresa vinculada</th><th>Validades</th><th>Status documental</th><th>Contratacao</th><th>Acoes</th></tr></thead>
        <tbody>
          ${items.length ? items.map(renderEmployeeRow).join("") : emptyRow(8)}
        </tbody>
      </table>
    </section>
  `;
}

function renderEmployeeEditor(employee = null) {
  if (!can("create.employee") && !can("edit.employee", employee)) return "";
  const item = normalizeEmployee(employee || {});
  const companyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  if (!companyOptions.length) {
    return `
      <section class="panel company-editor">
        <div class="empty">Cadastre uma empresa antes de vincular funcionarios.</div>
      </section>
    `;
  }
  return `
    <section class="panel company-editor">
      <div class="editor-head">
        <div>
          <h2>${employee ? "Editar cadastro do funcionario" : "Cadastro de funcionario"}</h2>
          <span class="muted">Todo funcionario permanece vinculado a uma empresa cadastrada.</span>
        </div>
        ${employee ? `<button class="btn secondary" type="button" data-new-employee>${icon("plus")} Novo cadastro</button>` : ""}
      </div>
      <form id="employeeEditorForm" class="form-grid employee-form">
        <input type="hidden" name="id" value="${escapeAttr(employee?.id || "")}" />
        ${inputField("name", "Nome", item.name, "required")}
        ${inputField("cpf", "CPF", item.cpf, "required")}
        ${inputField("role", "Funcao", item.role, "required")}
        ${selectField("companyId", "Empresa vinculada", item.companyId || state.companies[0]?.id, companyOptions)}
        ${inputField("asoValidity", "Validade de ASO", item.asoValidity, "type='date' required")}
        ${inputField("trainingValidity", "Validade de treinamento", item.trainingValidity, "type='date' required")}
        ${selectField("docStatus", "Status documental", item.docStatus || "Pendente", documentStatuses.map(option))}
        ${selectField("status", "Status de contratacao", item.status || "Em analise", hiringStatuses.map(option))}
        ${textAreaField("address", "Endereco", item.address)}
        ${textAreaField("notes", "Observacoes", item.notes)}
        <div class="form-actions wide">
          <button class="btn primary" type="submit">${icon("save")} Salvar</button>
        </div>
      </form>
    </section>
  `;
}

function renderEmployeeStatusFilters() {
  return `
    <div class="status-filter" aria-label="Filtros de funcionarios por status">
      ${["Todos", ...hiringStatuses]
        .map(
          (status) =>
            `<button class="${employeeStatusFilter === status ? "active" : ""}" type="button" data-employee-status="${status}">${status}</button>`,
        )
        .join("")}
    </div>
  `;
}

function renderEmployeeRow(employee) {
  const item = normalizeEmployee(employee);
  return `
    <tr>
      <td><strong>${item.name}</strong><br><span class="muted">${item.address || "Endereco nao informado"}</span></td>
      <td>${item.cpf}</td>
      <td>${item.role}</td>
      <td>${companyName(item.companyId)}</td>
      <td>ASO: ${formatDate(item.asoValidity)}<br><span class="muted">Treinamento: ${formatDate(item.trainingValidity)}</span></td>
      <td>${statusBadge(item.docStatus)}</td>
      <td>${statusBadge(item.status)}${item.notes ? `<br><span class="muted">${item.notes}</span>` : ""}</td>
      <td>
        <div class="actions wrap">
          <button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Ficha</button>
          ${rowActions("employee", employee.id)}
        </div>
      </td>
    </tr>
  `;
}

function openEmployeeRecord(id) {
  const employee = visibleEmployees().find((item) => item.id === id) || state.employees.find((item) => item.id === id);
  if (!employee) return;
  const item = normalizeEmployee(employee);
  const company = state.companies.find((entry) => entry.id === item.companyId);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop employee-record-backdrop";
  modal.innerHTML = `
    <section class="modal employee-record-modal">
      <div class="employee-record-header">
        <div class="employee-avatar">${employeeInitials(item.name)}</div>
        <div class="employee-record-title">
          <span class="eyebrow">Ficha Funcionarios/FIT</span>
          <h2>${item.name}</h2>
          <div class="employee-record-meta">
            <span>CPF ${item.cpf || "Nao informado"}</span>
            <span>Matricula ${employeeRegistration(item)}</span>
            <span>${company?.name || "Empresa nao informada"}</span>
          </div>
        </div>
        <div class="employee-record-status">
          ${statusBadge(item.status)}
          ${statusBadge(employeeActiveState(item))}
        </div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="employee-workflow">
        ${renderEmployeeWorkflow(item)}
      </div>
      <div class="contract-tabs employee-tabs" role="tablist">
        ${[
          ["personal", "Dados Pessoais"],
          ["docs", "Documentos Pessoais"],
          ["medicine", "Medicina Ocupacional"],
          ["ehs", "Seguranca do Trabalho/EHS"],
          ["patrimonial", "Seguranca Patrimonial"],
          ["integration", "Integracao"],
          ["history", "Historico"],
          ["demobilization", "Desmobilizacao"],
        ]
          .map(([tab, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-employee-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body employee-tab-content">${renderEmployeeRecordTab(item, "personal")}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  modal.querySelectorAll("[data-employee-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.querySelectorAll("[data-employee-tab]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      modal.querySelector(".employee-tab-content").innerHTML = renderEmployeeRecordTab(item, button.dataset.employeeTab);
    });
  });
}

function renderEmployeeRecordTab(employee, tab) {
  const company = state.companies.find((item) => item.id === employee.companyId);
  const companyDocs = state.documents.filter((doc) => doc.companyId === employee.companyId && !doc.employeeId);
  const employeeDocs = state.documents.filter((doc) => doc.employeeId === employee.id);
  const allDocs = [...employeeDocs, ...companyDocs];
  if (tab === "personal") {
    return `
      <div class="detail-grid">
        ${detailCard("Nome", employee.name)}
        ${detailCard("CPF", employee.cpf || "Nao informado")}
        ${detailCard("Matricula", employeeRegistration(employee))}
        ${detailCard("Empresa", company?.name || "Nao informado")}
        ${detailCard("Contrato vinculado", company?.contract || "Nao informado")}
        ${detailCard("Centro de custo", employeeCostCenter(employee, company))}
        ${detailCard("Funcao", employee.role || "Nao informado")}
        ${detailCard("Status", statusBadge(employee.status))}
        ${detailCard("Data de admissao", formatDate(employee.admission || employee.startDate))}
        ${detailCard("Situacao", statusBadge(employeeActiveState(employee)))}
        ${detailCard("Endereco", employee.address || "Nao informado")}
        ${detailCard("Observacoes", employee.notes || "Sem observacoes")}
      </div>
    `;
  }
  if (tab === "docs") return renderEmployeeDocsTable(employeeDocs, "Documentos pessoais do funcionario");
  if (tab === "medicine") {
    const medicineDocs = employeeDocs.filter((doc) => /aso|exame|medic/i.test(doc.type));
    return `
      <div class="detail-grid">
        ${detailCard("Validade ASO", formatDate(employee.asoValidity))}
        ${detailCard("Status documental", statusBadge(employee.docStatus))}
        ${detailCard("Status medicina", statusBadge(employeeMedicineStatus(employee, medicineDocs)))}
      </div>
      ${renderEmployeeDocsTable(medicineDocs, "Documentos de medicina ocupacional")}
    `;
  }
  if (tab === "ehs") {
    const ehsDocs = employeeDocs.filter((doc) => /nr-|treinamento|epi|segur/i.test(doc.type));
    return `
      <div class="detail-grid">
        ${detailCard("Validade treinamento", formatDate(employee.trainingValidity))}
        ${detailCard("Status EHS", statusBadge(employeeEhsStatus(employee, ehsDocs)))}
        ${detailCard("Funcao analisada", employee.role || "Nao informado")}
      </div>
      ${renderEmployeeDocsTable(ehsDocs, "Treinamentos e seguranca do trabalho")}
    `;
  }
  if (tab === "patrimonial") {
    return `
      <div class="detail-grid">
        ${detailCard("Liberacao patrimonial", statusBadge(employeePatrimonialStatus(employee)))}
        ${detailCard("Empresa", company?.name || "Nao informado")}
        ${detailCard("Contrato", company?.contract || "Nao informado")}
      </div>
      <div class="item-card"><strong>Controle patrimonial</strong><span class="muted">Acesso final condicionado a documentacao, medicina, EHS e aprovacao fiscal.</span></div>
    `;
  }
  if (tab === "integration") {
    return `
      <div class="employee-workflow large">${renderEmployeeWorkflow(employee)}</div>
      <div class="item-card"><strong>Integracao</strong><span class="muted">Fluxo de integracao do trabalhador/FIT com etapas de fiscal, documentos, medicina, EHS e liberacao final.</span></div>
    `;
  }
  if (tab === "history") {
    return `
      <div class="history-list">
        <div class="item-card"><strong>Cadastro do trabalhador/FIT</strong><span class="muted">${formatDate(employee.admission || employee.startDate)} - ${employee.name}</span></div>
        <div class="item-card"><strong>Empresa vinculada</strong><span class="muted">${company?.name || "Nao informado"}</span></div>
        <div class="item-card"><strong>Documentos associados</strong><span class="muted">${allDocs.length} documento(s) monitorados.</span></div>
        <div class="item-card"><strong>Status atual</strong><span class="muted">${employee.status}</span></div>
      </div>
    `;
  }
  return `
    <div class="detail-grid">
      ${detailCard("Situacao atual", statusBadge(employeeActiveState(employee)))}
      ${detailCard("Data referencia", formatDate(today()))}
      ${detailCard("Contrato", company?.contract || "Nao informado")}
    </div>
    <div class="item-card danger-zone"><strong>Desmobilizacao</strong><span class="muted">A desmobilizacao deve preservar historico documental e vinculos para auditoria. Use o status Inativo ou Bloqueado conforme regra operacional.</span></div>
  `;
}

function renderEmployeeDocsTable(docs, title) {
  return `
    <section class="employee-doc-section">
      <div class="modal-head"><h2>${title}</h2><span class="mini-pill">${docs.length} item(ns)</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Validade</th><th>Status</th><th>Observacoes</th></tr></thead>
          <tbody>
            ${docs.length ? docs.map((doc) => `<tr><td><strong>${doc.type}</strong></td><td>${formatDate(doc.dueDate)}</td><td>${statusBadge(docStatus(doc))}</td><td>${doc.notes || "<span class='muted'>Sem observacao</span>"}</td></tr>`).join("") : emptyRow(4)}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderEmployeeWorkflow(employee) {
  const docs = state.documents.filter((doc) => doc.employeeId === employee.id);
  const steps = [
    ["Fiscal", employee.status === "Aguardando aprovacao do fiscal" ? "Pendente" : "Aprovado"],
    ["Documentos pessoais", employee.docStatus === "Regular" || docs.some((doc) => docStatus(doc) === "Aprovado") ? "Aprovado" : "Pendente"],
    ["Medicina", employeeMedicineStatus(employee, docs)],
    ["EHS", employeeEhsStatus(employee, docs)],
    ["Patrimonial/liberacao final", employeePatrimonialStatus(employee)],
  ];
  return steps
    .map(
      ([label, status], index) => `
        <div class="employee-flow-step ${statusClass(status)}">
          <span>${index + 1}</span>
          <strong>${label}</strong>
          ${statusBadge(status)}
        </div>
      `,
    )
    .join("");
}

function employeeInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "FT";
}

function employeeRegistration(employee) {
  return employee.registration || employee.matricula || `FIT-${String(employee.id || "").slice(0, 8).toUpperCase()}`;
}

function employeeCostCenter(employee, company) {
  return employee.costCenter || employee.centroCusto || company?.costCenter || company?.contract || "Nao informado";
}

function employeeActiveState(employee) {
  if (employee.status === "Bloqueado") return "Bloqueado";
  if (employee.status === "Inativo") return "Inativo";
  return "Ativo";
}

function employeeMedicineStatus(employee, docs = []) {
  if (employee.status === "Aguardando exames") return "Pendente";
  if (employee.docStatus === "Vencido" || employee.docStatus === "A vencer") return employee.docStatus;
  if (docs.some((doc) => /aso|exame|medic/i.test(doc.type) && docStatus(doc) === "Aprovado")) return "Aprovado";
  return employee.asoValidity ? "Aprovado" : "Pendente";
}

function employeeEhsStatus(employee, docs = []) {
  if (employee.status === "Em treinamento") return "Pendente";
  if (docs.some((doc) => /nr-|treinamento|epi|segur/i.test(doc.type) && docStatus(doc) === "Aprovado")) return "Aprovado";
  return employee.trainingValidity ? "Aprovado" : "Pendente";
}

function employeePatrimonialStatus(employee) {
  if (["Bloqueado", "Inativo"].includes(employee.status)) return employee.status;
  if (employee.status === "Aprovado" || employee.status === "Ativo") return "Aprovado";
  return "Pendente";
}

function renderDocuments() {
  const items = filtered(visibleDocuments(), [(item) => item.type, (item) => companyName(item.companyId), (item) => employeeName(item.employeeId), (item) => docStatus(item)]);
  return `
    ${sectionHead("Controle de documentos", "Registre obrigatorios, vencimentos e aprovacoes.", "Novo documento", "document")}
    ${toolbar("Buscar por documento, empresa, funcionario ou status")}
    <section class="panel table-wrap">
      <table>
        <thead><tr><th>Documento</th><th>Empresa</th><th>Funcionario</th><th>Vencimento</th><th>Status</th><th>Observacoes</th><th>Acoes</th></tr></thead>
        <tbody>
          ${items.length ? items.map(renderDocumentRow).join("") : emptyRow(7)}
        </tbody>
      </table>
    </section>
  `;
}

function renderContracts() {
  const pageSize = 8;
  const contracts = filtered(visibleCompanies(), [
    (item) => item.name,
    (item) => item.contract,
    (item) => contractUnit(item),
    (item) => item.status,
    (item) => item.cnpj,
  ]).filter((item) => (contractStatusFilter === "Todos" ? true : normalizeCompany(item).status === contractStatusFilter));
  const totalPages = Math.max(1, Math.ceil(contracts.length / pageSize));
  contractPage = Math.min(contractPage, totalPages);
  const pageItems = contracts.slice((contractPage - 1) * pageSize, contractPage * pageSize);
  const active = visibleCompanies().filter((company) => normalizeCompany(company).status === "Ativa").length;
  const expiring = visibleCompanies().filter((company) => contractDays(company) >= 0 && contractDays(company) <= 60).length;
  const blocked = visibleCompanies().filter((company) => ["Inativa", "Desmobilizada", "Bloqueada", "Bloqueado"].includes(normalizeCompany(company).status)).length;
  const noDate = visibleCompanies().filter((company) => !normalizeCompany(company).endDate).length;
  const statusItems = ["Ativa", "Pendente", "Inativa", "Desmobilizada"]
    .map((status) => ({ status, count: visibleCompanies().filter((company) => normalizeCompany(company).status === status).length }))
    .filter((item) => item.count);
  return `
    <section class="contract-hero">
      <div>
        <span class="eyebrow">Modulo principal</span>
        <h2>Gestao de contratos de terceiros</h2>
        <p>Controle executivo de vigencia, status, documentos obrigatorios, funcionarios vinculados e trilha operacional.</p>
      </div>
      ${can("create.company") ? `<button class="btn primary" data-create="company">${icon("plus")} Novo contrato</button>` : ""}
    </section>
    <div class="contract-summary-grid">
      <article class="contract-summary-card"><span>Total de contratos</span><strong>${visibleCompanies().length}</strong><small>Base real de empresas cadastradas</small></article>
      <article class="contract-summary-card ok"><span>Ativos</span><strong>${active}</strong><small>Contratos liberados</small></article>
      <article class="contract-summary-card warn"><span>Vencendo</span><strong>${expiring}</strong><small>Proximos 60 dias</small></article>
      <article class="contract-summary-card danger"><span>Criticos</span><strong>${blocked}</strong><small>Inativos ou desmobilizados</small></article>
      <article class="contract-summary-card neutral"><span>Sem data fim</span><strong>${noDate}</strong><small>Exigem revisao cadastral</small></article>
    </div>
    <div class="contract-layout">
      <section class="contract-chart-card">
        <div class="bi-head">
          <div><span class="eyebrow">Distribuicao</span><h2>Status dos contratos</h2></div>
          <span class="mini-pill">${visibleCompanies().length} contrato(s)</span>
        </div>
        <div class="contract-distribution">
          ${
            statusItems.length
              ? statusItems
                  .map((item) => {
                    const width = Math.max(8, (item.count / Math.max(1, visibleCompanies().length)) * 100);
                    return `<div class="power-row"><div><strong>${item.status}</strong><span>${item.count}</span></div><i style="--bar:${width}%"></i></div>`;
                  })
                  .join("")
              : `<div class="empty">Sem contratos para distribuir.</div>`
          }
        </div>
      </section>
      <section class="contract-table-card">
        <div class="contract-toolbar">
          <div class="global-search contract-search">${icon("search")}<input class="search-control" placeholder="Pesquisar contrato, empresa, unidade ou status" value="${escapeAttr(searchTerm)}" /></div>
          <label class="compact-filter">Status
            <select id="contractStatusFilter">
              ${["Todos", "Ativa", "Pendente", "Inativa", "Desmobilizada"].map((status) => `<option value="${status}" ${contractStatusFilter === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="table-wrap contract-table-wrap">
          <table class="contract-table">
            <thead><tr><th>Contrato</th><th>Empresa</th><th>Unidade</th><th>Periodo</th><th>Dias</th><th>Status</th><th>Acoes</th></tr></thead>
            <tbody>
              ${
                pageItems.length
                  ? pageItems
                      .map((company) => {
                        const item = normalizeCompany(company);
                        const days = contractDays(item);
                        return `
                          <tr class="clickable-row" data-contract-detail="${company.id}">
                            <td><strong>${item.contract || "Nao informado"}</strong><span>${item.cnpj}</span></td>
                            <td><strong>${item.name}</strong><span>Fiscal: ${item.fiscal}</span></td>
                            <td>${contractUnit(item)}</td>
                            <td>${formatDate(item.startDate)}<br><span class="muted">ate ${formatDate(item.endDate)}</span></td>
                            <td>${Number.isFinite(days) ? `${days} dia(s)` : "Nao informado"}</td>
                            <td>${statusBadge(item.status)}</td>
                            <td><button class="btn secondary compact" type="button" data-contract-detail="${company.id}">${icon("docs")} Detalhes</button></td>
                          </tr>
                        `;
                      })
                      .join("")
                  : emptyRow(7)
              }
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <span>Pagina ${contractPage} de ${totalPages} - ${contracts.length} registro(s)</span>
          <div>
            <button class="btn secondary compact" type="button" data-contract-page="${contractPage - 1}" ${contractPage <= 1 ? "disabled" : ""}>Anterior</button>
            <button class="btn secondary compact" type="button" data-contract-page="${contractPage + 1}" ${contractPage >= totalPages ? "disabled" : ""}>Proxima</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function openContractDetails(id) {
  const company = visibleCompanies().find((item) => item.id === id) || state.companies.find((item) => item.id === id);
  if (!company) return;
  const modal = document.createElement("div");
  modal.className = "modal-backdrop contract-detail-backdrop";
  modal.innerHTML = `
    <section class="modal contract-detail-modal">
      <div class="modal-head contract-detail-head">
        <div>
          <span class="eyebrow">Detalhe do contrato</span>
          <h2>${company.contract || "Contrato nao informado"} - ${company.name}</h2>
          <span class="muted">${contractUnit(company)} - ${company.cnpj}</span>
        </div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="contract-tabs" role="tablist">
        ${[
          ["general", "Dados Gerais"],
          ["docs", "Documentos Obrigatorios"],
          ["people", "Funcionarios Vinculados/FIT"],
          ["workflow", "Workflow"],
          ["history", "Historico"],
          ["reports", "Relatorios do Contrato"],
        ]
          .map(([tab, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-contract-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body contract-tab-content">${renderContractTab(company, "general")}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  modal.querySelectorAll("[data-contract-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.querySelectorAll("[data-contract-tab]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      modal.querySelector(".contract-tab-content").innerHTML = renderContractTab(company, button.dataset.contractTab);
    });
  });
}

function renderContractTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => employee.companyId === company.id);
  const documents = state.documents.filter((doc) => doc.companyId === company.id);
  const days = contractDays(item);
  if (tab === "general") {
    return `
      <div class="detail-grid">
        ${detailCard("Numero do contrato", item.contract || "Nao informado")}
        ${detailCard("Empresa", item.name)}
        ${detailCard("Unidade", contractUnit(item))}
        ${detailCard("Fiscal", item.fiscal)}
        ${detailCard("Responsavel", item.responsible)}
        ${detailCard("Contato", `${item.phone || "Nao informado"} / ${item.email || "Nao informado"}`)}
        ${detailCard("Inicio", formatDate(item.startDate))}
        ${detailCard("Fim", formatDate(item.endDate))}
        ${detailCard("Dias restantes", Number.isFinite(days) ? `${days} dia(s)` : "Nao informado")}
        ${detailCard("Status", statusBadge(item.status))}
      </div>
    `;
  }
  if (tab === "docs") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Funcionario</th><th>Validade</th><th>Status</th><th>Observacoes</th></tr></thead>
          <tbody>
            ${
              documents.length
                ? documents
                    .map((doc) => `<tr><td><strong>${doc.type}</strong></td><td>${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</td><td>${formatDate(doc.dueDate)}</td><td>${statusBadge(docStatus(doc))}</td><td>${doc.notes || "<span class='muted'>Sem observacao</span>"}</td></tr>`)
                    .join("")
                : emptyRow(5)
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (tab === "people") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Funcionario/FIT</th><th>Funcao</th><th>CPF</th><th>ASO</th><th>Treinamento</th><th>Status</th></tr></thead>
          <tbody>
            ${
              employees.length
                ? employees
                    .map((employee) => {
                      const normalized = normalizeEmployee(employee);
                      return `<tr><td><strong>${normalized.name}</strong><span>${normalized.address || "Endereco nao informado"}</span></td><td>${normalized.role}</td><td>${normalized.cpf}</td><td>${formatDate(normalized.asoValidity)}</td><td>${formatDate(normalized.trainingValidity)}</td><td>${statusBadge(normalized.status)}</td></tr>`;
                    })
                    .join("")
                : emptyRow(6)
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (tab === "workflow") {
    const steps = [
      ["Contrato cadastrado", item.startDate ? "Concluido" : "Pendente"],
      ["Documentos obrigatorios", documents.every((doc) => docStatus(doc) === "Aprovado") && documents.length ? "Concluido" : "Pendente"],
      ["Funcionarios/FIT vinculados", employees.length ? "Concluido" : "Pendente"],
      ["Aprovacao fiscal", documents.some((doc) => docStatus(doc) !== "Aprovado") ? "Pendente" : "Concluido"],
      ["Operacao monitorada", item.status === "Ativa" ? "Concluido" : "Pendente"],
    ];
    return `<div class="contract-workflow">${steps.map(([label, status]) => `<div class="workflow-row"><div class="workflow-node ${status === "Concluido" ? "ok" : "warn"}"></div><div><strong>${label}</strong><span>${status}</span></div>${statusBadge(status === "Concluido" ? "Aprovado" : "Pendente")}</div>`).join("")}</div>`;
  }
  if (tab === "history") {
    return `
      <div class="history-list">
        <div class="item-card"><strong>Contrato registrado</strong><span class="muted">${formatDate(item.startDate)} - ${item.name}</span></div>
        <div class="item-card"><strong>Status atual</strong><span class="muted">${item.status}</span></div>
        <div class="item-card"><strong>Documentos monitorados</strong><span class="muted">${documents.length} documento(s) associados ao contrato.</span></div>
        <div class="item-card"><strong>Funcionarios vinculados</strong><span class="muted">${employees.length} funcionario(s)/FIT vinculados.</span></div>
      </div>
    `;
  }
  return `
    <div class="report-grid contract-report-grid">
      <div class="stat-card"><span>Documentos</span><strong>${documents.length}</strong><small>Obrigatorios e enviados</small></div>
      <div class="stat-card"><span>Aprovados</span><strong>${documents.filter((doc) => docStatus(doc) === "Aprovado").length}</strong><small>Sem pendencia</small></div>
      <div class="stat-card"><span>Funcionarios/FIT</span><strong>${employees.length}</strong><small>Vinculados</small></div>
      <div class="stat-card"><span>Bloqueados</span><strong>${employees.filter((employee) => ["Bloqueado", "Inativo"].includes(normalizeEmployee(employee).status)).length}</strong><small>Restricao operacional</small></div>
    </div>
    <div class="item-card"><strong>Resumo do contrato</strong><span class="muted">${item.contract || "Contrato nao informado"} possui ${documents.length} documento(s) e ${employees.length} funcionario(s)/FIT vinculados.</span></div>
  `;
}

function detailCard(label, value) {
  return `<div class="detail-card"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderApprovals() {
  const items = visibleDocuments().filter((doc) => ["Pendente", "Reprovado", "A vencer", "Vencido"].includes(docStatus(doc)));
  return `
    <section class="panel">
      <div class="modal-head">
        <div>
          <h2>Aprovacoes documentais</h2>
          <span class="muted">Fila de documentos para avaliacao do fiscal.</span>
        </div>
        <span class="mini-pill">${items.length} item(ns)</span>
      </div>
      <div class="modal-body item-list">
        ${
          items.length
            ? items
                .map(
                  (doc) => `
                    <div class="item-card approval-card">
                      <div class="item-row">
                        <div>
                          <strong>${doc.type}</strong>
                          <span class="muted">${companyName(doc.companyId)} - ${doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa"}</span>
                        </div>
                        ${statusBadge(docStatus(doc))}
                      </div>
                      <div class="actions wrap">${documentRowActions(doc)}</div>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty">Nenhum documento aguardando aprovacao.</div>`
        }
      </div>
    </section>
  `;
}

function renderDocumentWorkflow() {
  const documents = visibleDocuments();
  const stages = [
    ["Recebidos", documents.length, "Documentos registrados no portal", "info"],
    ["Pendentes", documents.filter((doc) => docStatus(doc) === "Pendente").length, "Aguardando envio ou revisao", "warn"],
    ["Em analise fiscal", documents.filter((doc) => ["A vencer", "Reprovado"].includes(docStatus(doc))).length, "Itens que exigem tratamento", "special"],
    ["Aprovados", documents.filter((doc) => docStatus(doc) === "Aprovado").length, "Liberados para conformidade", "ok"],
  ];
  const flowItems = documents
    .slice(0, 8)
    .map((doc) => {
      const status = docStatus(doc);
      return `
        <div class="workflow-row">
          <div class="workflow-node ${statusClass(status)}"></div>
          <div>
            <strong>${doc.type}</strong>
            <span>${companyName(doc.companyId)} - ${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</span>
          </div>
          ${statusBadge(status)}
        </div>
      `;
    })
    .join("");

  return `
    <section class="hero-panel compact-hero">
      <div>
        <span class="eyebrow">Workflow documental</span>
        <h2>Esteira de documentos, analise fiscal e liberacao operacional</h2>
        <p>Visao corporativa do ciclo de vida documental, com aprovacao, reprovacao, vencimento e pendencias.</p>
      </div>
    </section>
    <div class="stats-grid">
      ${stages.map(([label, value, helper, tone]) => `<div class="stat-card ${tone}"><span>${label}</span><strong>${value}</strong><small>${helper}</small></div>`).join("")}
    </div>
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Esteira operacional</h2><span class="mini-pill">${documents.length} documento(s)</span></div>
        <div class="modal-body workflow-list">${flowItems || `<div class="empty">Nenhum documento cadastrado.</div>`}</div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>SLA documental</h2></div>
        <div class="modal-body chart-list">
          ${stages.map(([label, value]) => `<div class="bar-row"><div><strong>${label}</strong><span>${value}</span></div><i style="--bar:${Math.max(8, (value / Math.max(1, documents.length)) * 100)}%"></i></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderThirdPartyManagement() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const cards = companies
    .map((company) => {
      const companyEmployees = employees.filter((employee) => employee.companyId === company.id);
      const blocked = companyEmployees.filter((employee) => ["Bloqueado", "Inativo"].includes(normalizeEmployee(employee).status)).length;
      const approved = companyEmployees.filter((employee) => ["Aprovado", "Ativo"].includes(normalizeEmployee(employee).status)).length;
      return `
        <article class="supplier-card">
          <div class="supplier-card-head">
            <div>
              <span class="eyebrow">Fornecedor</span>
              <h2>${company.name}</h2>
              <p>${company.contract || "Contrato nao informado"} - ${company.cnpj}</p>
            </div>
            ${statusBadge(company.status)}
          </div>
          <div class="supplier-metrics">
            <span><strong>${companyEmployees.length}</strong> funcionarios</span>
            <span><strong>${approved}</strong> liberados</span>
            <span><strong>${blocked}</strong> bloqueados</span>
          </div>
          <div class="supplier-footer">
            <span>Fiscal: ${company.fiscal || "Nao informado"}</span>
            <span>Fim: ${formatDate(company.endDate)}</span>
          </div>
        </article>
      `;
    })
    .join("");
  return `
    <section class="hero-panel compact-hero">
      <div>
        <span class="eyebrow">Gestao de terceiros</span>
        <h2>Carteira de fornecedores, riscos, equipes vinculadas e status operacional</h2>
        <p>Resumo corporativo para fiscalizacao de empresas terceirizadas sem alterar regras de negocio.</p>
      </div>
    </section>
    <div class="supplier-grid">${cards || `<div class="empty">Nenhuma empresa encontrada.</div>`}</div>
  `;
}

function renderCompliance() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const documents = visibleDocuments();
  const approvedDocs = documents.filter((doc) => docStatus(doc) === "Aprovado").length;
  const complianceScore = Math.round((approvedDocs / Math.max(1, documents.length)) * 100);
  const risks = [
    ["Documentos vencidos", documents.filter((doc) => docStatus(doc) === "Vencido").length, "bad"],
    ["Empresas desmobilizadas", companies.filter((company) => normalizeCompany(company).status === "Desmobilizada").length, "warn"],
    ["Funcionarios bloqueados", employees.filter((employee) => normalizeEmployee(employee).status === "Bloqueado").length, "bad"],
    ["Pendencias totais", documents.filter((doc) => docStatus(doc) !== "Aprovado").length, "info"],
  ];
  return `
    <section class="compliance-shell">
      <div class="compliance-score">
        <span class="eyebrow">Conformidade</span>
        <strong>${complianceScore}%</strong>
        <p>Indice documental aprovado na visao atual</p>
      </div>
      <div class="compliance-grid">
        ${risks.map(([label, value, tone]) => `<div class="stat-card ${tone}"><span>${label}</span><strong>${value}</strong><small>Monitoramento operacional</small></div>`).join("")}
      </div>
    </section>
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Matriz de conformidade</h2></div>
        <div class="modal-body item-list">
          ${["Politica documental", "Medicina ocupacional", "Treinamento EHS", "Liberacao fiscal"].map((item, index) => `<div class="item-card"><div class="item-row"><strong>${item}</strong>${statusBadge(index === 0 && complianceScore > 70 ? "Aprovado" : "Pendente")}</div><span class="muted">Controle preparado para auditoria e rastreabilidade.</span></div>`).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Resumo executivo</h2></div>
        <div class="modal-body item-list">
          <div class="item-card"><strong>${companies.length} empresas monitoradas</strong><span class="muted">Carteira visivel conforme perfil do usuario.</span></div>
          <div class="item-card"><strong>${employees.length} funcionarios vinculados</strong><span class="muted">Status de contratacao e documentacao acompanhados.</span></div>
          <div class="item-card"><strong>${documents.length} documentos rastreados</strong><span class="muted">Validade, aprovacao e historico de observacoes.</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderBlocks() {
  const blockedCompanies = visibleCompanies().filter((company) => ["Bloqueada", "Bloqueado", "Inativa", "Desmobilizada"].includes(normalizeCompany(company).status));
  const blockedEmployees = visibleEmployees().filter((employee) => ["Bloqueado", "Inativo"].includes(normalizeEmployee(employee).status));
  return `
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Empresas bloqueadas</h2><span class="mini-pill">${blockedCompanies.length}</span></div>
        <div class="modal-body item-list">
          ${blockedCompanies.length ? blockedCompanies.map((company) => `<div class="item-card danger-zone"><div class="item-row"><strong>${company.name}</strong>${statusBadge(company.status)}</div><span class="muted">${company.contract || "Contrato nao informado"}</span></div>`).join("") : `<div class="empty">Nenhuma empresa bloqueada.</div>`}
        </div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Funcionarios bloqueados</h2><span class="mini-pill">${blockedEmployees.length}</span></div>
        <div class="modal-body item-list">
          ${blockedEmployees.length ? blockedEmployees.map((employee) => `<div class="item-card danger-zone"><div class="item-row"><strong>${employee.name}</strong>${statusBadge(employee.status)}</div><span class="muted">${companyName(employee.companyId)} - ${employee.role}</span></div>`).join("") : `<div class="empty">Nenhum funcionario bloqueado.</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderIntegrations() {
  const items = [
    ["Armazenamento online", isOnlineMode() ? "Conectado" : "Preparado", "Autenticacao, banco de dados e documentos configurados para operacao online."],
    ["Vercel", "Estatico", "HTML, CSS e JavaScript puro, sem etapa obrigatoria de framework."],
    ["ERP / Senior / TOTVS", "Roadmap", "Area reservada para integracoes corporativas futuras."],
  ];
  return `
    <div class="integration-grid">
      ${items.map(([title, status, description]) => `<section class="panel integration-card"><div class="integration-icon">${icon("integrations")}</div><h2>${title}</h2><p>${description}</p>${statusBadge(status)}</section>`).join("")}
    </div>
  `;
}

function renderSettings() {
  return `
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Configuracoes gerais</h2></div>
        <div class="modal-body item-list">
          <div class="item-card"><strong>Tema enterprise</strong><span class="muted">Use o botao no topo para alternar entre modo claro e escuro.</span></div>
          <div class="item-card"><strong>Armazenamento online</strong><span class="muted">Cole a URL do projeto e a chave anon publica em supabase-config.js.</span></div>
          <div class="item-card"><strong>Publicacao</strong><span class="muted">Interface mantida em HTML, CSS e JavaScript puro.</span></div>
        </div>
      </section>
      ${canView("users") ? `<section class="panel"><div class="modal-head"><h2>Acesso rapido</h2></div><div class="modal-body"><button class="btn primary" type="button" data-view="users">${icon("users")} Gerenciar usuarios</button></div></section>` : ""}
    </div>
  `;
}

function renderDocumentRow(doc) {
  return `
    <tr>
      <td><strong>${doc.type}</strong></td>
      <td>${companyName(doc.companyId)}</td>
      <td>${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</td>
      <td>${formatDate(doc.dueDate)}</td>
      <td>${statusBadge(docStatus(doc))}</td>
      <td>${doc.notes || "<span class='muted'>Sem observacao</span>"}${doc.filePath ? `<br><span class="muted">${doc.filePath}</span>` : ""}</td>
      <td>${documentRowActions(doc)}</td>
    </tr>
  `;
}

function renderUsers() {
  const items = filtered(state.users, [(item) => item.name, (item) => item.email, (item) => roleName(item.role)]);
  return `
    ${sectionHead("Usuarios", "Gerencie acesso administrativo e fiscais de fornecedor.", "Novo usuario", "user")}
    ${toolbar("Buscar por nome, e-mail ou perfil")}
    <section class="panel table-wrap">
      <table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Acoes</th></tr></thead>
        <tbody>
          ${items.length ? items.map(renderUserRow).join("") : emptyRow(5)}
        </tbody>
      </table>
    </section>
  `;
}

function renderReports() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const documents = visibleDocuments();
  const metrics = operationalMetrics(companies, employees, documents);
  const sectorPendencies = [
    { setor: "Medicina Ocupacional", pendencias: metrics.medicinePendencies.length, responsavel: "ASO e exames", status: "Pendente" },
    { setor: "Seguranca do Trabalho/EHS", pendencias: metrics.ehsPendencies.length, responsavel: "Treinamentos e requisitos EHS", status: "Pendente" },
    { setor: "Seguranca Patrimonial", pendencias: metrics.patrimonialPendencies.length, responsavel: "Liberacao final", status: "Pendente" },
  ];
  const blockRows = [
    ...metrics.blockedEmployees.map((employee) => ({
      tipo: "Funcionario",
      registro: normalizeEmployee(employee).name,
      empresa: companyName(normalizeEmployee(employee).companyId),
      motivo: normalizeEmployee(employee).notes || "Restricao operacional",
      status: normalizeEmployee(employee).status,
    })),
    ...metrics.blockedContracts.map((company) => ({
      tipo: "Contrato/Empresa",
      registro: normalizeCompany(company).contract || normalizeCompany(company).name,
      empresa: normalizeCompany(company).name,
      motivo: "Status contratual restritivo",
      status: normalizeCompany(company).status,
    })),
  ];

  return `
    <section class="panel report-panel">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Relatorios operacionais</span>
          <h2>Central de indicadores e auditoria</h2>
        </div>
        <div class="actions wrap">
          <span class="mini-pill">Preparado para Excel editavel</span>
          ${can("reports.generate") ? `<button class="btn secondary" type="button" onclick="window.print()">${icon("reports")} Gerar relatorio</button>` : ""}
        </div>
      </div>
      <div class="modal-body report-grid">
        <div class="stat-card danger"><span>Documentos vencidos</span><strong>${metrics.expiredDocs.length}</strong><small>Fora da validade</small></div>
        <div class="stat-card warning"><span>Documentos a vencer</span><strong>${metrics.expiringDocs.length}</strong><small>Janela de alerta</small></div>
        <div class="stat-card success"><span>Funcionarios ativos</span><strong>${metrics.activeEmployees.length}</strong><small>Aptos/liberados</small></div>
        <div class="stat-card danger"><span>Bloqueios</span><strong>${blockRows.length}</strong><small>Restricoes em aberto</small></div>
      </div>
    </section>
    <div class="report-stack">
      ${renderReportTable("Documentos vencidos", "Controle de documentos fora do prazo.", "documentos-vencidos", ["Documento", "Empresa", "Funcionario", "Vencimento", "Status"], metrics.expiredDocs.map((doc) => [doc.type, companyName(doc.companyId), doc.employeeId ? employeeName(doc.employeeId) : "Empresa", formatDate(doc.dueDate), statusBadge(docStatus(doc))]))}
      ${renderReportTable("Documentos a vencer", "Itens proximos do vencimento.", "documentos-a-vencer", ["Documento", "Empresa", "Funcionario", "Vencimento", "Status"], metrics.expiringDocs.map((doc) => [doc.type, companyName(doc.companyId), doc.employeeId ? employeeName(doc.employeeId) : "Empresa", formatDate(doc.dueDate), statusBadge(docStatus(doc))]))}
      ${renderReportTable("Funcionarios ativos", "Trabalhadores liberados para operacao.", "funcionarios-ativos", ["Nome", "CPF", "Empresa", "Funcao", "Status"], metrics.activeEmployees.map((employee) => {
        const item = normalizeEmployee(employee);
        return [item.name, item.cpf || "Nao informado", companyName(item.companyId), item.role || "Nao informado", statusBadge(item.status)];
      }))}
      ${renderReportTable("Funcionarios inativos/desmobilizados", "Historico de trabalhadores sem atividade atual.", "funcionarios-inativos", ["Nome", "CPF", "Empresa", "Funcao", "Status"], metrics.inactiveEmployees.map((employee) => {
        const item = normalizeEmployee(employee);
        return [item.name, item.cpf || "Nao informado", companyName(item.companyId), item.role || "Nao informado", statusBadge(item.status)];
      }))}
      ${renderReportTable("Pendencias por setor", "Visao consolidada para Medicina, EHS e Patrimonial.", "pendencias-por-setor", ["Setor", "Pendencias", "Responsavel operacional", "Status"], sectorPendencies.map((item) => [item.setor, item.pendencias, item.responsavel, statusBadge(item.status)]))}
      ${renderReportTable("Contratos vencendo", "Contratos com fim previsto nos proximos 60 dias.", "contratos-vencendo", ["Contrato", "Empresa", "Unidade", "Fim", "Status"], metrics.expiringContracts.map((company) => {
        const item = normalizeCompany(company);
        return [item.contract || "Nao informado", item.name, contractUnit(item), formatDate(item.endDate), statusBadge(item.status)];
      }))}
      ${renderReportTable("Bloqueios", "Restricoes de funcionarios e contratos.", "bloqueios", ["Tipo", "Registro", "Empresa", "Motivo", "Status"], blockRows.map((item) => [item.tipo, item.registro, item.empresa, item.motivo, statusBadge(item.status)]))}
    </div>
  `;
}

function renderReportTable(title, subtitle, exportKey, columns, rows) {
  return `
    <section class="panel report-table-panel" data-export-ready="${exportKey}">
      <div class="modal-head">
        <div>
          <h2>${title}</h2>
          <span class="muted">${subtitle}</span>
        </div>
        <div class="actions wrap">
          <span class="mini-pill">${rows.length} registro(s)</span>
          <button class="btn secondary compact" type="button" data-export-report="${exportKey}" title="Estrutura preparada para exportacao futura">${icon("reports")} Excel futuro</button>
        </div>
      </div>
      <div class="table-wrap report-export-table">
        <table>
          <thead><tr>${columns.map((column) => `<th data-export-column="${escapeAttr(column)}">${column}</th>`).join("")}</tr></thead>
          <tbody>${rows.length ? rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("") : emptyRow(columns.length)}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderUserRow(user) {
  return `
    <tr>
      <td><strong>${user.name}</strong></td>
      <td>${user.email}</td>
      <td>${roleName(user.role)}</td>
      <td>${statusBadge(user.active ? "Ativo" : "Inativo")}</td>
      <td>${rowActions("user", user.id)}</td>
    </tr>
  `;
}

function sectionHead(title, subtitle, buttonLabel, type) {
  const canCreate = can(`create.${type}`);
  return `
    <div class="section-head">
      <div>
        <h2>${title}</h2>
        <span class="muted">${subtitle}</span>
      </div>
      ${canCreate ? `<button class="btn primary" data-create="${type}">${icon("plus")} ${buttonLabel}</button>` : ""}
    </div>
  `;
}

function toolbar(placeholder) {
  return `
    <div class="toolbar">
      <input class="search search-control" placeholder="${placeholder}" value="${escapeAttr(searchTerm)}" />
    </div>
  `;
}

function rowActions(type, id) {
  const collection = {
    employee: state.employees,
    document: state.documents,
    user: state.users,
  }[type];
  const item = collection?.find((entry) => entry.id === id);
  return `
    <div class="actions">
      ${can(`edit.${type}`, item) ? `<button class="btn icon" title="Editar" data-edit="${type}" data-id="${id}">${icon("edit")}</button>` : ""}
      ${can(`delete.${type}`, item) ? `<button class="btn icon" title="Excluir" data-delete="${type}" data-id="${id}">${icon("trash")}</button>` : ""}
      ${!can(`edit.${type}`, item) && !can(`delete.${type}`, item) ? `<span class="mini-pill">Somente leitura</span>` : ""}
    </div>
  `;
}

function documentRowActions(doc) {
  return `
    <div class="actions wrap">
      ${can("approveDocuments", doc) ? `<button class="btn secondary compact" type="button" data-doc-status="Aprovado" data-id="${doc.id}">Aprovar</button>` : ""}
      ${can("approveDocuments", doc) ? `<button class="btn warning compact" type="button" data-doc-status="Reprovado" data-id="${doc.id}">Reprovar</button>` : ""}
      ${can("edit.document", doc) ? `<button class="btn secondary compact" type="button" data-edit="document" data-id="${doc.id}">${icon("edit")} Editar</button>` : ""}
      ${can("delete.document", doc) ? `<button class="btn danger compact" type="button" data-delete="document" data-id="${doc.id}">${icon("trash")} Excluir</button>` : ""}
      ${!can("approveDocuments", doc) && !can("edit.document", doc) && !can("delete.document", doc) ? `<span class="mini-pill">Somente leitura</span>` : ""}
    </div>
  `;
}

function emptyRow(columns) {
  return `<tr><td colspan="${columns}" class="empty">Nenhum registro encontrado.</td></tr>`;
}

function statusBadge(status) {
  const kind = {
    Aprovado: "ok",
    Regular: "ok",
    Ativa: "ok",
    Ativo: "ok",
    Integrado: "ok",
    Conectado: "ok",
    Estatico: "ok",
    "A vencer": "warn",
    Pendente: "warn",
    "Em analise": "analysis",
    "Documentos pendente": "pending-docs",
    "Aguardando exames": "exams",
    "Em treinamento": "training",
    "Aguardando aprovacao do fiscal": "fiscal",
    Vencido: "bad",
    Inativa: "bad",
    Inativo: "bad",
    Desmobilizada: "bad",
    Reprovado: "bad",
    Bloqueado: "bad",
    Preparado: "info",
    Roadmap: "info",
  }[status] || "info";
  return `<span class="status ${kind}">${status}</span>`;
}

function statusClass(status) {
  return {
    Aprovado: "ok",
    Regular: "ok",
    Ativa: "ok",
    Ativo: "ok",
    Pendente: "warn",
    "A vencer": "warn",
    Reprovado: "bad",
    Vencido: "bad",
    Bloqueado: "bad",
    Inativo: "bad",
    "Em analise": "info",
  }[status] || "info";
}

function bindViewEvents() {
  document.querySelectorAll(".search-control").forEach((input) => {
    input.addEventListener("input", (event) => {
      const cursor = event.target.selectionStart || 0;
      const placeholder = event.target.getAttribute("placeholder");
      searchTerm = event.target.value;
      if (currentView === "contracts") contractPage = 1;
      renderApp();
      requestAnimationFrame(() => {
        const nextInput = Array.from(document.querySelectorAll(".search-control")).find((item) => item.getAttribute("placeholder") === placeholder) || document.querySelector(".search-control");
        if (!nextInput) return;
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      });
    });
  });

  document.querySelectorAll("[data-create]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.create === "company") {
        editingCompanyId = null;
        renderApp();
        return;
      }
      if (button.dataset.create === "employee") {
        editingEmployeeId = null;
        renderApp();
        return;
      }
      openForm(button.dataset.create);
    });
  });

  document.querySelector("#contractStatusFilter")?.addEventListener("change", (event) => {
    contractStatusFilter = event.target.value;
    contractPage = 1;
    renderApp();
  });

  document.querySelectorAll("[data-contract-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const page = Number(button.dataset.contractPage);
      if (!Number.isFinite(page) || page < 1) return;
      contractPage = page;
      renderApp();
    });
  });

  document.querySelectorAll("[data-contract-detail]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openContractDetails(item.dataset.contractDetail);
    });
  });

  document.querySelectorAll("[data-employee-record]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openEmployeeRecord(item.dataset.employeeRecord);
    });
  });

  document.querySelectorAll("[data-dashboard-card]").forEach((card) => {
    const openTarget = () => {
      const target = card.dataset.targetView;
      if (!target || !canView(target)) return;
      currentView = target;
      searchTerm = card.dataset.targetSearch || "";
      if (target === "employees" && card.dataset.targetFilter) employeeStatusFilter = card.dataset.targetFilter;
      if (target === "contracts" && card.dataset.targetFilter) contractStatusFilter = card.dataset.targetFilter;
      if (target === "contracts") contractPage = 1;
      render();
    };
    card.addEventListener("click", openTarget);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTarget();
      }
    });
  });

  document.querySelectorAll("[data-export-report]").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Estrutura preparada para exportacao futura em Excel editavel. Esta etapa ainda nao altera dados nem envia informacoes.");
    });
  });

  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.edit === "company") {
        editingCompanyId = button.dataset.id;
        renderApp();
        return;
      }
      if (button.dataset.edit === "employee") {
        editingEmployeeId = button.dataset.id;
        renderApp();
        return;
      }
      openForm(button.dataset.edit, button.dataset.id);
    });
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => removeItem(button.dataset.delete, button.dataset.id));
  });

  document.querySelectorAll("[data-doc-status]").forEach((button) => {
    button.addEventListener("click", () => updateDocumentStatus(button.dataset.id, button.dataset.docStatus));
  });

  document.querySelectorAll("[data-demobilize]").forEach((button) => {
    button.addEventListener("click", () => demobilizeCompany(button.dataset.id));
  });

  document.querySelector("[data-new-company]")?.addEventListener("click", () => {
    editingCompanyId = null;
    renderApp();
  });

  document.querySelector("[data-new-employee]")?.addEventListener("click", () => {
    editingEmployeeId = null;
    renderApp();
  });

  document.querySelector("#companyEditorForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCompanyFromForm(new FormData(event.currentTarget));
  });

  document.querySelector("#employeeEditorForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEmployeeFromForm(new FormData(event.currentTarget));
  });

  document.querySelectorAll("[data-employee-status]").forEach((button) => {
    button.addEventListener("click", () => {
      employeeStatusFilter = button.dataset.employeeStatus;
      renderApp();
    });
  });
}

function openForm(type, id = null) {
  const config = formConfig(type, id);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `
    <form class="modal" id="modalForm">
      <div class="modal-head">
        <h2>${config.title}</h2>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="modal-body">
        <div class="form-grid two">${config.fields.join("")}</div>
      </div>
      <div class="modal-foot">
        <button class="btn secondary" type="button" data-close>Cancelar</button>
        <button class="btn primary" type="submit">${icon("save")} Salvar</button>
      </div>
    </form>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => modal.remove());
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  modal.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    try {
      await config.save(new FormData(event.currentTarget));
      saveState();
      modal.remove();
      render();
    } catch (error) {
      alert(`Nao foi possivel salvar: ${error.message}`);
      submit.disabled = false;
    }
  });
}

function formConfig(type, id) {
  const maps = {
    company: companyForm,
    employee: employeeForm,
    document: documentForm,
    user: userForm,
  };
  return maps[type](id);
}

function inputField(name, label, value = "", attrs = "") {
  return `<label>${label}<input name="${name}" value="${escapeAttr(value)}" ${attrs} /></label>`;
}

function selectField(name, label, value, options) {
  return `<label>${label}<select name="${name}">${options
    .map((option) => `<option value="${escapeAttr(option.value)}" ${String(option.value) === String(value) ? "selected" : ""}>${option.label}</option>`)
    .join("")}</select></label>`;
}

function textAreaField(name, label, value = "") {
  return `<label class="wide">${label}<textarea name="${name}">${escapeHtml(value)}</textarea></label>`;
}

function fileField(name, label) {
  return `<label>${label}<input name="${name}" type="file" /></label>`;
}

function companyForm(id) {
  const item = state.companies.find((company) => company.id === id) || {};
  return {
    title: id ? "Editar empresa" : "Nova empresa",
    fields: [
      inputField("name", "Razao social", item.name, "required"),
      inputField("cnpj", "CNPJ", item.cnpj, "required"),
      inputField("contract", "Contrato", item.contract),
      inputField("fiscal", "Fiscal do contrato", item.fiscal, "required"),
      inputField("responsible", "Responsavel", item.responsible || item.contact, "required"),
      inputField("email", "E-mail", item.email, "type='email'"),
      inputField("phone", "Telefone", item.phone),
      inputField("startDate", "Data de inicio", item.startDate, "type='date'"),
      inputField("endDate", "Data de fim", item.endDate, "type='date'"),
      selectField("status", "Status", item.status || "Ativa", ["Ativa", "Pendente", "Inativa", "Desmobilizada"].map(option)),
    ],
    save(form) {
      upsert("companies", id, {
        name: form.get("name"),
        cnpj: form.get("cnpj"),
        contract: form.get("contract"),
        fiscal: form.get("fiscal"),
        responsible: form.get("responsible"),
        contact: form.get("responsible"),
        email: form.get("email"),
        phone: form.get("phone"),
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
        risk: "Medio",
        status: form.get("status"),
      });
    },
  };
}

function employeeForm(id) {
  const item = state.employees.find((employee) => employee.id === id) || {};
  return {
    title: id ? "Editar funcionario" : "Novo funcionario",
    fields: [
      inputField("name", "Nome completo", item.name, "required"),
      selectField("companyId", "Empresa", item.companyId || state.companies[0]?.id, state.companies.map((company) => ({ value: company.id, label: company.name }))),
      inputField("role", "Cargo", item.role, "required"),
      inputField("cpf", "CPF", item.cpf, "required"),
      inputField("asoValidity", "Validade de ASO", item.asoValidity || today(), "type='date'"),
      inputField("trainingValidity", "Validade de treinamento", item.trainingValidity || today(), "type='date'"),
      selectField("docStatus", "Status documental", item.docStatus || "Pendente", documentStatuses.map(option)),
      selectField("status", "Status de contratacao", item.status || "Em analise", hiringStatuses.map(option)),
      textAreaField("address", "Endereco", item.address),
      textAreaField("notes", "Observacoes", item.notes),
    ],
    save(form) {
      upsert("employees", id, {
        name: form.get("name"),
        companyId: form.get("companyId"),
        role: form.get("role"),
        cpf: form.get("cpf"),
        asoValidity: form.get("asoValidity"),
        trainingValidity: form.get("trainingValidity"),
        docStatus: form.get("docStatus"),
        address: form.get("address"),
        notes: form.get("notes"),
        status: form.get("status"),
      });
    },
  };
}

function documentForm(id) {
  const item = state.documents.find((doc) => doc.id === id) || {};
  const companyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  const employeeSource = currentUser()?.role === "supplier" ? visibleEmployees() : state.employees;
  const employees = [{ value: "", label: "Documento da empresa" }].concat(
    employeeSource.map((employee) => ({ value: employee.id, label: `${employee.name} - ${companyName(employee.companyId)}` })),
  );
  return {
    title: id ? "Editar documento" : "Novo documento",
    fields: [
      selectField("companyId", "Empresa", item.companyId || companyOptions[0]?.value, companyOptions),
      selectField("employeeId", "Funcionario", item.employeeId || "", employees),
      selectField("type", "Tipo de documento", item.type || documentTypes[0], documentTypes.map(option)),
      inputField("dueDate", "Vencimento", item.dueDate || today(), "type='date'"),
      selectField("status", "Status manual", item.status || "Pendente", ["Aprovado", "Pendente", "Reprovado"].map(option)),
      inputField("filePath", "Arquivo ou URL do documento", item.filePath || ""),
      fileField("documentFile", "Enviar arquivo"),
      textAreaField("notes", "Observacoes", item.notes),
    ],
    async save(form) {
      const filePath = await uploadDocumentFile(form, item.filePath);
      const saved = upsert("documents", id, {
        companyId: form.get("companyId"),
        employeeId: form.get("employeeId"),
        type: form.get("type"),
        dueDate: form.get("dueDate"),
        status: form.get("status"),
        filePath: filePath || form.get("filePath"),
        notes: form.get("notes"),
      });
      await syncCollection("documents", saved);
    },
  };
}

function userForm(id) {
  const item = state.users.find((user) => user.id === id) || {};
  return {
    title: id ? "Editar usuario" : "Novo usuario",
    fields: [
      inputField("name", "Nome", item.name, "required"),
      inputField("email", "E-mail", item.email, "type='email' required"),
      inputField("password", "Senha", item.password || "", "required"),
      selectField("role", "Perfil", item.role || "fiscal", [
        { value: "admin", label: "Administrativo" },
        { value: "fiscal", label: "Fiscal de fornecedor" },
        { value: "supplier", label: "Fornecedor" },
        { value: "visitor", label: "Visitante" },
      ]),
      selectField("companyId", "Empresa do fornecedor", item.companyId || "", [{ value: "", label: "Nao vinculado" }].concat(state.companies.map((company) => ({ value: company.id, label: company.name })))),
      selectField("active", "Status", item.active === false ? "false" : "true", [
        { value: "true", label: "Ativo" },
        { value: "false", label: "Inativo" },
      ]),
    ],
    save(form) {
      const saved = upsert("users", id, {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role"),
        companyId: form.get("companyId") || null,
        active: form.get("active") === "true",
      });
      syncCollection("users", saved).catch((error) => alert(`Nao foi possivel salvar online: ${error.message}`));
    },
  };
}

function upsert(collection, id, data) {
  if (id) {
    state[collection] = state[collection].map((item) => (item.id === id ? { ...item, ...data } : item));
    return state[collection].find((item) => item.id === id);
  } else {
    const item = { id: crypto.randomUUID(), ...data };
    state[collection].push(item);
    return item;
  }
}

function saveCompanyFromForm(form) {
  const id = form.get("id") || null;
  const saved = upsert("companies", id, {
    name: form.get("name"),
    cnpj: form.get("cnpj"),
    fiscal: form.get("fiscal"),
    responsible: form.get("responsible"),
    contact: form.get("responsible"),
    phone: form.get("phone"),
    email: form.get("email"),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    status: form.get("status"),
    contract: form.get("contract"),
    risk: "Medio",
  });
  syncCollection("companies", saved).catch((error) => alert(`Nao foi possivel salvar online: ${error.message}`));
  saveState();
  editingCompanyId = null;
  render();
}

function saveEmployeeFromForm(form) {
  const id = form.get("id") || null;
  if (!form.get("companyId")) {
    alert("Selecione uma empresa vinculada para o funcionario.");
    return;
  }
  const existing = state.employees.find((employee) => employee.id === id);
  const canEditFullEmployee =
    currentUser()?.role === "admin" ||
    (currentUser()?.role === "supplier" && (!existing || existing.companyId === currentUser()?.companyId));
  const payload = {
    name: form.get("name"),
    cpf: form.get("cpf"),
    role: form.get("role"),
    companyId: form.get("companyId"),
    asoValidity: form.get("asoValidity"),
    trainingValidity: form.get("trainingValidity"),
    docStatus: form.get("docStatus"),
    address: form.get("address"),
    notes: form.get("notes"),
    status: form.get("status"),
  };
  const fiscalPayload = existing
    ? { ...existing, docStatus: form.get("docStatus"), notes: form.get("notes"), status: form.get("status") }
    : payload;

  const saved = upsert("employees", id, canEditFullEmployee ? payload : fiscalPayload);
  syncCollection("employees", saved).catch((error) => alert(`Nao foi possivel salvar online: ${error.message}`));
  saveState();
  editingEmployeeId = null;
  render();
}

async function uploadDocumentFile(form, fallbackPath = "") {
  const file = form.get("documentFile");
  if (!isOnlineMode() || !file || !file.name || file.size === 0) return fallbackPath;
  const companyId = form.get("companyId") || "sem-empresa";
  const cleanName = file.name.replace(/[^\w.-]+/g, "_");
  const path = `${companyId}/${crypto.randomUUID()}-${cleanName}`;
  const { error } = await supabaseClient.storage.from("documents").upload(path, file, { upsert: false });
  if (error) throw error;
  return path;
}

function updateDocumentStatus(id, status) {
  const doc = state.documents.find((item) => item.id === id);
  if (!doc || !can("approveDocuments", doc)) return;
  doc.status = status;
  doc.notes = `${doc.notes ? `${doc.notes}\n` : ""}${roleName(currentUser().role)}: documento ${status.toLowerCase()} em ${formatDate(today())}`;
  syncCollection("documents", doc).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
  saveState();
  render();
}

function demobilizeCompany(id) {
  const company = state.companies.find((item) => item.id === id);
  if (!company) return;
  if (!confirm(`Deseja desmobilizar o contrato da empresa ${company.name}?`)) return;
  company.status = "Desmobilizada";
  syncCollection("companies", company).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
  saveState();
  render();
}

function removeItem(type, id) {
  const collections = {
    company: "companies",
    employee: "employees",
    document: "documents",
    user: "users",
  };
  const collection = collections[type];
  if (type === "company") {
    const company = state.companies.find((item) => item.id === id);
    const hasEmployees = state.employees.some((employee) => employee.companyId === id);
    const message = hasEmployees
      ? `Esta empresa possui funcionarios vinculados. Deseja excluir mesmo assim? Os funcionarios e documentos vinculados tambem serao removidos.`
      : `Deseja excluir definitivamente a empresa ${company?.name || ""}?`;
    if (!confirm(message)) return;
    state.employees = state.employees.filter((employee) => employee.companyId !== id);
    state.documents = state.documents.filter((doc) => doc.companyId !== id);
    state.companies = state.companies.filter((item) => item.id !== id);
    deleteRemote("companies", id).catch((error) => alert(`Nao foi possivel excluir online: ${error.message}`));
    if (editingCompanyId === id) editingCompanyId = null;
    saveState();
    render();
    return;
  }
  if (type === "employee") {
    state.documents = state.documents.map((doc) => (doc.employeeId === id ? { ...doc, employeeId: "" } : doc));
    if (editingEmployeeId === id) editingEmployeeId = null;
  }
  if (type === "user" && id === state.session) {
    alert("Voce nao pode excluir o usuario logado.");
    return;
  }
  if (!confirm("Deseja excluir este registro?")) return;
  state[collection] = state[collection].filter((item) => item.id !== id);
  if (type === "company") state.documents = state.documents.filter((doc) => doc.companyId !== id);
  deleteRemote(collection, id).catch((error) => alert(`Nao foi possivel excluir online: ${error.message}`));
  saveState();
  render();
}

function normalizeCompany(company) {
  return {
    ...company,
    fiscal: company.fiscal || "Nao informado",
    responsible: company.responsible || company.contact || "Nao informado",
    startDate: company.startDate || "",
    endDate: company.endDate || "",
    status: company.status || "Ativa",
  };
}

function normalizeEmployee(employee) {
  return {
    ...employee,
    role: employee.role || "",
    companyId: employee.companyId || state.companies[0]?.id || "",
    asoValidity: employee.asoValidity || employee.admission || "",
    trainingValidity: employee.trainingValidity || "",
    docStatus: employee.docStatus || "Pendente",
    address: employee.address || "",
    notes: employee.notes || "",
    status: employee.status || "Em analise",
  };
}

function mapProfileFromDb(profile) {
  const dbPerfil = profile.perfil || profile.role || "visitante";
  return {
    id: profile.id,
    name: profile.nome || profile.name || profile.email || "Usuario",
    email: profile.email || "",
    role: DB_PROFILE_TO_APP_ROLE[dbPerfil] || "visitor",
    active: profile.active !== false,
    companyId: profile.company_id || null,
  };
}

function mapProfileToDb(user) {
  return {
    id: user.id,
    nome: user.name,
    email: user.email,
    perfil: APP_ROLE_TO_DB_PROFILE[user.role] || "visitante",
    active: user.active !== false,
    company_id: user.companyId || null,
  };
}

function mapCompanyFromDb(company) {
  return normalizeCompany({
    id: company.id,
    name: company.name,
    cnpj: company.cnpj,
    fiscal: company.fiscal,
    responsible: company.responsible,
    contact: company.responsible,
    phone: company.phone,
    email: company.email,
    startDate: company.start_date,
    endDate: company.end_date,
    status: company.status,
    contract: company.contract_number,
    risk: company.risk || "Medio",
  });
}

function mapCompanyToDb(company) {
  const item = normalizeCompany(company);
  return {
    id: item.id,
    name: item.name,
    cnpj: item.cnpj,
    fiscal: item.fiscal,
    responsible: item.responsible,
    phone: item.phone,
    email: item.email,
    start_date: item.startDate || null,
    end_date: item.endDate || null,
    status: item.status,
    contract_number: item.contract || null,
    risk: item.risk || "Medio",
  };
}

function mapEmployeeFromDb(employee) {
  return normalizeEmployee({
    id: employee.id,
    name: employee.name,
    cpf: employee.cpf,
    role: employee.job_role,
    companyId: employee.company_id,
    asoValidity: employee.aso_validity,
    trainingValidity: employee.training_validity,
    docStatus: employee.document_status,
    address: employee.address,
    notes: employee.notes,
    status: employee.hiring_status,
  });
}

function mapEmployeeToDb(employee) {
  const item = normalizeEmployee(employee);
  return {
    id: item.id,
    name: item.name,
    cpf: item.cpf,
    job_role: item.role,
    company_id: item.companyId,
    aso_validity: item.asoValidity || null,
    training_validity: item.trainingValidity || null,
    document_status: item.docStatus,
    address: item.address,
    notes: item.notes,
    hiring_status: item.status,
  };
}

function mapDocumentFromDb(doc) {
  return {
    id: doc.id,
    companyId: doc.company_id,
    employeeId: doc.employee_id || "",
    type: doc.type,
    dueDate: doc.due_date,
    status: doc.status,
    notes: doc.notes || "",
    filePath: doc.file_path || "",
  };
}

function mapDocumentToDb(doc) {
  return {
    id: doc.id,
    company_id: doc.companyId,
    employee_id: doc.employeeId || null,
    type: doc.type,
    due_date: doc.dueDate || null,
    status: doc.status,
    notes: doc.notes || "",
    file_path: doc.filePath || null,
  };
}

function option(value) {
  return { value, label: value };
}

function companyName(id) {
  return state.companies.find((company) => company.id === id)?.name || "Nao informado";
}

function employeeName(id) {
  return state.employees.find((employee) => employee.id === id)?.name || "Nao informado";
}

function docStatus(doc) {
  if (doc.status !== "Aprovado") return doc.status;
  const todayDate = new Date(today());
  const due = new Date(doc.dueDate);
  const diffDays = Math.ceil((due - todayDate) / 86400000);
  if (diffDays < 0) return "Vencido";
  if (diffDays <= 30) return "A vencer";
  return "Aprovado";
}

function contractDays(company) {
  if (!company?.endDate) return Number.NaN;
  const due = new Date(company.endDate);
  if (Number.isNaN(due.getTime())) return Number.NaN;
  return Math.ceil((due - new Date(today())) / 86400000);
}

function contractUnit(company) {
  return company.unit || company.unidade || company.responsible || company.fiscal || "Corporativo";
}

function formatDate(value) {
  if (!value) return "Nao informado";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(value));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replaceAll("'", "&#039;");
}

boot();
