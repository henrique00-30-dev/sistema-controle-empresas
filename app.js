const STORAGE_KEY = "sctempresas.v1";
const ONLINE_STORAGE_NOTE =
  "Modo online preparado com Supabase. Configure supabase-config.js para usar autenticacao, banco e armazenamento online.";

const PROFILE_LABELS = {
  admin: "Administrador",
  fiscal: "Fiscal",
  supplier: "Fornecedor",
  visitor:"Visitante",
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
    view: ["dashboard", "companies", "employees", "documents", "users", "reports"],
    create: ["company", "employee", "document", "user"],
    edit: ["company", "employee", "document", "user"],
    delete: ["company", "employee", "document", "user"],
    approveDocuments: true,
    updateHiringStatus: true,
    addObservations: true,
    reports: true,
  },
  fiscal: {
    view: ["dashboard", "companies", "employees", "documents", "reports"],
    create: [],
    edit: ["document", "employeeStatus"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: true,
    addObservations: true,
    reports: true,
  },
  supplier: {
    view: ["dashboard", "companies", "employees", "documents"],
    create: ["employee", "document"],
    edit: ["companyOwn", "employeeOwn", "documentOwn"],
    delete: [],
    approveDocuments: false,
    updateHiringStatus: false,
    addObservations: true,
    reports: false,
  },
  visitor: {
    view: ["dashboard", "companies", "employees", "documents"],
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

const app = document.querySelector("#app");
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
let authMode = supabaseClient ? "supabase" : "local";
let isLoading = Boolean(supabaseClient);

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
          <div class="logo-mark">CT</div>
          <div>
            <h1>Controle de Terceirizadas</h1>
            <p>Gestao de fornecedores, funcionarios e documentos obrigatorios.</p>
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
          ${isOnlineMode() ? "Use um usuario criado no Supabase Auth." : "Modo demonstracao local"}<br />
          Admin: admin@sistema.com / admin123<br />
          Fiscal: fiscal@sistema.com / fiscal123<br />
          Fornecedor: fornecedor@sistema.com / fornecedor123<br />
          Visitante: visitante@sistema.com / visitante123
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
  const views = [
    ["dashboard", "Painel", "dashboard"],
    ["companies", "Empresas", "company"],
    ["employees", "Funcionarios", "users"],
    ["documents", "Documentos", "docs"],
    ["reports", "Relatorios", "docs"],
  ].filter(([id]) => canView(id));
  if (canView("users")) views.push(["users", "Usuarios", "users"]);
  if (!canView(currentView)) currentView = views[0]?.[0] || "dashboard";

  app.innerHTML = `
    <section class="app-shell">
      <aside class="sidebar">
        <div class="side-head">
          <div class="logo-mark">CT</div>
          <div>
            <strong>Controle Terceiros</strong>
            <span>${roleName(user.role)}</span>
          </div>
        </div>
        <nav class="nav">
          ${views
            .map(
              ([id, label, iconName]) =>
                `<button class="${currentView === id ? "active" : ""}" data-view="${id}">${icon(iconName)} ${label}</button>`,
            )
            .join("")}
        </nav>
      </aside>
      <div class="main">
        <header class="topbar">
          <div>
            <h1>${viewTitle()}</h1>
            <span class="muted">Bem-vindo, ${user.name} - ${isOnlineMode() ? "online Supabase" : "modo local"}</span>
          </div>
          <div class="top-actions">
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

  bindViewEvents();
}

function roleName(role) {
  return PROFILE_LABELS[role] || "Visitante";
}

function viewTitle() {
  return {
    dashboard: "Painel de conformidade",
    companies: "Empresas terceirizadas",
    employees: "Funcionarios",
    documents: "Documentos",
    users: "Usuarios administrativos",
    reports: "Relatorios",
  }[currentView];
}

function renderView() {
  return {
    dashboard: renderDashboard,
    companies: renderCompanies,
    employees: renderEmployees,
    documents: renderDocuments,
    users: renderUsers,
    reports: renderReports,
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

function renderDashboard() {
  const totals = {
    companies: visibleCompanies().length,
    employees: visibleEmployees().length,
    expired: visibleDocuments().filter((doc) => docStatus(doc) === "Vencido").length,
    warning: visibleDocuments().filter((doc) => docStatus(doc) === "A vencer").length,
  };
  const criticalDocs = visibleDocuments().filter((doc) => ["Vencido", "A vencer", "Pendente"].includes(docStatus(doc))).slice(0, 6);

  return `
    <div class="stats-grid">
      <div class="stat-card"><span>Empresas ativas</span><strong>${totals.companies}</strong></div>
      <div class="stat-card"><span>Funcionarios</span><strong>${totals.employees}</strong></div>
      <div class="stat-card"><span>Documentos vencidos</span><strong>${totals.expired}</strong></div>
      <div class="stat-card"><span>A vencer</span><strong>${totals.warning}</strong></div>
    </div>
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Alertas documentais</h2><span class="mini-pill">${criticalDocs.length} itens</span></div>
        <div class="item-list modal-body">
          ${criticalDocs.length ? criticalDocs.map(renderDocCard).join("") : `<div class="empty">Nenhum alerta documental agora.</div>`}
        </div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Fornecedores por risco</h2></div>
        <div class="modal-body item-list">
          ${["Alto", "Medio", "Baixo"].map((risk) => renderRiskLine(risk)).join("")}
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
      <td>${rowActions("employee", employee.id)}</td>
    </tr>
  `;
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
  const byHiring = hiringStatuses
    .map((status) => ({ status, count: employees.filter((employee) => normalizeEmployee(employee).status === status).length }))
    .filter((item) => item.count > 0);
  const docPendencies = documents.filter((doc) => ["Vencido", "A vencer", "Pendente", "Reprovado"].includes(docStatus(doc)));

  return `
    <section class="panel report-panel">
      <div class="modal-head">
        <h2>Relatorio operacional</h2>
        ${can("reports.generate") ? `<button class="btn secondary" type="button" onclick="window.print()">Gerar relatorio</button>` : ""}
      </div>
      <div class="modal-body report-grid">
        <div class="stat-card"><span>Empresas visiveis</span><strong>${companies.length}</strong></div>
        <div class="stat-card"><span>Funcionarios visiveis</span><strong>${employees.length}</strong></div>
        <div class="stat-card"><span>Documentos monitorados</span><strong>${documents.length}</strong></div>
        <div class="stat-card"><span>Pendencias</span><strong>${docPendencies.length}</strong></div>
      </div>
    </section>
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Status de contratacao</h2></div>
        <div class="modal-body item-list">
          ${byHiring.length ? byHiring.map((item) => `<div class="item-card"><div class="item-row"><strong>${item.status}</strong>${statusBadge(item.status)}</div><span class="muted">${item.count} funcionario(s)</span></div>`).join("") : `<div class="empty">Sem funcionarios cadastrados.</div>`}
        </div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Pendencias documentais</h2></div>
        <div class="modal-body item-list">
          ${docPendencies.length ? docPendencies.map(renderDocCard).join("") : `<div class="empty">Nenhuma pendencia documental.</div>`}
        </div>
      </section>
    </div>
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
      <input class="search" id="searchInput" placeholder="${placeholder}" value="${searchTerm}" />
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
  }[status] || "info";
  return `<span class="status ${kind}">${status}</span>`;
}

function bindViewEvents() {
  document.querySelector("#searchInput")?.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderApp();
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
