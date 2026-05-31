const STORAGE_KEY = "sctempresas.v1";
const ONLINE_STORAGE_NOTE =
  "Modo online ativo com projeto Supabase oficial fixado em supabase-config.js.";

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
  users: [],
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
  fiscais: [
    {
      id: crypto.randomUUID(),
      nome: "Patricia Nunes",
      email: "patricia.nunes@empresa.com",
      matricula: "FISC-001",
      telefone: "(11) 90000-1001",
      setor: "Fiscalizacao",
      status: "sem_acesso",
      usuarioEmail: null,
      usuarioId: null,
      dataFim: null,
      motivoInativacao: "",
      substitutoId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      nome: "Eduardo Rocha",
      email: "eduardo.rocha@empresa.com",
      matricula: "FISC-002",
      telefone: "(11) 90000-1002",
      setor: "Contratos",
      status: "sem_acesso",
      usuarioEmail: null,
      usuarioId: null,
      dataFim: null,
      motivoInativacao: "",
      substitutoId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
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
  "Em cadastro",
  "Em análise documental",
  "Pendente Documentação",
  "Pendente Medicina",
  "Pendente EHS",
  "Pendente Patrimonial",
  "Aguardando Correção",
  "Aguardando medicina",
  "Aguardando EHS/RH",
  "Aguardando patrimonial",
  "Liberado",
  "Bloqueado",
  "Inativo",
  "Desmobilização solicitada",
  "Desmobilizado",
];

const documentStatuses = ["Pendente", "Em análise", "Aprovado", "Reprovado", "Vencido", "Aprovado com pendência"];
const fiscalStatuses = ["sem_acesso", "com_acesso", "inativo"];
const DOC_META_MARKER = "\n\n[SCT_ENTERPRISE_META]";
const EMPLOYEE_META_MARKER = "\n\n[SCT_EMPLOYEE_META]";
const DOCUMENT_WORKFLOW_SECTORS = ["Fiscal", "Medicina", "EHS", "Patrimonial"];

const app = document.querySelector("#app") || document.querySelector("#root");
const supabaseConfig = window.SUPABASE_CONFIG || {};
const supabaseDiagnostics = buildSupabaseDiagnostics(supabaseConfig);
const supabaseConfigError = validateOfficialSupabaseConfig(supabaseConfig, supabaseDiagnostics);
const supabaseClient =
  !supabaseConfigError && supabaseConfig.url && supabaseConfig.anonKey && window.supabase
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;
console.log("[SUPABASE PROJECT]", supabaseDiagnostics.projectRef);
console.log("[SUPABASE URL]", supabaseDiagnostics.url);
console.info("[Supabase Config] Projeto Supabase oficial carregado pelo frontend", supabaseDiagnostics);
if (supabaseConfigError) console.error("[Supabase Config] Configuracao bloqueada", supabaseConfigError);
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
let authMode = supabaseClient ? "supabase" : "blocked";
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
  ensureFiscalBase(data);
  saveState(data);
  return data;
}

function migrateState(data) {
  data.users ||= [];
  data.companies ||= [];
  data.employees ||= [];
  data.documents ||= [];
  data.fiscais ||= [];
  data.historico ||= data.history || [];
  ensureFiscalBase(data);

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

function ensureFiscalBase(data = state) {
  data.fiscais ||= [];
  const byName = new Map(data.fiscais.map((fiscal) => [String(fiscal.nome || fiscal.name || "").trim().toLowerCase(), fiscal]));
  data.companies.forEach((company) => {
    const fiscalName = String(company.fiscal || "").trim();
    if (!fiscalName || fiscalName === "Nao informado") return;
    const key = fiscalName.toLowerCase();
    let fiscal = company.fiscalId ? data.fiscais.find((item) => item.id === company.fiscalId) : byName.get(key);
    if (!fiscal) {
      fiscal = normalizeFiscal({
        id: crypto.randomUUID(),
        nome: fiscalName,
        email: "",
        matricula: "",
        telefone: "",
        setor: "Fiscalizacao",
        status: "sem_acesso",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      data.fiscais.push(fiscal);
      byName.set(key, fiscal);
    }
    company.fiscalId ||= fiscal.id;
    company.fiscal = fiscal.nome;
  });
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

function logDbPayload(table, payload) {
  const rows = Array.isArray(payload) ? payload : [payload];
  console.log("[DB PAYLOAD]", {
    tabela: table,
    payload,
    colunas: rows[0]
      ? Object.fromEntries(Object.entries(rows[0]).map(([column, value]) => [column, { tipo: describeValueType(value), valor: value }]))
      : {},
  });
}

function describeValueType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return `array(${value.map(describeValueType).join(",")})`;
  if (isUuid(value)) return "uuid";
  if (isNumericDbId(value)) return "bigint";
  return typeof value;
}

function isNumericDbId(value) {
  return typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value));
}

function isUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function sameId(left, right) {
  if (left === null || left === undefined || right === null || right === undefined) return false;
  return String(left) === String(right);
}

function normalizeStatusKey(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function sameStatus(left, right) {
  return normalizeStatusKey(left) === normalizeStatusKey(right);
}

function buildSupabaseDiagnostics(config = {}) {
  const url = String(config.url || "").trim();
  const anonKey = String(config.anonKey || "").trim();
  const configuredProjectRef = String(config.projectRef || "").trim();
  let hostname = "";
  let projectRef = "";
  try {
    hostname = url ? new URL(url).hostname : "";
    projectRef = hostname.endsWith(".supabase.co") ? hostname.split(".")[0] : "";
  } catch (error) {
    hostname = "url_invalida";
  }
  return {
    url: url || "nao_configurada",
    hostname,
    projectRef,
    configuredProjectRef: configuredProjectRef || "nao_configurado",
    locked: Boolean(config.locked),
    anonKeyPrefix: anonKey ? anonKey.slice(0, 18) : "nao_configurada",
    anonKeySuffix: anonKey ? anonKey.slice(-8) : "nao_configurada",
    anonKeyType: anonKey.startsWith("sb_publishable_") ? "publishable" : anonKey.startsWith("eyJ") ? "jwt_anon" : anonKey ? "desconhecida" : "ausente",
    createClientDisponivel: Boolean(window.supabase?.createClient),
  };
}

function validateOfficialSupabaseConfig(config = {}, diagnostics = {}) {
  const projectRef = String(config.projectRef || "").trim();
  const url = String(config.url || "").trim();
  const anonKey = String(config.anonKey || "").trim();
  const expectedUrl = projectRef ? `https://${projectRef}.supabase.co` : "";
  const errors = [];
  if (!config.locked) errors.push("locked precisa ser true em supabase-config.js.");
  if (!projectRef) errors.push("projectRef oficial ausente em supabase-config.js.");
  if (!url) errors.push("url ausente em supabase-config.js.");
  if (!anonKey) errors.push("anonKey ausente em supabase-config.js.");
  if (projectRef && diagnostics.projectRef && diagnostics.projectRef !== projectRef) {
    errors.push(`URL aponta para ${diagnostics.projectRef}, mas o projeto oficial configurado e ${projectRef}.`);
  }
  if (expectedUrl && url !== expectedUrl) errors.push(`URL precisa ser exatamente ${expectedUrl}.`);
  if (!anonKey.startsWith("sb_publishable_") && !anonKey.startsWith("eyJ")) {
    errors.push("anonKey oficial do projeto precisa ser uma chave publica valida do Supabase.");
  }
  if (!window.supabase?.createClient) errors.push("Biblioteca Supabase JS nao carregou.");
  return errors.length
    ? {
        message: "Configuracao Supabase oficial invalida. Login online bloqueado para evitar projeto antigo ou chave trocada.",
        errors,
        diagnostics,
      }
    : null;
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
    console.warn("[Supabase Config] Cliente Supabase nao foi criado. Login online bloqueado ate corrigir supabase-config.js.", {
      supabase: supabaseDiagnostics,
      erro: supabaseConfigError,
    });
    state.session = null;
    saveState();
    render();
    return;
  }

  try {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    console.info("[Login Supabase] Sessao inicial", {
      supabase: supabaseDiagnostics,
      sessaoCriada: Boolean(session),
      email: session?.user?.email || null,
      userId: session?.user?.id || null,
    });
    if (session?.user) {
      await hydrateSupabaseSession(session.user);
    } else {
      state.session = null;
      saveState();
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
  console.info("[Login Supabase] Buscando perfil em public.usuarios", { supabase: supabaseDiagnostics, auth_user_id: authUser?.id || null, email });
  const usuario = await fetchProfileFromTable("usuarios", email, authUser?.id);
  if (usuario?.data) return validateAuthenticatedProfile(mapUserFromDb(usuario.data), email, "public.usuarios");
  if (usuario?.error) throw wrapUserPersistenceError(usuario.error, { table: "public.usuarios", operation: "select perfil por email/id", payload: { email, id: authUser?.id || null, supabase: supabaseDiagnostics } });

  throw new PersistenceError("Usuario autenticado, mas sem perfil cadastrado.", {
    table: "public.usuarios",
    operation: "select perfil por email",
    payload: { email, id: authUser?.id || null, supabase: supabaseDiagnostics },
    hint: "O Auth aceitou o login, mas nao existe perfil ativo em public.usuarios neste projeto oficial.",
  });
}

async function fetchProfileFromTable(table, email, userId) {
  console.info(`[Login Supabase] Consultando public.${table}`, { supabase: supabaseDiagnostics, email, id: userId || null });
  let result = await supabaseClient.from(table).select("*").eq("email", email).maybeSingle();
  console.info(`[Login Supabase] Resultado public.${table} por email`, { data: result.data, error: result.error });
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

async function loadRemoteData() {
  const [companies, employees, documents, usuarios, fiscais] = await Promise.all([
    supabaseClient.from("companies").select("*").order("name"),
    supabaseClient.from("employees").select("*").order("name"),
    supabaseClient.from("documents").select("*").order("due_date"),
    fetchUsersForAccessControl(),
    fetchFiscaisForCompanies(),
  ]);

  for (const result of [companies, employees, documents, usuarios]) {
    if (result.error) throw result.error;
  }

  state.companies = companies.data.map(mapCompanyFromDb);
  state.employees = employees.data.map(mapEmployeeFromDb);
  state.documents = documents.data.map(mapDocumentFromDb);
  state.users = usuarios.data.map(mapUserFromDb);
  state.fiscais = (fiscais.data || []).map(mapFiscalFromDb);
  ensureFiscalBase(state);
  state.historico = await loadRemoteHistory();
}

async function fetchUsersForAccessControl() {
  if (!can("users.view")) return { data: state.users, error: null };
  return supabaseClient.from("usuarios").select("*").order("nome");
}

async function fetchFiscaisForCompanies() {
  const result = await supabaseClient.from("fiscais").select("*").order("nome");
  if (result.error) {
    console.warn("Tabela public.fiscais indisponivel. Execute supabase-operational-tables.sql para ativar fiscais, employees, historico e empresa_fiscais.", result.error);
    return { data: state.fiscais || [], error: null };
  }
  return result;
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
  if (collection === "fiscais") {
    return syncFiscalRecord(item);
  }
  const table = {
    companies: "companies",
    employees: "employees",
    documents: "documents",
    users: "usuarios",
    fiscais: "fiscais",
  }[collection];
  const mapper = {
    companies: mapCompanyToDb,
    employees: mapEmployeeToDb,
    documents: mapDocumentToDb,
    users: mapUserToDb,
    fiscais: mapFiscalToDb,
  }[collection];
  const payload = mapper(item);
  const context = {
    table: `public.${table}`,
    operation: "upsert",
    payload,
  };
  try {
    await ensureOnlineSession(context.table);
    logDbPayload(context.table, payload);
    let { data, error } = await supabaseClient.from(table).upsert(payload).select("*").maybeSingle();
    if (error) throw error;
    const saved = mapSyncedRow(collection, data) || item;
    if (collection === "companies") await syncEmpresaFiscais(saved);
    return saved;
  } catch (error) {
    throw wrapPersistenceError(error, context);
  }
}

function mapSyncedRow(collection, row) {
  if (!row) return null;
  const mapper = {
    companies: mapCompanyFromDb,
    employees: mapEmployeeFromDb,
    documents: mapDocumentFromDb,
    fiscais: mapFiscalFromDb,
  }[collection];
  return mapper ? mapper(row) : row;
}

async function syncUserRecord(user) {
  const isNewUser = !user.id || user.isNew === true;
  const authResult = isNewUser ? await createAuthUserForUsuario(user) : { ok: true, skipped: true };
  const payload = mapUserToDb(user, { includeId: Boolean(!isNewUser && user.id) });
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
        ? supabaseClient.from("usuarios").update(dbPayload).eq("id", existing.id).select("*").maybeSingle()
        : supabaseClient.from("usuarios").insert(dbPayload).select("*").maybeSingle();
    let { data, error } = await runMutation();
    if (error && isRlsError(error) && authResult?.session?.access_token) {
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
      data = retry.data;
      error = retry.error;
      await restoreSupabaseSession(authResult.previousSession);
    }
    if (error) throw error;
    const savedRow = data || existing || (await findUsuarioByEmail(payload.email));
    if (authResult?.userId && savedRow?.email) {
      const { error: authLinkError } = await supabaseClient
        .from("usuarios")
        .update({ auth_user_id: authResult.userId })
        .eq("email", savedRow.email);
      if (authLinkError) console.warn("[Usuarios Supabase] auth_user_id nao foi vinculado; seguindo por email/public.usuarios.id.", authLinkError);
    }
    const saved = mapUserFromDb(savedRow || { ...payload, id: user.id || crypto.randomUUID() });
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
  if (error) throw error;
}

function upsertById(items, item) {
  return items.some((current) => sameId(current.id, item.id))
    ? items.map((current) => (sameId(current.id, item.id) ? { ...current, ...item } : current))
    : [...items, item];
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id) return false;
    const key = String(item.id);
    if (seen.has(key)) return false;
    seen.add(key);
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
    arrow: "M19 12H5m7-7-7 7 7 7",
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

async function syncFiscalRecord(fiscal) {
  if (!isOnlineMode()) return fiscal;
  const payload = mapFiscalToDb(fiscal);
  const context = {
    table: "public.fiscais",
    operation: isNumericDbId(fiscal.id) ? "update" : "insert",
    payload,
  };
  try {
    await ensureOnlineSession(context.table);
    logDbPayload(context.table, payload);
    const mutation = isNumericDbId(fiscal.id)
      ? supabaseClient.from("fiscais").update(withoutKeys(payload, ["id"])).eq("id", Number(fiscal.id)).select("*").maybeSingle()
      : supabaseClient.from("fiscais").insert(withoutKeys(payload, ["id"])).select("*").maybeSingle();
    const { data, error } = await mutation;
    if (error) throw error;
    const saved = mapFiscalFromDb(data || payload);
    replaceFiscalId(fiscal.id, saved.id);
    state.fiscais = upsertById(state.fiscais, saved);
    return saved;
  } catch (error) {
    console.error("[Fiscais Supabase] Erro ao sincronizar fiscal", { payload, error });
    throw wrapPersistenceError(error, context);
  }
}

async function syncEmpresaFiscais(company) {
  const empresaId = company.id;
  const fiscalIds = Array.from(new Set([company.fiscalId, ...(company.fiscaisAdicionais || [])].filter(Boolean)));
  const payloadInfo = { empresa_id: empresaId, fiscal_ids: fiscalIds };
  logDbPayload("public.empresa_fiscais", payloadInfo);
  if (!isNumericDbId(empresaId) || fiscalIds.some((id) => !isNumericDbId(id))) {
    console.warn("[empresa_fiscais] Vinculo nao enviado: empresa_id e fiscal_id precisam ser bigint operacionais.", {
      payload: payloadInfo,
      tipos: {
        empresa_id: describeValueType(empresaId),
        fiscal_ids: fiscalIds.map(describeValueType),
      },
    });
    return;
  }
  const now = new Date().toISOString();
  const { error: closeError } = await supabaseClient
    .from("empresa_fiscais")
    .update({ ativo: false, data_fim: now })
    .eq("empresa_id", Number(empresaId))
    .eq("ativo", true);
  if (closeError) throw closeError;
  if (!fiscalIds.length) return;
  const rows = fiscalIds.map((fiscalId) => ({
    empresa_id: Number(empresaId),
    fiscal_id: Number(fiscalId),
    ativo: true,
    data_inicio: now,
    data_fim: null,
  }));
  logDbPayload("public.empresa_fiscais", rows);
  const { error } = await supabaseClient.from("empresa_fiscais").insert(rows);
  if (error) throw error;
}

function replaceFiscalId(previousId, nextId) {
  if (!previousId || !nextId || String(previousId) === String(nextId)) return;
  state.companies = state.companies.map((company) => ({
    ...company,
    fiscalId: String(company.fiscalId) === String(previousId) ? nextId : company.fiscalId,
    fiscaisAdicionais: (company.fiscaisAdicionais || []).map((id) => (String(id) === String(previousId) ? nextId : id)),
  }));
}

async function createAccessForFiscal(fiscal) {
  if (!isOnlineMode()) {
    alert("Acesso ao sistema exige Supabase Auth online configurado.");
    return;
  }
  const item = normalizeFiscal(fiscal);
  if (!item.email) {
    alert("Informe o e-mail do fiscal antes de criar acesso.");
    return;
  }
  const password = prompt(`Informe uma senha temporaria para ${item.nome}:`);
  if (!password || password.length < 6) {
    alert("Senha obrigatoria com no minimo 6 caracteres.");
    return;
  }
  const savedUser = await syncUserRecord({
    name: item.nome,
    email: item.email,
    password,
    role: "fiscal",
    setor: item.setor || "Fiscal",
    matricula: item.matricula || null,
    active: true,
    isNew: true,
  });
  const updated = normalizeFiscal({
    ...item,
    status: "com_acesso",
    usuarioEmail: savedUser.email,
    usuarioId: isNumericDbId(savedUser.id) ? savedUser.id : item.usuarioId,
    authUserId: savedUser.authUserId || item.authUserId || null,
    updatedAt: new Date().toISOString(),
  });
  state.fiscais = upsertById(state.fiscais, updated);
  const history = createHistoryEvent({
    entityType: "fiscal",
    entityId: updated.id,
    action: "Acesso criado",
    previousStatus: item.status,
    nextStatus: "com_acesso",
    observation: `Acesso criado para ${updated.email} e vinculado ao fiscal ${updated.nome}.`,
  });
  state.historico = upsertById(state.historico, history);
  await syncCollection("fiscais", updated);
  await syncHistoryEvent(history);
  saveState();
  renderApp();
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
          ${
            isOnlineMode()
              ? `Projeto Supabase oficial: ${supabaseDiagnostics.projectRef}. Use um usuario criado neste ambiente online.`
              : "Login online bloqueado: confira supabase-config.js e o console do navegador."
          }<br />
          A autenticacao usa exclusivamente Supabase Auth neste projeto.
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
        console.info("[Login Supabase] Tentando login", { supabase: supabaseDiagnostics, email });
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        console.info("[Login Supabase] Resposta Auth", {
          supabase: supabaseDiagnostics,
          emailEnviado: email,
          sessaoCriada: Boolean(data?.session),
          user: data?.user || null,
          error,
        });
        if (error) {
          console.error("[Login Supabase] Erro Auth", {
            supabase_url_usada: supabaseDiagnostics.url,
            supabase_project_ref: supabaseDiagnostics.projectRef,
            supabase_anon_key_prefix: supabaseDiagnostics.anonKeyPrefix,
            supabase_anon_key_suffix: supabaseDiagnostics.anonKeySuffix,
            email,
            code: error.code || error.status || error.statusCode || null,
            message: error.message || null,
            details: error.details || null,
            hint: error.hint || null,
            sessaoCriada: Boolean(data?.session),
            error,
          });
          throw new PersistenceError(`Erro Auth: ${error.message || "falha ao autenticar."}`, { table: "supabase.auth", operation: "signInWithPassword", payload: { email, supabase: supabaseDiagnostics } }, error);
        }
        if (!data?.user) {
          throw new PersistenceError("Auth nao retornou usuario autenticado.", { table: "supabase.auth", operation: "signInWithPassword", payload: { email, supabase: supabaseDiagnostics } });
        }
        const profile = await hydrateSupabaseSession(data.user);
        console.info("[Login Supabase] Login concluido", {
          supabase: supabaseDiagnostics,
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

    console.error("[Login Supabase] Login bloqueado porque a configuracao oficial nao criou cliente Supabase.", {
      supabase: supabaseDiagnostics,
      erro: supabaseConfigError,
    });
    alert("Login online bloqueado. Confira supabase-config.js e o console do navegador para ver o projeto Supabase usado.");
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
  const company = item.companyId ? state.companies.find((entry) => sameId(entry.id, item.companyId)) : item;
  const employee = item.employeeId ? state.employees.find((entry) => sameId(entry.id, item.employeeId)) : null;
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
  const company = item.companyId ? state.companies.find((entry) => sameId(entry.id, item.companyId)) : item;
  const employee = item.cpf || item.role ? item : item.employeeId ? state.employees.find((entry) => sameId(entry.id, item.employeeId)) : null;
  const status = item.dueDate ? docStatus(item) : employee ? normalizeEmployee(employee).status : normalizeCompany(company).status;
  if (quick === "Ativas") return ["Ativa", "Ativo", "Liberado", "Aprovado"].some((value) => statusMatches(status, value));
  if (quick === "Pendentes") return ["Pendente", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção", "A vencer", "Reprovado", "Em análise documental", "Aguardando medicina", "Aguardando EHS/RH", "Aguardando patrimonial", "Desmobilização solicitada"].some((value) => statusMatches(status, value));
  if (quick === "Bloqueadas") return ["Bloqueado", "Bloqueada"].some((value) => statusMatches(status, value));
  if (quick === "Contrato vencido") return company ? isPastDate(normalizeCompany(company).endDate) : false;
  if (quick === "Documentos vencidos") return employee ? employeeHasExpiredDocuments(employee) : company ? companyHasExpiredDocuments(company.id) : status === "Vencido";
  if (quick === "Sem fiscal vinculado") return company ? companyHasNoFiscal(company) : false;
  if (quick === "Ativo") return ["Ativa", "Ativo", "Aprovado", "Liberado"].some((value) => statusMatches(status, value));
  if (quick === "Bloqueado") return ["Bloqueado", "Bloqueada"].some((value) => statusMatches(status, value));
  if (quick === "Critico") return ["Bloqueado", "Bloqueada", "Pendente", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção"].some((value) => statusMatches(status, value));
  if (quick === "Pendente") return ["Pendente", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção", "A vencer", "Reprovado", "Em análise documental", "Aguardando medicina", "Aguardando EHS/RH", "Aguardando patrimonial", "Desmobilização solicitada"].some((value) => statusMatches(status, value));
  if (quick === "Vencido") return status === "Vencido";
  if (quick === "Desmobilizado") return ["Desmobilizada", "Desmobilizado"].some((value) => statusMatches(status, value));
  if (quick === "Vencendo") return contractDays(company) >= 0 && contractDays(company) <= 60;
  if (quick === "ASO vencido") return employee ? isPastDate(normalizeEmployee(employee).asoValidity) : false;
  if (quick === "Treinamento vencido") return employee ? isPastDate(normalizeEmployee(employee).trainingValidity) : false;
  if (quick === "Medicina") return employee ? employeeMedicineStatus(normalizeEmployee(employee)) === "Pendente" || statusMatches(normalizeEmployee(employee).status, "Aguardando medicina") : /aso|exame|medic/i.test(item.type || "");
  if (quick === "EHS") return employee ? employeeEhsStatus(normalizeEmployee(employee)) === "Pendente" || statusMatches(normalizeEmployee(employee).status, "Aguardando EHS/RH") : /nr-|treinamento|epi|segur/i.test(item.type || "");
  return status === quick;
}

function applyOperationalFilters(view, items) {
  const config = tableConfig(view);
  return items.filter((item) => {
    const company = item.companyId ? state.companies.find((entry) => sameId(entry.id, item.companyId)) : item;
    const employee = item.cpf || item.role ? item : item.employeeId ? state.employees.find((entry) => sameId(entry.id, item.employeeId)) : null;
    const companyItem = company ? normalizeCompany(company) : {};
    const employeeItem = employee ? normalizeEmployee(employee) : {};
    const sector = item.type || employeeItem.role || contractUnit(companyItem);
    const costCenter = employeeCostCenter(employeeItem, companyItem);
    return (
      matchesQuickFilter(view, item, config.quick) &&
      (config.company === "Todos" || sameId(item.companyId, config.company) || sameId(item.id, config.company)) &&
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
  const companies = uniqueOptions(items.map((item) => item.companyId || item.id).map((id) => state.companies.find((company) => sameId(company.id, id))?.id || id));
  const companyLabels = new Map(state.companies.map((company) => [company.id, company.name]));
  const contracts = uniqueOptions(items.map((item) => normalizeCompany(item.companyId ? state.companies.find((company) => sameId(company.id, item.companyId)) : item).contract));
  const sectors = uniqueOptions(items.map((item) => item.type || item.role || contractUnit(item.companyId ? state.companies.find((company) => sameId(company.id, item.companyId)) : item)));
  const costCenters = uniqueOptions(items.map((item) => employeeCostCenter(item, item.companyId ? state.companies.find((company) => sameId(company.id, item.companyId)) : item)));
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
  if (["supplier", "fiscal"].includes(user?.role) && user.companyId) return state.companies.filter((company) => sameId(company.id, user.companyId));
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
  const pendingEmployeeStatuses = ["Em cadastro", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção", "Em análise documental", "Aguardando medicina", "Aguardando EHS/RH", "Aguardando patrimonial", "Desmobilização solicitada"];
  const criticalCompanyStatuses = ["Bloqueada", "Bloqueado", "Pendente"];
  const pendingApprovalStatuses = ["Pendente", "Reprovado", "A vencer"];
  return {
    activeCompanies: normalizedCompanies.filter((company) => statusMatches(company.status, "Ativa", "Ativo", "Pendente")).map((company) => company.raw),
    activeContracts: normalizedCompanies.filter((company) => ["Ativa", "Pendente"].some((status) => statusMatches(company.status, status))).map((company) => company.raw),
    expiringContracts: normalizedCompanies.filter((company) => contractDays(company.raw) >= 0 && contractDays(company.raw) <= 60).map((company) => company.raw),
    blockedContracts: normalizedCompanies.filter((company) => ["Bloqueada", "Bloqueado"].some((status) => statusMatches(company.status, status))).map((company) => company.raw),
    activeEmployees: normalizedEmployees.filter((employee) => ["Liberado", "Aprovado"].some((status) => statusMatches(employee.status, status))).map((employee) => employee.raw),
    blockedEmployees: normalizedEmployees.filter((employee) => statusMatches(employee.status, "Bloqueado")).map((employee) => employee.raw),
    pendingEmployees: normalizedEmployees.filter((employee) => pendingEmployeeStatuses.includes(employee.status)).map((employee) => employee.raw),
    inactiveEmployees: normalizedEmployees.filter((employee) => ["Inativo", "Desmobilizado"].some((status) => statusMatches(employee.status, status))).map((employee) => employee.raw),
    expiredAso: normalizedEmployees.filter((employee) => isPastDate(employee.asoValidity)).map((employee) => employee.raw),
    expiredTrainings: normalizedEmployees.filter((employee) => isPastDate(employee.trainingValidity)).map((employee) => employee.raw),
    medicinePendencies: normalizedEmployees
      .filter((employee) => statusMatches(employee.status, "Aguardando medicina") || ["Vencido", "Pendente", "Em análise", "Reprovado", "Aprovado com pendência"].some((status) => statusMatches(employee.docStatus, status)) || employeeMedicineStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    ehsPendencies: normalizedEmployees
      .filter((employee) => statusMatches(employee.status, "Aguardando EHS/RH") || employeeEhsStatus(employee.raw) === "Pendente")
      .map((employee) => employee.raw),
    patrimonialPendencies: normalizedEmployees.filter((employee) => statusMatches(employee.status, "Aguardando patrimonial") || employeePatrimonialStatus(employee.raw) === "Pendente").map((employee) => employee.raw),
    expiredDocs: documents.filter((doc) => docStatus(doc) === "Vencido"),
    expiringDocs: documents.filter((doc) => docStatus(doc) === "A vencer"),
    pendingApprovals: documents.filter((doc) => pendingApprovalStatuses.includes(docStatus(doc))),
    criticalCompanies: normalizedCompanies
      .filter((company) => criticalCompanyStatuses.some((status) => statusMatches(company.status, status)) || documents.some((doc) => sameId(doc.companyId, company.id) && ["Vencido", "Reprovado"].includes(docStatus(doc))) || employees.some((employee) => sameId(employee.companyId, company.id) && statusMatches(normalizeEmployee(employee).status, "Bloqueado")))
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
  const activeCompanies = baseItems.filter((company) => ["Ativa", "Ativo", "Liberado", "Aprovado"].some((status) => statusMatches(normalizeCompany(company).status, status)));
  const inactiveCompanies = baseItems.filter((company) => ["Inativa", "Inativo", "Desmobilizada", "Desmobilizado"].some((status) => statusMatches(normalizeCompany(company).status, status)));
  const filteredItems = filtered(baseItems, [
    (item) => item.name,
    (item) => companyTradeName(item),
    (item) => item.cnpj,
    (item) => companyCode(item),
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
    ? state.companies.find((company) => sameId(company.id, editingCompanyId))
    : currentUser()?.role === "supplier"
      ? visibleCompanies()[0]
      : null;
  return `
    ${sectionHead("Empresas", "Carteira operacional de empresas terceirizadas, fiscais, contratos e pendencias.", "Nova empresa", "company")}
    ${renderCompanyEditor(editingCompany)}
    ${renderFiscalRegistry()}
    <div class="status-filter operational-filters" aria-label="Separacao de empresas">
      <button class="${tableConfig("companies").quick === "Ativas" ? "active" : ""}" type="button" data-quick-view="companies" data-quick-filter="Ativas">Empresas ativas <span class="mini-pill">${activeCompanies.length}</span></button>
      <button class="${tableConfig("companies").quick === "Desmobilizado" ? "active" : ""}" type="button" data-quick-view="companies" data-quick-filter="Desmobilizado">Empresas inativas/desmobilizadas <span class="mini-pill">${inactiveCompanies.length}</span></button>
    </div>
    ${toolbar("Buscar por razao social, nome fantasia, CNPJ, codigo, contrato, fiscal ou status")}
    ${renderOperationalFilters("companies", baseItems, { quicks: ["Todos", "Ativas", "Pendentes", "Bloqueadas", "Contrato vencido", "Documentos vencidos", "Sem fiscal vinculado"], exportKey: "empresas" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("companies", "ID/Codigo", "id")}${sortableHeader("companies", "Razao social", "name")}<th>Nome fantasia</th><th>CNPJ</th><th>Codigo da empresa</th><th>Contrato principal</th><th>Fiscal responsavel</th>${sortableHeader("companies", "Status", "status")}<th>Vencimento do contrato</th><th>Documentos pendentes</th><th>Funcionarios vinculados</th><th>Acoes</th></tr></thead>
        <tbody>
          ${pageItems.length ? pageItems.map(renderCompanyRow).join("") : emptyRow(12)}
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
  const activeFiscais = state.fiscais.map(normalizeFiscal).filter((fiscal) => fiscal.status !== "inativo");
  const fiscalOptions = [{ value: "", label: "Selecione um fiscal" }].concat(activeFiscais.map((fiscal) => ({ value: fiscal.id, label: `${fiscal.nome}${fiscal.matricula ? ` - ${fiscal.matricula}` : ""}` })));
  const additionalFiscalIds = new Set(item.fiscaisAdicionais || []);
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
        ${inputField("cnpj", "CNPJ", item.cnpj, "required inputmode='numeric' maxlength='18' data-mask='cnpj' placeholder='00.000.000/0000-00'")}
        ${selectField("fiscalId", "Fiscal principal", item.fiscalId || "", fiscalOptions)}
        ${inputField("fiscal", "Fiscal do contrato", item.fiscal, "required")}
        ${formSection("Cadastro rapido de fiscal", [
          inputField("novoFiscalNome", "Nome do novo fiscal", ""),
          inputField("novoFiscalEmail", "E-mail do novo fiscal", "", "type='email'"),
          inputField("novoFiscalMatricula", "Matricula", ""),
          inputField("novoFiscalTelefone", "Telefone", "", "inputmode='numeric' maxlength='15' data-mask='phone' placeholder='(00) 00000-0000'"),
          inputField("novoFiscalSetor", "Setor", "Fiscalizacao"),
        ])}
        ${formSection("Fiscais adicionais/substitutos", [
          `<label class="wide">Selecione fiscais adicionais<select name="fiscaisAdicionais" multiple size="4">${activeFiscais.map((fiscal) => `<option value="${escapeAttr(fiscal.id)}" ${additionalFiscalIds.has(fiscal.id) ? "selected" : ""}>${escapeHtml(fiscal.nome)}${fiscal.status === "com_acesso" ? " - com acesso" : ""}</option>`).join("")}</select></label>`,
        ])}
        ${inputField("manager", "Gestor do contrato", item.manager || item.responsible, "required")}
        ${inputField("costCenter", "Centro de custo padrao", item.costCenter || "", "required")}
        ${inputField("phone", "Telefone", item.phone, "required inputmode='numeric' maxlength='15' data-mask='phone' placeholder='(00) 00000-0000'")}
        ${inputField("cep", "CEP", item.cep || "", "inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'")}
        ${inputField("email", "E-mail", item.email, "type='email' required")}
        ${inputField("startDate", "Data de inicio do contrato", item.startDate, "type='date' required")}
        ${inputField("endDate", "Data de fim do contrato", item.endDate, "type='date' required")}
        ${selectField("status", "Status da empresa", item.status || "Ativa", ["Ativa", "Pendente", "Bloqueada", "Inativa", "Desmobilizada"].map(option))}
        ${inputField("contract", "Numero do contrato", item.contract, "required")}
        <div class="form-actions wide">
          <button class="btn primary" type="submit">${icon("save")} Salvar</button>
          ${company ? `<button class="btn warning" type="button" data-demobilize="company" data-id="${company.id}">Desmobilizar contrato</button>` : ""}
        </div>
      </form>
    </section>
  `;
}

function companyTradeName(company = {}) {
  return company.tradeName || company.nomeFantasia || company.nome_fantasia || company.name || "Nao informado";
}

function companyCode(company = {}) {
  return company.companyCode || company.codigoEmpresa || company.codigo_empresa || company.code || company.id || "Nao informado";
}

function companyBranchCode(company = {}) {
  return company.branchCode || company.codigoFilial || company.codigo_filial || "Nao informado";
}

function companyAddress(company = {}) {
  return company.address || company.endereco || [company.street || company.rua, company.number || company.numero, company.city || company.municipio, company.uf].filter(Boolean).join(", ") || "Nao informado";
}

function companyMainContact(company = {}) {
  return company.contact || company.contatoPrincipal || company.contato_principal || company.responsible || "Nao informado";
}

function companyLegalResponsible(company = {}) {
  return company.legalResponsible || company.responsavelLegal || company.responsavel_legal || company.responsible || "Nao informado";
}

function companyPrimaryContract(company = {}) {
  return normalizeCompany(company).contract || "Nao informado";
}

function companyEmployeeCount(companyId) {
  return state.employees.filter((employee) => sameId(employee.companyId, companyId)).length;
}

function companyDocuments(companyId) {
  return state.documents.filter((doc) => sameId(doc.companyId, companyId));
}

function companyPendingDocumentsCount(companyId) {
  return companyDocuments(companyId).filter((doc) => ["Pendente", "Reprovado", "A vencer", "Vencido"].includes(docStatus(doc))).length;
}

function companyHasExpiredDocuments(companyId) {
  return companyDocuments(companyId).some((doc) => docStatus(doc) === "Vencido");
}

function companyHasNoFiscal(company = {}) {
  const item = normalizeCompany(company);
  return !item.fiscalId && (!item.fiscal || item.fiscal === "Nao informado");
}

function employeeUpdatedAt(employee = {}) {
  const relatedHistory = (state.historico || [])
    .filter((event) => ["funcionario", "employee"].includes(event.entityType || event.entidade_tipo) && String(event.entityId || event.entidade_id) === String(employee.id))
    .map((event) => event.createdAt || event.criado_em)
    .filter(Boolean)
    .sort()
    .at(-1);
  return employee.updatedAt || employee.updated_at || relatedHistory || employee.createdAt || employee.created_at || "";
}

function employeeHasExpiredDocuments(employee = {}) {
  const item = normalizeEmployee(employee);
  const docs = state.documents.filter((doc) => sameId(doc.employeeId, item.id));
  return isPastDate(item.asoValidity) || isPastDate(item.trainingValidity) || docs.some((doc) => docStatus(doc) === "Vencido");
}

function statusToken(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function statusMatches(value, ...candidates) {
  const actual = statusToken(value);
  return candidates.some((candidate) => statusToken(candidate) === actual);
}

function normalizeDocumentStatusLabel(status = "") {
  const map = {
    regular: "Aprovado",
    aprovado: "Aprovado",
    pendente: "Pendente",
    "em analise": "Em análise",
    "a vencer": "A vencer",
    vencido: "Vencido",
    reprovado: "Reprovado",
    "aprovado com pendencia": "Aprovado com pendência",
  };
  return map[statusToken(status)] || String(status || "").trim() || "Pendente";
}

function normalizeHiringStatusLabel(status = "") {
  const map = {
    "em cadastro": "Em cadastro",
    "em analise": "Pendente Documentação",
    "em analise documental": "Pendente Documentação",
    "documentos pendente": "Pendente Documentação",
    "pendente": "Pendente Documentação",
    "pendente documentacao": "Pendente Documentação",
    "pendente medicina": "Pendente Medicina",
    "pendente ehs": "Pendente EHS",
    "pendente patrimonial": "Pendente Patrimonial",
    "aguardando correcao": "Aguardando Correção",
    "aguardando exames": "Pendente Medicina",
    "aguardando medicina": "Pendente Medicina",
    "em treinamento": "Pendente EHS",
    "aguardando ehs/rh": "Pendente EHS",
    "aguardando aprovacao do fiscal": "Pendente Patrimonial",
    "aguardando patrimonial": "Pendente Patrimonial",
    liberado: "Liberado",
    "ativo com pendencia": "Aguardando Correção",
    bloqueado: "Bloqueado",
    desmobilizado: "Desmobilizado",
    "desmobilizacao solicitada": "Desmobilização solicitada",
    inativo: "Inativo",
  };
  return map[statusToken(status)] || String(status || "").trim() || "Em cadastro";
}

function isManualEmployeeOperationalStatus(status = "") {
  return ["Bloqueado", "Inativo", "Desmobilizado", "Desmobilização solicitada"].some((value) => statusMatches(status, value));
}

function isPendingHiringStatus(status = "") {
  return [
    "Pendente Documentação",
    "Pendente Medicina",
    "Pendente EHS",
    "Pendente Patrimonial",
    "Aguardando Correção",
    "Em análise documental",
    "Desmobilização solicitada",
  ].some((value) => statusMatches(status, value));
}

function isManualCompanyOperationalStatus(status = "") {
  return ["Bloqueado", "Bloqueada", "Inativa", "Inativo", "Desmobilizada", "Desmobilizado"].some((value) => statusMatches(status, value));
}

function calculateCompanyStatus(company = {}, docs = state.documents.filter((doc) => sameId(doc.companyId, company.id)), employees = state.employees.filter((employee) => sameId(employee.companyId, company.id))) {
  const rawStatus = normalizeCompany(company).status;
  if (isManualCompanyOperationalStatus(rawStatus)) return rawStatus;
  const item = normalizeCompany(company);
  const days = contractDays(item);
  const hasActiveContract = Boolean(item.contract) && Number.isFinite(days) && days >= 0;
  const hasPendingDocuments = docs.some((doc) => ["Pendente", "A vencer", "Reprovado", "Vencido"].includes(docStatus(doc)));
  const hasPendingEmployees = employees.some((employee) => isPendingHiringStatus(normalizeEmployee(employee).status) || statusMatches(normalizeEmployee(employee).status, "Bloqueado"));
  if (Number.isFinite(days) && days < 0) return "Inativa";
  if (!hasActiveContract) return "Inativa";
  if (hasPendingDocuments || hasPendingEmployees) return "Pendente";
  return "Ativa";
}

function employeeDocsFor(employee = {}, docs = state.documents) {
  return (docs || []).filter((doc) => sameId(doc.employeeId, employee.id));
}

function employeeHasCoreData(employee = {}) {
  return Boolean(
    String(employee.name || "").trim() &&
      String(employee.companyId || "").trim() &&
      String(employee.role || "").trim() &&
      onlyDigits(employee.cpf || "").length === 11,
  );
}

function employeeWorkflowActions(employee = {}) {
  const meta = employeeMeta(employee);
  return employee.workflowActions || meta.workflowActions || {};
}

function normalizeWorkflowStatusLabel(status = "") {
  const map = {
    aprovado: "Aprovado",
    "aprovado com pendencia": "Aprovado com pendencia",
    pendente: "Pendente",
    reprovado: "Reprovado",
    bloqueado: "Bloqueado",
  };
  return map[statusToken(status)] || String(status || "").trim() || "Pendente";
}

function employeeWorkflowActionStatus(employee = {}, stepId = "") {
  return normalizeWorkflowStatusLabel(employeeWorkflowActions(employee)?.[stepId]?.status || "");
}

function calculateDocumentStatus(employee = {}, docs = employeeDocsFor(employee)) {
  const attachedDocs = (docs || []).filter(Boolean);
  if (!attachedDocs.length) return "Pendente";
  const fiscalWorkflowStatus = employeeWorkflowActionStatus(employee, "fiscal");
  if (statusMatches(fiscalWorkflowStatus, "Reprovado", "Bloqueado")) return "Reprovado";
  if (statusMatches(fiscalWorkflowStatus, "Aprovado", "Aprovado com pendencia")) {
    if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado"))) return "Reprovado";
    if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return "Vencido";
    return hasPendingApprovalException(employee) ? "Aprovado com pendência" : "Aprovado";
  }
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado"))) return "Reprovado";
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return "Vencido";
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Pendente", "Em análise"))) return "Em análise";
  return hasPendingApprovalException(employee) ? "Aprovado com pendência" : "Aprovado";
}

function calculateHiringStatus(employee = {}, docs = employeeDocsFor(employee), documentStatus = calculateDocumentStatus(employee, docs)) {
  const rawStatus = normalizeHiringStatusLabel(employee.status || employee.hiringStatus || "");
  if (isManualEmployeeOperationalStatus(rawStatus)) return rawStatus;
  if (!employeeHasCoreData(employee)) return "Em cadastro";
  if (statusMatches(documentStatus, "Reprovado", "Vencido", "Pendente", "Em análise")) return "Pendente Documentação";
  if (employeeMedicineStatus(employee, docs) !== "Aprovado") return "Pendente Medicina";
  if (employeeEhsStatus(employee, docs) !== "Aprovado") return "Pendente EHS";
  if (employeePatrimonialStatus(employee, docs) !== "Aprovado") return "Pendente Patrimonial";
  return "Liberado";
}

function employeeMatchesStatusFilter(employee, filter) {
  if (!filter || filter === "Todos") return true;
  const item = normalizeEmployee(employee);
  const normalizedFilter = normalizeHiringStatusLabel(filter);
  if (statusMatches(filter, "Documentos vencidos")) return employeeHasExpiredDocuments(item);
  if (statusMatches(normalizedFilter, "Em cadastro")) return statusMatches(item.status, "Em cadastro");
  if (statusMatches(normalizedFilter, "Pendente Documentação", "Aguardando Correção")) return statusMatches(item.status, "Pendente Documentação", "Aguardando Correção", "Em análise documental");
  if (statusMatches(normalizedFilter, "Pendente Medicina")) return statusMatches(item.status, "Pendente Medicina", "Aguardando medicina");
  if (statusMatches(normalizedFilter, "Pendente EHS")) return statusMatches(item.status, "Pendente EHS", "Aguardando EHS/RH");
  if (statusMatches(normalizedFilter, "Pendente Patrimonial")) return statusMatches(item.status, "Pendente Patrimonial", "Aguardando patrimonial");
  if (statusMatches(normalizedFilter, "Liberado")) return statusMatches(item.status, "Liberado");
  if (statusMatches(normalizedFilter, "Bloqueado")) return statusMatches(item.status, "Bloqueado");
  if (statusMatches(normalizedFilter, "Desmobilização solicitada")) return statusMatches(item.status, "Desmobilização solicitada");
  if (statusMatches(normalizedFilter, "Desmobilizado")) return statusMatches(item.status, "Desmobilizado");
  if (statusMatches(normalizedFilter, "Inativo")) return statusMatches(item.status, "Inativo");
  if (statusMatches(normalizedFilter, "Pendente")) return ["Em cadastro", "Pendente Documentação", "Aguardando Correção", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Desmobilização solicitada"].some((status) => statusMatches(item.status, status)) || statusMatches(item.docStatus, "Pendente", "Em análise", "Reprovado", "Vencido");
  if (statusMatches(normalizedFilter, "Aprovado")) return statusMatches(item.status, "Liberado") || statusMatches(item.docStatus, "Aprovado", "Aprovado com pendência");
  if (statusMatches(normalizedFilter, "Reprovado")) return statusMatches(item.docStatus, "Reprovado");
  if (statusMatches(normalizedFilter, "Vencido")) return statusMatches(item.docStatus, "Vencido") || employeeHasExpiredDocuments(item);
  return statusMatches(item.status, normalizedFilter) || statusMatches(item.docStatus, normalizedFilter);
}

function historyEventsFor(entityType, entityId) {
  const aliases = {
    funcionario: ["funcionario", "employee", "employees"],
    empresa: ["empresa", "company", "companies"],
    contrato: ["contrato", "contract", "contracts"],
    fiscal: ["fiscal", "fiscais"],
    documento: ["documento", "document", "documents"],
  }[entityType] || [entityType];
  return (state.historico || [])
    .filter((event) => aliases.includes(event.entityType || event.entidade_tipo) && String(event.entityId || event.entidade_id) === String(entityId))
    .sort((a, b) => String(b.createdAt || b.criado_em || "").localeCompare(String(a.createdAt || a.criado_em || "")));
}

function renderHistoryTimeline(entityType, entityId, fallbackItems = []) {
  const events = historyEventsFor(entityType, entityId);
  const rows = events.length
    ? events.map((event) => {
        const previousValue = event.previousStatus ?? event.status_anterior ?? "";
        const nextValue = event.nextStatus ?? event.status_novo ?? "";
        return `
          <div class="item-card history-entry">
            <div class="item-row">
              <div>
                <strong>${escapeHtml(event.action || event.acao || "Alteracao registrada")}</strong>
                <span class="muted">${formatDateTime(event.createdAt || event.criado_em)} - ${escapeHtml(event.userName || event.usuario_nome || "Sistema")}</span>
              </div>
              <span class="mini-pill">${escapeHtml(event.userProfile || event.perfil || currentUser()?.role || "perfil")}</span>
            </div>
            <div class="detail-grid compact">
              ${detailCard("Campo alterado", escapeHtml(event.field || event.campo || "status/registro"))}
              ${detailCard("Valor anterior", escapeHtml(previousValue || "Nao informado"))}
              ${detailCard("Novo valor", escapeHtml(nextValue || "Nao informado"))}
              ${detailCard("Motivo/observacao", escapeHtml(event.observation || event.observacao || "Sem observacao"))}
            </div>
          </div>
        `;
      })
    : fallbackItems;
  return `<div class="history-list">${rows.length ? rows.join("") : `<div class="empty">Nenhum historico registrado para esta ficha.</div>`}</div>`;
}

function renderRecordActionBar(type, item) {
  const isEmployee = type === "employee";
  const canEditRecord = isEmployee ? can("edit.employee", item) : can("edit.company", item);
  const canStatus = isEmployee ? can("updateHiringStatus", item) : can("edit.company", item);
  return `
    <div class="record-action-bar">
      <button class="btn secondary compact" type="button" data-close>${icon("arrow")} Voltar</button>
      ${canEditRecord ? `<button class="btn primary compact" type="button" data-record-edit="${type}" data-id="${item.id}">${icon("edit")} Editar cadastro</button>` : ""}
      ${
        isEmployee && canStatus
          ? `
            <button class="btn warning compact" type="button" data-employee-action="inactivate" data-id="${item.id}">Inativar</button>
            <button class="btn danger compact" type="button" data-employee-action="block" data-id="${item.id}">Bloquear</button>
          `
          : ""
      }
      ${
        !isEmployee && canStatus
          ? `<button class="btn warning compact" type="button" data-demobilize="company" data-id="${item.id}">Desmobilizar contrato</button>`
          : ""
      }
    </div>
  `;
}

function renderRecordFooter(title, rows, entityType, entityId) {
  return `
    <section class="record-section">
      <div class="record-section-title">
        <h3>Resumo de Atividades</h3>
        <span class="mini-pill">${rows.length} item(ns)</span>
      </div>
      <div class="record-activity-list">
        ${
          rows.length
            ? rows.map((row) => `
              <div class="record-activity-row">
                <div>
                  <strong>${escapeHtml(row.title)}</strong>
                  <span>${escapeHtml(row.detail || "")}</span>
                </div>
                ${statusBadge(row.status || "Pendente")}
              </div>
            `).join("")
            : `<div class="empty">Nenhuma atividade operacional registrada.</div>`
        }
      </div>
    </section>
    <section class="record-section">
      <div class="record-section-title">
        <h3>Historico Completo</h3>
        <span class="mini-pill">${escapeHtml(title)}</span>
      </div>
      ${renderHistoryTimeline(entityType, entityId)}
    </section>
  `;
}

function employeeActivityRows(employee) {
  const item = normalizeEmployee(employee);
  const docs = state.documents.filter((doc) => sameId(doc.employeeId, item.id));
  return [
    { title: "Status contratacao", detail: item.status, status: item.status },
    { title: "Status documental", detail: `${docs.length} documento(s) vinculados`, status: item.docStatus },
    { title: "ASO", detail: formatDate(item.asoValidity), status: isPastDate(item.asoValidity) ? "Vencido" : "Aprovado" },
    { title: "Treinamento", detail: formatDate(item.trainingValidity), status: isPastDate(item.trainingValidity) ? "Vencido" : "Aprovado" },
    { title: "Workflow", detail: "Fiscal, Medicina, EHS e Patrimonial", status: employeeWorkflowSteps(item).at(-1)?.status || "Pendente" },
  ];
}

function companyActivityRows(company) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, item.id));
  const documents = companyDocuments(item.id);
  return [
    { title: "Status da empresa", detail: item.status, status: item.status },
    { title: "Contrato principal", detail: `${item.contract || "Nao informado"} - vence ${formatDate(item.endDate)}`, status: isPastDate(item.endDate) ? "Vencido" : item.status },
    { title: "Funcionarios vinculados", detail: `${employees.length} funcionario(s)`, status: employees.some((employee) => normalizeEmployee(employee).status === "Bloqueado") ? "Bloqueado" : "Aprovado" },
    { title: "Documentos pendentes", detail: `${companyPendingDocumentsCount(item.id)} pendencia(s)`, status: companyPendingDocumentsCount(item.id) ? "Pendente" : "Aprovado" },
    { title: "Fiscalizacao", detail: item.fiscal || "Nao informado", status: companyHasNoFiscal(item) ? "Pendente" : "Aprovado" },
  ];
}

function formatDateTime(value) {
  if (!value) return "Nao informado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function renderFiscalRegistry() {
  const fiscais = (state.fiscais || []).map(normalizeFiscal);
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <h2>Base de fiscais</h2>
          <span class="muted">Fiscais podem ser responsaveis por empresas mesmo sem usuario/login no sistema.</span>
        </div>
      </div>
      <form id="fiscalQuickForm" class="form-grid company-form">
        ${inputField("nome", "Nome do fiscal", "", "required")}
        ${inputField("email", "E-mail", "", "type='email'")}
        ${inputField("matricula", "Matricula", "")}
        ${inputField("telefone", "Telefone", "")}
        ${inputField("setor", "Setor", "Fiscalizacao")}
        ${selectField("status", "Status", "sem_acesso", fiscalStatuses.map((status) => ({ value: status, label: fiscalStatusLabel(status) })))}
        <div class="form-actions wide"><button class="btn secondary" type="submit">${icon("plus")} Cadastrar fiscal</button></div>
      </form>
      <table>
        <thead><tr><th>Fiscal</th><th>Contato</th><th>Setor</th><th>Status</th><th>Acesso</th><th>Acoes</th></tr></thead>
        <tbody>
          ${
            fiscais.length
              ? fiscais.map((fiscal) => `
                <tr>
                  <td><strong>${escapeHtml(fiscal.nome)}</strong><br><span class="muted">${escapeHtml(fiscal.matricula || "Sem matricula")}</span></td>
                  <td>${escapeHtml(fiscal.email || "Sem e-mail")}<br><span class="muted">${escapeHtml(fiscal.telefone || "Sem telefone")}</span></td>
                  <td>${escapeHtml(fiscal.setor || "Nao informado")}</td>
                  <td>${statusBadge(fiscalStatusLabel(fiscal.status))}</td>
                  <td>${escapeHtml(fiscal.usuarioEmail || "Sem acesso")}</td>
                  <td>
                    <div class="actions wrap">
                      ${fiscal.status !== "com_acesso" && fiscal.status !== "inativo" ? `<button class="btn primary compact" type="button" data-fiscal-access="${fiscal.id}">${icon("users")} Criar acesso ao sistema</button>` : ""}
                      ${fiscal.status !== "inativo" ? `<button class="btn warning compact" type="button" data-fiscal-inactivate="${fiscal.id}">Inativar</button>` : `<span class="mini-pill">Inativo</span>`}
                    </div>
                  </td>
                </tr>
              `).join("")
              : emptyRow(6)
          }
        </tbody>
      </table>
    </section>
  `;
}

function renderCompanyRow(company) {
  const item = normalizeCompany(company);
  return `
    <tr>
      <td><button class="link-button" type="button" data-company-detail="${company.id}">${escapeHtml(companyCode(item))}</button></td>
      <td><button class="link-button strong" type="button" data-company-detail="${company.id}">${escapeHtml(item.name)}</button><br><span class="muted">${item.email || "E-mail nao informado"}</span></td>
      <td>${companyTradeName(item)}</td>
      <td>${item.cnpj}</td>
      <td>${companyCode(item)}</td>
      <td>${companyPrimaryContract(item)}</td>
      <td>${item.fiscal}</td>
      <td>${statusBadge(item.status)}</td>
      <td>${formatDate(item.endDate)}${isPastDate(item.endDate) ? `<br>${statusBadge("Vencido")}` : ""}</td>
      <td><strong>${companyPendingDocumentsCount(company.id)}</strong></td>
      <td><strong>${companyEmployeeCount(company.id)}</strong></td>
      <td>${companyRowActions(company.id)}</td>
    </tr>
  `;
}

function companyRowActions(id) {
  const company = state.companies.find((item) => sameId(item.id, id));
  const canEditCompany = can("edit.company", company);
  return `
    <div class="actions wrap">
      <button class="btn secondary compact" type="button" data-company-detail="${id}">${icon("company")} Ver detalhes</button>
      ${canEditCompany ? `<button class="btn secondary compact" type="button" data-edit="company" data-id="${id}">${icon("edit")} Editar</button>` : ""}
      ${canEditCompany ? `<button class="btn warning compact" type="button" data-demobilize="company" data-id="${id}">Desmobilizar</button>` : ""}
      ${!canEditCompany ? `<span class="mini-pill">Somente leitura</span>` : ""}
    </div>
  `;
}

function renderEmployees() {
  const editingEmployee = editingEmployeeId ? state.employees.find((employee) => sameId(employee.id, editingEmployeeId)) : null;
  const baseItems = visibleEmployees();
  const filteredByText = filtered(baseItems, [
    (item) => item.name,
    (item) => item.cpf,
    (item) => employeeRegistration(item),
    (item) => item.role,
    (item) => companyName(item.companyId),
    (item) => state.companies.find((company) => sameId(company.id, item.companyId))?.contract,
    (item) => employeeCostCenter(item, state.companies.find((company) => sameId(company.id, item.companyId))),
    (item) => normalizeEmployee(item).docStatus,
    (item) => normalizeEmployee(item).status,
  ]);
  const byStatus = filteredByText.filter((employee) => employeeMatchesStatusFilter(employee, employeeStatusFilter));
  const items = sortItems("employees", applyOperationalFilters("employees", byStatus));
  const { pageItems, totalPages } = paginateItems("employees", items);
  return `
    ${sectionHead("Funcionarios / FIT", "Lista operacional de trabalhadores vinculados a empresas, contratos e status documentais.", "Novo funcionario", "employee")}
    ${renderEmployeeEditor(editingEmployee)}
    ${toolbar("Buscar por nome, CPF, matricula, empresa, contrato, centro de custo ou status")}
    ${renderEmployeeStatusFilters()}
    ${renderOperationalFilters("employees", baseItems, { quicks: ["Todos", "Ativo", "Bloqueado", "Pendente", "Medicina", "EHS", "Desmobilizado"], exportKey: "funcionarios-ativos" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("employees", "ID/Matricula", "id")}${sortableHeader("employees", "Nome", "name")}${sortableHeader("employees", "CPF", "cpf")}<th>Empresa</th><th>Contrato</th>${sortableHeader("employees", "Funcao", "sector")}<th>Centro de custo</th>${sortableHeader("employees", "Status documental", "status")}<th>Status contratacao</th><th>ASO</th><th>Treinamento</th><th>Ultima atualizacao</th><th>Acoes</th></tr></thead>
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
  const role = currentUser()?.role || "visitor";
  const canEditOperationalLink = ["admin", "fiscal"].includes(role);
  const companyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  const linkedCompany = state.companies.find((company) => sameId(company.id, item.companyId)) || state.companies[0];
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
          inputField("contract", "Contrato vinculado", item.contract || linkedCompany?.contract || "", `${canEditOperationalLink ? "" : "readonly"} required`),
          inputField("costCenter", "Centro de custo", item.costCenter || employeeCostCenter(item, linkedCompany), canEditOperationalLink ? "required" : "required readonly"),
          inputField("companyFiscal", "Fiscal da empresa", item.companyFiscal || linkedCompany?.fiscal || "", canEditOperationalLink ? "" : "readonly"),
          inputField("contractManager", "Gestor do contrato", item.contractManager || linkedCompany?.manager || linkedCompany?.responsible || "", canEditOperationalLink ? "" : "readonly"),
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
  const filters = ["Todos", "Em cadastro", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção", "Liberado", "Bloqueado", "Desmobilização solicitada", "Desmobilizado", "Inativo", "Documentos vencidos"];
  return `
    <div class="status-filter" aria-label="Filtros de funcionarios por status">
      ${filters
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
  const company = state.companies.find((entry) => entry.id === item.companyId);
  return `
    <tr class="employee-row employee-row-${group.key}">
      <td><button class="link-button" type="button" data-employee-record="${employee.id}">${escapeHtml(employeeRegistration(item))}</button></td>
      <td><button class="link-button strong" type="button" data-employee-record="${employee.id}">${escapeHtml(item.name)}</button><br><span class="muted">${item.address || "Endereco nao informado"}</span></td>
      <td>${item.cpf}</td>
      <td>${companyName(item.companyId)}</td>
      <td>${item.contract || company?.contract || "Nao informado"}</td>
      <td>${item.role}</td>
      <td>${item.costCenter || employeeCostCenter(item, company)}</td>
      <td>${statusBadge(item.docStatus)}</td>
      <td>${statusBadge(item.status)}</td>
      <td>${formatDate(item.asoValidity)}${isPastDate(item.asoValidity) ? `<br>${statusBadge("Vencido")}` : ""}</td>
      <td>${formatDate(item.trainingValidity)}${isPastDate(item.trainingValidity) ? `<br>${statusBadge("Vencido")}` : ""}</td>
      <td>${formatDateTime(employeeUpdatedAt(item))}</td>
      <td>
        <div class="actions wrap">
          <button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir FIT</button>
          ${employeeRowActions(item)}
        </div>
      </td>
    </tr>
  `;
}

function renderEmployeeGroupedRows(items) {
  if (!items.length) return emptyRow(13);
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
          <td colspan="13">
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
  if (statusMatches(status, "Bloqueado")) return { key: "blocked", title: "Funcionarios bloqueados" };
  if (statusMatches(status, "Desmobilizado", "Inativo")) return { key: "inactive", title: "Funcionarios desmobilizados/inativos" };
  return { key: "active", title: "Funcionarios ativos" };
}

function openEmployeeRecord(id) {
  const employee = visibleEmployees().find((item) => sameId(item.id, id)) || state.employees.find((item) => sameId(item.id, id));
  if (!employee) return;
  const item = normalizeEmployee(employee);
  const company = state.companies.find((entry) => sameId(entry.id, item.companyId));
  const tabs = employeeRecordTabs();
  const defaultTab = tabs[0]?.[0] || "summary";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop employee-record-backdrop";
  modal.innerHTML = `
    <section class="modal employee-record-modal">
      ${renderRecordActionBar("employee", item)}
      <div class="employee-record-header">
        <div class="employee-avatar">${employeeInitials(item.name)}</div>
        <div class="employee-record-title">
          <span class="eyebrow">Ficha detalhada do funcionario / FIT</span>
          <h2>${item.name}</h2>
          <div class="employee-record-meta">
            <span>CPF ${item.cpf || "Nao informado"}</span>
            <span>Matricula ${employeeRegistration(item)}</span>
            <span>${company?.name || "Empresa nao informada"}</span>
            <span>Contrato ${item.contract || company?.contract || "Nao informado"}</span>
            <span>${item.role || "Funcao nao informada"}</span>
            <span>CC ${item.costCenter || employeeCostCenter(item, company)}</span>
            <span>Atualizado ${formatDateTime(employeeUpdatedAt(item))}</span>
          </div>
        </div>
        <div class="employee-record-status">
          ${statusBadge(item.status)}
          ${statusBadge(item.docStatus)}
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
      <div class="modal-body record-footer">${renderRecordFooter("Funcionario/FIT", employeeActivityRows(item), "funcionario", item.id)}</div>
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
    const companyDetail = event.target.closest("[data-company-detail]");
    if (companyDetail) {
      event.stopPropagation();
      openCompanyDetails(companyDetail.dataset.companyDetail);
      return;
    }
    const recordEdit = event.target.closest("[data-record-edit]");
    if (recordEdit) {
      event.stopPropagation();
      editingEmployeeId = recordEdit.dataset.id;
      modal.remove();
      currentView = "employees";
      renderApp();
      return;
    }
    const employeeAction = event.target.closest("[data-employee-action]");
    if (employeeAction) {
      event.stopPropagation();
      modal.remove();
      const label = {
        demobilize: "Desmobilizar",
        inactivate: "Inativar",
        block: "Bloquear",
      }[employeeAction.dataset.employeeAction] || employeeAction.dataset.employeeAction;
      console.log(label, employeeAction.dataset.id);
      updateEmployeeOperationalStatus(employeeAction.dataset.id, employeeAction.dataset.employeeAction);
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
    ["summary", "Resumo"],
    ["personal", "Dados Pessoais"],
    ["docs", "Documentos Pessoais"],
    ["medicine", "Medicina Ocupacional"],
    ["ehs", "Seguranca do Trabalho/EHS"],
    ["patrimonial", "Patrimonial"],
    ["contracts", "Contratos/Vinculos"],
    ["history", "Historico"],
  ];
  const allowed = new Set(["summary", "contracts", "history", ...allowedEmployeeTabs()]);
  return allTabs.filter(([tab]) => allowed.has(tab));
}

function renderEmployeeRecordTab(employee, tab) {
  const company = state.companies.find((item) => sameId(item.id, employee.companyId));
  const companyDocs = state.documents.filter((doc) => sameId(doc.companyId, employee.companyId) && !doc.employeeId);
  const employeeDocs = state.documents.filter((doc) => sameId(doc.employeeId, employee.id));
  const allDocs = [...employeeDocs, ...companyDocs];
  if (tab === "summary") {
    return `
      <div class="detail-grid">
        ${detailCard("Status geral", statusBadge(employee.status))}
        ${detailCard("Status documental", statusBadge(employee.docStatus))}
        ${detailCard("Empresa", company?.name || "Nao informado")}
        ${detailCard("Contrato", employee.contract || company?.contract || "Nao informado")}
        ${detailCard("Funcao", employee.role || "Nao informado")}
        ${detailCard("Centro de custo", employee.costCenter || employeeCostCenter(employee, company))}
        ${detailCard("ASO", `${formatDate(employee.asoValidity)} ${isPastDate(employee.asoValidity) ? statusBadge("Vencido") : ""}`)}
        ${detailCard("Treinamento", `${formatDate(employee.trainingValidity)} ${isPastDate(employee.trainingValidity) ? statusBadge("Vencido") : ""}`)}
      </div>
      ${renderEmployeeApprovalCards(employee)}
      <div class="employee-workflow large">${renderEmployeeWorkflow(employee)}</div>
    `;
  }
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
  if (tab === "contracts") {
    return `
      <div class="detail-grid">
        ${detailCard("Empresa vinculada", company?.name || "Nao informado")}
        ${detailCard("Contrato vinculado", employee.contract || company?.contract || "Nao informado")}
        ${detailCard("Centro de custo", employee.costCenter || employeeCostCenter(employee, company))}
        ${detailCard("Gestor/Fiscal", company?.fiscal || "Nao informado")}
        ${detailCard("Inicio do contrato", formatDate(company?.startDate))}
        ${detailCard("Fim do contrato", formatDate(company?.endDate))}
        ${detailCard("Situacao", statusBadge(employeeActiveState(employee)))}
      </div>
      <div class="contract-context-actions">
        ${company ? `<button class="btn secondary compact" type="button" data-company-detail="${company.id}">${icon("company")} Abrir empresa</button>` : ""}
      </div>
    `;
  }
  if (tab === "history") {
    return renderHistoryTimeline("funcionario", employee.id, [
      `<div class="item-card"><strong>Cadastro do trabalhador/FIT</strong><span class="muted">${formatDate(employee.admission || employee.startDate)} - ${employee.name}</span></div>`,
      `<div class="item-card"><strong>Empresa vinculada</strong><span class="muted">${company?.name || "Nao informado"}</span></div>`,
      `<div class="item-card"><strong>Documentos associados</strong><span class="muted">${allDocs.length} documento(s) monitorados.</span></div>`,
      `<div class="item-card"><strong>Status atual</strong><span class="muted">${employee.status}</span></div>`,
    ]);
  }
  return renderHistoryTimeline("funcionario", employee.id);
}

function renderEmployeeApprovalCards(employee) {
  const steps = employeeWorkflowSteps(employee).filter((step) => ["fiscal", "medicina", "ehs", "patrimonial"].includes(step.id));
  return `
    <div class="approval-card-grid">
      ${steps
        .map(
          (step) => `
            <article class="item-card approval-mini-card ${workflowStatusClass(step.status)}">
              <div class="item-row">
                <span class="employee-flow-icon">${icon(step.icon)}</span>
                ${workflowStatusBadge(step.status)}
              </div>
              <strong>${step.id === "ehs" ? "EHS/Seguranca do Trabalho" : step.label.replace(" / Documentos pessoais", "")}</strong>
              <span class="muted">${step.detail}</span>
            </article>
          `,
        )
        .join("")}
    </div>
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
  const docs = state.documents.filter((doc) => sameId(doc.employeeId, item.id));
  const documentStatus = calculateDocumentStatus(item, docs);
  const hiringStatus = calculateHiringStatus(item, docs, documentStatus);
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
        pending: statusMatches(documentStatus, "Pendente", "Em análise"),
        approved: statusMatches(documentStatus, "Aprovado", "Aprovado com pendência") || fiscalDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer")),
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
        pending: statusMatches(hiringStatus, "Aguardando medicina") || employeeMedicineStatus(item, docs) === "Pendente",
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
        pending: statusMatches(hiringStatus, "Aguardando EHS/RH") || employeeEhsStatus(item, docs) === "Pendente",
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
        pending: statusMatches(hiringStatus, "Aguardando patrimonial") || employeePatrimonialStatus(item, docs) === "Pendente",
        approved: employeePatrimonialStatus(item, docs) === "Aprovado",
        exception,
      }),
      detail: "Acesso, credencial e liberacao patrimonial",
    },
  ];
  const rejectedStatus = steps.some((step) => step.status === "Reprovado");
  const pendingStatus = steps.some((step) => ["Pendente", "Aprovado com pendencia"].includes(step.status));
  steps.push({
    id: "liberacao",
    sector: "Fiscal",
    label: "Liberacao final",
    icon: "approve",
    status:
      workflow.liberacao?.status ||
      (statusMatches(hiringStatus, "Bloqueado", "Inativo", "Desmobilizado", "Desmobilização solicitada")
        ? hiringStatus
        : rejectedStatus
          ? "Reprovado"
          : pendingStatus || isPendingHiringStatus(hiringStatus)
            ? hiringStatus
            : "Aprovado"),
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
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Acao do workflow do funcionario", scope: { employeeId: employee.id, companyId: employee.companyId } }));
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
    "Pendente Documentação": "Pendente Documentação",
    "Pendente Medicina": "Pendente Medicina",
    "Pendente EHS": "Pendente EHS",
    "Pendente Patrimonial": "Pendente Patrimonial",
    "Aguardando Correção": "Aguardando Correção",
  };
  return `<span class="status ${workflowStatusClass(status)}">${labels[status] || status}</span>`;
}

function resolveWorkflowStepStatus(employee, docs, { pending = false, approved = false, exception = false } = {}) {
  if (statusMatches(employee.status, "Bloqueado")) return "Bloqueado";
  if (docs.some((doc) => statusMatches(doc.status, "Reprovado") || statusMatches(docStatus(doc), "Reprovado"))) return "Reprovado";
  if (docs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return exception ? "Aprovado com pendencia" : "Pendente";
  if (pending || docs.some((doc) => ["Pendente", "A vencer", "Em análise"].some((value) => statusMatches(docStatus(doc), value)))) return exception ? "Aprovado com pendencia" : "Pendente";
  if (approved || docs.some((doc) => ["Aprovado", "A vencer"].some((value) => statusMatches(docStatus(doc), value)))) return "Aprovado";
  return exception ? "Aprovado com pendencia" : "Pendente";
}

function workflowStatusClass(status) {
  return {
    Aprovado: "ok",
    "Aprovado com pendencia": "conditional",
    Pendente: "warn",
    Reprovado: "bad",
    Bloqueado: "blocked",
    "Pendente Documentação": "warn",
    "Pendente Medicina": "warn",
    "Pendente EHS": "warn",
    "Pendente Patrimonial": "warn",
    "Aguardando Correção": "analysis",
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
  const status = normalizeHiringStatusLabel(employee.status);
  if (statusMatches(status, "Bloqueado")) return "Bloqueado";
  if (statusMatches(status, "Desmobilizado", "Inativo")) return "Inativo";
  if (isPendingHiringStatus(status)) return "Ativo com pendência";
  return "Ativo";
}

function employeeMedicineStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "medicina");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const medicineDocs = docs.filter((doc) => /aso|exame|medic/i.test(doc.type));
  if (medicineDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Vencido", "Pendente", "Em análise"))) return "Pendente";
  if (medicineDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer"))) return "Aprovado";
  return employee.asoValidity && !isPastDate(employee.asoValidity) ? "Aprovado" : "Pendente";
}

function employeeEhsStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "ehs");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const ehsDocs = docs.filter((doc) => /nr-|treinamento|epi|segur/i.test(doc.type));
  if (ehsDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Vencido", "Pendente", "Em análise"))) return "Pendente";
  if (ehsDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer"))) return "Aprovado";
  return employee.trainingValidity && !isPastDate(employee.trainingValidity) ? "Aprovado" : "Pendente";
}

function employeePatrimonialStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "patrimonial");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const patrimonialDocs = docs.filter((doc) => documentOperationalSector(doc) === "Patrimonial");
  if (patrimonialDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Vencido", "Pendente", "Em análise"))) return "Pendente";
  if (patrimonialDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer"))) return "Aprovado";
  return "Pendente";
}

function applyAutomaticStatusRules({ syncRemote = false, source = "Motor automatico de status", scope = null } = {}) {
  if (!state?.companies || !state?.employees || !state?.documents) return [];
  state.historico ||= [];
  const changes = [];
  const employeePendingStatuses = ["Em cadastro", "Pendente Documentação", "Pendente Medicina", "Pendente EHS", "Pendente Patrimonial", "Aguardando Correção", "Em análise documental", "Aguardando medicina", "Aguardando EHS/RH", "Aguardando patrimonial", "Desmobilização solicitada"];

  const employeeTargets = scope?.employeeId ? state.employees.filter((employee) => sameId(employee.id, scope.employeeId)) : state.employees;
  const companyTargets = scope?.companyId ? state.companies.filter((company) => sameId(company.id, scope.companyId)) : state.companies;

  const registerStatusChange = (collection, entityType, item, fieldOrNextStatus, maybeNextStatus, maybeObservation) => {
    const hasExplicitField = typeof maybeObservation !== "undefined";
    const field = hasExplicitField ? fieldOrNextStatus : "status";
    const nextStatus = hasExplicitField ? maybeNextStatus : fieldOrNextStatus;
    const observation = hasExplicitField ? maybeObservation : maybeNextStatus;
    const previousStatus = item[field] || "";
    if (!nextStatus || previousStatus === nextStatus) return;
    item[field] = nextStatus;
    const history = createHistoryEvent({
      entityType,
      entityId: item.id,
      action: field === "docStatus" ? "Status documental automatico" : "Status contratacao automatico",
      previousStatus,
      nextStatus,
      observation: `${source}: ${observation}`,
    });
    state.historico = upsertById(state.historico, history);
    changes.push({ collection, item, history });
  };

  employeeTargets.forEach((employee) => {
    const item = normalizeEmployee(employee);
    const docs = employeeDocsFor(item);
    const nextDocumentStatus = calculateDocumentStatus(item, docs);
    const nextHiringStatus = calculateHiringStatus(item, docs, nextDocumentStatus);

    registerStatusChange("employees", "funcionario", employee, "docStatus", nextDocumentStatus, `status documental recalculado para ${nextDocumentStatus}`);
    registerStatusChange("employees", "funcionario", employee, "status", nextHiringStatus, `status de contratacao recalculado para ${nextHiringStatus}`);

    if (hasPendingApprovalException(item) && statusMatches(nextDocumentStatus, "Aprovado com pendência")) {
      registerStatusChange("employees", "funcionario", employee, "docStatus", "Aprovado com pendência", "aprovacao com pendencia formalizada com responsavel, motivo e prazo");
      if (!statusMatches(nextHiringStatus, "Liberado")) {
        registerStatusChange("employees", "funcionario", employee, "status", "Liberado", "aprovacao com pendencia nao bloqueia a liberacao operacional");
      }
    }
  });

  companyTargets.forEach((company) => {
    const item = normalizeCompany(company);
    const docs = state.documents.filter((doc) => sameId(doc.companyId, item.id));
    const employees = state.employees.filter((employee) => sameId(employee.companyId, item.id));
    const nextCompanyStatus = calculateCompanyStatus(item, docs, employees);
    registerStatusChange("companies", "empresa", company, "status", nextCompanyStatus, `status da empresa recalculado para ${nextCompanyStatus}`);
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
    (item) => state.employees.find((employee) => sameId(employee.id, item.employeeId))?.cpf,
    (item) => employeeRegistration(state.employees.find((employee) => sameId(employee.id, item.employeeId)) || {}),
    (item) => state.companies.find((company) => sameId(company.id, item.companyId))?.contract,
    (item) => employeeCostCenter(state.employees.find((employee) => sameId(employee.id, item.employeeId)) || {}, state.companies.find((company) => sameId(company.id, item.companyId))),
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
  const inactive = visibleCompanies().filter((company) => ["Inativa", "Inativo", "Desmobilizada", "Desmobilizado"].includes(normalizeCompany(company).status)).length;
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
      ${can("create.company") ? `<button class="btn primary" data-create="contract">${icon("plus")} Novo contrato</button>` : ""}
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
  const company = visibleCompanies().find((item) => sameId(item.id, id)) || state.companies.find((item) => sameId(item.id, id));
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
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const documents = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  const pendencies = documents.filter((doc) => !statusMatches(docStatus(doc), "Aprovado")).length + employees.filter((employee) => ["Em análise documental", "Aguardando medicina", "Aguardando EHS/RH", "Aguardando patrimonial", "Desmobilização solicitada"].some((status) => statusMatches(normalizeEmployee(employee).status, status))).length;
  const expiring = documents.filter((doc) => docStatus(doc) === "A vencer").length + (contractDays(company) >= 0 && contractDays(company) <= 60 ? 1 : 0);
  const blocks = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado")).length + (["Bloqueada", "Bloqueado"].some((status) => statusMatches(normalizeCompany(company).status, status)) ? 1 : 0);
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
  const company = visibleCompanies().find((item) => sameId(item.id, id)) || state.companies.find((item) => sameId(item.id, id));
  if (!company) return;
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const pendencies = companyPendingDocumentsCount(company.id);
  const modal = document.createElement("div");
  modal.className = "modal-backdrop company-detail-backdrop";
  modal.innerHTML = `
    <section class="modal contract-detail-modal company-detail-modal">
      ${renderRecordActionBar("company", item)}
      <div class="employee-record-header company-record-header">
        <div class="employee-avatar">${employeeInitials(item.name)}</div>
        <div class="employee-record-title">
          <span class="eyebrow">Ficha detalhada da empresa</span>
          <h2>${item.name}</h2>
          <div class="employee-record-meta">
            <span>${companyTradeName(item)}</span>
            <span>CNPJ ${item.cnpj || "Nao informado"}</span>
            <span>ID/Codigo ${companyCode(item)}</span>
            <span>Fiscal ${item.fiscal || "Nao informado"}</span>
            <span>Contato ${companyMainContact(item)}</span>
            <span>Vencimento ${formatDate(item.endDate)}</span>
            <span>${employees.length} funcionario(s)</span>
            <span>${pendencies} pendencia(s)</span>
          </div>
        </div>
        <div class="employee-record-status">${statusBadge(item.status)}</div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="contract-tabs" role="tablist">
        ${[
          ["general", "Dados Gerais"],
          ["contracts", "Contratos"],
          ["people", "Funcionarios"],
          ["docs", "Documentos Obrigatorios"],
          ["safety", "Seguranca do Trabalho"],
          ["medicine", "Medicina Ocupacional"],
          ["fiscalization", "Fiscalizacao"],
          ["history", "Historico"],
        ]
          .map(([tab, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-company-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body company-tab-content">${renderCompanyTab(company, "general")}</div>
      <div class="modal-body record-footer">${renderRecordFooter("Empresa", companyActivityRows(item), "empresa", item.id)}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    const recordEdit = event.target.closest("[data-record-edit]");
    if (recordEdit) {
      event.stopPropagation();
      editingCompanyId = recordEdit.dataset.id;
      modal.remove();
      currentView = "companies";
      renderApp();
      return;
    }
    const demobilize = event.target.closest("[data-demobilize='company']");
    if (demobilize) {
      event.stopPropagation();
      modal.remove();
      demobilizeCompany(demobilize.dataset.id);
      return;
    }
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
  modal.querySelectorAll("[data-doc-status]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    updateDocumentStatus(button.dataset.id, button.dataset.docStatus);
  }));
}

function renderCompanyTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const documents = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  if (tab === "general") {
    return `
      <div class="detail-grid">
        ${detailCard("Razao social", item.name)}
        ${detailCard("Nome fantasia", companyTradeName(item))}
        ${detailCard("CNPJ", item.cnpj)}
        ${detailCard("Inscricao estadual", item.stateRegistration || item.inscricaoEstadual || item.inscricao_estadual || "Nao informado")}
        ${detailCard("Codigo da empresa", companyCode(item))}
        ${detailCard("Codigo filial", companyBranchCode(item))}
        ${detailCard("Centro de custo", employeeCostCenter({}, item))}
        ${detailCard("Endereco", companyAddress(item))}
        ${detailCard("Municipio/UF", [item.city || item.municipio, item.uf].filter(Boolean).join("/") || "Nao informado")}
        ${detailCard("Telefone", item.phone || "Nao informado")}
        ${detailCard("E-mail", item.email || "Nao informado")}
        ${detailCard("Contato principal", companyMainContact(item))}
        ${detailCard("Responsavel legal", companyLegalResponsible(item))}
        ${detailCard("Status", statusBadge(item.status))}
        ${detailCard("Fiscal responsavel", item.fiscal || "Nao informado")}
        ${detailCard("Fiscais adicionais", fiscalNames(item.fiscaisAdicionais))}
        ${detailCard("Observacoes", item.notes || item.observacoes || "Sem observacoes")}
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
          <thead><tr><th>Numero do contrato</th><th>Objeto/Escopo</th><th>Inicio</th><th>Termino</th><th>Status</th><th>Centro de custo</th><th>Gestor</th><th>Documentos</th><th>Acoes</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>${item.contract || "Nao informado"}</strong><span>${Number.isFinite(days) ? `${days} dia(s) restantes` : "Prazo nao informado"}</span></td>
              <td>${item.scope || item.objeto || "Prestacao de servicos terceirizados"}</td>
              <td>${formatDate(item.startDate)}</td>
              <td>${formatDate(item.endDate)}</td>
              <td>${statusBadge(item.status)}</td>
              <td>${employeeCostCenter({}, item)}</td>
              <td>${item.responsible || "Nao informado"}</td>
              <td>${companyDocuments(company.id).length}</td>
              <td><div class="actions wrap"><button class="btn secondary compact" type="button" data-company-contract-open>${icon("docs")} Abrir contrato</button>${can("edit.company", company) ? `<button class="btn warning compact" type="button" data-company-contract-close>Encerrar contrato</button>` : ""}</div></td>
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
          <thead><tr><th>Matricula/ID</th><th>Nome</th><th>CPF</th><th>Funcao</th><th>Status documental</th><th>Status contratacao</th><th>ASO</th><th>Treinamento</th><th>Acoes</th></tr></thead>
          <tbody>${employees.length ? employees.map((employee) => {
            const normalized = normalizeEmployee(employee);
            return `<tr><td>${employeeRegistration(normalized)}</td><td><strong>${normalized.name}</strong></td><td>${normalized.cpf}</td><td>${normalized.role}</td><td>${statusBadge(normalized.docStatus)}</td><td>${statusBadge(normalized.status)}</td><td>${formatDate(normalized.asoValidity)}</td><td>${formatDate(normalized.trainingValidity)}</td><td><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir FIT</button></td></tr>`;
          }).join("") : emptyRow(9)}</tbody>
        </table>
      </div>
    `;
  }
  if (tab === "docs") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Status</th><th>Validade</th><th>Responsavel pela analise</th><th>Anexar</th><th>Visualizar</th><th>Aprovar/Reprovar</th></tr></thead>
          <tbody>${documents.length ? documents.map((doc) => `<tr><td><strong>${doc.type}</strong><br><span class="muted">${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</span></td><td>${statusBadge(docStatus(doc))}</td><td>${formatDate(doc.dueDate)}${docStatus(doc) === "Vencido" ? `<br>${statusBadge("Vencido")}` : ""}</td><td>${documentOperationalSector(doc)}</td><td><span class="mini-pill">Preparado</span></td><td><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Visualizar</button></td><td>${documentRowActions(doc) || `<span class="mini-pill">Sem permissao</span>`}</td></tr>`).join("") : emptyRow(7)}</tbody>
        </table>
      </div>
    `;
  }
  if (tab === "safety" || tab === "medicine") {
    const safety = tab === "safety";
    const names = safety ? ["PGR", "PPR", "PPRA", "PCMAT"] : ["PCMSO", "PCA"];
    const related = documents.filter((doc) => names.some((name) => String(doc.type || "").toLowerCase().includes(name.toLowerCase())) || (safety ? documentOperationalSector(doc) === "EHS" : documentOperationalSector(doc) === "Medicina"));
    return `
      <div class="detail-grid">
        ${names.map((name) => detailCard(name, statusBadge(related.some((doc) => String(doc.type || "").toLowerCase().includes(name.toLowerCase())) ? "Aprovado" : "Pendente"))).join("")}
        ${detailCard("Anexos", related.length)}
        ${detailCard("Observacoes", safety ? "Controles de seguranca do trabalho e programas legais." : "Controles de medicina ocupacional e programas medicos.")}
      </div>
      ${renderEmployeeDocsTable(related, safety ? "Documentos de seguranca do trabalho" : "Documentos de medicina ocupacional")}
    `;
  }
  if (tab === "fiscalization") {
    const fiscalIds = [item.fiscalId, ...(item.fiscaisAdicionais || [])].filter(Boolean);
    const linkedFiscais = fiscalIds.map((id) => state.fiscais.find((fiscal) => fiscal.id === id)).filter(Boolean).map(normalizeFiscal);
    const pendingDocs = documents.filter((doc) => ["Pendente", "Reprovado", "Vencido", "A vencer"].includes(docStatus(doc)));
    return `
      <div class="detail-grid">
        ${detailCard("Fiscal principal", item.fiscal || "Nao informado")}
        ${detailCard("Fiscais vinculados", linkedFiscais.length ? linkedFiscais.map((fiscal) => fiscal.nome).join(", ") : "Nao informado")}
        ${detailCard("Gestor responsavel", item.responsible || "Nao informado")}
        ${detailCard("Pendencias fiscais", pendingDocs.filter((doc) => documentOperationalSector(doc) === "Fiscal").length)}
        ${detailCard("Observacoes", item.notes || item.observacoes || "Sem observacoes")}
        ${detailCard("Aprovacoes/Reprovacoes", documents.filter((doc) => ["Aprovado", "Reprovado"].includes(docStatus(doc))).length)}
      </div>
      ${renderHistoryTimeline("empresa", company.id)}
    `;
  }
  return `
    ${renderHistoryTimeline("empresa", company.id, [
      `<div class="item-card"><strong>Empresa cadastrada</strong><span class="muted">${item.name} - ${item.cnpj}</span></div>`,
      `<div class="item-card"><strong>Contrato atual</strong><span class="muted">${item.contract || "Nao informado"} - ${formatDate(item.startDate)} ate ${formatDate(item.endDate)}</span></div>`,
      `<div class="item-card"><strong>Funcionarios vinculados</strong><span class="muted">${employees.length} funcionario(s)</span></div>`,
      `<div class="item-card"><strong>Documentos vinculados</strong><span class="muted">${documents.length} documento(s)</span></div>`,
    ])}
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
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Contrato encerrado", scope: { companyId: company.id } }));
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
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const documents = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  const days = contractDays(item);
  const blockedEmployees = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado"));
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
      const companyEmployees = employees.filter((employee) => sameId(employee.companyId, company.id));
      const blocked = companyEmployees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado")).length;
      const approved = companyEmployees.filter((employee) => ["Liberado", "Aprovado"].some((status) => statusMatches(normalizeEmployee(employee).status, status))).length;
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
    ["Funcionarios bloqueados", employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado")).length, "bad"],
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
  const blockedCompanies = visibleCompanies().filter((company) => ["Bloqueada", "Bloqueado"].some((status) => statusMatches(normalizeCompany(company).status, status)));
  const blockedEmployees = visibleEmployees().filter((employee) => ["Bloqueado"].some((status) => statusMatches(normalizeEmployee(employee).status, status)));
  const baseItems = [
    ...blockedCompanies.map((company) => ({ ...company, blockType: "Empresa", blockName: company.name, blockCompanyId: company.id })),
    ...blockedEmployees.map((employee) => ({ ...employee, blockType: "Funcionario", blockName: employee.name, blockCompanyId: employee.companyId })),
  ];
  const filteredItems = filtered(baseItems, [
    (item) => item.blockName,
    (item) => item.cpf,
    (item) => employeeRegistration(item),
    (item) => companyName(item.blockCompanyId),
    (item) => state.companies.find((company) => sameId(company.id, item.blockCompanyId))?.contract,
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
          <div class="item-card"><strong>Armazenamento online</strong><span class="muted">Projeto Supabase oficial fixado em supabase-config.js.</span></div>
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

function isStorageDocumentPath(path) {
  const value = String(path || "").trim();
  return Boolean(value) && !/^(https?:|blob:|data:)/i.test(value);
}

function documentDownloadName(doc = {}) {
  const fallback = String(doc.filePath || doc.type || "documento").split("/").pop() || "documento";
  return fallback.replace(/[?#].*$/, "");
}

async function resolveDocumentAccessUrl(doc, expiresIn = 60) {
  const path = String(doc?.filePath || "").trim();
  if (!path) return { url: "", source: "empty" };
  if (!isStorageDocumentPath(path)) return { url: path, source: "direct" };
  const { data, error } = await supabaseClient.storage.from("documents").createSignedUrl(path, expiresIn);
  if (error) throw error;
  return { url: data?.signedUrl || "", source: "storage" };
}

async function downloadDocumentFile(url, fileName) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao baixar arquivo: HTTP ${response.status}`);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName || "documento";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }
}

async function openDocumentDetails(id, popupHandle = null) {
  const doc = visibleDocuments().find((item) => sameId(item.id, id)) || state.documents.find((item) => sameId(item.id, id));
  if (!doc) {
    console.error("[Documentos] Documento nao encontrado", { id });
    alert("Nao foi possivel abrir a ficha do documento. Documento nao encontrado.");
    return;
  }
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
          <div class="document-preview-shell">
            <div class="document-preview-actions">
              <button class="btn secondary compact" type="button" data-document-open disabled>${icon("docs")} Abrir arquivo</button>
              <button class="btn warning compact" type="button" data-document-download disabled>${icon("download")} Baixar arquivo</button>
            </div>
            <div class="document-preview-slot" data-document-preview-slot>${renderDocumentPreview(doc)}</div>
            <div class="document-preview-hint muted" data-document-preview-hint>Preparando link seguro do documento...</div>
          </div>
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
  const openButton = modal.querySelector("[data-document-open]");
  const downloadButton = modal.querySelector("[data-document-download]");
  const previewSlot = modal.querySelector("[data-document-preview-slot]");
  const previewHint = modal.querySelector("[data-document-preview-hint]");
  const setPreview = (url) => {
    if (!previewSlot) return;
    const lower = String(doc.filePath || "").toLowerCase();
    if (lower.endsWith(".pdf")) {
      previewSlot.innerHTML = `<iframe class="document-preview-frame" src="${escapeAttr(url)}" title="Preview PDF"></iframe>`;
      return;
    }
    if (/\.(png|jpg|jpeg|webp|gif)$/i.test(lower)) {
      previewSlot.innerHTML = `<img class="document-preview-image" src="${escapeAttr(url)}" alt="Preview do documento" />`;
      return;
    }
    previewSlot.innerHTML = `<div class="document-preview-empty">${icon("docs")}<strong>Arquivo pronto para visualizacao</strong><span>${escapeHtml(doc.filePath || "Documento armazenado")}</span><small>Use os botoes acima para abrir ou baixar o arquivo.</small></div>`;
  };
  (async () => {
    try {
      const access = await resolveDocumentAccessUrl(doc, 60);
      if (!access.url) {
        if (previewHint) previewHint.textContent = "Nenhum arquivo vinculado ao documento.";
        return;
      }
      if (previewHint) previewHint.textContent = access.source === "storage" ? "Link seguro gerado pelo Supabase Storage." : "Arquivo localizado via URL direta.";
      setPreview(access.url);
      if (openButton) {
        openButton.disabled = false;
        openButton.dataset.documentUrl = access.url;
      }
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.dataset.documentUrl = access.url;
      }
      if (popupHandle && !popupHandle.closed) {
        popupHandle.location = access.url;
        popupHandle.focus();
      }
    } catch (error) {
      console.error("[Documentos] Falha ao preparar acesso ao arquivo", { id: doc.id, filePath: doc.filePath, error });
      if (previewHint) previewHint.textContent = "Nao foi possivel gerar o link seguro do arquivo.";
      if (previewSlot) previewSlot.innerHTML = `<div class="document-preview-empty">${icon("docs")}<strong>Arquivo sem preview seguro</strong><span>${escapeHtml(doc.filePath || "Caminho nao informado")}</span><small>Confira se o bucket documents e a policy de leitura estao disponiveis.</small></div>`;
    }
  })();
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
  modal.addEventListener("click", async (event) => {
    const openFile = event.target.closest("[data-document-open]");
    if (openFile) {
      event.stopPropagation();
      const url = openFile.dataset.documentUrl;
      if (!url) {
        alert("O link seguro do arquivo ainda nao esta pronto.");
        return;
      }
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (!popup) {
        const hint = modal.querySelector("[data-document-preview-hint]");
        if (hint) {
          hint.innerHTML = `Popup bloqueado. Use este link: <a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">Abrir arquivo</a>`;
        }
      }
      return;
    }
    const downloadFile = event.target.closest("[data-document-download]");
    if (downloadFile) {
      event.stopPropagation();
      const url = downloadFile.dataset.documentUrl;
      if (!url) {
        alert("O link seguro do arquivo ainda nao esta pronto.");
        return;
      }
      try {
        await downloadDocumentFile(url, documentDownloadName(doc));
      } catch (error) {
        console.error("[Documentos] Falha ao baixar arquivo", { id: doc.id, filePath: doc.filePath, error });
        alert(`Nao foi possivel baixar o arquivo. ${persistenceMessage(error)}`);
      }
    }
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
  const raw = String(status || "").trim();
  const docLabel = normalizeDocumentStatusLabel(raw);
  const hireLabel = normalizeHiringStatusLabel(raw);
  const normalized = [
    "Pendente",
    "Em análise",
    "Aprovado",
    "Reprovado",
    "Vencido",
    "Aprovado com pendência",
    "A vencer",
  ].includes(docLabel)
    ? docLabel
    : hireLabel;
  const kind = {
    Aprovado: "ok",
    "Aprovado com pendência": "conditional",
    Ativa: "ok",
    Ativo: "ok",
    Liberado: "ok",
    Integrado: "ok",
    Conectado: "ok",
    Estatico: "ok",
    "Em análise": "analysis",
    "Em análise documental": "analysis",
    "A vencer": "warn",
    Pendente: "warn",
    "Aguardando medicina": "exams",
    "Aguardando EHS/RH": "training",
    "Aguardando patrimonial": "fiscal",
    "Desmobilização solicitada": "warn",
    "Pendente Documentação": "warn",
    "Pendente Medicina": "warn",
    "Pendente EHS": "warn",
    "Pendente Patrimonial": "warn",
    "Aguardando Correção": "analysis",
    "Ativo com pendência": "analysis",
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
  }[normalized] || "info";
  return `<span class="status ${kind}">${escapeHtml(normalized)}</span>`;
}

function statusClass(status) {
  const raw = String(status || "").trim();
  const docLabel = normalizeDocumentStatusLabel(raw);
  const hireLabel = normalizeHiringStatusLabel(raw);
  const normalized = [
    "Pendente",
    "Em análise",
    "Aprovado",
    "Reprovado",
    "Vencido",
    "Aprovado com pendência",
    "A vencer",
  ].includes(docLabel)
    ? docLabel
    : hireLabel;
  return {
    Aprovado: "ok",
    "Aprovado com pendência": "conditional",
    Ativa: "ok",
    Ativo: "ok",
    Liberado: "ok",
    Pendente: "warn",
    "A vencer": "warn",
    "Em análise": "analysis",
    "Em análise documental": "analysis",
    Reprovado: "bad",
    "Pendente Documentação": "warn",
    "Pendente Medicina": "warn",
    "Pendente EHS": "warn",
    "Pendente Patrimonial": "warn",
    "Aguardando Correção": "analysis",
    "Ativo com pendência": "analysis",
    Vencido: "bad",
    Bloqueado: "bad",
    Bloqueada: "bad",
    "Aguardando medicina": "exams",
    "Aguardando EHS/RH": "training",
    "Aguardando patrimonial": "fiscal",
    "Desmobilização solicitada": "warn",
    Inativo: "bad",
    Encerrado: "bad",
    Desmobilizado: "bad",
    Desmobilizada: "bad",
  }[normalized] || "info";
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
      if (button.dataset.create === "contract") {
        currentView = "companies";
        editingCompanyId = null;
        searchTerm = "";
        render();
        return;
      }
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
      console.log("Abrir FIT", item.dataset.employeeRecord);
      openEmployeeRecord(item.dataset.employeeRecord);
    });
  });

  document.querySelectorAll("[data-document-detail]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Ver ficha", item.dataset.documentDetail);
      const popup = window.open("", "_blank", "noopener,noreferrer");
      openDocumentDetails(item.dataset.documentDetail, popup);
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
    button.addEventListener("click", () => {
      const label = {
        demobilize: "Desmobilizar",
        inactivate: "Inativar",
        block: "Bloquear",
      }[button.dataset.employeeAction] || button.dataset.employeeAction;
      console.log(label, button.dataset.id);
      updateEmployeeOperationalStatus(button.dataset.id, button.dataset.employeeAction);
    });
  });

  document.querySelectorAll("[data-doc-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.dataset.docStatus === "Aprovado" ? "Aprovar documento" : "Reprovar documento";
      console.log(label, button.dataset.id);
      updateDocumentStatus(button.dataset.id, button.dataset.docStatus);
    });
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

  document.querySelector("#companyEditorForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = event.currentTarget.querySelector("button[type='submit']");
    if (submit?.disabled) return;
    if (submit) submit.disabled = true;
    try {
      await saveCompanyFromForm(new FormData(event.currentTarget));
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  document.querySelector("#fiscalQuickForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveFiscalFromForm(new FormData(event.currentTarget));
  });

  document.querySelectorAll("[data-fiscal-access]").forEach((button) => {
    button.addEventListener("click", () => {
      const fiscal = state.fiscais.find((item) => sameId(item.id, button.dataset.fiscalAccess));
      if (!fiscal) return;
      createAccessForFiscal(fiscal).catch((error) => alert(`Nao foi possivel criar acesso.\n\n${persistenceMessage(error)}`));
    });
  });

  document.querySelectorAll("[data-fiscal-inactivate]").forEach((button) => {
    button.addEventListener("click", () => inactivateFiscal(button.dataset.fiscalInactivate));
  });

  document.querySelector("#employeeEditorForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = event.currentTarget.querySelector("button[type='submit']");
    if (submit?.disabled) return;
    if (submit) submit.disabled = true;
    try {
      await saveEmployeeFromForm(new FormData(event.currentTarget));
    } finally {
      if (submit) submit.disabled = false;
    }
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
  root.querySelectorAll("[data-mask='cnpj']").forEach((input) => {
    input.value = formatCnpj(input.value);
    input.addEventListener("input", () => {
      input.value = formatCnpj(input.value);
    });
  });
  root.querySelectorAll("[data-mask='cpf']").forEach((input) => {
    input.value = formatCpf(input.value);
    input.addEventListener("input", () => {
      input.value = formatCpf(input.value);
    });
  });
  root.querySelectorAll("[data-mask='phone']").forEach((input) => {
    input.value = formatPhone(input.value);
    input.addEventListener("input", () => {
      input.value = formatPhone(input.value);
    });
  });
  root.querySelectorAll("[data-mask='cep']").forEach((input) => {
    input.value = formatCep(input.value);
    input.addEventListener("input", () => {
      input.value = formatCep(input.value);
    });
  });
}

function bindEmployeeCompanyContractSync(root = document) {
  root.querySelectorAll("form").forEach((form) => {
    const companySelect = form.querySelector("[name='companyId']");
    const contractInput = form.querySelector("[name='contract']");
    if (!companySelect || !contractInput) return;
    const costCenterInput = form.querySelector("[name='costCenter']");
    const fiscalInput = form.querySelector("[name='companyFiscal']");
    const managerInput = form.querySelector("[name='contractManager']");
    const syncFromCompany = () => {
      const company = state.companies.find((item) => sameId(item.id, companySelect.value));
      if (!company) return;
      contractInput.value = company.contract || contractInput.value || "";
      if (costCenterInput) costCenterInput.value = company.costCenter || company.contract || costCenterInput.value || "";
      if (fiscalInput) fiscalInput.value = company.fiscal || fiscalInput.value || "";
      if (managerInput) managerInput.value = company.manager || company.responsible || managerInput.value || "";
    };
    companySelect.addEventListener("change", syncFromCompany);
    syncFromCompany();
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
  bindInputMasks(modal);
  bindEmployeeCompanyContractSync(modal);
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
  const item = state.companies.find((company) => sameId(company.id, id)) || {};
  return {
    title: id ? "Editar empresa" : "Nova empresa",
    fields: [
      inputField("name", "Razao social", item.name, "required"),
      inputField("cnpj", "CNPJ", item.cnpj, "required inputmode='numeric' maxlength='18' data-mask='cnpj' placeholder='00.000.000/0000-00'"),
      inputField("contract", "Numero do contrato", item.contract, "required"),
      inputField("costCenter", "Centro de custo padrao", item.costCenter || "", "required"),
      inputField("fiscal", "Fiscal do contrato", item.fiscal, "required"),
      inputField("manager", "Gestor do contrato", item.manager || item.responsible || item.contact, "required"),
      inputField("email", "E-mail", item.email, "type='email'"),
      inputField("phone", "Telefone", item.phone, "required inputmode='numeric' maxlength='15' data-mask='phone' placeholder='(00) 00000-0000'"),
      inputField("cep", "CEP", item.cep || "", "inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
      inputField("startDate", "Data de inicio", item.startDate, "type='date'"),
      inputField("endDate", "Data de fim", item.endDate, "type='date'"),
      selectField("status", "Status", item.status || "Ativa", ["Ativa", "Pendente", "Inativa", "Desmobilizada"].map(option)),
    ],
    save(form) {
      const validation = validateCompanyRegistration({
        id,
        cnpj: form.get("cnpj"),
        phone: form.get("phone"),
        cep: form.get("cep"),
      });
      if (!validation.ok) {
        alert(validation.message);
        return;
      }
      const previous = state.companies.find((company) => sameId(company.id, id));
      const isSupplier = currentUser()?.role === "supplier";
      const manager = String(form.get("manager") || "").trim();
      const costCenter = String(form.get("costCenter") || "").trim();
      if (!String(form.get("contract") || "").trim()) {
        alert("Informe o numero do contrato.");
        return;
      }
      if (!costCenter) {
        alert("Informe o centro de custo padrao da empresa.");
        return;
      }
      if (!manager) {
        alert("Informe o gestor do contrato.");
        return;
      }
      upsert("companies", id, {
        name: form.get("name"),
        cnpj: validation.cnpj,
        contract: form.get("contract"),
        costCenter: isSupplier && previous ? previous.costCenter || costCenter : costCenter,
        fiscal: isSupplier && previous ? previous.fiscal || form.get("fiscal") : form.get("fiscal"),
        manager: isSupplier && previous ? previous.manager || previous.responsible || manager : manager,
        responsible: isSupplier && previous ? previous.responsible || manager : manager,
        contact: isSupplier && previous ? previous.contact || manager : manager,
        email: form.get("email"),
        phone: validation.phone,
        cep: validation.cep,
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
        risk: "Medio",
        status: form.get("status"),
      });
    },
  };
}

function employeeForm(id) {
  const item = state.employees.find((employee) => sameId(employee.id, id)) || {};
  const role = currentUser()?.role || "visitor";
  const canEditOperationalLink = ["admin", "fiscal"].includes(role);
  const linkedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, item.companyId)) || {});
  const docs = employeeDocsFor(item);
  const documentStatus = calculateDocumentStatus(item, docs);
  const hiringStatus = calculateHiringStatus(item, docs, documentStatus);
  return {
    title: id ? "Editar funcionario" : "Novo funcionario",
    fields: [
      inputField("name", "Nome completo", item.name, "required"),
      selectField("companyId", "Empresa", item.companyId || state.companies[0]?.id, state.companies.map((company) => ({ value: company.id, label: company.name }))),
      inputField("role", "Cargo", item.role, "required"),
      inputField("cpf", "CPF", item.cpf, "required inputmode='numeric' maxlength='14' data-mask='cpf' placeholder='000.000.000-00'"),
      inputField("contract", "Numero do contrato", item.contract || linkedCompany.contract || "", `${canEditOperationalLink ? "" : "readonly"} required`),
      inputField("costCenter", "Centro de custo", item.costCenter || linkedCompany.costCenter || linkedCompany.contract || "", canEditOperationalLink ? "required" : "required readonly"),
      inputField("companyFiscal", "Fiscal da empresa", item.companyFiscal || linkedCompany.fiscal || "", canEditOperationalLink ? "" : "readonly"),
      inputField("contractManager", "Gestor do contrato", item.contractManager || linkedCompany.manager || linkedCompany.responsible || "", canEditOperationalLink ? "" : "readonly"),
      inputField("asoValidity", "Validade de ASO", item.asoValidity || today(), "type='date'"),
      inputField("trainingValidity", "Validade de treinamento", item.trainingValidity || today(), "type='date'"),
      inputField("docStatus", "Status documental", documentStatus, "readonly"),
      inputField("status", "Status de contratacao", hiringStatus, "readonly"),
      textAreaField("address", "Endereco", item.address),
      textAreaField("notes", "Observacoes", item.notes),
    ],
    save(form) {
      const validation = validateEmployeeRegistration({
        id,
        cpf: form.get("cpf"),
      });
      if (!validation.ok) {
        alert(validation.message);
        return;
      }
      const selectedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, form.get("companyId"))) || {});
      const resolvedCostCenter = canEditOperationalLink ? form.get("costCenter") : selectedCompany.costCenter || selectedCompany.contract || "";
      const resolvedFiscal = canEditOperationalLink ? form.get("companyFiscal") : selectedCompany.fiscal || "";
      const resolvedManager = canEditOperationalLink ? form.get("contractManager") : selectedCompany.manager || selectedCompany.responsible || "";
      const resolvedContract = form.get("contract") || selectedCompany.contract || "";
      const nextDocStatus = calculateDocumentStatus({ ...item, name: form.get("name"), companyId: form.get("companyId"), role: form.get("role"), cpf: validation.cpf, asoValidity: form.get("asoValidity"), trainingValidity: form.get("trainingValidity"), notes: form.get("notes") }, employeeDocsFor({ ...item, id: id || item.id }));
      const nextHiringStatus = calculateHiringStatus({ ...item, name: form.get("name"), companyId: form.get("companyId"), role: form.get("role"), cpf: validation.cpf, asoValidity: form.get("asoValidity"), trainingValidity: form.get("trainingValidity"), notes: form.get("notes"), docStatus: nextDocStatus }, employeeDocsFor({ ...item, id: id || item.id }), nextDocStatus);
      upsert("employees", id, {
        name: form.get("name"),
        companyId: form.get("companyId"),
        role: form.get("role"),
        cpf: validation.cpf,
        contract: resolvedContract,
        costCenter: resolvedCostCenter,
        companyFiscal: resolvedFiscal,
        contractManager: resolvedManager,
        asoValidity: form.get("asoValidity"),
        trainingValidity: form.get("trainingValidity"),
        docStatus: nextDocStatus,
        address: form.get("address"),
        notes: form.get("notes"),
        status: nextHiringStatus,
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
        await persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Documento salvo", scope: { employeeId: saved.employeeId, companyId: saved.companyId } }));
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
  const companyExists = state.companies.some((company) => sameId(company.id, payload.companyId));
  if (!companyExists) {
    throw new PersistenceError("Falha em public.documents: empresa vinculada nao existe ou nao esta disponivel para o usuario atual.", {
      table: "public.documents",
      operation: "validacao de foreign key",
      hint: "company_id nao encontrado em public.companies.",
      payload,
    });
  }
  if (payload.employeeId) {
    const employee = state.employees.find((item) => sameId(item.id, payload.employeeId));
    if (!employee) {
      throw new PersistenceError("Falha em public.documents: funcionario vinculado nao existe.", {
        table: "public.documents",
        operation: "validacao de foreign key",
        hint: "employee_id nao encontrado em public.employees.",
        payload,
      });
    }
    if (!sameId(employee.companyId, payload.companyId)) {
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
  if (id && state[collection].some((item) => sameId(item.id, id))) {
    state[collection] = state[collection].map((item) => (sameId(item.id, id) ? { ...item, ...data } : item));
    return state[collection].find((item) => sameId(item.id, id));
  } else {
    const item = { id: id || crypto.randomUUID(), ...data };
    state[collection].push(item);
    return item;
  }
}

async function saveCompanyFromForm(form) {
  const id = form.get("id") || null;
  const validation = validateCompanyRegistration({
    id,
    cnpj: form.get("cnpj"),
    phone: form.get("phone"),
    cep: form.get("cep"),
  });
  if (!validation.ok) {
    alert(validation.message);
    return;
  }
  const previous = state.companies.find((company) => sameId(company.id, id));
  const previousStatus = previous?.status || "";
  const quickFiscal = createQuickFiscalFromCompanyForm(form);
  const selectedFiscalId = quickFiscal?.id || optionalNull(form.get("fiscalId"));
  const selectedFiscal = selectedFiscalId ? state.fiscais.find((fiscal) => sameId(fiscal.id, selectedFiscalId)) : null;
  const fiscalName = selectedFiscal?.nome || String(form.get("fiscal") || "").trim();
  const additionalFiscalIds = form.getAll("fiscaisAdicionais").filter(Boolean).filter((fiscalId) => fiscalId !== selectedFiscalId);
  const manager = String(form.get("manager") || form.get("responsible") || "").trim();
  const contractNumber = String(form.get("contract") || "").trim();
  const costCenter = String(form.get("costCenter") || "").trim();
  if (!contractNumber) {
    alert("Informe o numero do contrato.");
    return;
  }
  if (!costCenter) {
    alert("Informe o centro de custo padrao da empresa.");
    return;
  }
  if (!manager) {
    alert("Informe o gestor do contrato.");
    return;
  }
  const isSupplier = currentUser()?.role === "supplier";
  const effectiveFiscalId = isSupplier && previous ? previous.fiscalId || null : selectedFiscalId;
  const effectiveFiscal = isSupplier && previous ? previous.fiscal || fiscalName : fiscalName;
  const effectiveAdditionalFiscais = isSupplier && previous ? previous.fiscaisAdicionais || [] : additionalFiscalIds;
  const effectiveManager = isSupplier && previous ? previous.manager || previous.responsible || manager : manager;
  const effectiveCostCenter = isSupplier && previous ? previous.costCenter || costCenter : costCenter;
  const saved = upsert("companies", id, {
    name: form.get("name"),
    cnpj: validation.cnpj,
    fiscal: effectiveFiscal,
    fiscalId: effectiveFiscalId,
    fiscaisAdicionais: effectiveAdditionalFiscais,
    manager: effectiveManager,
    responsible: effectiveManager,
    contact: effectiveManager,
    costCenter: effectiveCostCenter,
    phone: validation.phone,
    cep: validation.cep,
    email: form.get("email"),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    status: form.get("status"),
    contract: contractNumber,
    risk: "Medio",
  });
  if (quickFiscal) {
    recordFiscalHistory(quickFiscal, "Fiscal criado", "", quickFiscal.status, `Fiscal ${quickFiscal.nome} criado no cadastro rapido da empresa ${saved.name}.`);
    syncFiscalRecord(quickFiscal)
      .then((onlineFiscal) => {
        saved.fiscalId = onlineFiscal.id;
        saved.fiscal = onlineFiscal.nome;
        syncEmpresaFiscais(saved).catch((error) => console.warn("Nao foi possivel salvar vinculo empresa_fiscais.", error));
      })
      .catch((error) => console.warn("Nao foi possivel salvar fiscal online.", error));
  }
  if ((previous?.fiscalId || previous?.fiscal || "") !== (saved.fiscalId || saved.fiscal || "")) {
    const history = createHistoryEvent({
      entityType: "empresa",
      entityId: saved.id,
      action: "Troca de fiscal",
      previousStatus: previous?.fiscal || "",
      nextStatus: saved.fiscal || "",
      observation: `Fiscal principal da empresa ${saved.name} alterado.`,
    });
    state.historico = upsertById(state.historico, history);
    syncHistoryEvent(history);
  }
  saveState();
  try {
    const onlineSaved = await syncCollection("companies", saved);
    if (onlineSaved?.id && String(onlineSaved.id) !== String(saved.id)) {
      state.companies = state.companies.map((company) => (sameId(company.id, saved.id) ? { ...saved, ...onlineSaved } : company));
      state.employees = state.employees.map((employee) => (sameId(employee.companyId, saved.id) ? { ...employee, companyId: onlineSaved.id } : employee));
      state.documents = state.documents.map((doc) => (sameId(doc.companyId, saved.id) ? { ...doc, companyId: onlineSaved.id } : doc));
      saved.id = onlineSaved.id;
    }
  } catch (error) {
    console.error("Falha ao salvar empresa em public.companies", {
      tabela: "public.companies",
      payload: mapCompanyToDb(saved),
      error,
    });
    alert(`Nao foi possivel salvar empresa online: ${persistenceMessage(error)}`);
    return;
  }
  try {
    recordManualStatusHistory("empresa", saved.id, previousStatus, saved.status, `Empresa ${saved.name} salva pelo formulario.`);
    persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Empresa salva", scope: { companyId: saved.id } }));
  } catch (error) {
    console.warn("Empresa salva, mas uma rotina secundaria de historico/status falhou.", error);
  }
  saveState();
  editingCompanyId = null;
  render();
}

function createQuickFiscalFromCompanyForm(form) {
  const nome = String(form.get("novoFiscalNome") || "").trim();
  if (!nome) return null;
  const fiscal = normalizeFiscal({
    id: crypto.randomUUID(),
    nome,
    email: optionalText(form.get("novoFiscalEmail")),
    matricula: optionalText(form.get("novoFiscalMatricula")),
    telefone: optionalText(form.get("novoFiscalTelefone")),
    setor: optionalText(form.get("novoFiscalSetor")) || "Fiscalizacao",
    status: "sem_acesso",
    usuarioEmail: null,
    usuarioId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  state.fiscais = upsertById(state.fiscais || [], fiscal);
  return fiscal;
}

async function saveFiscalFromForm(form) {
  const fiscal = normalizeFiscal({
    id: crypto.randomUUID(),
    nome: form.get("nome"),
    email: form.get("email"),
    matricula: form.get("matricula"),
    telefone: form.get("telefone"),
    setor: form.get("setor"),
    status: form.get("status") || "sem_acesso",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  if (!fiscal.nome) {
    alert("Nome do fiscal e obrigatorio.");
    return;
  }
  state.fiscais = upsertById(state.fiscais || [], fiscal);
  recordFiscalHistory(fiscal, "Fiscal criado", "", fiscal.status, `Fiscal ${fiscal.nome} cadastrado na base de fiscais.`);
  try {
    const saved = await syncFiscalRecord(fiscal);
    state.fiscais = upsertById(state.fiscais || [], saved);
  } catch (error) {
    alert(`Nao foi possivel salvar fiscal online: ${error.message}`);
  }
  saveState();
  renderApp();
}

function inactivateFiscal(id) {
  const fiscal = state.fiscais.find((item) => sameId(item.id, id));
  if (!fiscal) return;
  const motivo = prompt(`Informe o motivo obrigatorio para inativar ${fiscal.nome}:`);
  if (!motivo || !motivo.trim()) {
    alert("Motivo obrigatorio. Fiscal nao foi inativado.");
    return;
  }
  const activeSubstitutes = state.fiscais.filter((item) => !sameId(item.id, id) && normalizeFiscal(item).status !== "inativo");
  const substituteText = activeSubstitutes.length
    ? activeSubstitutes.map((item, index) => `${index + 1}. ${normalizeFiscal(item).nome}`).join("\n")
    : "Nenhum substituto cadastrado.";
  const chosen = activeSubstitutes.length ? prompt(`Escolha o numero do substituto:\n${substituteText}`) : "";
  const substitute = activeSubstitutes[Number(chosen) - 1] || null;
  const previousStatus = fiscal.status;
  Object.assign(fiscal, {
    status: "inativo",
    dataFim: new Date().toISOString(),
    motivoInativacao: motivo.trim(),
    substitutoId: substitute?.id || null,
    updatedAt: new Date().toISOString(),
  });
  state.companies = state.companies.map((company) => {
    if (!sameId(company.fiscalId, fiscal.id)) return company;
    return { ...company, fiscalId: substitute?.id || null, fiscal: substitute?.nome || company.fiscal, fiscaisAdicionais: Array.from(new Set([...(company.fiscaisAdicionais || []), fiscal.id])) };
  });
  recordFiscalHistory(fiscal, "Fiscal inativado", previousStatus, "inativo", `Motivo: ${motivo.trim()}${substitute ? `. Substituto: ${substitute.nome}.` : "."}`);
  if (substitute) recordFiscalHistory(substitute, "Substituicao de fiscal", "", substitute.status, `Fiscal ${substitute.nome} definido como substituto de ${fiscal.nome}.`);
  syncCollection("fiscais", fiscal).catch((error) => alert(`Nao foi possivel atualizar fiscal online: ${error.message}`));
  Promise.all(state.companies.filter((company) => (company.fiscaisAdicionais || []).some((fiscalId) => sameId(fiscalId, fiscal.id)) || sameId(company.fiscalId, substitute?.id)).map((company) => syncCollection("companies", company).catch((error) => console.warn("Nao foi possivel atualizar empresa online.", error))));
  saveState();
  renderApp();
}

function recordFiscalHistory(entity, action, previousStatus, nextStatus, observation) {
  const history = createHistoryEvent({
    entityType: "fiscal",
    entityId: entity.id,
    action,
    previousStatus,
    nextStatus,
    observation,
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  return history;
}

async function saveEmployeeFromForm(form) {
  const id = form.get("id") || null;
  if (!form.get("companyId")) {
    alert("Selecione uma empresa vinculada para o funcionario.");
    return;
  }
  const validation = validateEmployeeRegistration({
    id,
    cpf: form.get("cpf"),
  });
  if (!validation.ok) {
    alert(validation.message);
    return;
  }
  const cpfDigits = validation.cpf;
  const cepDigits = onlyDigits(form.get("cep"));
  if (cepDigits.length !== 8) {
    alert("CEP invalido. Informe exatamente 8 numeros.");
    return;
  }
  const existing = state.employees.find((employee) => sameId(employee.id, id));
  const previousStatus = existing?.status || "";
  const linkedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, form.get("companyId"))) || {});
  const canEditFullEmployee =
    currentUser()?.role === "admin" ||
    currentUser()?.role === "fiscal" ||
    (currentUser()?.role === "supplier" && (!existing || existing.companyId === currentUser()?.companyId));
  const canEditOperationalLink = ["admin", "fiscal"].includes(currentUser()?.role);
  const resolvedContract = String(form.get("contract") || linkedCompany.contract || "").trim();
  const resolvedCostCenter = canEditOperationalLink
    ? String(form.get("costCenter") || linkedCompany.costCenter || linkedCompany.contract || "").trim()
    : String(linkedCompany.costCenter || linkedCompany.contract || "").trim();
  const resolvedFiscal = canEditOperationalLink
    ? String(form.get("companyFiscal") || linkedCompany.fiscal || "").trim()
    : String(linkedCompany.fiscal || "").trim();
  const resolvedManager = canEditOperationalLink
    ? String(form.get("contractManager") || linkedCompany.manager || linkedCompany.responsible || "").trim()
    : String(linkedCompany.manager || linkedCompany.responsible || "").trim();
  if (!resolvedContract) {
    alert("Contrato vinculado obrigatorio.");
    return;
  }
  if (!resolvedCostCenter) {
    alert("Centro de custo obrigatorio.");
    return;
  }
  if (!resolvedFiscal) {
    alert("Fiscal da empresa obrigatorio.");
    return;
  }
  if (!resolvedManager) {
    alert("Gestor do contrato obrigatorio.");
    return;
  }
  const payload = {
    name: form.get("name"),
    cpf: cpfDigits,
    registration: form.get("registration"),
    birthDate: form.get("birthDate"),
    motherName: form.get("motherName"),
    fatherName: form.get("fatherName"),
    role: form.get("role"),
    companyId: form.get("companyId"),
    contract: resolvedContract,
    costCenter: resolvedCostCenter,
    companyFiscal: resolvedFiscal,
    contractManager: resolvedManager,
    cep: cepDigits,
    city: form.get("city"),
    district: form.get("district"),
    street: form.get("street"),
    number: form.get("number"),
    complement: form.get("complement"),
    asoValidity: form.get("asoValidity"),
    trainingValidity: form.get("trainingValidity"),
    address: buildEmployeeAddressFromForm(form),
    notes: form.get("notes"),
  };
  const fiscalPayload = existing
    ? { ...existing, notes: form.get("notes") }
    : payload;
  const draft = { ...(canEditFullEmployee ? payload : fiscalPayload), id: id || existing?.id || crypto.randomUUID() };
  const linkedDocs = employeeDocsFor(draft);
  draft.docStatus = calculateDocumentStatus(draft, linkedDocs);
  draft.status = calculateHiringStatus(draft, linkedDocs, draft.docStatus);
  const saved = upsert("employees", id, draft);
  saveState();
  try {
    const onlineSaved = await syncCollection("employees", saved);
    if (onlineSaved?.id && String(onlineSaved.id) !== String(saved.id)) {
      state.employees = state.employees.map((employee) => (sameId(employee.id, saved.id) ? { ...saved, ...onlineSaved } : employee));
      state.documents = state.documents.map((doc) => (sameId(doc.employeeId, saved.id) ? { ...doc, employeeId: onlineSaved.id } : doc));
      saved.id = onlineSaved.id;
    }
  } catch (error) {
    console.error("Falha ao salvar funcionario em public.employees", {
      tabela: "public.employees",
      payload: mapEmployeeToDb(saved),
      error,
    });
    alert(`Nao foi possivel salvar funcionario online: ${persistenceMessage(error)}`);
    return;
  }
  try {
    recordManualStatusHistory("funcionario", saved.id, previousStatus, saved.status, `Funcionario ${saved.name} salvo pelo formulario.`);
    persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Funcionario salvo", scope: { employeeId: saved.id, companyId: saved.companyId } }));
  } catch (error) {
    console.warn("Funcionario salvo, mas uma rotina secundaria de historico/status falhou.", error);
  }
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
  const employee = state.employees.find((item) => sameId(item.id, id));
  if (!employee) return;
  if (!can("updateHiringStatus", employee)) {
    alert("Seu perfil nao possui permissao para alterar o status deste funcionario.");
    return;
  }

  const actions = {
    demobilize: { label: "desmobilizar", status: "Desmobilizado", historyStatus: "Desmobilização" },
    inactivate: { label: "inativar", status: "Inativo", historyStatus: "Inativação" },
    block: { label: "bloquear", status: "Bloqueado", historyStatus: "Bloqueio" },
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
      employee.status = "Desmobilização solicitada";
      const history = createHistoryEvent({
        entityType: "funcionario",
        entityId: employee.id,
        action: "Desmobilizacao solicitada",
        previousStatus,
        nextStatus: employee.status,
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
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Acao operacional de funcionario", scope: { employeeId: employee.id, companyId: employee.companyId } }));
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
  const doc = state.documents.find((item) => sameId(item.id, id));
  if (!doc) {
    console.error("[Documentos] Documento nao encontrado para atualizar status", { id, status });
    alert("Nao foi possivel alterar o status. Documento nao encontrado.");
    return;
  }
  if (!can("approveDocuments", doc)) return;
  const isRejection = status === "Reprovado";
  let rejectionReason = "";
  if (isRejection) {
    rejectionReason = prompt(`Informe o motivo obrigatorio para reprovar o documento ${doc.type}:`);
    if (!rejectionReason || !rejectionReason.trim()) {
      alert("Motivo obrigatorio. A reprovacao nao foi salva.");
      return;
    }
  }
  const previous = structuredClone(doc);
  const previousStatus = doc.status || "";
  doc.status = status;
  const visibleNotes = documentVisibleNotes(doc);
  const rejectionLine = isRejection ? `[${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date())}] ${currentUser()?.name || currentUser()?.email || "Sistema"}: Reprovado. Motivo: ${rejectionReason.trim()}` : "";
  doc.notes = [visibleNotes, rejectionLine].filter(Boolean).join("\n");
  doc.auditTrail = [
    ...documentAuditTrail(previous),
    {
      at: new Date().toISOString(),
      user: currentUser()?.email || currentUser()?.name || "Sistema",
      action: "Status atualizado",
      sector: "Fiscal",
      status,
      comment: `${roleName(currentUser().role)} marcou documento como ${status.toLowerCase()}.${isRejection ? ` Motivo: ${rejectionReason.trim()}` : ""}`,
    },
  ];
  const history = createHistoryEvent({
    entityType: "documento",
    entityId: doc.id,
    action: "Status documental",
    previousStatus,
    nextStatus: status,
    observation: isRejection ? `Status alterado manualmente para ${status}. Motivo: ${rejectionReason.trim()}` : `Status alterado manualmente para ${status}`,
  });
  state.historico = upsertById(state.historico, history);
  syncCollection("documents", doc).catch((error) => {
    logPersistenceError(error, { table: "public.documents", operation: "atualizar status" });
    alert(`Nao foi possivel atualizar online.\n\n${persistenceMessage(error)}`);
  });
  syncHistoryEvent(history);
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Status documental atualizado", scope: { employeeId: doc.employeeId, companyId: doc.companyId } }));
  saveState();
  render();
  alert(`Documento ${status.toLowerCase()} com sucesso.`);
}

function demobilizeCompany(id) {
  const company = state.companies.find((item) => sameId(item.id, id));
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
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Contrato desmobilizado", scope: { companyId: company.id } }));
  saveState();
  render();
}

function removeItem(type, id) {
  if (type === "company") {
    alert("Empresas nao sao excluidas fisicamente. Use Desmobilizar para preservar o historico.");
    demobilizeCompany(id);
    return;
  }
  if (type === "contract") {
    alert("Contratos nao sao excluidos fisicamente. Use Encerrar ou Desmobilizar para preservar o historico.");
    return;
  }
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
  if (type === "employee") {
    state.documents = state.documents.map((doc) => (sameId(doc.employeeId, id) ? { ...doc, employeeId: "" } : doc));
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
  const fiscal = company.fiscalId ? state.fiscais?.find((item) => item.id === company.fiscalId) : null;
  return {
    ...company,
    fiscalId: company.fiscalId || company.fiscal_id || null,
    fiscaisAdicionais: company.fiscaisAdicionais || company.fiscais_adicionais || [],
    fiscal: fiscal?.nome || company.fiscal || "Nao informado",
    manager: company.manager || company.gestorContrato || company.responsible || company.contact || "Nao informado",
    responsible: company.responsible || company.contact || "Nao informado",
    costCenter: company.costCenter || company.centro_custo || "",
    cep: company.cep || "",
    startDate: company.startDate || "",
    endDate: company.endDate || "",
    status: company.status || "Ativa",
  };
}

function normalizeFiscal(fiscal = {}) {
  const now = new Date().toISOString();
  return {
    id: fiscal.id || crypto.randomUUID(),
    nome: String(fiscal.nome || fiscal.name || "").trim(),
    email: String(fiscal.email || "").trim().toLowerCase(),
    matricula: String(fiscal.matricula || fiscal.registration || "").trim(),
    telefone: String(fiscal.telefone || fiscal.phone || "").trim(),
    setor: String(fiscal.setor || fiscal.sector || "Fiscalizacao").trim(),
    status: fiscalStatuses.includes(fiscal.status) ? fiscal.status : "sem_acesso",
    ativo: fiscal.ativo ?? fiscal.active ?? fiscal.status !== "inativo",
    usuarioEmail: fiscal.usuarioEmail || fiscal.usuario_email || null,
    usuarioId: fiscal.usuarioId || fiscal.usuario_id || null,
    authUserId: fiscal.authUserId || fiscal.auth_user_id || null,
    dataFim: fiscal.dataFim || fiscal.data_fim || null,
    motivoInativacao: fiscal.motivoInativacao || fiscal.motivo_inativacao || "",
    substitutoId: fiscal.substitutoId || fiscal.substituto_id || null,
    createdAt: fiscal.createdAt || fiscal.created_at || now,
    updatedAt: fiscal.updatedAt || fiscal.updated_at || now,
  };
}

function normalizeEmployee(employee) {
  const meta = employeeMeta(employee);
  const linkedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, employee.companyId || meta.companyId)) || {});
  const docs = employeeDocsFor(employee);
  const documentStatus = calculateDocumentStatus(employee, docs);
  const hiringStatus = calculateHiringStatus(employee, docs, documentStatus);
  return {
    ...employee,
    registration: employee.registration || employee.matricula || meta.registration || "",
    cpf: formatCpf(employee.cpf || ""),
    birthDate: employee.birthDate || employee.birth_date || meta.birthDate || "",
    motherName: employee.motherName || employee.mother_name || meta.motherName || "",
    fatherName: employee.fatherName || employee.father_name || meta.fatherName || "",
    role: employee.role || "",
    companyId: employee.companyId || state.companies[0]?.id || "",
    contract: employee.contract || meta.contract || linkedCompany.contract || "",
    costCenter: employee.costCenter || employee.centroCusto || meta.costCenter || linkedCompany.costCenter || linkedCompany.contract || "",
    companyFiscal: employee.companyFiscal || meta.companyFiscal || linkedCompany.fiscal || "",
    contractManager: employee.contractManager || meta.contractManager || linkedCompany.manager || linkedCompany.responsible || "",
    cep: formatCep(employee.cep || meta.cep || ""),
    city: employee.city || meta.city || "",
    district: employee.district || employee.bairro || meta.district || "",
    street: employee.street || employee.rua || meta.street || "",
    number: employee.number || employee.numero || meta.number || "",
    complement: employee.complement || employee.complemento || meta.complement || "",
    asoValidity: employee.asoValidity || employee.admission || "",
    trainingValidity: employee.trainingValidity || "",
    docStatus: normalizeDocumentStatusLabel(employee.docStatus || documentStatus),
    address: employee.address || "",
    notes: employeeVisibleNotes(employee),
    workflowActions: employee.workflowActions || meta.workflowActions || {},
    status: normalizeHiringStatusLabel(employee.status || hiringStatus),
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
    companyFiscal: item.companyFiscal || "",
    contractManager: item.contractManager || "",
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
    authUserId: profile.auth_user_id || profile.authUserId || null,
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
  if (user.authUserId || user.auth_user_id) payload.auth_user_id = user.authUserId || user.auth_user_id;
  if (includeId && isNumericDbId(user.id)) payload.id = Number(user.id);
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
    fiscalId: company.fiscal_id,
    fiscaisAdicionais: company.fiscais_adicionais || [],
    tradeName: company.nome_fantasia,
    companyCode: company.codigo_empresa,
    branchCode: company.codigo_filial,
    costCenter: company.centro_custo,
    cep: company.cep || "",
    address: company.endereco,
    city: company.municipio,
    uf: company.uf,
    contact: company.contato_principal || company.responsible,
    legalResponsible: company.responsavel_legal,
    notes: company.observacoes,
    manager: company.responsible,
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
  const payload = {
    name: item.name,
    cnpj: item.cnpj,
    fiscal: item.fiscal,
    fiscal_id: isNumericDbId(item.fiscalId) ? Number(item.fiscalId) : null,
    fiscais_adicionais: item.fiscaisAdicionais || [],
    responsible: item.responsible,
    phone: item.phone,
    email: item.email,
    start_date: item.startDate || null,
    end_date: item.endDate || null,
    status: item.status,
    contract_number: item.contract || null,
    risk: item.risk || "Medio",
    nome_fantasia: companyTradeName(item) === item.name ? null : companyTradeName(item),
    codigo_empresa: companyCode(item) === item.id ? null : companyCode(item),
    codigo_filial: companyBranchCode(item) === "Nao informado" ? null : companyBranchCode(item),
    centro_custo: employeeCostCenter({}, item) || null,
    endereco: companyAddress(item) === "Nao informado" ? null : companyAddress(item),
    municipio: item.city || item.municipio || null,
    uf: item.uf || null,
    contato_principal: companyMainContact(item) === "Nao informado" ? null : companyMainContact(item),
    responsavel_legal: companyLegalResponsible(item) === "Nao informado" ? null : companyLegalResponsible(item),
    observacoes: item.notes || item.observacoes || null,
  };
  if (isNumericDbId(item.id)) payload.id = Number(item.id);
  return payload;
}

function mapFiscalFromDb(fiscal) {
  return normalizeFiscal({
    id: fiscal.id,
    nome: fiscal.nome,
    email: fiscal.email,
    matricula: fiscal.matricula,
    telefone: fiscal.telefone,
    setor: fiscal.setor,
    status: fiscal.status,
    ativo: fiscal.ativo,
    usuarioEmail: fiscal.usuario_email,
    usuarioId: fiscal.usuario_id,
    authUserId: fiscal.auth_user_id,
    dataFim: fiscal.data_fim,
    motivoInativacao: fiscal.motivo_inativacao,
    substitutoId: fiscal.substituto_id,
    createdAt: fiscal.created_at,
    updatedAt: fiscal.updated_at,
  });
}

function mapFiscalToDb(fiscal) {
  const item = normalizeFiscal(fiscal);
  const payload = {
    nome: item.nome,
    setor: item.setor || null,
    matricula: item.matricula || null,
    ativo: Boolean(item.status !== "inativo" && item.ativo !== false),
  };
  if (isNumericDbId(item.id)) payload.id = Number(item.id);
  if (isNumericDbId(item.usuarioId)) payload.usuario_id = Number(item.usuarioId);
  if (isUuid(item.authUserId)) payload.auth_user_id = item.authUserId;
  if ("email" in item) payload.email = item.email || null;
  if ("telefone" in item) payload.telefone = item.telefone || null;
  if ("status" in item) payload.status = item.status;
  if (item.dataFim) payload.data_fim = item.dataFim;
  if (item.motivoInativacao) payload.motivo_inativacao = item.motivoInativacao;
  if (isNumericDbId(item.substitutoId)) payload.substituto_id = Number(item.substitutoId);
  return payload;
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
    contractManager: employee.contract_manager || employee.gestor_contrato || employee.manager || employee.gestor || employee.responsavel,
    companyFiscal: employee.company_fiscal || employee.fiscal_empresa || "",
    exceptionReason: employee.exception_reason || employee.motivo,
    exceptionDeadline: employee.exception_deadline || employee.prazo,
  });
}

function mapEmployeeToDb(employee) {
  const item = normalizeEmployee(employee);
  const payload = {
    name: item.name,
    cpf: onlyDigits(item.cpf),
    job_role: item.role,
    company_id: isNumericDbId(item.companyId) ? Number(item.companyId) : item.companyId,
    aso_validity: item.asoValidity || null,
    training_validity: item.trainingValidity || null,
    document_status: item.docStatus,
    address: item.address,
    notes: serializeEmployeeNotes(item),
    hiring_status: item.status,
  };
  if (isNumericDbId(item.id)) payload.id = Number(item.id);
  return payload;
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
  const payload = {
    company_id: isNumericDbId(doc.companyId) ? Number(doc.companyId) : doc.companyId,
    employee_id: isNumericDbId(doc.employeeId) ? Number(doc.employeeId) : null,
    type: doc.type,
    due_date: doc.dueDate || null,
    status: doc.status,
    notes: serializeDocumentNotes(doc),
    file_path: doc.filePath || null,
  };
  if (isNumericDbId(doc.id)) payload.id = Number(doc.id);
  return payload;
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

function fiscalStatusLabel(status) {
  return {
    sem_acesso: "Sem acesso",
    com_acesso: "Com acesso",
    inativo: "Inativo",
  }[status] || "Sem acesso";
}

function companyName(id) {
  return state.companies.find((company) => sameId(company.id, id))?.name || "Nao informado";
}

function fiscalNames(ids = []) {
  const names = ids
    .map((id) => state.fiscais.find((fiscal) => sameId(fiscal.id, id)))
    .filter(Boolean)
    .map((fiscal) => normalizeFiscal(fiscal).nome);
  return names.length ? names.join(", ") : "Nenhum";
}

function employeeName(id) {
  return state.employees.find((employee) => sameId(employee.id, id))?.name || "Nao informado";
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

function formatCnpj(value = "") {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}

function formatPhone(value = "") {
  const digits = onlyDigits(value).slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidCpf(value = "") {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
  const calcDigit = (slice, factor) => {
    let total = 0;
    for (let i = 0; i < slice.length; i += 1) total += Number(slice[i]) * (factor - i);
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  const first = calcDigit(digits.slice(0, 9), 10);
  const second = calcDigit(digits.slice(0, 10), 11);
  return first === Number(digits[9]) && second === Number(digits[10]);
}

function isValidCnpj(value = "") {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || /^(\d)\1+$/.test(digits)) return false;
  const calcDigit = (base, factors) => {
    const total = base.split("").reduce((sum, digit, index) => sum + Number(digit) * factors[index], 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  const first = calcDigit(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = calcDigit(digits.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return first === Number(digits[12]) && second === Number(digits[13]);
}

function validateCompanyRegistration({ id = null, cnpj = "", phone = "", cep = "" } = {}) {
  const cnpjDigits = onlyDigits(cnpj);
  const phoneDigits = onlyDigits(phone);
  const cepDigits = onlyDigits(cep);
  if (cnpjDigits.length !== 14 || !isValidCnpj(cnpjDigits)) {
    return { ok: false, message: "CNPJ invalido. Use o formato 00.000.000/0000-00." };
  }
  const duplicated = state.companies.some((company) => !sameId(company.id, id) && onlyDigits(company.cnpj || "") === cnpjDigits);
  if (duplicated) {
    return { ok: false, message: "CNPJ ja cadastrado para outra empresa." };
  }
  if (phoneDigits.length !== 11) {
    return { ok: false, message: "Telefone incompleto. Use o formato (00) 00000-0000." };
  }
  if (cepDigits && cepDigits.length !== 8) {
    return { ok: false, message: "CEP invalido. Use o formato 00000-000." };
  }
  return {
    ok: true,
    cnpj: formatCnpj(cnpjDigits),
    phone: formatPhone(phoneDigits),
    cep: cepDigits ? formatCep(cepDigits) : "",
  };
}

function validateEmployeeRegistration({ id = null, cpf = "" } = {}) {
  const cpfDigits = onlyDigits(cpf);
  if (cpfDigits.length !== 11 || !isValidCpf(cpfDigits)) {
    return { ok: false, message: "CPF invalido. Use o formato 000.000.000-00." };
  }
  const duplicated = state.employees.some((employee) => !sameId(employee.id, id) && onlyDigits(employee.cpf || "") === cpfDigits);
  if (duplicated) {
    return { ok: false, message: "CPF ja cadastrado para outro funcionario." };
  }
  return { ok: true, cpf: cpfDigits };
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
