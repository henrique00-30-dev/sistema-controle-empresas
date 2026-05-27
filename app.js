const STORAGE_KEY = "sctempresas.v1";
const ONLINE_STORAGE_NOTE =
  "Modo online preparado. Configure supabase-config.js para usar autenticacao, banco e armazenamento online.";

const PROFILE_LABELS = {
  admin: "Administrador",
  fiscal: "Fiscal",
  medicina: "Medicina",
  ehs: "EHS",
  patrimonial: "Patrimonial",
  supplier: "Fornecedor",
  visitor: "Visitante",
};

const DB_PROFILE_TO_APP_ROLE = {
  administrador: "admin",
  fiscal: "fiscal",
  medicina: "medicina",
  ehs: "ehs",
  patrimonial: "patrimonial",
  fornecedor: "supplier",
  visitante: "visitor",
  super_admin: "admin",
  admin: "admin",
  medicine: "medicina",
  medical: "medicina",
  property: "patrimonial",
  supplier: "supplier",
  visitor: "visitor",
};

const APP_ROLE_TO_DB_PROFILE = {
  admin: "administrador",
  fiscal: "fiscal",
  medicina: "medicina",
  ehs: "ehs",
  patrimonial: "patrimonial",
  supplier: "fornecedor",
  visitor: "visitante",
  super_admin: "super_admin",
};
const DB_PROFILE_VALUES = Object.freeze(["administrador", "fiscal", "medicina", "ehs", "patrimonial", "fornecedor", "visitante", "super_admin"]);

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
    approvalSectors: ["Fiscal", "Medicina", "EHS", "Patrimonial"],
    employeeTabs: ["personal", "docs", "medicine", "ehs", "patrimonial", "integration", "history", "demobilization"],
  },
  fiscal: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "approvals", "blocks", "reports", "settings"],
    create: [],
    edit: ["document"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: false,
    addObservations: true,
    reports: true,
    approvalSectors: ["Fiscal"],
    employeeTabs: ["personal", "docs", "history"],
  },
  medicina: {
    view: ["dashboard", "employees", "documents", "approvals", "settings"],
    create: [],
    edit: ["document"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: false,
    addObservations: true,
    reports: false,
    approvalSectors: ["Medicina"],
    employeeTabs: ["personal", "medicine", "history"],
  },
  ehs: {
    view: ["dashboard", "employees", "documents", "workflow", "approvals", "settings"],
    create: [],
    edit: ["document"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: false,
    addObservations: true,
    reports: false,
    approvalSectors: ["EHS"],
    employeeTabs: ["personal", "ehs", "integration", "history"],
  },
  patrimonial: {
    view: ["dashboard", "employees", "documents", "approvals", "blocks", "settings"],
    create: [],
    edit: ["document"],
    delete: [],
    approveDocuments: true,
    updateHiringStatus: false,
    addObservations: true,
    reports: false,
    approvalSectors: ["Patrimonial"],
    employeeTabs: ["personal", "patrimonial", "history"],
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
    approvalSectors: [],
    employeeTabs: ["personal", "docs", "medicine", "ehs", "patrimonial", "integration", "history", "demobilization"],
  },
  visitor: {
    view: ["dashboard", "companies", "contracts", "employees", "documents", "workflow", "thirdparty", "compliance", "settings"],
    create: [],
    edit: [],
    delete: [],
    approveDocuments: false,
    updateHiringStatus: false,
    addObservations: false,
    reports: false,
    approvalSectors: [],
    employeeTabs: ["personal", "docs", "medicine", "ehs", "patrimonial", "integration", "history"],
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
  historico: [],
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
  "Pendente",
  "Documentos pendente",
  "Aguardando exames",
  "Em treinamento",
  "Aguardando aprovacao do fiscal",
  "Aprovado",
  "Liberado",
  "Ativo com pendencia",
  "Bloqueado",
  "Desmobilizado",
  "Inativo",
];

const documentStatuses = ["Regular", "Pendente", "A vencer", "Vencido", "Reprovado"];
const DOC_META_MARKER = "\n\n[SCT_ENTERPRISE_META]";
const EMPLOYEE_META_MARKER = "\n\n[SCT_EMPLOYEE_META]";
const DOCUMENT_WORKFLOW_SECTORS = ["Fiscal", "Medicina", "EHS", "Patrimonial"];

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
const PAGE_SIZE_OPTIONS = [25, 50, 100];
const tableState = {
  companies: { page: 1, pageSize: 25, sort: "name", dir: "asc", quick: "Todos", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
  contracts: { page: 1, pageSize: 25, sort: "contract", dir: "asc", quick: "Todos", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
  employees: { page: 1, pageSize: 25, sort: "name", dir: "asc", quick: "Todos", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
  documents: { page: 1, pageSize: 25, sort: "dueDate", dir: "asc", quick: "Todos", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
  approvals: { page: 1, pageSize: 25, sort: "dueDate", dir: "asc", quick: "Pendente", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
  blocks: { page: 1, pageSize: 25, sort: "name", dir: "asc", quick: "Bloqueado", company: "Todos", contract: "Todos", sector: "Todos", costCenter: "Todos" },
};
let searchRenderTimer = null;
const contractDetailState = {};
let authMode = supabaseClient ? "supabase" : "local";
let isLoading = Boolean(supabaseClient);
let authNotice = "";
let darkMode = localStorage.getItem("sctempresas.theme") !== "light";
let sidebarCollapsed = localStorage.getItem("sctempresas.sidebar") === "collapsed";

applyAutomaticStatusRules({ source: "Inicializacao local" });

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
  data.historico ||= data.history || [];

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
  [
    ["medicina", "Medicina Ocupacional", "medicina@sistema.com", "medicina123"],
    ["ehs", "Analista EHS", "ehs@sistema.com", "ehs123"],
    ["patrimonial", "Seguranca Patrimonial", "patrimonial@sistema.com", "patrimonial123"],
  ].forEach(([role, name, email, password]) => {
    if (!data.users.some((user) => user.role === role)) {
      data.users.push({ id: crypto.randomUUID(), name, email, password, role, active: true });
    }
  });

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
    filePath: "",
    auditTrail: [],
    sectorComments: {},
  };
}

function saveState(nextState = state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function isOnlineMode() {
  return authMode === "supabase" && supabaseClient;
}

class PersistenceError extends Error {
  constructor(message, context = {}, originalError = null) {
    super(message);
    this.name = "PersistenceError";
    this.context = context;
    this.originalError = originalError;
  }
}

function persistenceMessage(error) {
  const original = error?.originalError || error;
  const details = [
    original?.code ? `code: ${original.code}` : "",
    original?.message ? `message: ${original.message}` : "",
    original?.details ? `details: ${original.details}` : "",
    original?.hint ? `hint: ${original.hint}` : "",
  ].filter(Boolean);
  const base = error instanceof PersistenceError ? error.message : error?.message || "Erro desconhecido de persistencia.";
  return details.length ? `${base}\n\nDetalhes Supabase:\n${details.join("\n")}` : base;
}

function logPersistenceError(error, fallbackContext = {}) {
  const context = error?.context || fallbackContext;
  const originalError = error?.originalError || error;
  console.error("[Persistencia Supabase] Falha ao salvar dados", {
    tabela: context.table || "nao identificada",
    operacao: context.operation || "nao identificada",
    dica: context.hint || "Verifique policies, auth.uid(), foreign keys e campos obrigatorios.",
    payload: context.payload || null,
    erro: originalError,
  });
}

function wrapPersistenceError(error, context) {
  if (error instanceof PersistenceError) return error;
  const rawMessage = String(error?.message || "");
  const code = error?.code || error?.statusCode || error?.status;
  const isRls = code === "42501" || /row-level security|violates row-level security|rls/i.test(rawMessage);
  const isFk = code === "23503" || /foreign key/i.test(rawMessage);
  const isRequired = code === "23502" || /null value|not-null|violates not-null/i.test(rawMessage);
  const isAuth = /auth\.uid|jwt|session|not authenticated|unauthorized/i.test(rawMessage);
  const hint = isRls
    ? "Permissao negada por policy. Se a tabela public.documents esta unrestricted, verifique principalmente policies do bucket storage.objects e auth.uid()."
    : isFk
      ? "Chave estrangeira invalida. Confira se empresa e funcionario existem e se o funcionario pertence a empresa selecionada."
      : isRequired
        ? "Campo obrigatorio ausente. Confira empresa, tipo, status e demais campos obrigatorios."
        : isAuth
          ? "Sessao invalida ou auth.uid() indisponivel. Entre novamente no sistema."
          : "Falha retornada pelo Supabase. Veja o erro detalhado no console.";
  return new PersistenceError(`Falha em ${context.table}: ${hint}`, { ...context, hint }, error);
}

function wrapUserPersistenceError(error, context) {
  if (error instanceof PersistenceError) return error;
  const code = error?.code || error?.statusCode || error?.status;
  const rawMessage = String(error?.message || "");
  const isDuplicate = code === "23505" || /duplicate key|unique/i.test(rawMessage);
  const isEnum = code === "22P02" || /perfil_usuario|invalid input value for enum|enum/i.test(rawMessage);
  const isFk = code === "23503" || /foreign key/i.test(rawMessage);
  const isRequired = code === "23502" || /null value|not-null/i.test(rawMessage);
  const isRls = code === "42501" || /row-level security|violates row-level security|rls/i.test(rawMessage);
  const hint = isDuplicate
    ? "E-mail ja cadastrado. Use outro e-mail ou edite o usuario existente."
    : isEnum
      ? `Perfil invalido para o enum perfil_usuario. Valores aceitos: ${DB_PROFILE_VALUES.join(", ")}.`
      : isFk
        ? "ID do usuario nao existe em auth.users ou empresa_id nao existe. Crie primeiro o usuario no Auth do Supabase e depois vincule o perfil."
        : isRequired
          ? "Campo obrigatorio ausente em public.usuarios. Confira nome, email, perfil e ativo."
          : isRls
            ? "Permissao negada por RLS em public.usuarios. O cadastro tentara usar o id do Auth criado para respeitar auth.uid()."
            : `Supabase retornou: ${rawMessage || "erro sem mensagem"}${code ? ` (code ${code})` : ""}.`;
  return new PersistenceError(`Falha em public.usuarios: ${hint}`, { ...context, hint }, error);
}

function logUserPersistenceError(payload, error) {
  const originalError = error?.originalError || error;
  console.error("[Usuarios Supabase] Erro public.usuarios", {
    payload,
    payload_enviado: payload,
    payload_enviado_public_usuarios: payload,
    code: originalError?.code || null,
    message: originalError?.message || error?.message || null,
    details: originalError?.details || null,
    hint: originalError?.hint || error?.context?.hint || null,
    error: originalError,
  });
}

function logAuthUserError(payload, error, level = "error") {
  const originalError = error?.originalError || error;
  console[level]("[Usuarios Supabase] Erro Auth", {
    payload_enviado_auth: payload,
    code: originalError?.code || originalError?.status || originalError?.statusCode || null,
    message: originalError?.message || null,
    details: originalError?.details || null,
    hint: originalError?.hint || null,
    error: originalError,
  });
}

function logHistoryPersistenceError(payload, error) {
  const originalError = error?.originalError || error;
  console.error("[Historico Supabase] Erro historico", {
    payload_enviado_historico: payload,
    code: originalError?.code || originalError?.status || originalError?.statusCode || null,
    message: originalError?.message || null,
    details: originalError?.details || null,
    hint: originalError?.hint || null,
    error: originalError,
  });
}

async function ensureOnlineSession(table) {
  if (!isOnlineMode()) return null;
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error || !user) {
    throw wrapPersistenceError(error || new Error("Usuario nao autenticado; auth.uid() indisponivel."), {
      table,
      operation: "auth.uid()",
    });
  }
  return user;
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
  const profile = await fetchProfile(authUser);
  state.session = profile.id;
  state.users = upsertById(state.users, profile);
  try {
    await loadRemoteData();
    state.users = upsertById(state.users, profile);
    await persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Login e carga Supabase" }));
  } catch (error) {
    console.warn("[Login Supabase] Login autenticado, mas a carga de dados operacionais falhou.", error);
  }
  saveState();
  return profile;
}

async function fetchProfile(authUser) {
  const email = String(authUser?.email || "").trim().toLowerCase();
  console.info("[Login Supabase] Buscando perfil", { auth_user_id: authUser?.id || null, email });
  const usuario = await fetchProfileFromTable("usuarios", email, authUser?.id);
  if (usuario?.data) return validateAuthenticatedProfile(mapUserFromDb(usuario.data), email, "public.usuarios");
  if (usuario?.error && !isMissingRestTableError(usuario.error)) {
    throw wrapUserPersistenceError(usuario.error, { table: "public.usuarios", operation: "select perfil por email", payload: { email } });
  }
  if (usuario?.error) console.warn("[Login Supabase] public.usuarios indisponivel no REST schema cache. Tentando public.profiles.", usuario.error);

  const profileResult = await fetchProfileFromTable("profiles", email, authUser?.id);
  if (profileResult?.data) return validateAuthenticatedProfile(mapUserFromDb(profileResult.data), email, "public.profiles");
  if (profileResult?.error && !isMissingRestTableError(profileResult.error)) {
    throw wrapUserPersistenceError(profileResult.error, { table: "public.profiles", operation: "select perfil por email/id", payload: { email, id: authUser?.id || null } });
  }
  if (profileResult?.error) console.warn("[Login Supabase] public.profiles tambem indisponivel no REST schema cache.", profileResult.error);

  const metadataProfile = profileFromAuthMetadata(authUser);
  if (metadataProfile) {
    console.warn("[Login Supabase] Usando perfil de emergencia a partir do Auth metadata/local enquanto public.usuarios nao esta disponivel no REST.");
    return validateAuthenticatedProfile(metadataProfile, email, "supabase.auth metadata");
  }

  const localProfile = state.users.find((user) => String(user.email || "").trim().toLowerCase() === email);
  if (localProfile) {
    console.warn("[Login Supabase] Usando perfil local autenticado enquanto public.usuarios nao esta disponivel no REST.", { email, role: localProfile.role });
    return validateAuthenticatedProfile({ ...localProfile, id: authUser?.id || localProfile.id }, email, "perfil local");
  }

  throw new PersistenceError("Usuario autenticado, mas sem perfil cadastrado.", {
    table: "public.usuarios/public.profiles",
    operation: "select perfil por email",
    payload: { email, id: authUser?.id || null },
    hint: "A API REST nao encontrou public.usuarios no schema cache. Recarregue o schema cache do Supabase ou mantenha um perfil em public.profiles.",
  });
}

async function fetchProfileFromTable(table, email, userId) {
  console.info(`[Login Supabase] Consultando public.${table}`, { email, id: userId || null });
  let result = await supabaseClient.from(table).select("*").eq("email", email).maybeSingle();
  console.info(`[Login Supabase] Resultado public.${table} por email`, { data: result.data, error: result.error });
  if (!result.error || isMissingRestTableError(result.error) || !userId) return result;
  result = await supabaseClient.from(table).select("*").eq("id", userId).maybeSingle();
  console.info(`[Login Supabase] Resultado public.${table} por id`, { data: result.data, error: result.error });
  return result;
}

function validateAuthenticatedProfile(profile, email, source) {
  if (!profile) {
    throw new PersistenceError("Usuario autenticado, mas sem perfil cadastrado.", {
      table: source,
      operation: "select perfil por email",
      payload: { email },
      hint: "Crie um registro em public.usuarios com o mesmo email do Supabase Auth.",
    });
  }
  if (profile.active === false) {
    throw new PersistenceError("Usuario autenticado, mas esta inativo no cadastro de perfis.", {
      table: source,
      operation: "validacao perfil ativo",
      payload: { email },
      hint: "Altere ativo para true em public.usuarios.",
    });
  }
  return profile;
}

function profileFromAuthMetadata(authUser) {
  const metadata = { ...(authUser?.app_metadata || {}), ...(authUser?.user_metadata || {}) };
  const perfil = metadata.perfil || metadata.role;
  const email = String(authUser?.email || "").toLowerCase();
  if (!perfil && email !== "henrique00-30@hotmail.com") return null;
  return mapUserFromDb({
    id: authUser?.id || crypto.randomUUID(),
    nome: metadata.nome || metadata.name || authUser?.email,
    email: authUser?.email || "",
    perfil: perfil || "administrador",
    ativo: true,
    empresa_id: metadata.empresa_id || metadata.company_id || null,
    setor: metadata.setor || null,
    matricula: metadata.matricula || null,
  });
}

function isMissingRestTableError(error) {
  const text = `${error?.code || ""} ${error?.message || ""} ${error?.details || ""}`.toLowerCase();
  return /pgrst205|schema cache|could not find the table/.test(text);
}

async function loadRemoteData() {
  const [companies, employees, documents, profiles] = await Promise.all([
    supabaseClient.from("companies").select("*").order("name"),
    supabaseClient.from("employees").select("*").order("name"),
    supabaseClient.from("documents").select("*").order("due_date"),
    fetchUsersForAccessControl(),
  ]);

  for (const result of [companies, employees, documents, profiles]) {
    if (result.error) throw result.error;
  }

  state.companies = companies.data.map(mapCompanyFromDb);
  state.employees = employees.data.map(mapEmployeeFromDb);
  state.documents = documents.data.map(mapDocumentFromDb);
  state.users = profiles.data.map(mapUserFromDb);
  state.historico = await loadRemoteHistory();
}

async function fetchUsersForAccessControl() {
  if (!can("users.view")) return { data: state.users, error: null };
  const usuarios = await supabaseClient.from("usuarios").select("*").order("nome");
  if (!usuarios.error) return usuarios;
  console.warn("Tabela usuarios indisponivel; usando profiles como fallback.", usuarios.error);
  return supabaseClient.from("profiles").select("*").order("nome");
}

async function loadRemoteHistory() {
  if (!isOnlineMode()) return state.historico || [];
  try {
    const { data, error } = await supabaseClient.from("historico").select("*").order("criado_em", { ascending: false }).limit(500);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Tabela historico indisponivel ou sem permissao de leitura. O sistema continuara sem quebrar.", error);
    return state.historico || [];
  }
}

async function syncCollection(collection, item) {
  if (!isOnlineMode()) return;
  if (collection === "users") {
    await syncUserRecord(item);
    return;
  }
  const table = {
    companies: "companies",
    employees: "employees",
    documents: "documents",
    users: "usuarios",
  }[collection];
  const mapper = {
    companies: mapCompanyToDb,
    employees: mapEmployeeToDb,
    documents: mapDocumentToDb,
    users: mapUserToDb,
  }[collection];
  const payload = mapper(item);
  const context = {
    table: `public.${table}`,
    operation: "upsert",
    payload,
  };
  try {
    await ensureOnlineSession(context.table);
    const { error } = await supabaseClient.from(table).upsert(payload);
    if (error) throw error;
  } catch (error) {
    throw wrapPersistenceError(error, context);
  }
}

async function syncUserRecord(user) {
  const isNewUser = !user.id || user.isNew === true;
  const authResult = isNewUser ? await createAuthUserForUsuario(user) : { ok: true, skipped: true };
  const authUserId = authResult?.userId || null;
  const payload = mapUserToDb({ ...user, id: user.id || authUserId }, { includeId: Boolean(isNewUser && authUserId) });
  const context = {
    table: "public.usuarios",
    operation: isNewUser ? "insert/update por email" : "update",
    payload,
  };
  try {
    validateUserPayload(payload);
    await ensureOnlineSession(context.table);
    const existing = await findUsuarioByEmail(payload.email);
    const dbPayload = existing?.id ? withoutKeys(payload, ["id"]) : payload;
    const runMutation = () =>
      existing?.id
        ? supabaseClient.from("usuarios").update(dbPayload).eq("id", existing.id)
        : supabaseClient.from("usuarios").insert(dbPayload);
    let { error } = await runMutation();
    if (error && isRlsError(error) && authResult?.session?.access_token && payload.id === authResult.userId) {
      console.warn("[Usuarios Supabase] RLS ao salvar com a sessao atual. Tentando novamente com a sessao do usuario Auth criado.", {
        payload_enviado_public_usuarios: dbPayload,
        code: error.code || null,
        message: error.message || null,
        details: error.details || null,
        hint: error.hint || null,
      });
      await supabaseClient.auth.setSession({
        access_token: authResult.session.access_token,
        refresh_token: authResult.session.refresh_token,
      });
      const retry = await runMutation();
      error = retry.error;
      await restoreSupabaseSession(authResult.previousSession);
    }
    if (error) throw error;
    const saved = mapUserFromDb({ ...payload, id: existing?.id || payload.id || user.id || crypto.randomUUID() });
    await recordUserCreationHistory(saved, authResult, Boolean(existing?.id));
    return saved;
  } catch (error) {
    logUserPersistenceError(payload, error);
    throw wrapUserPersistenceError(error, context);
  }
}

async function createAuthUserForUsuario(user) {
  if (!isOnlineMode()) return { ok: true, skipped: true };
  const authPayload = {
    email: optionalText(user.email),
    password: optionalText(user.password),
    options: {
      data: {
        nome: optionalText(user.name),
        perfil: normalizePerfilUsuario(user.role || user.perfil).toLowerCase(),
      },
    },
  };
  if (!authPayload.email || !authPayload.password) return { ok: true, skipped: true, reason: "sem email ou senha" };
  const previousSession = await supabaseClient.auth.getSession().catch(() => null);
  const previous = previousSession?.data?.session;
  const { data, error } = await supabaseClient.auth.signUp(authPayload);
  const signedUserId = data?.user?.id || null;
  await restoreSupabaseSession(previous);
  if (error) {
    if (isAuthDuplicateError(error)) {
      logAuthUserError(authPayload, error, "warn");
      return { ok: true, duplicate: true, error, previousSession: previous };
    }
    logAuthUserError(authPayload, error);
    throw new PersistenceError(`Erro Auth: ${friendlyAuthError(error)}`, { table: "supabase.auth", operation: "signUp", payload: { email: authPayload.email, perfil: authPayload.options.data.perfil } }, error);
  }
  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    const duplicateInfo = new Error("E-mail ja cadastrado no Supabase Auth.");
    logAuthUserError(authPayload, duplicateInfo, "warn");
    return { ok: true, duplicate: true, userId: signedUserId, session: data?.session || null, previousSession: previous };
  }
  return { ok: true, userId: signedUserId, session: data?.session || null, previousSession: previous };
}

async function restoreSupabaseSession(session) {
  if (!session?.access_token) return;
  const currentSession = await supabaseClient.auth.getSession().catch(() => null);
  if (currentSession?.data?.session?.user?.id === session.user?.id) return;
  await supabaseClient.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  }).catch((restoreError) => console.warn("[Usuarios Supabase] Nao foi possivel restaurar sessao anterior.", restoreError));
}

async function findUsuarioByEmail(email) {
  if (!email) return null;
  const { data, error } = await supabaseClient.from("usuarios").select("*").eq("email", email).maybeSingle();
  if (error) {
    logUserPersistenceError({ email }, error);
    throw wrapUserPersistenceError(error, { table: "public.usuarios", operation: "select por email", payload: { email } });
  }
  return data || null;
}

async function recordUserCreationHistory(user, authResult, updatedExisting) {
  const history = createHistoryEvent({
    entityType: "usuario",
    entityId: user.id,
    action: updatedExisting ? "Usuario atualizado" : "Usuario criado",
    previousStatus: "",
    nextStatus: user.active ? "Ativo" : "Inativo",
    observation: authResult?.duplicate
      ? `Usuario ${user.email} salvo em public.usuarios. O e-mail ja existia no Supabase Auth.`
      : `Usuario ${user.email} salvo em public.usuarios.`,
  });
  state.historico = upsertById(state.historico, history);
  await syncHistoryEvent(history);
}

function isAuthDuplicateError(error) {
  const text = `${error?.message || ""} ${error?.code || ""}`.toLowerCase();
  return /already registered|already exists|user already|email.*exist|email_exists|duplicate/.test(text);
}

function isRlsError(error) {
  const text = `${error?.message || ""} ${error?.code || ""}`.toLowerCase();
  return /42501|row-level security|violates row-level security|rls/.test(text);
}

function friendlyAuthError(error) {
  if (isAuthDuplicateError(error)) return "e-mail ja existe no Supabase Auth.";
  return error?.message || "falha ao criar usuario no Supabase Auth.";
}

async function syncHistoryEvent(event) {
  if (!isOnlineMode()) return;
  const payload = {
    id: event.id,
    entidade_tipo: event.entityType,
    entidade_id: event.entityId,
    acao: event.action,
    status_anterior: event.previousStatus || null,
    status_novo: event.nextStatus || null,
    usuario_id: event.userId || null,
    usuario_nome: event.userName || "Sistema",
    observacao: event.observation || "",
    criado_em: event.createdAt,
  };
  try {
    await ensureOnlineSession("public.historico");
    const { error } = await supabaseClient.from("historico").insert(payload);
    if (error) throw error;
  } catch (error) {
    logHistoryPersistenceError(payload, error);
    console.warn("Nao foi possivel registrar em public.historico. A mudanca foi mantida localmente.", { payload, error });
  }
}

async function persistAutomaticStatusChanges(changes) {
  if (!isOnlineMode() || !changes.length) return;
  const byKey = new Map();
  changes.forEach((change) => byKey.set(`${change.collection}:${change.item.id}`, change));
  await Promise.all(
    Array.from(byKey.values()).map((change) =>
      syncCollection(change.collection, change.item).catch((error) => {
        console.warn("Nao foi possivel sincronizar status automatico.", { collection: change.collection, id: change.item.id, error });
      }),
    ),
  );
  await Promise.all(changes.map((change) => syncHistoryEvent(change.history)));
}

async function deleteRemote(collection, id) {
  if (!isOnlineMode()) return;
  const table = {
    companies: "companies",
    employees: "employees",
    documents: "documents",
    users: "usuarios",
  }[collection];
  const { error } = await supabaseClient.from(table).delete().eq("id", id);
  if (error && collection === "users" && table === "usuarios") {
    const fallback = await supabaseClient.from("profiles").delete().eq("id", id);
    if (!fallback.error) return;
  }
  if (error) throw error;
}

function upsertById(items, item) {
  return items.some((current) => current.id === item.id)
    ? items.map((current) => (current.id === item.id ? { ...current, ...item } : current))
    : [...items, item];
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function withoutKeys(object, keys = []) {
  const copy = { ...(object || {}) };
  keys.forEach((key) => delete copy[key]);
  return copy;
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
  if (isPasswordRecoveryRoute()) {
    renderPasswordRecovery();
    return;
  }
  if (!currentUser()) {
    renderLogin();
    return;
  }
  renderApp();
}

function recoveryParams() {
  const hash = new URLSearchParams(String(window.location.hash || "").replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search || "");
  return {
    accessToken: hash.get("access_token") || query.get("access_token"),
    refreshToken: hash.get("refresh_token") || query.get("refresh_token"),
    type: hash.get("type") || query.get("type"),
  };
}

function isPasswordRecoveryRoute() {
  const params = recoveryParams();
  return isOnlineMode() && params.type === "recovery" && Boolean(params.accessToken);
}

function clearRecoveryUrl() {
  if (window.history?.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function renderPasswordRecovery() {
  app.innerHTML = `
    <section class="login-shell">
      <div class="login-panel">
        <div class="login-brand">
          <div class="logo-mark">CI</div>
          <div>
            <span class="eyebrow">Recuperacao de acesso</span>
            <h1>Redefinir senha</h1>
            <p>Informe uma nova senha para concluir a recuperacao do acesso pelo Supabase Auth.</p>
          </div>
        </div>
        <form class="login-form" id="recoveryForm">
          <label>Nova senha
            <input name="password" type="password" autocomplete="new-password" minlength="6" required />
          </label>
          <label>Confirmar nova senha
            <input name="confirmPassword" type="password" autocomplete="new-password" minlength="6" required />
          </label>
          <button class="btn primary" type="submit">${icon("save")} Atualizar senha</button>
        </form>
        <div class="login-note">Apos atualizar, voce sera direcionado para a tela de login.</div>
      </div>
    </section>
  `;

  document.querySelector("#recoveryForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    const submit = event.currentTarget.querySelector("button[type='submit']");
    if (password !== confirmPassword) {
      alert("As senhas nao conferem.");
      return;
    }
    submit.disabled = true;
    try {
      const params = recoveryParams();
      const { error: sessionError } = await supabaseClient.auth.setSession({
        access_token: params.accessToken,
        refresh_token: params.refreshToken || params.accessToken,
      });
      if (sessionError) throw new PersistenceError(`Erro ao validar link de recuperacao: ${sessionError.message}`, { table: "supabase.auth", operation: "setSession recovery" }, sessionError);
      const { error } = await supabaseClient.auth.updateUser({ password });
      if (error) throw new PersistenceError(`Erro ao atualizar senha: ${error.message}`, { table: "supabase.auth", operation: "updateUser password" }, error);
      await supabaseClient.auth.signOut().catch((signOutError) => console.warn("[Recuperacao de senha] Nao foi possivel encerrar sessao apos redefinir senha.", signOutError));
      state.session = null;
      authNotice = "Senha redefinida com sucesso. Entre novamente com a nova senha.";
      clearRecoveryUrl();
      saveState();
      renderLogin();
    } catch (error) {
      console.error("[Recuperacao de senha] Falha ao redefinir senha", error);
      alert(`Nao foi possivel redefinir a senha.\n\n${persistenceMessage(error)}`);
      submit.disabled = false;
    }
  });
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
          ${authNotice ? `<div class="login-note">${authNotice}</div>` : ""}
          <label>E-mail
            <input name="email" type="email" autocomplete="username" required />
          </label>
          <label>Senha
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          <button class="btn primary" type="submit">${icon("logout")} Entrar</button>
        </form>
        <div class="login-note">
          ${isOnlineMode() ? "Use um usuario criado no ambiente online." : "Modo demonstracao local"}<br />
          Admin: admin@sistema.com / admin123<br />
          Fiscal: fiscal@sistema.com / fiscal123<br />
          Medicina: medicina@sistema.com / medicina123<br />
          EHS: ehs@sistema.com / ehs123<br />
          Patrimonial: patrimonial@sistema.com / patrimonial123<br />
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
      const email = String(form.get("email") || "").trim().toLowerCase();
      const password = String(form.get("password") || "");
      try {
        console.info("[Login Supabase] Tentando login", { email });
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        console.info("[Login Supabase] Resposta Auth", {
          user: data?.user || null,
          error,
        });
        if (error) {
          console.error("[Login Supabase] Erro Auth", {
            email,
            code: error.code || error.status || error.statusCode || null,
            message: error.message || null,
            details: error.details || null,
            hint: error.hint || null,
            error,
          });
          throw new PersistenceError(`Erro Auth: ${error.message || "falha ao autenticar."}`, { table: "supabase.auth", operation: "signInWithPassword", payload: { email } }, error);
        }
        const profile = await hydrateSupabaseSession(data.user);
        console.info("[Login Supabase] Login concluido", {
          email: profile.email,
          perfil: profile.role,
          nome: profile.name,
        });
        authNotice = "";
        currentView = "dashboard";
        render();
      } catch (error) {
        console.error("[Login Supabase] Falha no fluxo de login", error);
        alert(`Nao foi possivel entrar: ${persistenceMessage(error)}`);
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
          <div class="topbar-title">
            <h1>${viewTitle()}</h1>
            <span class="muted">${currentView === "dashboard" ? "Monitoramento de terceiros e contratos" : "Monitoramento operacional"}</span>
          </div>
          <div class="top-actions">
            <div class="global-search">
              ${icon("search")}
              <input class="search-control" placeholder="Pesquisa" value="${escapeAttr(searchTerm)}" />
            </div>
            <button class="btn icon" id="themeToggle" type="button" title="Alternar tema">${darkMode ? icon("sun") : icon("moon")}</button>
            <div class="user-status-compact" aria-label="Usuario logado">
              <strong>${escapeHtml(user.name || user.email || "Usuario")}</strong>
              <span>${roleName(user.role)} • Online</span>
              <small>Atualizado às ${currentSystemTime()}</small>
            </div>
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
    dashboard: "Dashboard Operacional",
    companies: "Empresas terceirizadas",
    contracts: "Contratos",
    employees: "Funcionarios",
    documents: "Documentos",
    workflow: "Workflow de documentos",
    thirdparty: "Gestao de terceiros",
    compliance: "Conformidade",
    approvals: "Aprovacoes",
    blocks: "Bloqueios",
    users: "Usuarios e perfis",
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

function tableConfig(view) {
  return tableState[view] || tableState.companies;
}

function resetTablePage(view = currentView) {
  if (tableState[view]) tableState[view].page = 1;
}

function sortValue(view, item, key) {
  const company = item.companyId ? state.companies.find((entry) => entry.id === item.companyId) : item;
  const employee = item.employeeId ? state.employees.find((entry) => entry.id === item.employeeId) : null;
  const companyItem = company ? normalizeCompany(company) : {};
  const employeeItem = item.cpf || item.role ? normalizeEmployee(item) : employee ? normalizeEmployee(employee) : {};
  const statusValue = item.dueDate || item.type ? docStatus(item) : item.cpf || item.role || item.blockType === "Funcionario" ? normalizeEmployee(item).status : companyItem.status;
  const values = {
    name: item.blockName || item.name || employeeItem.name || companyItem.name,
    cpf: item.cpf || employeeItem.cpf,
    registration: item.registration || item.matricula || employeeItem.registration || employeeItem.matricula,
    company: companyItem.name || companyName(item.companyId),
    contract: item.contract || companyItem.contract,
    costCenter: employeeCostCenter(item, company) || companyItem.costCenter,
    sector: item.blockType || item.type || item.role || employeeItem.role || contractUnit(companyItem),
    status: statusValue,
    dueDate: item.dueDate || item.endDate,
  };
  return String(values[key] ?? "").toLowerCase();
}

function sortItems(view, items) {
  const config = tableConfig(view);
  return [...items].sort((a, b) => {
    const left = sortValue(view, a, config.sort);
    const right = sortValue(view, b, config.sort);
    return config.dir === "asc" ? left.localeCompare(right) : right.localeCompare(left);
  });
}

function matchesQuickFilter(view, item, quick) {
  if (!quick || quick === "Todos") return true;
  const company = item.companyId ? state.companies.find((entry) => entry.id === item.companyId) : item;
  const employee = item.cpf || item.role ? item : item.employeeId ? state.employees.find((entry) => entry.id === item.employeeId) : null;
  const status = item.dueDate ? docStatus(item) : employee ? normalizeEmployee(employee).status : normalizeCompany(company).status;
  if (quick === "Ativo") return ["Ativa", "Ativo", "Aprovado", "Liberado", "Ativo com pendencia"].includes(status);
  if (quick === "Bloqueado") return ["Bloqueado", "Bloqueada", "Inativo"].includes(status);
  if (quick === "Critico") return ["Bloqueado", "Bloqueada", "Pendente"].includes(status);
  if (quick === "Pendente") return ["Pendente", "A vencer", "Reprovado", "Documentos pendente", "Aguardando exames", "Em treinamento", "Aguardando aprovacao do fiscal", "Ativo com pendencia"].includes(status);
  if (quick === "Vencido") return status === "Vencido";
  if (quick === "Desmobilizado") return ["Desmobilizada", "Desmobilizado", "Inativa", "Inativo"].includes(status);
  if (quick === "Vencendo") return contractDays(company) >= 0 && contractDays(company) <= 60;
  if (quick === "ASO vencido") return employee ? isPastDate(normalizeEmployee(employee).asoValidity) : false;
  if (quick === "Treinamento vencido") return employee ? isPastDate(normalizeEmployee(employee).trainingValidity) : false;
  if (quick === "Medicina") return employee ? employeeMedicineStatus(normalizeEmployee(employee)) === "Pendente" || normalizeEmployee(employee).status === "Aguardando exames" : /aso|exame|medic/i.test(item.type || "");
  if (quick === "EHS") return employee ? employeeEhsStatus(normalizeEmployee(employee)) === "Pendente" || normalizeEmployee(employee).status === "Em treinamento" : /nr-|treinamento|epi|segur/i.test(item.type || "");
  return status === quick;
}

function applyOperationalFilters(view, items) {
  const config = tableConfig(view);
  return items.filter((item) => {
    const company = item.companyId ? state.companies.find((entry) => entry.id === item.companyId) : item;
    const employee = item.cpf || item.role ? item : item.employeeId ? state.employees.find((entry) => entry.id === item.employeeId) : null;
    const companyItem = company ? normalizeCompany(company) : {};
    const employeeItem = employee ? normalizeEmployee(employee) : {};
    const sector = item.type || employeeItem.role || contractUnit(companyItem);
    const costCenter = employeeCostCenter(employeeItem, companyItem);
    return (
      matchesQuickFilter(view, item, config.quick) &&
      (config.company === "Todos" || item.companyId === config.company || item.id === config.company) &&
      (config.contract === "Todos" || companyItem.contract === config.contract) &&
      (config.sector === "Todos" || sector === config.sector) &&
      (config.costCenter === "Todos" || costCenter === config.costCenter)
    );
  });
}

function paginateItems(view, items) {
  const config = tableConfig(view);
  const totalPages = Math.max(1, Math.ceil(items.length / config.pageSize));
  config.page = Math.min(Math.max(1, config.page), totalPages);
  const start = (config.page - 1) * config.pageSize;
  return { pageItems: items.slice(start, start + config.pageSize), totalPages };
}

function sortableHeader(view, label, key) {
  const config = tableConfig(view);
  const active = config.sort === key;
  return `<th><button class="table-sort ${active ? "active" : ""}" type="button" data-sort-view="${view}" data-sort-key="${key}">${label}${active ? ` ${config.dir === "asc" ? "ASC" : "DESC"}` : ""}</button></th>`;
}

function renderPagination(view, total, totalPages) {
  const config = tableConfig(view);
  return `
    <div class="pagination">
      <span>Pagina ${config.page} de ${totalPages} - ${total} registro(s)</span>
      <label class="compact-filter">Por pagina
        <select data-page-size="${view}">
          ${PAGE_SIZE_OPTIONS.map((size) => `<option value="${size}" ${config.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
        </select>
      </label>
      <div>
        <button class="btn secondary compact" type="button" data-page-view="${view}" data-page-step="-1" ${config.page <= 1 ? "disabled" : ""}>Anterior</button>
        <button class="btn secondary compact" type="button" data-page-view="${view}" data-page-step="1" ${config.page >= totalPages ? "disabled" : ""}>Proxima</button>
      </div>
    </div>
  `;
}

function uniqueOptions(values) {
  return ["Todos", ...Array.from(new Set(values.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)))];
}

function renderOperationalFilters(view, items, extra = {}) {
  const config = tableConfig(view);
  const companies = uniqueOptions(items.map((item) => item.companyId || item.id).map((id) => state.companies.find((company) => company.id === id)?.id || id));
  const companyLabels = new Map(state.companies.map((company) => [company.id, company.name]));
  const contracts = uniqueOptions(items.map((item) => normalizeCompany(item.companyId ? state.companies.find((company) => company.id === item.companyId) : item).contract));
  const sectors = uniqueOptions(items.map((item) => item.type || item.role || contractUnit(item.companyId ? state.companies.find((company) => company.id === item.companyId) : item)));
  const costCenters = uniqueOptions(items.map((item) => employeeCostCenter(item, item.companyId ? state.companies.find((company) => company.id === item.companyId) : item)));
  const quicks = extra.quicks || ["Todos", "Ativo", "Bloqueado", "Pendente", "Vencido", "Desmobilizado"];
  return `
    <div class="status-filter operational-filters" aria-label="Filtros rapidos">
      ${quicks.map((filter) => `<button class="${config.quick === filter ? "active" : ""}" type="button" data-quick-view="${view}" data-quick-filter="${filter}">${filter}</button>`).join("")}
      <button class="btn secondary compact" type="button" data-export-future="${extra.exportKey || view}">${icon("reports")} Exportar</button>
    </div>
    <div class="toolbar advanced-filters">
      ${filterSelect("company", view, "Empresa", config.company, companies, companyLabels)}
      ${filterSelect("contract", view, "Contrato", config.contract, contracts)}
      ${filterSelect("sector", view, "Setor", config.sector, sectors)}
      ${filterSelect("costCenter", view, "Centro de custo", config.costCenter, costCenters)}
    </div>
  `;
}

function filterSelect(field, view, label, value, options, labels = new Map()) {
  return `<label class="compact-filter">${label}<select data-filter-view="${view}" data-filter-field="${field}">${options.map((option) => `<option value="${escapeAttr(option)}" ${String(option) === String(value) ? "selected" : ""}>${labels.get(option) || option}</option>`).join("")}</select></label>`;
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
  if (action === "approveDocuments") return permissions.approveDocuments && canApproveDocumentSector(item);
  if (action === "updateHiringStatus") return permissions.updateHiringStatus;
  if (action === "addObservations") return permissions.addObservations;

  if (["create", "edit", "delete"].includes(action)) {
    if (subject === "document" && action === "edit" && permissions.approvalSectors?.length && role !== "admin") {
      return canApproveDocumentSector(item);
    }
    if (permissions[action].includes(subject)) return true;
    if (subject === "company" && permissions[action].includes("companyOwn")) return item?.id === user?.companyId;
    if (subject === "employee" && permissions[action].includes("employeeOwn")) return item?.companyId === user?.companyId;
    if (subject === "document" && permissions[action].includes("documentOwn")) return item?.companyId === user?.companyId;
  }

  return false;
}

function canApproveDocumentSector(doc) {
  const permissions = ROLE_PERMISSIONS[currentUser()?.role || "visitor"];
  if (!permissions.approvalSectors?.length) return false;
  if (!doc) return permissions.approvalSectors.length > 0;
  return permissions.approvalSectors.includes(documentOperationalSector(doc));
}

function allowedEmployeeTabs() {
  return ROLE_PERMISSIONS[currentUser()?.role || "visitor"].employeeTabs || [];
}

function visibleCompanies() {
  const user = currentUser();
  if (["supplier", "fiscal"].includes(user?.role) && user.companyId) return state.companies.filter((company) => company.id === user.companyId);
  return state.companies;
}

function visibleEmployees() {
  const allowedCompanies = new Set(visibleCompanies().map((company) => company.id));
  return state.employees.filter((employee) => allowedCompanies.has(employee.companyId));
}

function visibleDocuments() {
  const allowedCompanies = new Set(visibleCompanies().map((company) => company.id));
  const docs = state.documents.filter((doc) => allowedCompanies.has(doc.companyId));
  const sectors = ROLE_PERMISSIONS[currentUser()?.role || "visitor"].approvalSectors || [];
  if (["medicina", "ehs", "patrimonial"].includes(currentUser()?.role)) return docs.filter((doc) => sectors.includes(documentOperationalSector(doc)));
  return docs;
}

function operationalMetrics(companies = visibleCompanies(), employees = visibleEmployees(), documents = visibleDocuments()) {
  const normalizedCompanies = companies.map((company) => ({ ...normalizeCompany(company), raw: company }));
  const normalizedEmployees = employees.map((employee) => ({ ...normalizeEmployee(employee), raw: employee }));
  const pendingEmployeeStatuses = ["Pendente", "Documentos pendente", "Aguardando exames", "Em treinamento", "Aguardando aprovacao do fiscal", "Ativo com pendencia", "Em analise"];
  const criticalCompanyStatuses = ["Bloqueada", "Bloqueado", "Pendente"];
  const pendingApprovalStatuses = ["Pendente", "Reprovado", "A vencer"];
  return {
    activeCompanies: normalizedCompanies.filter((company) => company.status === "Ativa").map((company) => company.raw),
    activeContracts: normalizedCompanies.filter((company) => ["Ativa", "Pendente"].includes(company.status)).map((company) => company.raw),
    expiringContracts: normalizedCompanies.filter((company) => contractDays(company.raw) >= 0 && contractDays(company.raw) <= 60).map((company) => company.raw),
    blockedContracts: normalizedCompanies.filter((company) => ["Bloqueada", "Bloqueado", "Inativa", "Desmobilizada"].includes(company.status)).map((company) => company.raw),
    activeEmployees: normalizedEmployees.filter((employee) => ["Aprovado", "Ativo", "Liberado", "Ativo com pendencia"].includes(employee.status)).map((employee) => employee.raw),
    blockedEmployees: normalizedEmployees.filter((employee) => ["Bloqueado"].includes(employee.status)).map((employee) => employee.raw),
    pendingEmployees: normalizedEmployees.filter((employee) => pendingEmployeeStatuses.includes(employee.status)).map((employee) => employee.raw),
    inactiveEmployees: normalizedEmployees.filter((employee) => ["Inativo", "Desmobilizado", "Desmobilizada"].includes(employee.status)).map((employee) => employee.raw),
    expiredAso: normalizedEmployees.filter((employee) => isPastDate(employee.asoValidity)).map((employee) => employee.raw),
    expiredTrainings: normalizedEmployees.filter((employee) => isPastDate(employee.trainingValidity)).map((employee) => employee.raw),
    medicinePendencies: normalizedEmployees
      .filter((employee) => employee.status === "Aguardando exames" || ["Vencido", "A vencer"].includes(employee.docStatus) || employeeMedicineStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    ehsPendencies: normalizedEmployees
      .filter((employee) => ["Em treinamento", "Documentos pendente"].includes(employee.status) || employeeEhsStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    patrimonialPendencies: normalizedEmployees.filter((employee) => employee.status === "Aguardando aprovacao do fiscal" || employeePatrimonialStatus(employee.raw) === "Pendente").map((employee) => employee.raw),
    expiredDocs: documents.filter((doc) => docStatus(doc) === "Vencido"),
    expiringDocs: documents.filter((doc) => docStatus(doc) === "A vencer"),
    pendingApprovals: documents.filter((doc) => pendingApprovalStatuses.includes(docStatus(doc))),
    criticalCompanies: normalizedCompanies
      .filter((company) => criticalCompanyStatuses.includes(company.status) || documents.some((doc) => doc.companyId === company.id && ["Vencido", "Reprovado"].includes(docStatus(doc))) || employees.some((employee) => employee.companyId === company.id && normalizeEmployee(employee).status === "Bloqueado"))
      .map((company) => company.raw),
  };
}

function renderDashboard() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const documents = visibleDocuments();
  const metrics = operationalMetrics(companies, employees, documents);
  const criticalDocs = visibleDocuments().filter((doc) => ["Vencido", "A vencer", "Pendente"].includes(docStatus(doc))).slice(0, 6);
  const totalPendencies = new Set(
    [
      ...metrics.pendingEmployees,
      ...metrics.medicinePendencies,
      ...metrics.ehsPendencies,
      ...metrics.patrimonialPendencies,
      ...documents.filter((doc) => ["Pendente", "Reprovado"].includes(docStatus(doc))),
    ].map((item) => item.id),
  ).size;
  const dashboardCards = buildDashboardCards(metrics, totalPendencies);
  const operationalAlerts = buildOperationalAlerts(metrics);
  const priorityEmployees = uniqueById([...metrics.blockedEmployees, ...metrics.pendingEmployees, ...metrics.activeEmployees, ...employees]).slice(0, 6);
  const operationalRows = priorityEmployees.map((employee) => {
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
        <span class="eyebrow">Monitoramento operacional</span>
        <h2>Dashboard Operacional</h2>
        <div class="hero-command-row">
          <span>${companies.length} fornecedores</span>
          <span>${documents.length} documentos rastreados</span>
          <span>${employees.length} funcionarios monitorados</span>
        </div>
      </div>
    </section>
    <div class="kpi-grid">
      ${dashboardCards.map(({ label, value, helper, iconName, tone, view, query, filter, quick }) => `
        <article class="kpi-card clickable-kpi ${tone} ${value > 0 && ["danger", "warning", "special"].includes(tone) ? "has-alert" : ""}" role="button" tabindex="0" data-dashboard-card data-target-view="${view}" data-target-search="${escapeAttr(query)}" data-target-filter="${escapeAttr(filter)}" data-target-quick="${escapeAttr(quick)}" title="Abrir ${label}">
          <div class="kpi-icon">${icon(iconName)}</div>
          <div>
            <span>${label}</span>
            <strong>${value}</strong>
            <small>${helper}</small>
          </div>
        </article>
      `).join("")}
    </div>
    <section class="bi-card operational-alerts">
      <div class="bi-head">
        <div><span class="eyebrow">Alertas automaticos</span><h2>Prioridades operacionais</h2></div>
        <span class="mini-pill">${operationalAlerts.filter((alert) => alert.value > 0).length} alerta(s)</span>
      </div>
      <div class="alert-grid">
        ${operationalAlerts.map(renderOperationalAlert).join("")}
      </div>
    </section>
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

function buildDashboardCards(metrics, totalPendencies) {
  return [
    { label: "Funcionarios Liberados", value: metrics.activeEmployees.length, helper: "Aptos para atividade", iconName: "users", tone: "success", view: "employees", query: "", filter: "Todos", quick: "Ativo" },
    { label: "Bloqueados", value: metrics.blockedEmployees.length, helper: "Restricoes de funcionarios", iconName: "block", tone: "danger", view: "employees", query: "", filter: "Bloqueado", quick: "Bloqueado" },
    { label: "Pendentes", value: totalPendencies, helper: "Itens aguardando acao", iconName: "clock", tone: "warning", view: "employees", query: "", filter: "Todos", quick: "Pendente" },
    { label: "Documentos Vencidos", value: metrics.expiredDocs.length, helper: "Fora da validade", iconName: "docs", tone: "danger", view: "documents", query: "", filter: "Todos", quick: "Vencido" },
    { label: "Documentos a Vencer", value: metrics.expiringDocs.length, helper: "Janela de alerta", iconName: "clock", tone: "warning", view: "documents", query: "", filter: "Todos", quick: "A vencer" },
    { label: "Contratos Vencendo", value: metrics.expiringContracts.length, helper: "Proximos 60 dias", iconName: "contracts", tone: "warning", view: "contracts", query: "", filter: "Todos", quick: "Vencendo" },
    { label: "Empresas Criticas", value: metrics.criticalCompanies.length, helper: "Bloqueadas ou pendentes", iconName: "company", tone: "danger", view: "companies", query: "", filter: "Todos", quick: "Critico" },
    { label: "Aprovacoes Pendentes", value: metrics.pendingApprovals.length, helper: "Documentos para decisao", iconName: "approve", tone: "special", view: "approvals", query: "", filter: "Todos", quick: "Pendente" },
  ];
}

function buildOperationalAlerts(metrics) {
  return [
    { label: "Documentos vencidos", value: metrics.expiredDocs.length, priority: "critica", helper: "Regularizar imediatamente", iconName: "docs", view: "documents", quick: "Vencido" },
    { label: "Documentos vencendo", value: metrics.expiringDocs.length, priority: "media", helper: "Dentro da janela de 30 dias", iconName: "clock", view: "documents", quick: "A vencer" },
    { label: "ASO vencido", value: metrics.expiredAso.length, priority: "critica", helper: "Bloqueio medico potencial", iconName: "shield", view: "employees", quick: "ASO vencido" },
    { label: "Treinamentos vencidos", value: metrics.expiredTrainings.length, priority: "critica", helper: "Pendencia EHS operacional", iconName: "factory", view: "employees", quick: "Treinamento vencido" },
    { label: "Contratos proximos do vencimento", value: metrics.expiringContracts.length, priority: "media", helper: "Fim previsto em ate 60 dias", iconName: "contracts", view: "contracts", quick: "Vencendo" },
    { label: "Funcionarios bloqueados", value: metrics.blockedEmployees.length, priority: "critica", helper: "Restricao ativa de acesso", iconName: "block", view: "employees", filter: "Bloqueado", quick: "Bloqueado" },
    { label: "Pendencias Medicina", value: metrics.medicinePendencies.length, priority: "media", helper: "ASO, exames e liberacao medica", iconName: "shield", view: "employees", quick: "Medicina" },
    { label: "Pendencias EHS", value: metrics.ehsPendencies.length, priority: "media", helper: "Treinamentos e requisitos de seguranca", iconName: "factory", view: "employees", quick: "EHS" },
    { label: "Pendencias Patrimonial", value: metrics.patrimonialPendencies.length, priority: "baixa", helper: "Crachas, acesso e liberacao final", iconName: "block", view: "employees", quick: "Pendente" },
  ];
}

function renderOperationalAlert(alert) {
  const tone = { critica: "danger", media: "warning", baixa: "info" }[alert.priority] || "info";
  return `
    <article class="operational-alert ${tone} ${alert.value > 0 ? "active" : ""}" role="button" tabindex="0" data-dashboard-card data-target-view="${alert.view}" data-target-search="" data-target-filter="${escapeAttr(alert.filter || "Todos")}" data-target-quick="${escapeAttr(alert.quick || "Todos")}" title="Abrir ${alert.label}">
      <div class="alert-icon">${icon(alert.iconName)}</div>
      <div>
        <span>${alert.label}</span>
        <strong>${alert.value}</strong>
        <small>${alert.helper}</small>
      </div>
      <em>${alert.priority}</em>
    </article>
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
  const baseItems = visibleCompanies();
  const filteredItems = filtered(baseItems, [
    (item) => item.name,
    (item) => item.cnpj,
    (item) => item.fiscal,
    (item) => item.responsible || item.contact,
    (item) => item.contract,
    (item) => contractUnit(item),
    (item) => employeeCostCenter({}, item),
    (item) => normalizeCompany(item).status,
  ]);
  const items = sortItems("companies", applyOperationalFilters("companies", filteredItems));
  const { pageItems, totalPages } = paginateItems("companies", items);
  const editingCompany = editingCompanyId
    ? state.companies.find((company) => company.id === editingCompanyId)
    : currentUser()?.role === "supplier"
      ? visibleCompanies()[0]
      : null;
  return `
    ${sectionHead("Empresas terceirizadas", "Cadastre fornecedores e acompanhe contrato, responsaveis e situacao.", "Nova empresa", "company")}
    ${renderCompanyEditor(editingCompany)}
    ${toolbar("Buscar por empresa, CNPJ, fiscal, responsavel ou contrato")}
    ${renderOperationalFilters("companies", baseItems, { quicks: ["Todos", "Ativo", "Pendente", "Bloqueado", "Critico", "Desmobilizado"], exportKey: "empresas" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("companies", "Empresa", "name")}<th>CNPJ</th><th>Fiscal</th><th>Responsavel</th>${sortableHeader("companies", "Contrato", "contract")}<th>Periodo</th>${sortableHeader("companies", "Status", "status")}<th>Acoes</th></tr></thead>
        <tbody>
          ${pageItems.length ? pageItems.map(renderCompanyRow).join("") : emptyRow(8)}
        </tbody>
      </table>
      ${renderPagination("companies", items.length, totalPages)}
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
        ${selectField("status", "Status da empresa", item.status || "Ativa", ["Ativa", "Pendente", "Bloqueada", "Inativa", "Desmobilizada"].map(option))}
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
      <button class="btn secondary compact" type="button" data-company-detail="${id}">${icon("company")} Ver detalhes</button>
      ${can("edit.company", company) ? `<button class="btn secondary compact" type="button" data-edit="company" data-id="${id}">${icon("edit")} Editar</button>` : ""}
      ${can("edit.company", company) ? `<button class="btn warning compact" type="button" data-demobilize="company" data-id="${id}">Desmobilizar</button>` : ""}
      ${can("delete.company", company) ? `<button class="btn danger compact" type="button" data-delete="company" data-id="${id}">${icon("trash")} Excluir</button>` : ""}
      ${!can("edit.company", company) && !can("delete.company", company) ? `<span class="mini-pill">Somente leitura</span>` : ""}
    </div>
  `;
}

function renderEmployees() {
  const editingEmployee = editingEmployeeId ? state.employees.find((employee) => employee.id === editingEmployeeId) : null;
  const baseItems = visibleEmployees();
  const filteredByText = filtered(baseItems, [
    (item) => item.name,
    (item) => item.cpf,
    (item) => employeeRegistration(item),
    (item) => item.role,
    (item) => companyName(item.companyId),
    (item) => state.companies.find((company) => company.id === item.companyId)?.contract,
    (item) => employeeCostCenter(item, state.companies.find((company) => company.id === item.companyId)),
    (item) => normalizeEmployee(item).docStatus,
    (item) => normalizeEmployee(item).status,
  ]);
  const byStatus =
    employeeStatusFilter === "Todos"
      ? filteredByText
      : filteredByText.filter((employee) => normalizeEmployee(employee).status === employeeStatusFilter);
  const items = sortItems("employees", applyOperationalFilters("employees", byStatus));
  const { pageItems, totalPages } = paginateItems("employees", items);
  return `
    ${sectionHead("Funcionarios terceirizados", "Controle integracao, documentos, exames, treinamento e aprovacao fiscal.", "Novo funcionario", "employee")}
    ${renderEmployeeEditor(editingEmployee)}
    ${toolbar("Buscar por nome, CPF, matricula, empresa, contrato, centro de custo ou status")}
    ${renderEmployeeStatusFilters()}
    ${renderOperationalFilters("employees", baseItems, { quicks: ["Todos", "Ativo", "Bloqueado", "Pendente", "Medicina", "EHS", "Desmobilizado"], exportKey: "funcionarios-ativos" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("employees", "Funcionario", "name")}${sortableHeader("employees", "CPF", "cpf")}${sortableHeader("employees", "Funcao", "sector")}${sortableHeader("employees", "Empresa vinculada", "company")}<th>Validades</th>${sortableHeader("employees", "Status documental", "status")}<th>Contratacao</th><th>Acoes</th></tr></thead>
        <tbody>
          ${renderEmployeeGroupedRows(pageItems)}
        </tbody>
      </table>
      ${renderPagination("employees", items.length, totalPages)}
    </section>
  `;
}

function renderEmployeeEditor(employee = null) {
  if (!can("create.employee") && !can("edit.employee", employee)) return "";
  const item = normalizeEmployee(employee || {});
  const companyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  const linkedCompany = state.companies.find((company) => company.id === item.companyId) || state.companies[0];
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
        ${formSection("Identificacao", [
          inputField("registration", "Matricula do funcionario", item.registration, "required"),
          inputField("name", "Nome completo", item.name, "required"),
          inputField("cpf", "CPF", item.cpf, "required inputmode='numeric' maxlength='14' data-mask='cpf' placeholder='000.000.000-00'"),
          inputField("birthDate", "Data de nascimento", item.birthDate, "type='date' required"),
          inputField("motherName", "Nome da mae", item.motherName, "required"),
          inputField("fatherName", "Nome do pai", item.fatherName),
        ])}
        ${formSection("Vinculo contratual", [
          inputField("role", "Funcao", item.role, "required"),
          selectField("companyId", "Empresa vinculada", item.companyId || state.companies[0]?.id, companyOptions),
          inputField("contract", "Contrato vinculado", item.contract || linkedCompany?.contract || "", "required"),
          inputField("costCenter", "Centro de custo", item.costCenter || employeeCostCenter(item, linkedCompany), "required"),
        ])}
        ${formSection("Endereco", [
          inputField("cep", "CEP", item.cep, "required inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
          inputField("city", "Cidade", item.city, "required"),
          inputField("district", "Bairro", item.district, "required"),
          inputField("street", "Rua", item.street, "required"),
          inputField("number", "Numero", item.number, "required"),
          inputField("complement", "Complemento", item.complement),
        ])}
        ${formSection("Status operacional", [
          inputField("asoValidity", "Validade de ASO", item.asoValidity, "type='date' required"),
          inputField("trainingValidity", "Validade de treinamento", item.trainingValidity, "type='date' required"),
          selectField("docStatus", "Status documental", item.docStatus || "Pendente", documentStatuses.map(option)),
          selectField("status", "Status", item.status || "Em analise", hiringStatuses.map(option)),
          textAreaField("notes", "Observacoes", item.notes),
        ])}
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
  const group = employeeVisualGroup(item);
  return `
    <tr class="employee-row employee-row-${group.key}">
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
          ${employeeRowActions(item)}
        </div>
      </td>
    </tr>
  `;
}

function renderEmployeeGroupedRows(items) {
  if (!items.length) return emptyRow(8);
  const groups = [
    { key: "active", title: "Funcionarios ativos" },
    { key: "blocked", title: "Funcionarios bloqueados" },
    { key: "inactive", title: "Funcionarios desmobilizados/inativos" },
  ];
  return groups
    .map((group) => {
      const employees = items.filter((employee) => employeeVisualGroup(employee).key === group.key);
      if (!employees.length) return "";
      return `
        <tr class="employee-group-row employee-group-${group.key}">
          <td colspan="8">
            <span>${group.title}</span>
            <strong>${employees.length}</strong>
          </td>
        </tr>
        ${employees.map(renderEmployeeRow).join("")}
      `;
    })
    .join("");
}

function employeeVisualGroup(employee) {
  const status = normalizeEmployee(employee).status;
  if (status === "Bloqueado") return { key: "blocked", title: "Funcionarios bloqueados" };
  if (["Desmobilizado", "Desmobilizada", "Inativo", "Inativa"].includes(status)) return { key: "inactive", title: "Funcionarios desmobilizados/inativos" };
  return { key: "active", title: "Funcionarios ativos" };
}

function openEmployeeRecord(id) {
  const employee = visibleEmployees().find((item) => item.id === id) || state.employees.find((item) => item.id === id);
  if (!employee) return;
  const item = normalizeEmployee(employee);
  const company = state.companies.find((entry) => entry.id === item.companyId);
  const tabs = employeeRecordTabs();
  const defaultTab = tabs[0]?.[0] || "personal";
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
        ${tabs
          .map(([tab, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-employee-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body employee-tab-content">${renderEmployeeRecordTab(item, defaultTab)}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    const workflowAction = event.target.closest("[data-workflow-action]");
    if (workflowAction) {
      updateEmployeeWorkflowStep(
        workflowAction.dataset.employeeId,
        workflowAction.dataset.workflowStep,
        workflowAction.dataset.workflowAction,
      );
      return;
    }
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

function employeeRecordTabs() {
  const allTabs = [
    ["personal", "Dados Pessoais"],
    ["docs", "Documentos Pessoais"],
    ["medicine", "Medicina Ocupacional"],
    ["ehs", "Seguranca do Trabalho/EHS"],
    ["patrimonial", "Seguranca Patrimonial"],
    ["integration", "Integracao"],
    ["history", "Historico"],
    ["demobilization", "Desmobilizacao"],
  ];
  const allowed = new Set(allowedEmployeeTabs());
  return allTabs.filter(([tab]) => allowed.has(tab));
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
        ${detailCard("Data de nascimento", formatDate(employee.birthDate))}
        ${detailCard("Nome da mae", employee.motherName || "Nao informado")}
        ${detailCard("Nome do pai", employee.fatherName || "Nao informado")}
        ${detailCard("Empresa", company?.name || "Nao informado")}
        ${detailCard("Contrato vinculado", employee.contract || company?.contract || "Nao informado")}
        ${detailCard("Centro de custo", employee.costCenter || employeeCostCenter(employee, company))}
        ${detailCard("Funcao", employee.role || "Nao informado")}
        ${detailCard("Status", statusBadge(employee.status))}
        ${detailCard("Data de admissao", formatDate(employee.admission || employee.startDate))}
        ${detailCard("Situacao", statusBadge(employeeActiveState(employee)))}
        ${detailCard("CEP", employee.cep || "Nao informado")}
        ${detailCard("Cidade", employee.city || "Nao informado")}
        ${detailCard("Bairro", employee.district || "Nao informado")}
        ${detailCard("Rua", employee.street || "Nao informado")}
        ${detailCard("Numero", employee.number || "Nao informado")}
        ${detailCard("Complemento", employee.complement || "Nao informado")}
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
  const steps = employeeWorkflowSteps(employee);
  const progress = Math.round(
    (steps.filter((step) => ["Aprovado", "Aprovado com pendencia"].includes(step.status)).length / Math.max(1, steps.length)) * 100,
  );
  return steps
    .map(
      (step, index) => `
        ${index === 0 ? `<div class="employee-workflow-progress" style="--workflow-progress:${progress}%"><i></i></div>` : ""}
        <div class="employee-flow-step ${workflowStatusClass(step.status)}">
          <span class="employee-flow-icon">${icon(step.icon)}<small>${index + 1}</small></span>
          <strong>${step.label}</strong>
          ${workflowStatusBadge(step.status)}
          <em>${step.detail}</em>
          ${renderWorkflowStepActions(employee, step)}
        </div>
      `,
    )
    .join("");
}

function employeeWorkflowSteps(employee) {
  const item = normalizeEmployee(employee);
  const workflow = item.workflowActions || {};
  const docs = state.documents.filter((doc) => doc.employeeId === item.id);
  const exception = hasPendingApprovalException(item);
  const fiscalDocs = docs.filter((doc) => documentOperationalSector(doc) === "Fiscal");
  const medicineDocs = docs.filter((doc) => documentOperationalSector(doc) === "Medicina");
  const ehsDocs = docs.filter((doc) => documentOperationalSector(doc) === "EHS");
  const patrimonialDocs = docs.filter((doc) => documentOperationalSector(doc) === "Patrimonial");
  const steps = [
    {
      id: "fiscal",
      sector: "Fiscal",
      label: "Fiscal / Documentos pessoais",
      icon: "docs",
      status: workflow.fiscal?.status || resolveWorkflowStepStatus(item, fiscalDocs, {
        pending: item.status === "Documentos pendente" || item.docStatus === "Pendente",
        approved: item.docStatus === "Regular" || fiscalDocs.some((doc) => docStatus(doc) === "Aprovado"),
        exception,
      }),
      detail: "Cadastro, CPF, vinculo e documentos pessoais",
    },
    {
      id: "medicina",
      sector: "Medicina",
      label: "Medicina",
      icon: "shield",
      status: workflow.medicina?.status || resolveWorkflowStepStatus(item, medicineDocs, {
        pending: item.status === "Aguardando exames" || employeeMedicineStatus(item, docs) === "Pendente",
        approved: employeeMedicineStatus(item, docs) === "Aprovado",
        exception,
      }),
      detail: "ASO, exames e validade ocupacional",
    },
    {
      id: "ehs",
      sector: "EHS",
      label: "EHS",
      icon: "factory",
      status: workflow.ehs?.status || resolveWorkflowStepStatus(item, ehsDocs, {
        pending: item.status === "Em treinamento" || employeeEhsStatus(item, docs) === "Pendente",
        approved: employeeEhsStatus(item, docs) === "Aprovado",
        exception,
      }),
      detail: "Treinamentos, NR, EPI e seguranca",
    },
    {
      id: "patrimonial",
      sector: "Patrimonial",
      label: "Patrimonial",
      icon: "block",
      status: workflow.patrimonial?.status || resolveWorkflowStepStatus(item, patrimonialDocs, {
        pending: item.status === "Aguardando aprovacao do fiscal" || employeePatrimonialStatus(item) === "Pendente",
        approved: employeePatrimonialStatus(item) === "Aprovado",
        exception,
      }),
      detail: "Acesso, credencial e liberacao patrimonial",
    },
  ];
  const blockingStatus = item.status === "Bloqueado" || steps.some((step) => step.status === "Bloqueado");
  const rejectedStatus = steps.some((step) => step.status === "Reprovado");
  const pendingStatus = steps.some((step) => ["Pendente", "Aprovado com pendencia"].includes(step.status));
  steps.push({
    id: "liberacao",
    sector: "Fiscal",
    label: "Liberacao final",
    icon: "approve",
    status: workflow.liberacao?.status || (blockingStatus ? "Bloqueado" : rejectedStatus ? "Reprovado" : pendingStatus ? (exception ? "Aprovado com pendencia" : "Pendente") : "Aprovado"),
    detail: "Consolidacao fiscal para inicio ou manutencao",
  });
  return steps;
}

function renderWorkflowStepActions(employee, step) {
  if (!canActOnWorkflowStep(step)) return "";
  return `
    <div class="workflow-step-actions">
      <button class="btn success compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="approve">${icon("approve")} Aprovar</button>
      <button class="btn danger compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="reject">${icon("block")} Reprovar</button>
      <button class="btn special compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="approve_pending">${icon("clock")} Aprovar com pend&ecirc;ncia</button>
    </div>
  `;
}

function canActOnWorkflowStep(step) {
  const role = currentUser()?.role || "visitor";
  if (role === "admin") return true;
  if (role === "fiscal") return ["fiscal", "liberacao"].includes(step.id);
  if (role === "medicina") return step.id === "medicina";
  if (role === "ehs") return step.id === "ehs";
  if (role === "patrimonial") return step.id === "patrimonial";
  return false;
}

function updateEmployeeWorkflowStep(employeeId, stepId, action) {
  const employee = state.employees.find((item) => item.id === employeeId);
  if (!employee) return;
  const item = normalizeEmployee(employee);
  const step = employeeWorkflowSteps(item).find((entry) => entry.id === stepId);
  if (!step || !canActOnWorkflowStep(step)) {
    alert("Seu perfil nao possui permissao para atuar nesta etapa.");
    return;
  }

  const workflowAction = collectWorkflowActionData(action, step, item);
  if (!workflowAction) return;

  const previousStatus = step.status || "";
  const workflowActions = { ...(item.workflowActions || {}) };
  workflowActions[stepId] = workflowAction;
  employee.workflowActions = workflowActions;

  const timestamp = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const noteLine = `[${timestamp}] ${workflowAction.updatedBy}: ${step.label} - ${workflowAction.status}. ${workflowAction.observation}`;
  const currentNotes = employeeVisibleNotes(employee);
  employee.notes = currentNotes ? `${currentNotes}\n${noteLine}` : noteLine;

  const history = createHistoryEvent({
    entityType: "funcionario",
    entityId: employee.id,
    action: `Workflow ${step.label}`,
    previousStatus,
    nextStatus: workflowAction.status,
    observation: workflowAction.observation,
  });
  state.historico = upsertById(state.historico, history);

  syncCollection("employees", employee).catch((error) => {
    console.error("Falha ao salvar acao do workflow do funcionario", {
      table: "employees",
      employeeId,
      stepId,
      action,
      payload: mapEmployeeToDb(employee),
      error,
    });
    alert(`Nao foi possivel salvar online: ${error.message}`);
  });
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Acao do workflow do funcionario" }));
  saveState();
  document.querySelectorAll(".employee-record-backdrop").forEach((modal) => modal.remove());
  renderApp();
  openEmployeeRecord(employeeId);
}

function collectWorkflowActionData(action, step, employee) {
  const actor = currentUser()?.name || currentUser()?.email || "Usuario do sistema";
  const base = {
    action,
    sector: step.sector,
    label: step.label,
    updatedAt: new Date().toISOString(),
    updatedBy: actor,
  };

  if (action === "approve") {
    return {
      ...base,
      status: "Aprovado",
      observation: "Aprovado sem pendencias.",
    };
  }

  if (action === "reject") {
    const reason = prompt(`Informe o motivo obrigatorio para reprovar ${step.label} de ${employee.name}:`);
    if (!reason || !reason.trim()) {
      alert("Motivo obrigatorio. A reprovacao nao foi salva.");
      return null;
    }
    return {
      ...base,
      status: "Reprovado",
      motivo: reason.trim(),
      observation: `Reprovado. Motivo: ${reason.trim()}`,
    };
  }

  if (action === "approve_pending") {
    const managerName = prompt("Informe o nome do gestor responsavel:");
    if (!managerName || !managerName.trim()) {
      alert("Gestor responsavel obrigatorio. A aprovacao com pendencia nao foi salva.");
      return null;
    }
    const managerRegistration = prompt("Informe a matricula do gestor responsavel:");
    if (!managerRegistration || !managerRegistration.trim()) {
      alert("Matricula do gestor obrigatoria. A aprovacao com pendencia nao foi salva.");
      return null;
    }
    const reason = prompt("Informe o motivo da aprovacao com pendencia:");
    if (!reason || !reason.trim()) {
      alert("Motivo obrigatorio. A aprovacao com pendencia nao foi salva.");
      return null;
    }
    const deadline = prompt("Informe o prazo de regularizacao (ex.: 2026-06-30):");
    if (!deadline || !deadline.trim()) {
      alert("Prazo de regularizacao obrigatorio. A aprovacao com pendencia nao foi salva.");
      return null;
    }
    return {
      ...base,
      status: "Aprovado com pendencia",
      gestorResponsavel: managerName.trim(),
      matriculaGestor: managerRegistration.trim(),
      motivo: reason.trim(),
      prazoRegularizacao: deadline.trim(),
      observation: `Aprovado com pendencia. Gestor: ${managerName.trim()} (${managerRegistration.trim()}). Motivo: ${reason.trim()}. Prazo: ${deadline.trim()}`,
    };
  }

  return null;
}

function workflowStatusBadge(status) {
  const labels = {
    Pendente: "Pendente",
    Aprovado: "Aprovado",
    Reprovado: "Reprovado",
    Bloqueado: "Bloqueado",
    "Aprovado com pendencia": "Aprovado com pend&ecirc;ncia",
  };
  return `<span class="status ${workflowStatusClass(status)}">${labels[status] || status}</span>`;
}

function resolveWorkflowStepStatus(employee, docs, { pending = false, approved = false, exception = false } = {}) {
  if (employee.status === "Bloqueado") return "Bloqueado";
  if (docs.some((doc) => doc.status === "Reprovado" || docStatus(doc) === "Reprovado")) return "Reprovado";
  if (docs.some((doc) => docStatus(doc) === "Vencido")) return "Bloqueado";
  if (pending || docs.some((doc) => ["Pendente", "A vencer"].includes(docStatus(doc)))) return exception ? "Aprovado com pendencia" : "Pendente";
  if (approved || docs.some((doc) => docStatus(doc) === "Aprovado")) return "Aprovado";
  return exception ? "Aprovado com pendencia" : "Pendente";
}

function workflowStatusClass(status) {
  return {
    Aprovado: "ok",
    "Aprovado com pendencia": "conditional",
    Pendente: "warn",
    Reprovado: "bad",
    Bloqueado: "blocked",
  }[status] || statusClass(status);
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
  if (["Inativo", "Desmobilizado", "Desmobilizada"].includes(employee.status)) return "Inativo";
  if (employee.status === "Ativo com pendencia") return "Ativo com pendencia";
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

function applyAutomaticStatusRules({ syncRemote = false, source = "Motor automatico de status" } = {}) {
  if (!state?.companies || !state?.employees || !state?.documents) return [];
  state.historico ||= [];
  const changes = [];
  const inactiveCompanyStatuses = ["Inativa", "Desmobilizada", "Encerrado"];
  const inactiveEmployeeStatuses = ["Inativo", "Desmobilizado", "Desmobilizada"];
  const employeePendingStatuses = ["Pendente", "Documentos pendente", "Aguardando exames", "Em treinamento", "Aguardando aprovacao do fiscal", "Ativo com pendencia"];

  const registerStatusChange = (collection, entityType, item, nextStatus, observation) => {
    const previousStatus = item.status || "";
    if (!nextStatus || previousStatus === nextStatus) return;
    item.status = nextStatus;
    const history = createHistoryEvent({
      entityType,
      entityId: item.id,
      action: "Status automatico",
      previousStatus,
      nextStatus,
      observation: `${source}: ${observation}`,
    });
    state.historico = upsertById(state.historico, history);
    changes.push({ collection, item, history });
  };

  state.employees.forEach((employee) => {
    const item = normalizeEmployee(employee);
    if (inactiveEmployeeStatuses.includes(item.status)) return;
    const docs = state.documents.filter((doc) => doc.employeeId === item.id);
    const expiredDocs = docs.filter((doc) => docStatus(doc) === "Vencido" || doc.status === "Reprovado");
    const pendingDocs = docs.filter((doc) => ["Pendente", "A vencer"].includes(docStatus(doc)));
    const workflowBase = item.status === "Bloqueado" && !expiredDocs.length ? { ...item, status: "Em analise" } : item;
    const workflowSteps = employeeWorkflowSteps(workflowBase);
    const workflowStatuses = workflowSteps.map((step) => step.status);
    const hasWorkflowRejection = workflowStatuses.includes("Reprovado");
    const hasWorkflowBlock = workflowStatuses.includes("Bloqueado");
    const hasWorkflowPendingApproval = workflowStatuses.includes("Aprovado com pendencia");
    const hasWorkflowPending = workflowStatuses.includes("Pendente");
    const allWorkflowApproved = workflowSteps.length > 0 && workflowStatuses.every((status) => status === "Aprovado");
    const hasPendingApproval = ["Aprovado", "Ativo", "Liberado"].includes(item.status) && pendingDocs.length && !hasPendingApprovalException(item);

    if (expiredDocs.length || hasWorkflowRejection || hasWorkflowBlock) {
      const reason = expiredDocs.length ? `documento vencido ou reprovado (${expiredDocs[0].type})` : "etapa do workflow reprovada ou bloqueada";
      registerStatusChange("employees", "funcionario", employee, "Bloqueado", reason);
      employee.docStatus = "Vencido";
      return;
    }
    if (hasWorkflowPendingApproval || hasPendingApprovalException(item)) {
      registerStatusChange("employees", "funcionario", employee, "Ativo com pendencia", "aprovacao com pendencia formalizada com responsavel, motivo e prazo");
      employee.docStatus = pendingDocs.length ? "A vencer" : "Regular";
      return;
    }
    if (hasPendingApproval || pendingDocs.length) {
      const sector = documentOperationalSector(pendingDocs[0]);
      const nextStatus =
        sector === "Medicina"
          ? "Aguardando exames"
          : sector === "EHS"
            ? "Em treinamento"
            : sector === "Patrimonial"
              ? "Aguardando aprovacao do fiscal"
              : "Pendente";
      registerStatusChange("employees", "funcionario", employee, nextStatus, `pendencia documental no setor ${sector}`);
      employee.docStatus = pendingDocs.some((doc) => docStatus(doc) === "A vencer") ? "A vencer" : "Pendente";
      return;
    }
    if (hasWorkflowPending) {
      registerStatusChange("employees", "funcionario", employee, "Pendente", "etapas do workflow ainda pendentes");
      employee.docStatus = docs.length && docs.every((doc) => docStatus(doc) === "Aprovado") ? "Regular" : employee.docStatus || "Pendente";
      return;
    }
    if (allWorkflowApproved && (!docs.length || docs.every((doc) => docStatus(doc) === "Aprovado"))) {
      registerStatusChange("employees", "funcionario", employee, "Liberado", "todas as etapas do workflow e documentos aprovados");
      employee.docStatus = "Regular";
      return;
    }
    if (item.docStatus !== "Regular" && docs.length && docs.every((doc) => docStatus(doc) === "Aprovado")) {
      employee.docStatus = "Regular";
    }
  });

  state.companies.forEach((company) => {
    const item = normalizeCompany(company);
    const days = contractDays(item);
    const docs = state.documents.filter((doc) => doc.companyId === item.id);
    const employees = state.employees.filter((employee) => employee.companyId === item.id);
    const hasActiveContract = Boolean(item.contract) && Number.isFinite(days) && days >= 0 && !inactiveCompanyStatuses.includes(item.status);
    const hasCriticalPendency = docs.some((doc) => ["Vencido", "Reprovado"].includes(docStatus(doc))) || employees.some((employee) => normalizeEmployee(employee).status === "Bloqueado");
    const hasPendency = docs.some((doc) => ["Pendente", "A vencer"].includes(docStatus(doc))) || employees.some((employee) => employeePendingStatuses.includes(normalizeEmployee(employee).status));

    if (Number.isFinite(days) && days < 0 && !inactiveCompanyStatuses.includes(item.status)) {
      registerStatusChange("companies", "contrato", company, "Inativa", "contrato vencido");
      return;
    }
    if (!hasActiveContract && !hasCriticalPendency && !hasPendency && !inactiveCompanyStatuses.includes(item.status)) {
      registerStatusChange("companies", "empresa", company, "Inativa", "empresa sem contrato ativo");
      return;
    }
    if (hasCriticalPendency && ![...inactiveCompanyStatuses, "Bloqueada"].includes(item.status)) {
      registerStatusChange("companies", "empresa", company, "Bloqueada", "pendencia critica em contrato, documento ou funcionario");
      return;
    }
    if (hasPendency && ["Ativa", "Bloqueada"].includes(item.status)) {
      registerStatusChange("companies", "empresa", company, "Pendente", "pendencias documentais por setor");
      return;
    }
    if (!hasCriticalPendency && !hasPendency && hasActiveContract && ["Pendente", "Bloqueada"].includes(item.status)) {
      registerStatusChange("companies", "empresa", company, "Ativa", "pendencias regularizadas e contrato ativo");
    }
  });

  if (changes.length) {
    saveState();
    if (syncRemote) persistAutomaticStatusChanges(changes);
  }
  return changes;
}

function createHistoryEvent({ entityType, entityId, action, previousStatus, nextStatus, observation }) {
  const user = currentUser();
  return {
    id: crypto.randomUUID(),
    entityType,
    entityId,
    action,
    previousStatus,
    nextStatus,
    userId: user?.id || null,
    userName: user?.name || user?.email || "Sistema",
    observation,
    createdAt: new Date().toISOString(),
  };
}

function recordManualStatusHistory(entityType, entityId, previousStatus, nextStatus, observation) {
  if ((previousStatus || "") === (nextStatus || "")) return null;
  const history = createHistoryEvent({
    entityType,
    entityId,
    action: "Status manual",
    previousStatus,
    nextStatus,
    observation,
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  return history;
}

function hasPendingApprovalException(employee) {
  const registration = employee.registration || employee.matricula;
  const manager = employee.manager || employee.gestor || employee.responsible || employee.responsavel;
  const reason = employee.exceptionReason || employee.motivo || (/motivo/i.test(employee.notes || "") ? employee.notes : "");
  const deadline = employee.exceptionDeadline || employee.prazo;
  return Boolean(manager && registration && reason && deadline && new Date(deadline) >= new Date(today()));
}

function documentOperationalSector(doc = {}) {
  const text = `${doc.type || ""} ${documentVisibleNotes(doc) || ""}`.toLowerCase();
  if (/aso|exame|medic/.test(text)) return "Medicina";
  if (/nr-|treinamento|integracao|epi|segur|ehs/.test(text)) return "EHS";
  if (/patrimonial|cracha|acesso|liberacao|portaria/.test(text)) return "Patrimonial";
  return "Fiscal";
}

function renderDocuments() {
  const baseItems = visibleDocuments();
  const filteredItems = filtered(baseItems, [
    (item) => item.type,
    (item) => companyName(item.companyId),
    (item) => employeeName(item.employeeId),
    (item) => state.employees.find((employee) => employee.id === item.employeeId)?.cpf,
    (item) => employeeRegistration(state.employees.find((employee) => employee.id === item.employeeId) || {}),
    (item) => state.companies.find((company) => company.id === item.companyId)?.contract,
    (item) => employeeCostCenter(state.employees.find((employee) => employee.id === item.employeeId) || {}, state.companies.find((company) => company.id === item.companyId)),
    (item) => docStatus(item),
  ]);
  const items = sortItems("documents", applyOperationalFilters("documents", filteredItems));
  const { pageItems, totalPages } = paginateItems("documents", items);
  return `
    ${sectionHead("Controle de documentos", "Registre obrigatorios, vencimentos e aprovacoes.", "Novo documento", "document")}
    ${toolbar("Buscar por documento, empresa, funcionario, CPF, matricula, contrato ou status")}
    ${renderOperationalFilters("documents", baseItems, { quicks: ["Todos", "Pendente", "Vencido", "A vencer", "Medicina", "EHS"], exportKey: "documentos-vencidos" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("documents", "Documento", "sector")}${sortableHeader("documents", "Empresa", "company")}<th>Funcionario</th>${sortableHeader("documents", "Vencimento", "dueDate")}${sortableHeader("documents", "Status", "status")}<th>Observacoes</th><th>Acoes</th></tr></thead>
        <tbody>
          ${pageItems.length ? pageItems.map(renderDocumentRow).join("") : emptyRow(7)}
        </tbody>
      </table>
      ${renderPagination("documents", items.length, totalPages)}
    </section>
  `;
}

function renderContracts() {
  const baseItems = visibleCompanies();
  const contracts = sortItems("contracts", applyOperationalFilters("contracts", filtered(baseItems, [
    (item) => item.name,
    (item) => item.contract,
    (item) => contractUnit(item),
    (item) => item.status,
    (item) => item.cnpj,
    (item) => employeeCostCenter({}, item),
  ]).filter((item) => (contractStatusFilter === "Todos" ? true : normalizeCompany(item).status === contractStatusFilter))));
  const { pageItems, totalPages } = paginateItems("contracts", contracts);
  const active = visibleCompanies().filter((company) => normalizeCompany(company).status === "Ativa").length;
  const expiring = visibleCompanies().filter((company) => contractDays(company) >= 0 && contractDays(company) <= 60).length;
  const inactive = visibleCompanies().filter((company) => ["Inativa", "Bloqueada", "Bloqueado"].includes(normalizeCompany(company).status)).length;
  const closed = visibleCompanies().filter((company) => normalizeCompany(company).status === "Desmobilizada").length;
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
      <article class="contract-summary-card danger"><span>Inativos</span><strong>${inactive}</strong><small>Inativos ou bloqueados</small></article>
      <article class="contract-summary-card neutral"><span>Encerrados</span><strong>${closed}</strong><small>Contratos desmobilizados</small></article>
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
          <button class="btn secondary compact" type="button" data-export-future="contratos-vencendo">${icon("reports")} Exportar</button>
        </div>
        ${renderOperationalFilters("contracts", baseItems, { quicks: ["Todos", "Ativo", "Vencendo", "Pendente", "Bloqueado", "Desmobilizado"], exportKey: "contratos-vencendo" })}
        <div class="table-wrap contract-table-wrap">
          <table class="contract-table">
            <thead><tr>${sortableHeader("contracts", "Contrato", "contract")}${sortableHeader("contracts", "Empresa", "company")}${sortableHeader("contracts", "Unidade", "sector")}<th>Periodo</th><th>Dias</th>${sortableHeader("contracts", "Status", "status")}<th>Acoes</th></tr></thead>
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
        ${renderPagination("contracts", contracts.length, totalPages)}
      </section>
    </div>
  `;
}

function openContractDetails(id) {
  const company = visibleCompanies().find((item) => item.id === id) || state.companies.find((item) => item.id === id);
  if (!company) return;
  contractDetailState[company.id] ||= { employeeSearch: "", employeeStatus: "Todos" };
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
      ${renderContractOperationalSummary(company)}
      <div class="contract-tabs" role="tablist">
        ${[
          ["general", "Dados Gerais"],
          ["people", "Funcionarios"],
          ["docs", "Documentos"],
          ["approvals", "Aprovacoes"],
          ["history", "Historico"],
          ["pendencies", "Pendencias"],
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
      bindContractDetailEvents(modal, company);
    });
  });
  bindContractDetailEvents(modal, company);
}

function renderContractOperationalSummary(company) {
  const employees = state.employees.filter((employee) => employee.companyId === company.id);
  const documents = state.documents.filter((doc) => doc.companyId === company.id);
  const pendencies = documents.filter((doc) => docStatus(doc) !== "Aprovado").length + employees.filter((employee) => ["Documentos pendente", "Aguardando exames", "Em treinamento", "Aguardando aprovacao do fiscal"].includes(normalizeEmployee(employee).status)).length;
  const expiring = documents.filter((doc) => docStatus(doc) === "A vencer").length + (contractDays(company) >= 0 && contractDays(company) <= 60 ? 1 : 0);
  const blocks = employees.filter((employee) => ["Bloqueado", "Inativo"].includes(normalizeEmployee(employee).status)).length + (["Bloqueada", "Bloqueado", "Inativa", "Desmobilizada"].includes(normalizeCompany(company).status) ? 1 : 0);
  return `
    <div class="contract-ops-summary">
      <div><span>Funcionarios</span><strong>${employees.length}</strong></div>
      <div><span>Pendencias</span><strong>${pendencies}</strong></div>
      <div><span>Vencimentos proximos</span><strong>${expiring}</strong></div>
      <div><span>Bloqueios ativos</span><strong>${blocks}</strong></div>
    </div>
  `;
}

function openCompanyDetails(id) {
  const company = visibleCompanies().find((item) => item.id === id) || state.companies.find((item) => item.id === id);
  if (!company) return;
  const item = normalizeCompany(company);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop company-detail-backdrop";
  modal.innerHTML = `
    <section class="modal contract-detail-modal company-detail-modal">
      <div class="modal-head contract-detail-head">
        <div>
          <span class="eyebrow">Detalhe da empresa</span>
          <h2>${item.name}</h2>
          <span class="muted">${item.cnpj} - Fiscal: ${item.fiscal || "Nao informado"}</span>
        </div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="contract-tabs" role="tablist">
        ${[
          ["general", "Dados Gerais"],
          ["contracts", "Contratos"],
          ["people", "Funcionarios"],
          ["docs", "Documentos"],
          ["history", "Historico"],
        ]
          .map(([tab, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-company-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body company-tab-content">${renderCompanyTab(company, "general")}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  modal.querySelectorAll("[data-company-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.querySelectorAll("[data-company-tab]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      modal.querySelector(".company-tab-content").innerHTML = renderCompanyTab(company, button.dataset.companyTab);
      bindCompanyDetailEvents(modal, company);
    });
  });
  bindCompanyDetailEvents(modal, company);
}

function bindCompanyDetailEvents(modal, company) {
  modal.querySelector("[data-company-contract-new]")?.addEventListener("click", () => {
    alert("A estrutura atual possui um contrato por cadastro de empresa. Para cadastrar novo contrato sem alterar o banco, atualize os campos de contrato no cadastro da empresa.");
    editingCompanyId = company.id;
    modal.remove();
    currentView = "companies";
    renderApp();
  });
  modal.querySelector("[data-company-contract-open]")?.addEventListener("click", () => openContractDetails(company.id));
  modal.querySelector("[data-company-contract-close]")?.addEventListener("click", () => {
    if (closeCompanyContract(company.id)) modal.remove();
  });
  modal.querySelectorAll("[data-employee-record]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openEmployeeRecord(button.dataset.employeeRecord);
  }));
  modal.querySelectorAll("[data-document-detail]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openDocumentDetails(button.dataset.documentDetail);
  }));
}

function renderCompanyTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => employee.companyId === company.id);
  const documents = state.documents.filter((doc) => doc.companyId === company.id);
  if (tab === "general") {
    return `
      <div class="detail-grid">
        ${detailCard("Empresa", item.name)}
        ${detailCard("CNPJ", item.cnpj)}
        ${detailCard("Status", statusBadge(item.status))}
        ${detailCard("Fiscal", item.fiscal || "Nao informado")}
        ${detailCard("Responsavel", item.responsible || "Nao informado")}
        ${detailCard("Contato", `${item.phone || "Nao informado"} / ${item.email || "Nao informado"}`)}
        ${detailCard("Contrato atual", item.contract || "Nao informado")}
        ${detailCard("Inicio", formatDate(item.startDate))}
        ${detailCard("Fim", formatDate(item.endDate))}
      </div>
    `;
  }
  if (tab === "contracts") {
    const days = contractDays(item);
    return `
      <div class="contract-inner-toolbar">
        <button class="btn primary compact" type="button" data-company-contract-new>${icon("plus")} Novo contrato para esta empresa</button>
        <button class="btn secondary compact" type="button" data-company-contract-open>${icon("docs")} Abrir contrato</button>
        ${can("edit.company", company) ? `<button class="btn warning compact" type="button" data-company-contract-close>Encerrar contrato</button>` : ""}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Contrato</th><th>Empresa</th><th>Periodo</th><th>Dias</th><th>Status</th><th>Acoes</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>${item.contract || "Nao informado"}</strong><span>${item.cnpj}</span></td>
              <td>${item.name}</td>
              <td>${formatDate(item.startDate)}<br><span class="muted">ate ${formatDate(item.endDate)}</span></td>
              <td>${Number.isFinite(days) ? `${days} dia(s)` : "Nao informado"}</td>
              <td>${statusBadge(item.status)}</td>
              <td><button class="btn secondary compact" type="button" data-company-contract-open>${icon("docs")} Abrir contrato</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
  if (tab === "people") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Funcionario</th><th>CPF</th><th>Funcao</th><th>Status</th><th>Acoes</th></tr></thead>
          <tbody>${employees.length ? employees.map((employee) => `<tr><td><strong>${employee.name}</strong></td><td>${employee.cpf}</td><td>${employee.role}</td><td>${statusBadge(normalizeEmployee(employee).status)}</td><td><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir ficha</button></td></tr>`).join("") : emptyRow(5)}</tbody>
        </table>
      </div>
    `;
  }
  if (tab === "docs") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Funcionario</th><th>Vencimento</th><th>Status</th><th>Acoes</th></tr></thead>
          <tbody>${documents.length ? documents.map((doc) => `<tr><td><strong>${doc.type}</strong></td><td>${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</td><td>${formatDate(doc.dueDate)}</td><td>${statusBadge(docStatus(doc))}</td><td><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Abrir</button></td></tr>`).join("") : emptyRow(5)}</tbody>
        </table>
      </div>
    `;
  }
  return `
    <div class="history-list">
      <div class="item-card"><strong>Empresa cadastrada</strong><span class="muted">${item.name} - ${item.cnpj}</span></div>
      <div class="item-card"><strong>Contrato atual</strong><span class="muted">${item.contract || "Nao informado"} - ${formatDate(item.startDate)} ate ${formatDate(item.endDate)}</span></div>
      <div class="item-card"><strong>Funcionarios vinculados</strong><span class="muted">${employees.length} funcionario(s)</span></div>
      <div class="item-card"><strong>Documentos vinculados</strong><span class="muted">${documents.length} documento(s)</span></div>
    </div>
  `;
}

function closeCompanyContract(id) {
  const company = state.companies.find((item) => item.id === id);
  if (!company || !can("edit.company", company)) return false;
  if (!confirm(`Deseja encerrar o contrato da empresa ${company.name}?`)) return false;
  const previousStatus = company.status || "";
  company.status = "Inativa";
  const history = createHistoryEvent({
    entityType: "contrato",
    entityId: company.id,
    action: "Encerramento de contrato",
    previousStatus,
    nextStatus: company.status,
    observation: `Contrato ${company.contract || company.name} encerrado pela tela de detalhes da empresa.`,
  });
  state.historico = upsertById(state.historico, history);
  syncCollection("companies", company).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Contrato encerrado" }));
  saveState();
  renderApp();
  return true;
}

function bindContractDetailEvents(modal, company) {
  modal.querySelectorAll("[data-contract-tab-jump]").forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.contractTabJump;
    modal.querySelectorAll("[data-contract-tab]").forEach((item) => item.classList.toggle("active", item.dataset.contractTab === target));
    modal.querySelector(".contract-tab-content").innerHTML = renderContractTab(company, target);
    bindContractDetailEvents(modal, company);
  }));
  modal.querySelector("[data-contract-employee-search]")?.addEventListener("input", (event) => {
    contractDetailState[company.id].employeeSearch = event.target.value;
    modal.querySelector(".contract-tab-content").innerHTML = renderContractTab(company, "people");
    bindContractDetailEvents(modal, company);
    requestAnimationFrame(() => {
      const input = modal.querySelector("[data-contract-employee-search]");
      input?.focus();
      input?.setSelectionRange(event.target.value.length, event.target.value.length);
    });
  });
  modal.querySelector("[data-contract-employee-status]")?.addEventListener("change", (event) => {
    contractDetailState[company.id].employeeStatus = event.target.value;
    modal.querySelector(".contract-tab-content").innerHTML = renderContractTab(company, "people");
    bindContractDetailEvents(modal, company);
  });
  modal.querySelectorAll("[data-employee-record]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openEmployeeRecord(button.dataset.employeeRecord);
  }));
  modal.querySelectorAll("[data-document-detail]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    openDocumentDetails(button.dataset.documentDetail);
  }));
  modal.querySelector("[data-contract-company-detail]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openCompanyQuickDetails(company.id);
  });
}

function openCompanyQuickDetails(id) {
  const company = state.companies.find((item) => item.id === id);
  if (!company) return;
  const item = normalizeCompany(company);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `
    <section class="modal">
      <div class="modal-head">
        <div><span class="eyebrow">Empresa vinculada</span><h2>${item.name}</h2><span class="muted">${item.cnpj}</span></div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="modal-body detail-grid">
        ${detailCard("Contrato", item.contract || "Nao informado")}
        ${detailCard("Fiscal", item.fiscal || "Nao informado")}
        ${detailCard("Responsavel", item.responsible || "Nao informado")}
        ${detailCard("Contato", `${item.phone || "Nao informado"} / ${item.email || "Nao informado"}`)}
        ${detailCard("Periodo", `${formatDate(item.startDate)} ate ${formatDate(item.endDate)}`)}
        ${detailCard("Status", statusBadge(item.status))}
      </div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
}

function renderContractTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => employee.companyId === company.id);
  const documents = state.documents.filter((doc) => doc.companyId === company.id);
  const days = contractDays(item);
  const blockedEmployees = employees.filter((employee) => ["Bloqueado", "Inativo"].includes(normalizeEmployee(employee).status));
  const pendingDocs = documents.filter((doc) => docStatus(doc) !== "Aprovado");
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
      <div class="contract-context-actions">
        <button class="btn secondary compact" type="button" data-contract-company-detail>${icon("company")} Ver empresa</button>
        <button class="btn secondary compact" type="button" data-contract-tab-jump="people">${icon("users")} Ver funcionarios</button>
        <button class="btn secondary compact" type="button" data-contract-tab-jump="docs">${icon("docs")} Ver documentos</button>
      </div>
    `;
  }
  if (tab === "people") {
    const detail = contractDetailState[company.id] || { employeeSearch: "", employeeStatus: "Todos" };
    const term = detail.employeeSearch.trim().toLowerCase();
    const statuses = ["Todos", ...hiringStatuses];
    const items = employees.filter((employee) => {
      const normalized = normalizeEmployee(employee);
      const companyItem = normalizeCompany(company);
      const searchable = [normalized.name, normalized.cpf, employeeRegistration(normalized), normalized.role, companyItem.name, companyItem.contract, employeeCostCenter(normalized, companyItem), normalized.status].join(" ").toLowerCase();
      return (!term || searchable.includes(term)) && (detail.employeeStatus === "Todos" || normalized.status === detail.employeeStatus);
    });
    return `
      <div class="contract-inner-toolbar">
        <input class="search" data-contract-employee-search placeholder="Buscar funcionario por nome, CPF, matricula ou status" value="${escapeAttr(detail.employeeSearch)}" />
        <label class="compact-filter">Status
          <select data-contract-employee-status>${statuses.map((status) => `<option value="${status}" ${detail.employeeStatus === status ? "selected" : ""}>${status}</option>`).join("")}</select>
        </label>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Funcionario/FIT</th><th>CPF</th><th>Funcao</th><th>ASO</th><th>Treinamento</th><th>Status</th><th>Acoes</th></tr></thead>
          <tbody>
            ${
              items.length
                ? items
                    .map((employee) => {
                      const normalized = normalizeEmployee(employee);
                      return `<tr><td><strong>${normalized.name}</strong><span>${employeeRegistration(normalized)}</span></td><td>${normalized.cpf}</td><td>${normalized.role}</td><td>${formatDate(normalized.asoValidity)}</td><td>${formatDate(normalized.trainingValidity)}</td><td>${statusBadge(normalized.status)}</td><td><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir ficha</button></td></tr>`;
                    })
                    .join("")
                : emptyRow(7)
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (tab === "docs") {
    const buckets = [
      ["Vencidos", documents.filter((doc) => docStatus(doc) === "Vencido").length, "danger"],
      ["A vencer", documents.filter((doc) => docStatus(doc) === "A vencer").length, "warning"],
      ["Aprovados", documents.filter((doc) => docStatus(doc) === "Aprovado").length, "success"],
      ["Pendentes", documents.filter((doc) => docStatus(doc) === "Pendente" || docStatus(doc) === "Reprovado").length, "info"],
    ];
    return `
      <div class="report-grid contract-report-grid">
        ${buckets.map(([label, value, tone]) => `<div class="stat-card ${tone}"><span>${label}</span><strong>${value}</strong><small>Documento(s)</small></div>`).join("")}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Funcionario</th><th>Validade</th><th>Status</th><th>Observacoes</th><th>Acoes</th></tr></thead>
          <tbody>
            ${
              documents.length
                ? documents
                    .map((doc) => `<tr><td><strong>${doc.type}</strong></td><td>${doc.employeeId ? `<button class="btn secondary compact" type="button" data-employee-record="${doc.employeeId}">${employeeName(doc.employeeId)}</button>` : "Empresa"}</td><td>${formatDate(doc.dueDate)}</td><td>${statusBadge(docStatus(doc))}</td><td>${documentVisibleNotes(doc) || "<span class='muted'>Sem observacao</span>"}</td><td><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Abrir</button></td></tr>`)
                    .join("")
                : emptyRow(6)
            }
          </tbody>
        </table>
      </div>
    `;
  }
  if (tab === "approvals") {
    const approvals = documents.filter((doc) => ["Pendente", "Reprovado", "A vencer", "Vencido"].includes(docStatus(doc)));
    return `
      <div class="history-list">
        ${approvals.length ? approvals.map((doc) => `<div class="item-card"><div class="item-row"><div><strong>${doc.type}</strong><span class="muted">${doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa"} - ${formatDate(doc.dueDate)}</span></div>${statusBadge(docStatus(doc))}</div><div class="actions wrap"><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Ver detalhes</button>${documentRowActions(doc)}</div></div>`).join("") : `<div class="empty">Nenhuma aprovacao pendente neste contrato.</div>`}
      </div>
    `;
  }
  if (tab === "history") {
    return `
      <div class="history-list">
        <div class="item-card"><strong>Contrato registrado</strong><span class="muted">${formatDate(item.startDate)} - ${item.name}</span></div>
        <div class="item-card"><strong>Status atual</strong><span class="muted">${item.status}</span></div>
        <div class="item-card"><strong>Documentos monitorados</strong><span class="muted">${documents.length} documento(s) associados ao contrato.</span></div>
        <div class="item-card"><strong>Funcionarios vinculados</strong><span class="muted">${employees.length} funcionario(s)/FIT vinculados.</span></div>
        <div class="item-card"><strong>Pendencias atuais</strong><span class="muted">${pendingDocs.length} documento(s) e ${blockedEmployees.length} bloqueio(s) em acompanhamento.</span></div>
      </div>
    `;
  }
  return `
    <div class="grid-two">
      <section class="panel">
        <div class="modal-head"><h2>Pendencias documentais</h2><span class="mini-pill">${pendingDocs.length}</span></div>
        <div class="modal-body item-list">${pendingDocs.length ? pendingDocs.map((doc) => `<div class="item-card"><div class="item-row"><strong>${doc.type}</strong>${statusBadge(docStatus(doc))}</div><span class="muted">${doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa"} - ${formatDate(doc.dueDate)}</span></div>`).join("") : `<div class="empty">Sem pendencias documentais.</div>`}</div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Bloqueios</h2><span class="mini-pill">${blockedEmployees.length}</span></div>
        <div class="modal-body item-list">${blockedEmployees.length ? blockedEmployees.map((employee) => `<div class="item-card danger-zone"><div class="item-row"><strong>${employee.name}</strong>${statusBadge(normalizeEmployee(employee).status)}</div><span class="muted">${employee.role} - ${employee.cpf}</span><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir ficha</button></div>`).join("") : `<div class="empty">Sem bloqueios ativos.</div>`}</div>
      </section>
    </div>
  `;
}

function detailCard(label, value) {
  return `<div class="detail-card"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderApprovals() {
  const baseItems = visibleDocuments().filter((doc) => ["Pendente", "Reprovado", "A vencer", "Vencido"].includes(docStatus(doc)));
  const filteredItems = filtered(baseItems, [(doc) => doc.type, (doc) => companyName(doc.companyId), (doc) => employeeName(doc.employeeId), (doc) => docStatus(doc)]);
  const items = sortItems("approvals", applyOperationalFilters("approvals", filteredItems));
  const { pageItems, totalPages } = paginateItems("approvals", items);
  return `
    <section class="panel">
      <div class="modal-head">
        <div>
          <h2>Aprovacoes documentais</h2>
          <span class="muted">Fila de documentos para avaliacao do fiscal.</span>
        </div>
        <span class="mini-pill">${items.length} item(ns)</span>
      </div>
      <div class="modal-body">
        ${toolbar("Buscar por documento, empresa, funcionario ou status")}
        ${renderOperationalFilters("approvals", baseItems, { quicks: ["Todos", "Pendente", "Vencido", "A vencer", "Medicina", "EHS"], exportKey: "pendencias-por-setor" })}
      </div>
      <div class="modal-body item-list">
        ${
          pageItems.length
            ? pageItems
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
                      <div class="actions wrap"><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Ver detalhes</button>${documentRowActions(doc)}</div>
                    </div>
                  `,
                )
                .join("")
            : `<div class="empty">Nenhum documento aguardando aprovacao.</div>`
        }
      </div>
      ${renderPagination("approvals", items.length, totalPages)}
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
  const baseItems = [
    ...blockedCompanies.map((company) => ({ ...company, blockType: "Empresa", blockName: company.name, blockCompanyId: company.id })),
    ...blockedEmployees.map((employee) => ({ ...employee, blockType: "Funcionario", blockName: employee.name, blockCompanyId: employee.companyId })),
  ];
  const filteredItems = filtered(baseItems, [
    (item) => item.blockName,
    (item) => item.cpf,
    (item) => employeeRegistration(item),
    (item) => companyName(item.blockCompanyId),
    (item) => state.companies.find((company) => company.id === item.blockCompanyId)?.contract,
    (item) => item.role,
    (item) => item.status,
  ]);
  const items = sortItems("blocks", applyOperationalFilters("blocks", filteredItems));
  const { pageItems, totalPages } = paginateItems("blocks", items);
  return `
    <section class="panel table-wrap">
      <div class="modal-head"><h2>Bloqueios operacionais</h2><span class="mini-pill">${items.length} registro(s)</span></div>
      <div class="modal-body">
        ${toolbar("Buscar por nome, CPF, matricula, empresa, contrato ou status")}
        ${renderOperationalFilters("blocks", baseItems, { quicks: ["Todos", "Bloqueado", "Desmobilizado"], exportKey: "bloqueios" })}
      </div>
      <table>
        <thead><tr>${sortableHeader("blocks", "Tipo", "sector")}${sortableHeader("blocks", "Registro", "name")}${sortableHeader("blocks", "Empresa", "company")}<th>Contrato</th>${sortableHeader("blocks", "Status", "status")}<th>Acoes</th></tr></thead>
        <tbody>
          ${
            pageItems.length
              ? pageItems.map((item) => {
                  const isEmployee = item.blockType === "Funcionario";
                  const company = state.companies.find((entry) => entry.id === item.blockCompanyId);
                  return `<tr><td>${item.blockType}</td><td><strong>${item.blockName}</strong><br><span class="muted">${isEmployee ? item.role : item.cnpj}</span></td><td>${company?.name || item.blockName}</td><td>${company?.contract || item.contract || "Nao informado"}</td><td>${statusBadge(item.status)}</td><td>${isEmployee ? `<button class="btn secondary compact" type="button" data-employee-record="${item.id}">${icon("users")} Ver detalhes</button>` : `<button class="btn secondary compact" type="button" data-contract-detail="${item.id}">${icon("docs")} Ver detalhes</button>`}</td></tr>`;
                }).join("")
              : emptyRow(6)
          }
        </tbody>
      </table>
      ${renderPagination("blocks", items.length, totalPages)}
    </section>
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
  const cleanNotes = documentVisibleNotes(doc);
  return `
    <tr>
      <td><strong>${doc.type}</strong><br><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Ver ficha</button></td>
      <td>${companyName(doc.companyId)}</td>
      <td>${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</td>
      <td>${formatDate(doc.dueDate)}</td>
      <td>${statusBadge(docStatus(doc))}</td>
      <td>${cleanNotes || "<span class='muted'>Sem observacao</span>"}${doc.filePath ? `<br><span class="muted">${doc.filePath}</span>` : ""}</td>
      <td>${documentRowActions(doc)}</td>
    </tr>
  `;
}

function openDocumentDetails(id) {
  const doc = visibleDocuments().find((item) => item.id === id) || state.documents.find((item) => item.id === id);
  if (!doc) return;
  const status = docStatus(doc);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `
    <section class="modal document-detail-modal">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Ficha documental enterprise</span>
          <h2>${doc.type}</h2>
          <span class="muted">${companyName(doc.companyId)} - ${doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa"}</span>
        </div>
        <div class="actions wrap">
          ${statusBadge(status)}
          <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
        </div>
      </div>
      <div class="modal-body document-detail-grid">
        <section class="document-preview-panel">
          ${renderDocumentPreview(doc)}
        </section>
        <section class="document-info-panel">
          <div class="detail-grid">
            ${detailCard("Empresa", companyName(doc.companyId))}
            ${detailCard("Funcionario", doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa")}
            ${detailCard("Vencimento", formatDate(doc.dueDate))}
            ${detailCard("Status automatico", statusBadge(status))}
          </div>
          <div class="document-flow">${renderDocumentWorkflowSteps(doc)}</div>
        </section>
        <section class="panel document-comments-panel">
          <div class="modal-head"><h2>Comentarios por setor</h2><span class="mini-pill">Fiscal / Medicina / EHS / Patrimonial</span></div>
          <div class="document-sector-comments">${renderSectorComments(doc)}</div>
        </section>
        <section class="panel document-audit-panel">
          <div class="modal-head"><h2>Timeline e auditoria imutavel</h2><span class="mini-pill">${documentAuditTrail(doc).length} evento(s)</span></div>
          <div class="document-timeline">${renderDocumentAuditTrail(doc)}</div>
        </section>
      </div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
}

function renderDocumentPreview(doc) {
  const path = doc.filePath || "";
  if (!path) {
    return `<div class="document-preview-empty">${icon("docs")}<strong>Nenhum arquivo vinculado</strong><span>Use o cadastro do documento para enviar PDF ou imagem.</span></div>`;
  }
  const lower = path.toLowerCase();
  const src = path.startsWith("http") || path.startsWith("blob:") || path.startsWith("data:") ? path : "";
  if (src && lower.endsWith(".pdf")) return `<iframe class="document-preview-frame" src="${escapeAttr(src)}" title="Preview PDF"></iframe>`;
  if (src && /\.(png|jpg|jpeg|webp|gif)$/i.test(lower)) return `<img class="document-preview-image" src="${escapeAttr(src)}" alt="Preview do documento" />`;
  return `<div class="document-preview-empty">${icon("docs")}<strong>Arquivo armazenado</strong><span>${escapeHtml(path)}</span><small>Preview direto disponivel para URLs publicas de PDF ou imagem.</small></div>`;
}

function renderDocumentWorkflowSteps(doc) {
  const comments = documentSectorComments(doc);
  const status = docStatus(doc);
  const steps = DOCUMENT_WORKFLOW_SECTORS.map((sector) => {
    const hasComment = Boolean(comments[sector]);
    const stepStatus = status === "Aprovado" || hasComment ? "Aprovado" : status === "Reprovado" ? "Reprovado" : "Pendente";
    return `
      <div class="employee-flow-step ${statusClass(stepStatus)}">
        <span>${DOCUMENT_WORKFLOW_SECTORS.indexOf(sector) + 1}</span>
        <strong>${sector}</strong>
        ${statusBadge(stepStatus)}
      </div>
    `;
  });
  return steps.join("");
}

function renderSectorComments(doc) {
  const comments = documentSectorComments(doc);
  return DOCUMENT_WORKFLOW_SECTORS.map((sector) => `
    <div class="item-card">
      <div class="item-row"><strong>${sector}</strong>${comments[sector] ? statusBadge("Aprovado") : statusBadge("Pendente")}</div>
      <span class="muted">${comments[sector] || "Sem comentario registrado."}</span>
    </div>
  `).join("");
}

function renderDocumentAuditTrail(doc) {
  const trail = documentAuditTrail(doc);
  if (!trail.length) return `<div class="empty">Nenhum evento de auditoria registrado.</div>`;
  return trail
    .map((event) => `
      <div class="timeline-item">
        <span>${formatDateTime(event.at)}</span>
        <strong>${event.action}</strong>
        <p>${event.sector || "Sistema"} - ${event.status || "Sem status"}${event.comment ? `: ${escapeHtml(event.comment)}` : ""}</p>
      </div>
    `)
    .join("");
}

function renderUsers() {
  const items = filtered(state.users, [(item) => item.name, (item) => item.email, (item) => roleName(item.role)]);
  return `
    ${sectionHead("Usuarios", "Gerencie perfis por setor, fornecedor e visitantes.", "Novo usuario", "user")}
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
  if (type === "employee") {
    const employee = state.employees.find((entry) => entry.id === id);
    return employee ? employeeRowActions(employee) : "";
  }
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

function employeeRowActions(employee) {
  const item = normalizeEmployee(employee);
  const canEditEmployee = can("edit.employee", item);
  const canOperateEmployee = can("updateHiringStatus", item);
  if (!canEditEmployee && !canOperateEmployee) return `<span class="mini-pill">Somente leitura</span>`;
  return `
    ${canEditEmployee ? `<button class="btn icon" title="Editar" data-edit="employee" data-id="${item.id}">${icon("edit")}</button>` : ""}
    ${canOperateEmployee ? `<button class="btn warning compact" type="button" data-employee-action="demobilize" data-id="${item.id}">Desmobilizar</button>` : ""}
    ${canOperateEmployee ? `<button class="btn secondary compact" type="button" data-employee-action="inactivate" data-id="${item.id}">Inativar</button>` : ""}
    ${canOperateEmployee ? `<button class="btn danger compact" type="button" data-employee-action="block" data-id="${item.id}">Bloquear</button>` : ""}
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
    "Aprovado com pendencia": "conditional",
    Regular: "ok",
    Ativa: "ok",
    Ativo: "ok",
    Liberado: "ok",
    Integrado: "ok",
    Conectado: "ok",
    Estatico: "ok",
    "A vencer": "warn",
    Pendente: "warn",
    "Ativo com pendencia": "conditional",
    "Em analise": "analysis",
    "Documentos pendente": "pending-docs",
    "Aguardando exames": "exams",
    "Em treinamento": "training",
    "Aguardando aprovacao do fiscal": "fiscal",
    Vencido: "bad",
    Inativa: "bad",
    Inativo: "bad",
    Encerrado: "bad",
    Desmobilizado: "bad",
    Desmobilizada: "bad",
    Reprovado: "bad",
    Bloqueado: "bad",
    Bloqueada: "bad",
    Preparado: "info",
    Roadmap: "info",
  }[status] || "info";
  return `<span class="status ${kind}">${status}</span>`;
}

function statusClass(status) {
  return {
    Aprovado: "ok",
    "Aprovado com pendencia": "conditional",
    Regular: "ok",
    Ativa: "ok",
    Ativo: "ok",
    Liberado: "ok",
    Pendente: "warn",
    "Ativo com pendencia": "conditional",
    "A vencer": "warn",
    Reprovado: "bad",
    Vencido: "bad",
    Bloqueado: "bad",
    Bloqueada: "bad",
    Inativo: "bad",
    Encerrado: "bad",
    Desmobilizado: "bad",
    Desmobilizada: "bad",
    "Em analise": "info",
  }[status] || "info";
}

function bindViewEvents() {
  bindInputMasks(document);
  document.querySelectorAll(".search-control").forEach((input) => {
    input.addEventListener("input", (event) => {
      const cursor = event.target.selectionStart || 0;
      const placeholder = event.target.getAttribute("placeholder");
      searchTerm = event.target.value;
      resetTablePage(currentView);
      if (currentView === "contracts") contractPage = 1;
      clearTimeout(searchRenderTimer);
      searchRenderTimer = setTimeout(() => {
        renderApp();
        requestAnimationFrame(() => {
          const nextInput = Array.from(document.querySelectorAll(".search-control")).find((item) => item.getAttribute("placeholder") === placeholder) || document.querySelector(".search-control");
          if (!nextInput) return;
          nextInput.focus();
          nextInput.setSelectionRange(cursor, cursor);
        });
      }, 120);
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
    resetTablePage("contracts");
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

  document.querySelectorAll("[data-page-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.pageView;
      tableConfig(view).page += Number(button.dataset.pageStep || 0);
      renderApp();
    });
  });

  document.querySelectorAll("[data-page-size]").forEach((select) => {
    select.addEventListener("change", () => {
      const view = select.dataset.pageSize;
      tableConfig(view).pageSize = Number(select.value);
      resetTablePage(view);
      renderApp();
    });
  });

  document.querySelectorAll("[data-sort-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const config = tableConfig(button.dataset.sortView);
      if (config.sort === button.dataset.sortKey) {
        config.dir = config.dir === "asc" ? "desc" : "asc";
      } else {
        config.sort = button.dataset.sortKey;
        config.dir = "asc";
      }
      resetTablePage(button.dataset.sortView);
      renderApp();
    });
  });

  document.querySelectorAll("[data-quick-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.quickView;
      tableConfig(view).quick = button.dataset.quickFilter;
      resetTablePage(view);
      renderApp();
    });
  });

  document.querySelectorAll("[data-filter-view]").forEach((select) => {
    select.addEventListener("change", () => {
      const config = tableConfig(select.dataset.filterView);
      config[select.dataset.filterField] = select.value;
      resetTablePage(select.dataset.filterView);
      renderApp();
    });
  });

  document.querySelectorAll("[data-contract-detail]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openContractDetails(item.dataset.contractDetail);
    });
  });

  document.querySelectorAll("[data-company-detail]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openCompanyDetails(item.dataset.companyDetail);
    });
  });

  document.querySelectorAll("[data-employee-record]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openEmployeeRecord(item.dataset.employeeRecord);
    });
  });

  document.querySelectorAll("[data-document-detail]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openDocumentDetails(item.dataset.documentDetail);
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
      if (tableState[target]) {
        tableState[target].quick = card.dataset.targetQuick || tableState[target].quick || "Todos";
        resetTablePage(target);
      }
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

  document.querySelectorAll("[data-export-future]").forEach((button) => {
    button.addEventListener("click", () => {
      alert(`Exportacao futura para Excel preparada: ${button.dataset.exportFuture}.`);
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

  document.querySelectorAll("[data-employee-action]").forEach((button) => {
    button.addEventListener("click", () => updateEmployeeOperationalStatus(button.dataset.id, button.dataset.employeeAction));
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
  bindEmployeeCompanyContractSync();

  document.querySelectorAll("[data-employee-status]").forEach((button) => {
    button.addEventListener("click", () => {
      employeeStatusFilter = button.dataset.employeeStatus;
      renderApp();
    });
  });
}

function bindInputMasks(root = document) {
  root.querySelectorAll("[data-mask='cpf']").forEach((input) => {
    input.value = formatCpf(input.value);
    input.addEventListener("input", () => {
      input.value = formatCpf(input.value);
    });
  });
  root.querySelectorAll("[data-mask='cep']").forEach((input) => {
    input.value = formatCep(input.value);
    input.addEventListener("input", () => {
      input.value = formatCep(input.value);
    });
  });
}

function bindEmployeeCompanyContractSync() {
  const form = document.querySelector("#employeeEditorForm");
  if (!form) return;
  const companySelect = form.querySelector("[name='companyId']");
  const contractInput = form.querySelector("[name='contract']");
  const costCenterInput = form.querySelector("[name='costCenter']");
  companySelect?.addEventListener("change", () => {
    const company = state.companies.find((item) => item.id === companySelect.value);
    if (!company) return;
    contractInput.value = company.contract || contractInput.value || "";
    costCenterInput.value = company.costCenter || company.contract || costCenterInput.value || "";
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
  if (type === "document") bindDocumentUpload(modal);

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
      const table = type === "document" ? "public.documents/storage.objects" : type === "user" ? "public.usuarios" : type;
      logPersistenceError(error, { table, operation: "salvar formulario" });
      alert(`Nao foi possivel salvar.\n\n${persistenceMessage(error)}`);
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
  const required = /\brequired\b/.test(attrs);
  return `<label>${label}${required ? ` <span class="required-mark">*</span>` : ""}<input name="${name}" value="${escapeAttr(value)}" ${attrs} /></label>`;
}

function selectField(name, label, value, options) {
  return `<label>${label}<select name="${name}">${options
    .map((option) => `<option value="${escapeAttr(option.value)}" ${String(option.value) === String(value) ? "selected" : ""}>${option.label}</option>`)
    .join("")}</select></label>`;
}

function textAreaField(name, label, value = "") {
  return `<label class="wide">${label}<textarea name="${name}">${escapeHtml(value)}</textarea></label>`;
}

function formSection(title, fields) {
  return `
    <fieldset class="form-section wide">
      <legend>${title}</legend>
      <div class="form-section-grid">${fields.join("")}</div>
    </fieldset>
  `;
}

function fileField(name, label) {
  return `
    <label class="wide">${label}
      <div class="dropzone" data-dropzone>
        <input name="${name}" type="file" accept="application/pdf,image/*" />
        <div class="dropzone-content">
          ${icon("docs")}
          <strong>Arraste PDF ou imagem aqui</strong>
          <span>ou clique para selecionar o arquivo</span>
        </div>
      </div>
      <div class="document-upload-preview" data-upload-preview></div>
    </label>
  `;
}

function bindDocumentUpload(scope) {
  const dropzone = scope.querySelector("[data-dropzone]");
  const input = dropzone?.querySelector("input[type='file']");
  const preview = scope.querySelector("[data-upload-preview]");
  if (!dropzone || !input || !preview) return;
  const showPreview = () => {
    const file = input.files?.[0];
    if (!file) {
      preview.innerHTML = "";
      return;
    }
    const url = URL.createObjectURL(file);
    if (file.type === "application/pdf") {
      preview.innerHTML = `<iframe class="document-preview-frame compact" src="${url}" title="Preview PDF"></iframe><span class="muted">${file.name}</span>`;
      return;
    }
    if (file.type.startsWith("image/")) {
      preview.innerHTML = `<img class="document-preview-image compact" src="${url}" alt="Preview do arquivo" /><span class="muted">${file.name}</span>`;
      return;
    }
    preview.innerHTML = `<span class="muted">${file.name}</span>`;
  };
  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.remove("dragging");
    });
  });
  dropzone.addEventListener("drop", (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    showPreview();
  });
  input.addEventListener("change", showPreview);
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
  const comments = documentSectorComments(item);
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
      textAreaField("notes", "Observacoes gerais", documentVisibleNotes(item)),
      textAreaField("commentFiscal", "Comentario Fiscal", comments.Fiscal || ""),
      textAreaField("commentMedicina", "Comentario Medicina", comments.Medicina || ""),
      textAreaField("commentEHS", "Comentario EHS", comments.EHS || ""),
      textAreaField("commentPatrimonial", "Comentario Patrimonial", comments.Patrimonial || ""),
    ],
    async save(form) {
      const payload = normalizeDocumentFormPayload(form, item.filePath);
      validateDocumentPayload(payload);
      const filePath = await uploadDocumentFile(form, item.filePath);
      const previousStatus = item.status || "";
      const saved = {
        ...(id ? item : { id: crypto.randomUUID() }),
        ...payload,
        filePath: filePath || payload.filePath,
      };
      saved.auditTrail = buildDocumentAuditTrail(item, saved, id ? "Documento atualizado" : "Documento cadastrado");
      try {
        await syncCollection("documents", saved);
        upsert("documents", id || saved.id, saved);
        recordManualStatusHistory("documento", saved.id, previousStatus, saved.status, `Documento ${saved.type} salvo pelo formulario.`);
        await persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Documento salvo" }));
      } catch (error) {
        throw wrapPersistenceError(error, {
          table: "public.documents",
          operation: "upsert",
          payload: mapDocumentToDb(saved),
        });
      }
    },
  };
}

function normalizeDocumentFormPayload(form, fallbackPath = "") {
  const sectorComments = {
    Fiscal: form.get("commentFiscal") || "",
    Medicina: form.get("commentMedicina") || "",
    EHS: form.get("commentEHS") || "",
    Patrimonial: form.get("commentPatrimonial") || "",
  };
  return {
    companyId: form.get("companyId"),
    employeeId: form.get("employeeId"),
    type: form.get("type"),
    dueDate: form.get("dueDate"),
    status: form.get("status"),
    filePath: form.get("filePath") || fallbackPath || "",
    notes: form.get("notes"),
    sectorComments,
  };
}

function validateDocumentPayload(payload) {
  if (!payload.companyId) {
    throw new PersistenceError("Falha em public.documents: selecione uma empresa antes de salvar o documento.", {
      table: "public.documents",
      operation: "validacao",
      hint: "Campo obrigatorio company_id ausente.",
      payload,
    });
  }
  const companyExists = state.companies.some((company) => company.id === payload.companyId);
  if (!companyExists) {
    throw new PersistenceError("Falha em public.documents: empresa vinculada nao existe ou nao esta disponivel para o usuario atual.", {
      table: "public.documents",
      operation: "validacao de foreign key",
      hint: "company_id nao encontrado em public.companies.",
      payload,
    });
  }
  if (payload.employeeId) {
    const employee = state.employees.find((item) => item.id === payload.employeeId);
    if (!employee) {
      throw new PersistenceError("Falha em public.documents: funcionario vinculado nao existe.", {
        table: "public.documents",
        operation: "validacao de foreign key",
        hint: "employee_id nao encontrado em public.employees.",
        payload,
      });
    }
    if (employee.companyId !== payload.companyId) {
      throw new PersistenceError("Falha em public.documents: o funcionario selecionado nao pertence a empresa do documento.", {
        table: "public.documents",
        operation: "validacao de relacionamento",
        hint: "employee_id pertence a outra company_id.",
        payload,
      });
    }
  }
  if (!payload.type) {
    throw new PersistenceError("Falha em public.documents: informe o tipo de documento.", {
      table: "public.documents",
      operation: "validacao",
      hint: "Campo obrigatorio type ausente.",
      payload,
    });
  }
  if (!payload.status) {
    throw new PersistenceError("Falha em public.documents: informe o status do documento.", {
      table: "public.documents",
      operation: "validacao",
      hint: "Campo obrigatorio status ausente.",
      payload,
    });
  }
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
        { value: "admin", label: "Administrador" },
        { value: "fiscal", label: "Fiscal" },
        { value: "medicina", label: "Medicina" },
        { value: "ehs", label: "EHS" },
        { value: "patrimonial", label: "Patrimonial" },
        { value: "supplier", label: "Fornecedor" },
        { value: "visitor", label: "Visitante" },
      ]),
      selectField("companyId", "Empresa vinculada opcional", item.companyId || "", [{ value: "", label: "Nao vinculado" }].concat(state.companies.map((company) => ({ value: company.id, label: company.name })))),
      selectField("active", "Status", item.active === false ? "false" : "true", [
        { value: "true", label: "Ativo" },
        { value: "false", label: "Inativo" },
      ]),
    ],
    async save(form) {
      const email = String(form.get("email") || "").trim().toLowerCase();
      const localExisting = state.users.find((user) => user.id !== id && String(user.email || "").trim().toLowerCase() === email);
      if (localExisting && id) {
        alert("E-mail ja cadastrado. Edite o usuario existente ou informe outro e-mail.");
        return;
      }
      const payload = {
        id: id || null,
        name: String(form.get("name") || "").trim(),
        email,
        password: optionalNull(form.get("password")),
        role: form.get("role"),
        companyId: optionalNull(form.get("companyId")),
        setor: optionalNull(item.setor),
        matricula: optionalNull(item.matricula),
        active: form.get("active") === "true",
        createdAt: item.createdAt || new Date().toISOString(),
        isNew: !id,
      };
      if (isOnlineMode()) {
        try {
          const saved = await syncUserRecord(payload);
          state.users = state.users.filter((user) => user.id === id || String(user.email || "").trim().toLowerCase() !== saved.email);
          upsert("users", saved.id, { ...payload, ...saved, isNew: false });
          alert(id ? "Usuario atualizado com sucesso." : "Usuario criado com sucesso.");
        } catch (error) {
          const message = id ? "Erro ao atualizar usuario" : "Erro ao criar usuario";
          throw new PersistenceError(`${message}: ${persistenceMessage(error)}`, error?.context || { table: "public.usuarios", operation: "salvar usuario", payload: mapUserToDb(payload, { includeId: Boolean(id) }) }, error);
        }
        return;
      }
      upsert("users", id, payload);
      alert(id ? "Usuario atualizado com sucesso." : "Usuario criado com sucesso.");
    },
  };
}

function upsert(collection, id, data) {
  if (id && state[collection].some((item) => item.id === id)) {
    state[collection] = state[collection].map((item) => (item.id === id ? { ...item, ...data } : item));
    return state[collection].find((item) => item.id === id);
  } else {
    const item = { id: id || crypto.randomUUID(), ...data };
    state[collection].push(item);
    return item;
  }
}

function saveCompanyFromForm(form) {
  const id = form.get("id") || null;
  const previousStatus = state.companies.find((company) => company.id === id)?.status || "";
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
  recordManualStatusHistory("empresa", saved.id, previousStatus, saved.status, `Empresa ${saved.name} salva pelo formulario.`);
  syncCollection("companies", saved).catch((error) => alert(`Nao foi possivel salvar online: ${error.message}`));
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Empresa salva" }));
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
  const cpfDigits = onlyDigits(form.get("cpf"));
  const cepDigits = onlyDigits(form.get("cep"));
  if (cpfDigits.length !== 11) {
    alert("CPF invalido. Informe exatamente 11 numeros.");
    return;
  }
  if (cepDigits.length !== 8) {
    alert("CEP invalido. Informe exatamente 8 numeros.");
    return;
  }
  const existing = state.employees.find((employee) => employee.id === id);
  const previousStatus = existing?.status || "";
  const canEditFullEmployee =
    currentUser()?.role === "admin" ||
    (currentUser()?.role === "supplier" && (!existing || existing.companyId === currentUser()?.companyId));
  const payload = {
    name: form.get("name"),
    cpf: cpfDigits,
    registration: form.get("registration"),
    birthDate: form.get("birthDate"),
    motherName: form.get("motherName"),
    fatherName: form.get("fatherName"),
    role: form.get("role"),
    companyId: form.get("companyId"),
    contract: form.get("contract"),
    costCenter: form.get("costCenter"),
    cep: cepDigits,
    city: form.get("city"),
    district: form.get("district"),
    street: form.get("street"),
    number: form.get("number"),
    complement: form.get("complement"),
    asoValidity: form.get("asoValidity"),
    trainingValidity: form.get("trainingValidity"),
    docStatus: form.get("docStatus"),
    address: buildEmployeeAddressFromForm(form),
    notes: form.get("notes"),
    status: form.get("status"),
  };
  const fiscalPayload = existing
    ? { ...existing, docStatus: form.get("docStatus"), notes: form.get("notes"), status: form.get("status") }
    : payload;

  const saved = upsert("employees", id, canEditFullEmployee ? payload : fiscalPayload);
  recordManualStatusHistory("funcionario", saved.id, previousStatus, saved.status, `Funcionario ${saved.name} salvo pelo formulario.`);
  syncCollection("employees", saved).catch((error) => alert(`Nao foi possivel salvar online: ${error.message}`));
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Funcionario salvo" }));
  saveState();
  editingEmployeeId = null;
  render();
}

function buildEmployeeAddressFromForm(form) {
  const parts = [
    form.get("street"),
    form.get("number"),
    form.get("complement"),
    form.get("district"),
    form.get("city"),
    formatCep(form.get("cep")),
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  return parts.join(", ");
}

function updateEmployeeOperationalStatus(id, action) {
  const employee = state.employees.find((item) => item.id === id);
  if (!employee) return;
  if (!can("updateHiringStatus", employee)) {
    alert("Seu perfil nao possui permissao para alterar o status deste funcionario.");
    return;
  }

  const actions = {
    demobilize: { label: "desmobilizar", status: "Desmobilizado", historyStatus: "Desmobilizado" },
    inactivate: { label: "inativar", status: "Inativo", historyStatus: "Inativado" },
    block: { label: "bloquear", status: "Bloqueado", historyStatus: "Bloqueado" },
  };
  const config = actions[action];
  if (!config) return;

  const reason = prompt(`Informe o motivo obrigatorio para ${config.label} o funcionario ${employee.name}:`);
  if (!reason || !reason.trim()) {
    alert("Motivo obrigatorio. A alteracao nao foi aplicada.");
    return;
  }

  const actor = currentUser()?.name || currentUser()?.email || "Usuario do sistema";
  const timestamp = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  let historyLine = `[${timestamp}] ${actor}: ${config.historyStatus}. Motivo: ${reason.trim()}`;
  const currentNotes = normalizeEmployee(employee).notes;
  const previousStatus = employee.status || "";

  if (action === "demobilize") {
    const approver = prompt("Informe o responsavel que aprovou a desmobilizacao:");
    if (!approver || !approver.trim()) {
      const pendingLine = `[${timestamp}] ${actor}: Solicitacao de desmobilizacao pendente de aprovacao. Motivo: ${reason.trim()}`;
      employee.notes = currentNotes ? `${currentNotes}\n${pendingLine}` : pendingLine;
      const history = createHistoryEvent({
        entityType: "funcionario",
        entityId: employee.id,
        action: "Desmobilizacao solicitada",
        previousStatus,
        nextStatus: previousStatus,
        observation: `Motivo: ${reason.trim()}. Aguardando aprovacao do responsavel.`,
      });
      state.historico = upsertById(state.historico, history);
      syncHistoryEvent(history);
      syncCollection("employees", employee).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
      saveState();
      render();
      alert("Desmobilizacao registrada como pendente. O status so muda apos aprovacao do responsavel.");
      return;
    }
    historyLine = `${historyLine}. Aprovado por: ${approver.trim()}`;
  }

  employee.status = config.status;
  employee.notes = currentNotes ? `${currentNotes}\n${historyLine}` : historyLine;
  const history = createHistoryEvent({
    entityType: "funcionario",
    entityId: employee.id,
    action: config.historyStatus,
    previousStatus,
    nextStatus: config.status,
    observation: `Motivo: ${reason.trim()}`,
  });
  state.historico = upsertById(state.historico, history);

  syncCollection("employees", employee).catch((error) => {
    console.error("Falha ao atualizar status operacional do funcionario", {
      table: "employees",
      id,
      action,
      status: config.status,
      error,
    });
    alert(`Nao foi possivel atualizar online: ${error.message}`);
  });
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Acao operacional de funcionario" }));
  saveState();
  render();
}

async function uploadDocumentFile(form, fallbackPath = "") {
  const file = form.get("documentFile");
  if (!isOnlineMode() || !file || !file.name || file.size === 0) return fallbackPath;
  const companyId = form.get("companyId") || "sem-empresa";
  const cleanName = file.name.replace(/[^\w.-]+/g, "_");
  const path = `${companyId}/${crypto.randomUUID()}-${cleanName}`;
  const context = {
    table: "storage.objects",
    operation: "upload bucket documents",
    payload: {
      bucket: "documents",
      path,
      fileName: file.name,
      fileSize: file.size,
      companyId,
    },
  };
  try {
    await ensureOnlineSession(context.table);
    const { error } = await supabaseClient.storage.from("documents").upload(path, file, { upsert: false });
    if (error) throw error;
    return path;
  } catch (error) {
    throw wrapPersistenceError(error, context);
  }
}

function updateDocumentStatus(id, status) {
  const doc = state.documents.find((item) => item.id === id);
  if (!doc || !can("approveDocuments", doc)) return;
  const previous = structuredClone(doc);
  const previousStatus = doc.status || "";
  doc.status = status;
  doc.notes = documentVisibleNotes(doc);
  doc.auditTrail = [
    ...documentAuditTrail(previous),
    {
      at: new Date().toISOString(),
      user: currentUser()?.email || currentUser()?.name || "Sistema",
      action: "Status atualizado",
      sector: "Fiscal",
      status,
      comment: `${roleName(currentUser().role)} marcou documento como ${status.toLowerCase()}.`,
    },
  ];
  const history = createHistoryEvent({
    entityType: "documento",
    entityId: doc.id,
    action: "Status documental",
    previousStatus,
    nextStatus: status,
    observation: `Status alterado manualmente para ${status}`,
  });
  state.historico = upsertById(state.historico, history);
  syncCollection("documents", doc).catch((error) => {
    logPersistenceError(error, { table: "public.documents", operation: "atualizar status" });
    alert(`Nao foi possivel atualizar online.\n\n${persistenceMessage(error)}`);
  });
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Status documental atualizado" }));
  saveState();
  render();
}

function demobilizeCompany(id) {
  const company = state.companies.find((item) => item.id === id);
  if (!company) return;
  if (!confirm(`Deseja desmobilizar o contrato da empresa ${company.name}?`)) return;
  const previousStatus = company.status || "";
  company.status = "Desmobilizada";
  const history = createHistoryEvent({
    entityType: "contrato",
    entityId: company.id,
    action: "Desmobilizacao de contrato",
    previousStatus,
    nextStatus: company.status,
    observation: `Contrato ${company.contract || company.name} desmobilizado manualmente.`,
  });
  state.historico = upsertById(state.historico, history);
  syncCollection("companies", company).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Contrato desmobilizado" }));
  saveState();
  render();
}

function removeItem(type, id) {
  if (type === "employee") {
    alert("Funcionarios nao sao excluidos fisicamente. Use Desmobilizar, Inativar ou Bloquear para manter o historico.");
    return;
  }
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
  const meta = employeeMeta(employee);
  return {
    ...employee,
    registration: employee.registration || employee.matricula || meta.registration || "",
    cpf: formatCpf(employee.cpf || ""),
    birthDate: employee.birthDate || employee.birth_date || meta.birthDate || "",
    motherName: employee.motherName || employee.mother_name || meta.motherName || "",
    fatherName: employee.fatherName || employee.father_name || meta.fatherName || "",
    role: employee.role || "",
    companyId: employee.companyId || state.companies[0]?.id || "",
    contract: employee.contract || meta.contract || "",
    costCenter: employee.costCenter || employee.centroCusto || meta.costCenter || "",
    cep: formatCep(employee.cep || meta.cep || ""),
    city: employee.city || meta.city || "",
    district: employee.district || employee.bairro || meta.district || "",
    street: employee.street || employee.rua || meta.street || "",
    number: employee.number || employee.numero || meta.number || "",
    complement: employee.complement || employee.complemento || meta.complement || "",
    asoValidity: employee.asoValidity || employee.admission || "",
    trainingValidity: employee.trainingValidity || "",
    docStatus: employee.docStatus || "Pendente",
    address: employee.address || "",
    notes: employeeVisibleNotes(employee),
    workflowActions: employee.workflowActions || meta.workflowActions || {},
    status: employee.status || "Em analise",
  };
}

function employeeMeta(employee = {}) {
  if (employee.employeeMeta && typeof employee.employeeMeta === "object") return employee.employeeMeta;
  const notes = String(employee.notes || "");
  const [, rawMeta] = notes.split(EMPLOYEE_META_MARKER);
  if (!rawMeta) return {};
  try {
    return JSON.parse(rawMeta.trim()) || {};
  } catch (error) {
    console.warn("Nao foi possivel ler metadados do funcionario.", error);
    return {};
  }
}

function employeeVisibleNotes(employee = {}) {
  return String(employee.notes || "").split(EMPLOYEE_META_MARKER)[0].trim();
}

function serializeEmployeeNotes(employee) {
  const existingMeta = employeeMeta(employee);
  const item = normalizeEmployee({ ...employee, notes: employeeVisibleNotes(employee) });
  const meta = {
    ...existingMeta,
    registration: item.registration || "",
    birthDate: item.birthDate || "",
    motherName: item.motherName || "",
    fatherName: item.fatherName || "",
    contract: item.contract || "",
    costCenter: item.costCenter || "",
    cep: onlyDigits(item.cep),
    city: item.city || "",
    district: item.district || "",
    street: item.street || "",
    number: item.number || "",
    complement: item.complement || "",
    workflowActions: item.workflowActions || existingMeta.workflowActions || {},
  };
  return `${employeeVisibleNotes(employee)}${EMPLOYEE_META_MARKER}${JSON.stringify(meta)}`;
}

function mapProfileFromDb(profile) {
  return mapUserFromDb(profile);
}

function mapUserFromDb(profile) {
  const dbPerfil = profile.perfil || profile.role || "visitante";
  const roleKey = String(dbPerfil).trim().toLowerCase();
  return {
    id: profile.id,
    name: profile.nome || profile.name || profile.email || "Usuario",
    email: profile.email || "",
    role: DB_PROFILE_TO_APP_ROLE[dbPerfil] || DB_PROFILE_TO_APP_ROLE[roleKey] || "visitor",
    active: profile.ativo ?? profile.active ?? true,
    companyId: profile.empresa_id || profile.company_id || null,
    setor: profile.setor || null,
    matricula: profile.matricula || null,
    createdAt: profile.created_at || profile.createdAt || null,
  };
}

function mapProfileToDb(user) {
  const perfil = normalizePerfilUsuario(user.role);
  return {
    id: user.id,
    nome: optionalText(user.name),
    email: optionalText(user.email),
    perfil,
    active: user.active !== false,
    company_id: optionalNull(user.companyId),
  };
}

function mapUserToDb(user, { includeId = true } = {}) {
  const perfil = normalizePerfilUsuario(user.role || user.perfil).toLowerCase();
  const payload = {
    nome: optionalText(user.name),
    email: optionalText(user.email),
    perfil,
    empresa_id: optionalNull(user.companyId),
    setor: optionalText(user.setor),
    matricula: optionalText(user.matricula),
    ativo: Boolean(user.active !== false),
  };
  if (includeId && user.id) payload.id = user.id;
  return payload;
}

function validateUserPayload(payload) {
  payload.perfil = normalizePerfilUsuario(payload.perfil).toLowerCase();
  if (!DB_PROFILE_VALUES.includes(payload.perfil)) {
    throw new PersistenceError(`Perfil invalido. Valores aceitos pelo enum perfil_usuario: ${DB_PROFILE_VALUES.join(", ")}.`, {
      table: "public.usuarios",
      operation: "validacao",
      payload,
      hint: "perfil fora do enum perfil_usuario",
    });
  }
  payload.empresa_id = optionalNull(payload.empresa_id);
  payload.setor = optionalText(payload.setor);
  payload.matricula = optionalText(payload.matricula);
  payload.nome = optionalText(payload.nome);
  payload.email = optionalText(payload.email);
  payload.ativo = Boolean(payload.ativo);
  if (!payload.nome || !payload.email) {
    throw new PersistenceError("Nome e e-mail sao obrigatorios para salvar usuario.", {
      table: "public.usuarios",
      operation: "validacao",
      payload,
      hint: "nome/email obrigatorios",
    });
  }
  if (profileRequiresMatricula(payload.perfil) && !payload.matricula) {
    throw new PersistenceError("Matricula obrigatoria para este perfil.", {
      table: "public.usuarios",
      operation: "validacao",
      payload,
      hint: "matricula obrigatoria pelo perfil",
    });
  }
}

function normalizePerfilUsuario(value = "visitante") {
  const raw = String(value || "visitante").trim();
  const mapped = APP_ROLE_TO_DB_PROFILE[raw] || APP_ROLE_TO_DB_PROFILE[raw.toLowerCase()];
  if (mapped) return mapped;
  const normalized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const aliases = {
    administrador: "administrador",
    admin: "administrador",
    fiscal: "fiscal",
    medicina: "medicina",
    ehs: "ehs",
    patrimonial: "patrimonial",
    fornecedor: "fornecedor",
    supplier: "fornecedor",
    visitante: "visitante",
    visitor: "visitante",
    super_admin: "super_admin",
    superadmin: "super_admin",
  };
  return aliases[normalized] || "visitante";
}

function defaultSetorForPerfil(perfil) {
  return {
    administrador: "Administrativo",
    fiscal: "Fiscal",
    medicina: "Medicina",
    ehs: "EHS",
    patrimonial: "Patrimonial",
    fornecedor: "Fornecedor",
  }[perfil] || null;
}

function profileRequiresMatricula(perfil) {
  return false;
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
    registration: employee.registration || employee.matricula,
    manager: employee.manager || employee.gestor || employee.responsavel,
    exceptionReason: employee.exception_reason || employee.motivo,
    exceptionDeadline: employee.exception_deadline || employee.prazo,
  });
}

function mapEmployeeToDb(employee) {
  const item = normalizeEmployee(employee);
  return {
    id: item.id,
    name: item.name,
    cpf: onlyDigits(item.cpf),
    job_role: item.role,
    company_id: item.companyId,
    aso_validity: item.asoValidity || null,
    training_validity: item.trainingValidity || null,
    document_status: item.docStatus,
    address: item.address,
    notes: serializeEmployeeNotes(item),
    hiring_status: item.status,
  };
}

function mapDocumentFromDb(doc) {
  const meta = parseDocumentMeta(doc.notes || "");
  return {
    id: doc.id,
    companyId: doc.company_id,
    employeeId: doc.employee_id || "",
    type: doc.type,
    dueDate: doc.due_date,
    status: doc.status,
    notes: meta.notes,
    filePath: doc.file_path || "",
    auditTrail: meta.auditTrail,
    sectorComments: meta.sectorComments,
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
    notes: serializeDocumentNotes(doc),
    file_path: doc.filePath || null,
  };
}

function parseDocumentMeta(notes = "") {
  const [visibleNotes, rawMeta] = String(notes || "").split(DOC_META_MARKER);
  if (!rawMeta) return { notes: visibleNotes, auditTrail: [], sectorComments: {} };
  try {
    const meta = JSON.parse(rawMeta.trim());
    return {
      notes: visibleNotes.trim(),
      auditTrail: Array.isArray(meta.auditTrail) ? meta.auditTrail : [],
      sectorComments: meta.sectorComments && typeof meta.sectorComments === "object" ? meta.sectorComments : {},
    };
  } catch (error) {
    console.error("Nao foi possivel ler metadados do documento", error);
    return { notes: visibleNotes.trim(), auditTrail: [], sectorComments: {} };
  }
}

function serializeDocumentNotes(doc) {
  const visibleNotes = documentVisibleNotes(doc);
  const meta = {
    auditTrail: documentAuditTrail(doc),
    sectorComments: documentSectorComments(doc),
  };
  return `${visibleNotes}${DOC_META_MARKER}${JSON.stringify(meta)}`;
}

function documentVisibleNotes(doc) {
  return parseDocumentMeta(doc?.notes || "").notes || "";
}

function documentAuditTrail(doc) {
  return Array.isArray(doc?.auditTrail) ? doc.auditTrail : parseDocumentMeta(doc?.notes || "").auditTrail;
}

function documentSectorComments(doc) {
  const parsed = doc?.sectorComments && typeof doc.sectorComments === "object" ? doc.sectorComments : parseDocumentMeta(doc?.notes || "").sectorComments;
  return DOCUMENT_WORKFLOW_SECTORS.reduce((acc, sector) => {
    acc[sector] = parsed?.[sector] || "";
    return acc;
  }, {});
}

function buildDocumentAuditTrail(previousDoc, nextDoc, action) {
  const previousComments = documentSectorComments(previousDoc || {});
  const nextComments = documentSectorComments(nextDoc || {});
  const events = [...documentAuditTrail(previousDoc || {})];
  const pushEvent = (event) => {
    events.push({
      at: new Date().toISOString(),
      user: currentUser()?.email || currentUser()?.name || "Sistema",
      ...event,
    });
  };
  if (!previousDoc?.id) pushEvent({ action, sector: "Fiscal", status: docStatus(nextDoc), comment: "Documento incluido no workflow." });
  if (previousDoc?.id && (previousDoc.status !== nextDoc.status || previousDoc.dueDate !== nextDoc.dueDate || previousDoc.filePath !== nextDoc.filePath)) {
    pushEvent({ action, sector: "Fiscal", status: docStatus(nextDoc), comment: "Dados documentais atualizados." });
  }
  DOCUMENT_WORKFLOW_SECTORS.forEach((sector) => {
    if ((previousComments[sector] || "") !== (nextComments[sector] || "") && nextComments[sector]) {
      pushEvent({ action: "Comentario registrado", sector, status: docStatus(nextDoc), comment: nextComments[sector] });
    }
  });
  return events;
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
  if (doc.status === "Reprovado") return "Reprovado";
  const todayDate = new Date(today());
  const due = new Date(doc.dueDate);
  if (Number.isNaN(due.getTime())) return doc.status || "Pendente";
  const diffDays = Math.ceil((due - todayDate) / 86400000);
  if (diffDays < 0) return "Vencido";
  if (diffDays <= 30) return "A vencer";
  return ["Aprovado", "Regular"].includes(doc.status) ? "Aprovado" : "Pendente";
}

function contractDays(company) {
  if (!company?.endDate) return Number.NaN;
  const due = new Date(company.endDate);
  if (Number.isNaN(due.getTime())) return Number.NaN;
  return Math.ceil((due - new Date(today())) / 86400000);
}

function isPastDate(value) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  return date < new Date(today());
}

function contractUnit(company) {
  return company.unit || company.unidade || company.responsible || company.fiscal || "Corporativo";
}

function formatDate(value) {
  if (!value) return "Nao informado";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "Nao informado";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function currentSystemTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function onlyDigits(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function optionalNull(value = "") {
  const text = String(value ?? "").trim();
  return text ? text : null;
}

function optionalText(value = "") {
  const text = String(value ?? "").trim();
  return text ? text : null;
}

function formatCpf(value = "") {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function formatCep(value = "") {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
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
