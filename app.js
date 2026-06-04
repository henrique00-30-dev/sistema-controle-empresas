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
  empresaFiscais: [],
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

const documentStatuses = ["Pendente", "Em análise", "Aprovado", "Revisão solicitada", "Reprovado", "Vencido", "Aprovado com pendência", "Arquivado"];
const fiscalStatuses = ["sem_acesso", "com_acesso", "inativo"];
const DOC_META_MARKER = "\n\n[SCT_ENTERPRISE_META]";
const EMPLOYEE_META_MARKER = "\n\n[SCT_EMPLOYEE_META]";
const COMPANY_META_MARKER = "\n\n[SCT_COMPANY_META]";
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
let administrationSection = localStorage.getItem("sctempresas.adminSection") || "users";
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
let recoveryFlowActive = false;
let authStateSubscription = null;

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
  data.empresaFiscais ||= [];
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
    let fiscal = company.fiscalId ? data.fiscais.find((item) => sameId(item.id, company.fiscalId)) : byName.get(key);
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
  console.error("[Usuários Supabase] Erro public.usuarios", {
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
  console[level]("[Usuários Supabase] Erro Auth", {
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
  console.error("[Histórico Supabase] Erro historico", {
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
    throw wrapPersistenceError(error || new Error("Usuário nao autenticado; auth.uid() indisponivel."), {
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
    bindAuthStateListener();
    const params = recoveryParams();
    if (isRecoveryIntent(params)) {
      recoveryFlowActive = true;
      if (params.code && typeof supabaseClient.auth.exchangeCodeForSession === "function") {
        const { error: exchangeError } = await supabaseClient.auth.exchangeCodeForSession(params.code);
        if (exchangeError) {
          console.warn("[Recuperacao de senha] Falha ao trocar code por sessao.", exchangeError);
        } else {
          clearRecoveryUrl(false);
        }
      } else if (params.accessToken && params.refreshToken) {
        const { error: recoverySessionError } = await supabaseClient.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken,
        });
        if (recoverySessionError) {
          console.warn("[Recuperacao de senha] Falha ao definir sessao de recuperacao.", recoverySessionError);
        }
      }
    }
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    console.info("[Login Supabase] Sessao inicial", {
      supabase: supabaseDiagnostics,
      sessaoCriada: Boolean(session),
      email: session?.user?.email || null,
      userId: session?.user?.id || null,
    });
    if (session?.user && !recoveryFlowActive) {
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

  throw new PersistenceError("Usuário autenticado, mas sem perfil cadastrado.", {
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
    throw new PersistenceError("Usuário autenticado, mas sem perfil cadastrado.", {
      table: source,
      operation: "select perfil por email",
      payload: { email },
      hint: "Crie um registro em public.usuarios com o mesmo email do Supabase Auth.",
    });
  }
  if (profile.active === false) {
    throw new PersistenceError("Usuário autenticado, mas esta inativo no cadastro de perfis.", {
      table: source,
      operation: "validacao perfil ativo",
      payload: { email },
      hint: "Altere ativo para true em public.usuarios.",
    });
  }
  return profile;
}

async function loadRemoteData() {
  const [companies, employees, documents, usuarios, fiscais, empresaFiscais] = await Promise.all([
    supabaseClient.from("companies").select("*").order("name"),
    supabaseClient.from("employees").select("*").order("name"),
    supabaseClient.from("documents").select("*").order("due_date"),
    fetchUsersForAccessControl(),
    fetchFiscaisForCompanies(),
    fetchEmpresaFiscaisForScope(),
  ]);

  for (const result of [companies, employees, documents, usuarios]) {
    if (result.error) throw result.error;
  }

  state.companies = companies.data.map(mapCompanyFromDb);
  state.employees = employees.data.map(mapEmployeeFromDb);
  state.documents = documents.data.map(mapDocumentFromDb);
  state.users = usuarios.data.map(mapUserFromDb);
  state.fiscais = (fiscais.data || []).map(mapFiscalFromDb);
  state.empresaFiscais = (empresaFiscais.data || []).map((row) => ({
    empresaId: row.empresa_id,
    fiscalId: row.fiscal_id,
    ativo: row.ativo,
  }));
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

async function fetchEmpresaFiscaisForScope() {
  const result = await supabaseClient.from("empresa_fiscais").select("empresa_id,fiscal_id,ativo");
  if (result.error) {
    console.warn("Tabela public.empresa_fiscais indisponivel. O escopo fiscal usara os vinculos diretos em companies/fiscais.", result.error);
    return { data: state.empresaFiscais || [], error: null };
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

function bindAuthStateListener() {
  if (!supabaseClient || authStateSubscription) return;
  const { data } = supabaseClient.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") {
      recoveryFlowActive = true;
      state.session = null;
      isLoading = false;
      render();
    }
  });
  authStateSubscription = data?.subscription || null;
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
  const authResult = isNewUser ? await createAuthUserForUsuário(user) : { ok: true, skipped: true, mode: user.creationMode || "test" };
  const payload = mapUserToDb(user, { includeId: Boolean(!isNewUser && user.id) });
  const context = {
    table: "public.usuarios",
    operation: isNewUser ? "insert/update por email" : "update",
    payload,
  };
  try {
    validateUserPayload(payload);
    await ensureOnlineSession(context.table);
    const existing = await findUsuárioByEmail(payload.email);
    const dbPayload = existing?.id ? withoutKeys(payload, ["id"]) : payload;
    const runMutation = () =>
      existing?.id
        ? supabaseClient.from("usuarios").update(dbPayload).eq("id", existing.id).select("*").maybeSingle()
        : supabaseClient.from("usuarios").insert(dbPayload).select("*").maybeSingle();
    let { data, error } = await runMutation();
    if (error && isRlsError(error) && authResult?.session?.access_token) {
      console.warn("[Usuários Supabase] RLS ao salvar com a sessao atual. Tentando novamente com a sessao do usuario Auth criado.", {
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
    const savedRow = data || existing || (await findUsuárioByEmail(payload.email));
    if (!savedRow) {
      throw new PersistenceError("Usuário autenticado no Supabase Auth, mas nao foi possivel confirmar gravacao em public.usuarios.", {
        table: "public.usuarios",
        operation: "confirmacao pos upsert",
        payload: dbPayload,
        hint: "Verifique RLS/select em public.usuarios para o perfil logado.",
      });
    }
    if (authResult?.userId && savedRow?.email) {
      const { error: authLinkError } = await supabaseClient
        .from("usuarios")
        .update({ auth_user_id: authResult.userId })
        .eq("email", savedRow.email);
      if (authLinkError) console.warn("[Usuários Supabase] auth_user_id nao foi vinculado; seguindo por email/public.usuarios.id.", authLinkError);
    }
    const saved = mapUserFromDb(savedRow);
    await recordUserCreationHistory(saved, authResult, Boolean(existing?.id));
    return saved;
  } catch (error) {
    logUserPersistenceError(payload, error);
    throw wrapUserPersistenceError(error, context);
  }
}

async function createAuthUserForUsuário(user) {
  if (!isOnlineMode()) return { ok: true, skipped: true };
  const mode = user.creationMode === "real" ? "real" : "test";
  const email = optionalText(user.email);
  const tempPassword = mode === "real" ? generateTemporaryPassword() : optionalText(user.password);
  if (!email) return { ok: true, skipped: true, reason: "sem email", mode };
  const authPayload = {
    email,
    password: tempPassword,
    options: {
      data: {
        nome: optionalText(user.name),
        perfil: normalizePerfilUsuário(user.role || user.perfil).toLowerCase(),
      },
    },
  };
  if (!authPayload.password) return { ok: true, skipped: true, reason: "sem senha", mode };
  const previousSession = await supabaseClient.auth.getSession().catch(() => null);
  const previous = previousSession?.data?.session;
  const { data, error } = await supabaseClient.auth.signUp(authPayload);
  const signedUserId = data?.user?.id || null;
  await restoreSupabaseSession(previous);
  const inviteContext = { ok: true, invited: false, mode };
  if (error) {
    if (isAuthDuplicateError(error)) {
      logAuthUserError(authPayload, error, "warn");
      if (mode === "real") {
        await sendFirstAccessInviteEmail(email);
        inviteContext.invited = true;
      }
      return { ok: true, duplicate: true, error, previousSession: previous, ...inviteContext };
    }
    logAuthUserError(authPayload, error);
    throw new PersistenceError(`Erro Auth: ${friendlyAuthError(error)}`, { table: "supabase.auth", operation: "signUp", payload: { email: authPayload.email, perfil: authPayload.options.data.perfil } }, error);
  }
  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    const duplicateInfo = new Error("E-mail ja cadastrado no Supabase Auth.");
    logAuthUserError(authPayload, duplicateInfo, "warn");
    if (mode === "real") {
      await sendFirstAccessInviteEmail(email);
      inviteContext.invited = true;
    }
    return { ok: true, duplicate: true, userId: signedUserId, session: data?.session || null, previousSession: previous, ...inviteContext };
  }
  if (mode === "test" && !data?.session) {
    throw new PersistenceError(
      "Usuário de teste criado sem sessao imediata. O projeto Supabase pode exigir confirmacao de e-mail para login por senha.",
      {
        table: "supabase.auth",
        operation: "signUp test mode",
        payload: { email: authPayload.email, mode },
        hint: "Para login imediato de usuarios de teste, desative confirmacao obrigatoria de e-mail no Supabase Auth.",
      },
    );
  }
  if (mode === "real") {
    await sendFirstAccessInviteEmail(email);
    inviteContext.invited = true;
  }
  return { ok: true, userId: signedUserId, session: data?.session || null, previousSession: previous, ...inviteContext };
}

function generateTemporaryPassword() {
  return `Tmp#${Math.random().toString(36).slice(2, 7)}${Date.now().toString().slice(-4)}`;
}

async function sendFirstAccessInviteEmail(email) {
  const redirectTo = `${window.location.origin}${window.location.pathname}?type=recovery`;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    throw new PersistenceError(`Erro ao enviar convite: ${error.message || "falha no resetPasswordForEmail."}`, {
      table: "supabase.auth",
      operation: "resetPasswordForEmail",
      payload: { email, redirectTo },
    }, error);
  }
}

async function restoreSupabaseSession(session) {
  if (!session?.access_token) return;
  const currentSession = await supabaseClient.auth.getSession().catch(() => null);
  if (currentSession?.data?.session?.user?.id === session.user?.id) return;
  await supabaseClient.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  }).catch((restoreError) => console.warn("[Usuários Supabase] Nao foi possivel restaurar sessao anterior.", restoreError));
}

async function findUsuárioByEmail(email) {
  if (!email) return null;
  const { data, error } = await supabaseClient.from("usuarios").select("*").eq("email", email).maybeSingle();
  if (error) {
    logUserPersistenceError({ email }, error);
    throw wrapUserPersistenceError(error, { table: "public.usuarios", operation: "select por email", payload: { email } });
  }
  return data || null;
}

async function recordUserCreationHistory(user, authResult, updatedExisting) {
  const isRealInvite = authResult?.mode === "real" && authResult?.invited;
  const history = createHistoryEvent({
    entityType: "usuario",
    entityId: user.id,
    action: updatedExisting ? "Usuário atualizado" : "Usuário criado",
    previousStatus: "",
    nextStatus: user.active ? "Ativo" : "Inativo",
    observation: isRealInvite
      ? `Usuário ${user.email} salvo em public.usuarios. Convite de primeiro acesso enviado por e-mail.`
      : authResult?.duplicate
        ? `Usuário ${user.email} salvo em public.usuarios. O e-mail ja existia no Supabase Auth.`
        : `Usuário ${user.email} salvo em public.usuarios.`,
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
    clock: "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z",
    moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z",
    sun: "M12 1v2m0 18v2m11-11h-2M3 12H1m18.36 6.36-1.41-1.41M6.05 6.05 4.64 4.64m14.72 0-1.41 1.41M6.05 17.95l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    plus: "M12 5v14M5 12h14",
    edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
    camera: "M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    download: "M12 3v10m0 0 4-4m-4 4-4-4M4 17v3h16v-3",
    trash: "M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14",
    close: "M18 6 6 18M6 6l12 12",
    arrow: "M19 12H5m7-7-7 7 7 7",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9",
    reload: "M3 12a9 9 0 0 1 15-6.7L21 8M21 8V3m0 5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 16v5m0-5h5",
    save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM17 21v-8H7v8M7 3v5h8",
  };
  return `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name]}"/></svg>`;
}

function currentUser() {
  return state.users.find((user) => sameId(user.id, state.session));
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
    code: hash.get("code") || query.get("code"),
  };
}

function isRecoveryIntent(params = recoveryParams()) {
  if (!isOnlineMode()) return false;
  return params.type === "recovery" || Boolean(params.accessToken) || Boolean(params.refreshToken) || Boolean(params.code);
}

function isPasswordRecoveryRoute() {
  const params = recoveryParams();
  return isOnlineMode() && (recoveryFlowActive || isRecoveryIntent(params));
}

function clearRecoveryUrl(resetRecoveryFlag = true) {
  if (window.history?.replaceState) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  if (resetRecoveryFlag) recoveryFlowActive = false;
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
  if (!["admin", "fiscal"].includes(currentUser()?.role || "visitor") || !canAccessFiscal(fiscal)) {
    alert("Seu perfil nao possui permissao para criar acesso deste fiscal.");
    return;
  }
  if (!isOnlineMode()) {
    alert("Acesso ao sistema exige Supabase Auth online configurado.");
    return;
  }
  const item = normalizeFiscal(fiscal);
  if (!item.email) {
    alert("Informe o e-mail do fiscal antes de criar acesso.");
    return;
  }
  if (!fiscalLinkedCompanies(item).length) {
    alert("Vincule o fiscal a uma empresa ou contrato antes de criar o acesso.");
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
            <input name="password" type="password" autocomplete="new-password" minlength="8" required />
          </label>
          <label>Confirmar nova senha
            <input name="confirmPassword" type="password" autocomplete="new-password" minlength="8" required />
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
    if (password.length < 8) {
      alert("A nova senha deve ter no minimo 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas nao conferem.");
      return;
    }
    submit.disabled = true;
    try {
      const params = recoveryParams();
      if (params.accessToken && params.refreshToken) {
        const { error: sessionError } = await supabaseClient.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken,
        });
        if (sessionError) throw new PersistenceError(`Erro ao validar link de recuperacao: ${sessionError.message}`, { table: "supabase.auth", operation: "setSession recovery" }, sessionError);
      } else if (params.code && typeof supabaseClient.auth.exchangeCodeForSession === "function") {
        const { error: exchangeError } = await supabaseClient.auth.exchangeCodeForSession(params.code);
        if (exchangeError) throw new PersistenceError(`Erro ao trocar codigo de recuperacao: ${exchangeError.message}`, { table: "supabase.auth", operation: "exchangeCodeForSession recovery" }, exchangeError);
      } else {
        const {
          data: { session },
          error: getSessionError,
        } = await supabaseClient.auth.getSession();
        if (getSessionError || !session) {
          throw new PersistenceError("Nao foi possivel validar a sessao de recuperacao. Solicite um novo link.", { table: "supabase.auth", operation: "getSession recovery" }, getSessionError || null);
        }
      }
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
          <button class="btn secondary" type="button" id="forgotPasswordButton">Esqueci minha senha</button>
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
          <div><strong>EHS</strong><span>Segurança</span></div>
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
        recoveryFlowActive = false;
        clearRecoveryUrl(false);
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

  document.querySelector("#forgotPasswordButton")?.addEventListener("click", async () => {
    if (!isOnlineMode()) {
      alert("Recuperacao de senha disponivel somente no modo online.");
      return;
    }
    const emailInput = document.querySelector("#loginForm [name='email']");
    const email = String(emailInput?.value || "").trim().toLowerCase();
    if (!isValidEmail(email)) {
      alert("Informe um e-mail valido para enviar o link de recuperacao.");
      emailInput?.focus();
      return;
    }
    try {
      await sendFirstAccessInviteEmail(email);
      alert("Link de recuperacao enviado para o e-mail informado.");
    } catch (error) {
      console.error("[Login Supabase] Falha ao enviar recuperacao de senha", error);
      alert(`Nao foi possivel enviar o link de recuperacao.\n\n${persistenceMessage(error)}`);
    }
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
        ["employees", "Funcionários", "users"],
        ["documents", "Documentos", "docs"],
      ],
    },
    {
      title: "Controle",
      items: [
        ["approvals", "Aprovações", "approve"],
        ["requests", "Solicitações", "workflow"],
        ["reports", "Relatorios", "reports"],
      ],
    },
    {
      title: "Gestao",
      items: [
        ["administration", "Administracao", "settings"],
      ],
    },
  ];
  const views = groups.flatMap((group) => group.items).filter(([id]) => canView(id));
  const visibleViewIds = views.map(([id]) => id);
  const hiddenViews = ["contracts", "workflow", "thirdparty", "compliance", "blocks", "users", "integrations", "settings"].filter((id) => canView(id));
  const availableViews = [...new Set([...visibleViewIds, ...hiddenViews])];
  if (!availableViews.includes(currentView)) currentView = visibleViewIds[0] || availableViews[0] || "dashboard";

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
            <span class="muted">${currentView === "dashboard" ? "Leitura operacional rapida" : "Estrutura V2 por ficha e sub-abas"}</span>
          </div>
          <div class="top-actions">
            <div class="global-search">
              ${icon("search")}
              <input class="search-control" placeholder="Pesquisa" value="${escapeAttr(searchTerm)}" />
            </div>
            <button class="btn icon" id="themeToggle" type="button" title="Alternar tema">${darkMode ? icon("sun") : icon("moon")}</button>
            <div class="user-status-compact" aria-label="Usuário logado">
              <strong>${escapeHtml(user.name || user.email || "Usuário")}</strong>
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

  if (!app.dataset.navBound) {
    app.dataset.navBound = "1";
    app.addEventListener("click", (event) => {
      const target = event.target.closest("[data-view]");
      if (!target) return;
      const view = target.dataset.view;
      if (!view) return;
      if (!canView(view)) {
        alert("Seu perfil nao possui acesso a esta area.");
        return;
      }
      currentView = view;
      searchTerm = "";
      render();
    });
  }

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
    employees: "Funcionários",
    documents: "Documentos",
    approvals: "Aprovações",
    requests: "Solicitações",
    administration: "Administracao",
    reports: "Relatorios",
    workflow: "Workflow de documentos",
    thirdparty: "Gestao de terceiros",
    compliance: "Conformidade",
    blocks: "Bloqueios",
    users: "Usuários e perfis",
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
    approvals: renderApprovals,
    requests: renderRequests,
    administration: renderAdministration,
    reports: renderReports,
    workflow: renderDocumentWorkflow,
    thirdparty: renderThirdPartyManagement,
    compliance: renderCompliance,
    blocks: renderBlocks,
    users: renderUsers,
    integrations: renderIntegrations,
    settings: renderSettings,
  }[currentView]();
}

function filtered(items, fields) {
  const term = normalizeSearchValue(searchTerm);
  const digitTerm = onlyDigits(searchTerm);
  if (!term) return items;
  return items.filter((item) =>
    fields.some((field) => {
      const rawValue = String(field(item) || "");
      if (!rawValue) return false;
      const normalizedValue = normalizeSearchValue(rawValue);
      if (normalizedValue.includes(term)) return true;
      if (digitTerm) {
        const valueDigits = onlyDigits(rawValue);
        if (valueDigits.includes(digitTerm)) return true;
      }
      return false;
    }),
  );
}

function normalizeSearchValue(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeEmail(value = "") {
  return normalizeSearchValue(value);
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
  const statusValue = item.dueDate || item.type ? docStatus(item) : item.cpf || item.role || item.blockType === "Funcionário" ? normalizeEmployee(item).status : companyItem.status;
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
  if (view === "requests") return Boolean(currentUser());
  if (view === "administration") return currentUser()?.role === "admin";
  return ROLE_PERMISSIONS[currentUser()?.role || "visitor"].view.includes(view);
}

function fiscalLinkIsActive(link = {}) {
  if (link.ativo === null || link.ativo === undefined) return true;
  return Boolean(link.ativo);
}

function getCurrentUserFiscalIds(user = currentUser()) {
  if (!user) return new Set();
  const normalizedEmail = normalizeSearchValue(user.email || "");
  return new Set(
    (state.fiscais || [])
      .map(normalizeFiscal)
      .filter((fiscal) => {
        if (isNumericDbId(fiscal.usuarioId) && sameId(fiscal.usuarioId, user.id)) return true;
        if (fiscal.authUserId && user.authUserId && sameId(fiscal.authUserId, user.authUserId)) return true;
        if (normalizedEmail) {
          if (normalizeSearchValue(fiscal.usuarioEmail || "") === normalizedEmail) return true;
          if (normalizeSearchValue(fiscal.email || "") === normalizedEmail) return true;
        }
        return false;
      })
      .map((fiscal) => String(fiscal.id)),
  );
}

function getScopedFiscalIdsFromAccessibleCompanies() {
  const fiscalIds = new Set();
  for (const company of visibleCompanies()) {
    const normalized = normalizeCompany(company);
    if (normalized.fiscalId) fiscalIds.add(String(normalized.fiscalId));
    for (const extraId of normalized.fiscaisAdicionais || []) {
      if (extraId) fiscalIds.add(String(extraId));
    }
  }
  return fiscalIds;
}

function getAccessibleCompanyIdsForCurrentUser() {
  const user = currentUser();
  const role = user?.role || "visitor";
  const allCompanyIds = new Set((state.companies || []).map((company) => String(company.id)));
  if (!allCompanyIds.size) return new Set();
  if (role === "admin") return allCompanyIds;
  if (role === "supplier") {
    if (user?.companyId && allCompanyIds.has(String(user.companyId))) return new Set([String(user.companyId)]);
    return new Set();
  }
  if (role === "fiscal") {
    const accessible = new Set();
    if (user?.companyId && allCompanyIds.has(String(user.companyId))) accessible.add(String(user.companyId));
    const fiscalIds = getCurrentUserFiscalIds(user);
    const normalizedUserEmail = normalizeSearchValue(user.email || "");
    const normalizedUserName = normalizeSearchValue(user.name || "");
    for (const company of state.companies || []) {
      const normalizedCompany = normalizeCompany(company);
      const companyId = String(company.id);
      if (!allCompanyIds.has(companyId)) continue;
      const primaryFiscalId = normalizedCompany.fiscalId ? String(normalizedCompany.fiscalId) : "";
      const additionalIds = (normalizedCompany.fiscaisAdicionais || []).map((id) => String(id));
      const fiscalNameToken = normalizeSearchValue(normalizedCompany.fiscal || "");
      const nameMatches = normalizedUserName && fiscalNameToken && fiscalNameToken === normalizedUserName;
      const emailMatches = normalizedUserEmail && fiscalNameToken && fiscalNameToken === normalizedUserEmail;
      if (fiscalIds.has(primaryFiscalId) || additionalIds.some((id) => fiscalIds.has(id)) || nameMatches || emailMatches) {
        accessible.add(companyId);
      }
    }
    for (const link of state.empresaFiscais || []) {
      const fiscalId = String(link.fiscalId || "");
      const companyId = String(link.empresaId || "");
      if (!fiscalLinkIsActive(link)) continue;
      if (!allCompanyIds.has(companyId)) continue;
      if (fiscalIds.has(fiscalId)) accessible.add(companyId);
    }
    return accessible;
  }
  return allCompanyIds;
}

function canAccessCompany(companyOrId) {
  const role = currentUser()?.role || "visitor";
  if (role === "admin") return true;
  const companyId = typeof companyOrId === "object" ? companyOrId?.id : companyOrId;
  if (companyId === null || companyId === undefined || companyId === "") return false;
  return getAccessibleCompanyIdsForCurrentUser().has(String(companyId));
}

function canAccessContract(contractOrCompany) {
  const companyId =
    typeof contractOrCompany === "object"
      ? contractOrCompany?.companyId || contractOrCompany?.company_id || contractOrCompany?.id
      : contractOrCompany;
  return canAccessCompany(companyId);
}

function canAccessEmployee(employeeOrId) {
  const employee =
    typeof employeeOrId === "object"
      ? employeeOrId
      : state.employees.find((item) => sameId(item.id, employeeOrId));
  if (!employee) return false;
  return canAccessCompany(employee.companyId);
}

function canAccessDocument(documentOrId) {
  const doc =
    typeof documentOrId === "object"
      ? documentOrId
      : state.documents.find((item) => sameId(item.id, documentOrId));
  if (!doc) return false;
  if (!canAccessCompany(doc.companyId)) return false;
  if (doc.employeeId) return canAccessEmployee(doc.employeeId);
  return true;
}

function canAccessApproval(approvalOrDocument) {
  return canAccessDocument(approvalOrDocument);
}

function canAccessHistory(event = {}) {
  const entityType = String(event.entityType || event.entidade_tipo || "").toLowerCase();
  const entityId = event.entityId || event.entidade_id;
  if (!entityType || entityId === null || entityId === undefined) return true;
  if (["empresa", "company", "companies", "contrato", "contract", "contracts"].includes(entityType)) return canAccessCompany(entityId);
  if (["funcionario", "employee", "employees"].includes(entityType)) return canAccessEmployee(entityId);
  if (["documento", "document", "documents"].includes(entityType)) return canAccessDocument(entityId);
  if (["fiscal", "fiscais"].includes(entityType)) {
    const targetFiscalId = String(entityId);
    return visibleCompanies().some((company) => {
      const normalized = normalizeCompany(company);
      const fiscalIds = [normalized.fiscalId, ...(normalized.fiscaisAdicionais || [])].filter(Boolean).map((id) => String(id));
      return fiscalIds.includes(targetFiscalId);
    });
  }
  return true;
}

function canAccessFiscal(fiscalOrId) {
  const fiscalId = typeof fiscalOrId === "object" ? fiscalOrId?.id : fiscalOrId;
  if (!fiscalId) return false;
  const role = currentUser()?.role || "visitor";
  if (role === "admin") return true;
  if (role !== "fiscal") return false;
  if (getCurrentUserFiscalIds().has(String(fiscalId))) return true;
  return getScopedFiscalIdsFromAccessibleCompanies().has(String(fiscalId));
}

function can(permission, item = null) {
  const user = currentUser();
  const role = user?.role || "visitor";
  const permissions = ROLE_PERMISSIONS[role];
  const [action, subject] = permission.split(".");

  if (action === "users" && subject === "view") return canView("users");
  if (action === "reports") return permissions.reports;
  if (action === "approveDocuments") return permissions.approveDocuments && canAccessDocument(item) && canApproveDocumentSector(item);
  if (action === "updateHiringStatus") return permissions.updateHiringStatus;
  if (action === "addObservations") return permissions.addObservations;

  if (["create", "edit", "delete"].includes(action)) {
    if (subject === "document" && action === "edit" && permissions.approvalSectors?.length && role !== "admin") {
      return canAccessDocument(item) && canApproveDocumentSector(item);
    }
    if (permissions[action].includes(subject)) return true;
    if (subject === "company" && permissions[action].includes("companyOwn")) return canAccessCompany(item);
    if (subject === "employee" && permissions[action].includes("employeeOwn")) return canAccessEmployee(item);
    if (subject === "document" && permissions[action].includes("documentOwn")) return canAccessDocument(item);
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
  return state.companies.filter((company) => canAccessCompany(company));
}

function visibleEmployees() {
  return state.employees.filter((employee) => canAccessEmployee(employee));
}

function visibleDocuments() {
  const docs = state.documents.filter((doc) => canAccessDocument(doc));
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
          <span>${companies.length} empresas monitoradas</span>
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
        <div class="bi-head"><div><span class="eyebrow">Mesa operacional</span><h2>Funcionários em monitoramento</h2></div></div>
        <div class="ops-table">
          <table>
            <thead><tr><th>Funcionário</th><th>Empresa</th><th>Documental</th><th>Contratação</th></tr></thead>
            <tbody>${operationalRows || emptyRow(4)}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function buildDashboardCards(metrics, totalPendencies) {
  return [
    { label: "Funcionários Liberados", value: metrics.activeEmployees.length, helper: "Aptos para atividade", iconName: "users", tone: "success", view: "employees", query: "", filter: "Todos", quick: "Ativo" },
    { label: "Bloqueados", value: metrics.blockedEmployees.length, helper: "Restricoes de funcionarios", iconName: "block", tone: "danger", view: "employees", query: "", filter: "Bloqueado", quick: "Bloqueado" },
    { label: "Pendentes", value: totalPendencies, helper: "Itens aguardando acao", iconName: "clock", tone: "warning", view: "employees", query: "", filter: "Todos", quick: "Pendente" },
    { label: "Documentos Vencidos", value: metrics.expiredDocs.length, helper: "Fora da validade", iconName: "docs", tone: "danger", view: "documents", query: "", filter: "Todos", quick: "Vencido" },
    { label: "Documentos a Vencer", value: metrics.expiringDocs.length, helper: "Janela de alerta", iconName: "clock", tone: "warning", view: "documents", query: "", filter: "Todos", quick: "A vencer" },
    { label: "Contratos Vencendo", value: metrics.expiringContracts.length, helper: "Proximos 60 dias", iconName: "contracts", tone: "warning", view: "contracts", query: "", filter: "Todos", quick: "Vencendo" },
    { label: "Empresas Criticas", value: metrics.criticalCompanies.length, helper: "Bloqueadas ou pendentes", iconName: "company", tone: "danger", view: "companies", query: "", filter: "Todos", quick: "Critico" },
    { label: "Aprovações Pendentes", value: metrics.pendingApprovals.length, helper: "Documentos para decisao", iconName: "approve", tone: "special", view: "approvals", query: "", filter: "Todos", quick: "Pendente" },
  ];
}

function buildOperationalAlerts(metrics) {
  return [
    { label: "Documentos vencidos", value: metrics.expiredDocs.length, priority: "critica", helper: "Regularizar imediatamente", iconName: "docs", view: "documents", quick: "Vencido" },
    { label: "Documentos vencendo", value: metrics.expiringDocs.length, priority: "media", helper: "Dentro da janela de 30 dias", iconName: "clock", view: "documents", quick: "A vencer" },
    { label: "ASO vencido", value: metrics.expiredAso.length, priority: "critica", helper: "Bloqueio medico potencial", iconName: "shield", view: "employees", quick: "ASO vencido" },
    { label: "Treinamentos vencidos", value: metrics.expiredTrainings.length, priority: "critica", helper: "Pendencia EHS operacional", iconName: "factory", view: "employees", quick: "Treinamento vencido" },
    { label: "Contratos proximos do vencimento", value: metrics.expiringContracts.length, priority: "media", helper: "Fim previsto em ate 60 dias", iconName: "contracts", view: "contracts", quick: "Vencendo" },
    { label: "Funcionários bloqueados", value: metrics.blockedEmployees.length, priority: "critica", helper: "Restricao ativa de acesso", iconName: "block", view: "employees", filter: "Bloqueado", quick: "Bloqueado" },
    { label: "Pendencias Medicina", value: metrics.medicinePendencies.length, priority: "media", helper: "ASO, exames e liberacao medica", iconName: "shield", view: "employees", quick: "Medicina" },
    { label: "Pendencias EHS", value: metrics.ehsPendencies.length, priority: "media", helper: "Treinamentos e requisitos de seguranca", iconName: "factory", view: "employees", quick: "EHS" },
    { label: "Pendencias Patrimonial", value: metrics.patrimonialPendencies.length, priority: "baixa", helper: "Crachás, acesso e liberacao final", iconName: "block", view: "employees", quick: "Pendente" },
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
    (item) => companyTradeName(item),
    (item) => item.cnpj,
    (item) => companyCode(item),
    (item) => companyPrimaryContract(item),
    (item) => employeeCostCenter({}, item),
    (item) => item.fiscal,
    (item) => item.manager || item.responsible || item.contact,
    (item) => normalizeCompany(item).status,
  ]);
  const items = sortItems("companies", applyOperationalFilters("companies", filteredItems));
  const { pageItems, totalPages } = paginateItems("companies", items);
  return `
    ${sectionHead("Empresas", "Visão geral operacional com listagem, filtros e acesso rápido para a ficha da empresa.", "Nova empresa", "company")}
    ${toolbar("Buscar por razão social, nome fantasia, CNPJ, código, contrato, fiscal ou status")}
    ${renderOperationalFilters("companies", baseItems, { quicks: ["Todos", "Ativas", "Pendentes", "Bloqueadas", "Contrato vencido", "Documentos vencidos", "Sem fiscal vinculado"], exportKey: "empresas" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("companies", "Razão social", "name")}<th>Nome fantasia</th><th>CNPJ</th><th>Contrato principal</th><th>Centro de custo</th><th>Fiscal responsável</th><th>Gestor do contrato</th>${sortableHeader("companies", "Status", "status")}<th>Pendências</th><th>Funcionários vinculados</th><th>Ações</th></tr></thead>
        <tbody>
          ${pageItems.length ? pageItems.map(renderCompanyRow).join("") : emptyRow(11)}
        </tbody>
      </table>
      ${renderPagination("companies", items.length, totalPages)}
    </section>
  `;
}

function renderCompanyEditor(company = null, context = {}) {
  if (!can("create.company") && !can("edit.company", company)) {
    return "";
  }
  const item = normalizeCompany(company || context.template || {});
  return `
    <section class="panel company-editor">
      <div class="editor-head">
        <div>
          <h2>${company ? "Editar cadastro da empresa" : "Cadastro de empresa"}</h2>
          <span class="muted">${company ? "Atualize os dados gerais e contratuais da empresa." : "Preencha os dados para registrar uma empresa terceirizada."}</span>
        </div>
        ${company ? `<button class="btn secondary" type="button" data-company-open-new>${icon("plus")} Nova empresa</button>` : ""}
      </div>
      <form id="companyEditorForm" class="form-grid company-form">
        <input type="hidden" name="id" value="${escapeAttr(company?.id || "")}" />
        ${formSection("Dados da empresa", [
          imageUploadField("logoFile", "Logo da empresa", companyLogoUrl(item), "", "company"),
          inputField("name", "Razão social", item.name, "required"),
          inputField("tradeName", "Nome fantasia", companyTradeName(item) === item.name ? "" : companyTradeName(item)),
          inputField("cnpj", "CNPJ", item.cnpj, "required inputmode='numeric' maxlength='18' data-mask='cnpj' placeholder='00.000.000/0000-00'"),
          inputField("serviceType", "Tipo de serviço principal", item.serviceType || item.risk || "", "required"),
          inputField("phone", "Telefone da empresa", item.phone, "required inputmode='numeric' maxlength='15' data-mask='phone' placeholder='(00) 00000-0000'"),
          inputField("email", "E-mail da empresa", item.email, "type='email' required"),
          inputField("branchCode", "Matriz / Filial", companyBranchCode(item) === "Nao informado" ? "" : companyBranchCode(item)),
          selectField("status", "Status", item.status || "Ativa", ["Ativa", "Pendente", "Bloqueada", "Inativa", "Desmobilizada"].map(option)),
          inputField("cep", "CEP", item.cep || "", "inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
          inputField("city", "Cidade", item.city || item.municipio || ""),
          inputField("uf", "UF", item.uf || "", "inputmode='text' maxlength='2' data-mask='uf' placeholder='UF'"),
          inputField("district", "Bairro", item.district || ""),
          inputField("street", "Logradouro", item.street || ""),
          inputField("number", "Número", item.number || ""),
          inputField("complement", "Complemento", item.complement || ""),
          inputField("companyCode", "Código da empresa", companyCode(item) === item.id ? "" : companyCode(item)),
        ])}
        ${companyPrimaryFiscalSection(item)}
        ${formSection("Fornecedor responsável", [
          inputField("supplierName", "Nome do responsável", item.supplierName || item.contact || item.responsible || ""),
          inputField("supplierEmail", "E-mail do responsável", item.supplierEmail || ""),
          inputField("supplierPhone", "Telefone do responsável", item.supplierPhone || ""),
          inputField("supplierRole", "Cargo / função", item.supplierRole || ""),
        ])}
        ${companyContractFiscalSection(item)}
        ${textAreaField("notes", "Observações da empresa", companyVisibleNotes(item))}
        <div class="form-actions wide">
          <button class="btn primary" type="submit">${icon("save")} Salvar</button>
          ${company && currentUser()?.role !== "supplier" ? `<button class="btn warning" type="button" data-demobilize="company" data-id="${company.id}">Desmobilizar contrato</button>` : ""}
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

function companyCostCenter(company = {}) {
  return company.costCenter || company.centroCusto || company.centerCost || "Nao informado";
}

function companyLogoUrl(company = {}) {
  const meta = companyMeta(company);
  return company.logoUrl || company.logo || company.logo_url || meta.logoUrl || meta.logo || meta.logo_url || "";
}

function employeePhotoUrl(employee = {}) {
  const meta = employeeMeta(employee);
  return employee.photoUrl || employee.photo || employee.photo_url || meta.photoUrl || meta.photo || meta.photo_url || "";
}

function avatarMarkup(src, fallbackText, altText) {
  const kind = altText && /logo da empresa/i.test(altText) ? "company" : "employee";
  return mediaFrameMarkup(src, fallbackText, altText, kind, true);
}

function companyAddress(company = {}) {
  return company.address || company.endereco || [company.street || company.rua, company.number || company.numero, company.complement || company.complemento, company.district || company.bairro, company.city || company.municipio, company.uf].filter(Boolean).join(", ") || "Nao informado";
}

function parseLegacyCompanyAddress(address = "") {
  const parts = String(address || "")
    .split(",")
    .map((part) => String(part || "").trim())
    .filter(Boolean);
  if (!parts.length) return {};
  const [street = "", number = "", complement = "", district = "", city = "", uf = ""] = parts;
  return {
    street,
    number,
    complement,
    district,
    city,
    uf: String(uf || "").trim().toUpperCase().slice(0, 2),
  };
}

function companyVisibleNotes(company = {}) {
  return String(company.notes || company.observacoes || "").split(COMPANY_META_MARKER)[0].trim();
}

function companyMeta(company = {}) {
  const notes = String(company.notes || company.observacoes || "");
  const [, rawMeta] = notes.split(COMPANY_META_MARKER);
  if (!rawMeta) return {};
  try {
    return JSON.parse(rawMeta.trim()) || {};
  } catch (error) {
    console.warn("Nao foi possivel ler metadados da empresa.", error);
    return {};
  }
}

function serializeCompanyNotes(company = {}) {
  const meta = {
    ...companyMeta(company),
    serviceType: company.serviceType || "",
    contractServiceType: company.contractServiceType || "",
    contractStatus: company.contractStatus || "",
    logoUrl: company.logoUrl || company.logo || company.logo_url || "",
    contractFiscalDifferent: Boolean(company.contractFiscalDifferent),
    contractFiscal: company.contractFiscal || "",
    contractFiscalEmail: company.contractFiscalEmail || company.contractFiscal_email || "",
    contractFiscalPhone: company.contractFiscalPhone || company.contractFiscal_phone || "",
    supplierName: company.supplierName || "",
    supplierEmail: company.supplierEmail || "",
    supplierPhone: company.supplierPhone || "",
    supplierRole: company.supplierRole || "",
    district: company.district || "",
    street: company.street || "",
    number: company.number || "",
    complement: company.complement || "",
    contractArea: company.contractArea || "",
    contractNotes: company.contractNotes || "",
    branchCodeContract: company.branchCodeContract || "",
  };
  return `${companyVisibleNotes(company)}${COMPANY_META_MARKER}${JSON.stringify(meta)}`;
}

function companyMainContact(company = {}) {
  return company.contact || company.contatoPrincipal || company.contato_principal || company.supplierName || company.responsible || "Nao informado";
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
    "revisao solicitada": "Revisão solicitada",
    "revisao solicitada pelo fiscal": "Revisão solicitada",
    "revisao solicitada pela medicina": "Revisão solicitada",
    "revisao solicitada pela ehs": "Revisão solicitada",
    "revisao solicitada pela seguranca patrimonial": "Revisão solicitada",
    reprovado: "Reprovado",
    "aprovado com pendencia": "Aprovado com pendência",
    arquivado: "Arquivado",
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
    "pendente documentação": "Pendente Documentação",
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
  return ["Bloqueado", "Inativo", "Desmobilizado", "Desmobilização solicitada", "Reativação solicitada"].some((value) => statusMatches(status, value));
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
    "Reativação solicitada",
  ].some((value) => statusMatches(status, value));
}

function isManualCompanyOperationalStatus(status = "") {
  return ["Bloqueado", "Bloqueada", "Inativa", "Inativo", "Desmobilizada", "Desmobilizado", "Desmobilização solicitada", "Reativação solicitada"].some((value) => statusMatches(status, value));
}

function isOperationalWorkflowClosedStatus(status = "") {
  return ["Bloqueado", "Bloqueada", "Inativo", "Inativa", "Desmobilizado", "Desmobilizada", "Desmobilização solicitada", "Encerrado", "Encerrada"].some((value) => statusMatches(status, value));
}

function isReactivationRequestedStatus(status = "") {
  return statusMatches(status, "Reativação solicitada");
}

function employeeLinkedToCompanyOrContract(employee = {}, companyId = "") {
  return sameId(employee.companyId, companyId) || sameId(employee.contractSourceId, companyId);
}

function companyFamilyEntries(company = {}) {
  const normalized = normalizeCompany(company);
  const familyKey = companyFamilyKey(normalized);
  if (!familyKey) return [normalized];
  return uniqueById(
    visibleCompanies()
      .map((entry) => normalizeCompany(entry))
      .filter((entry) => entry.id && companyFamilyKey(entry) === familyKey),
  );
}

function latestReactivationHistoryEvent(entityType, entityId) {
  return latestRequestHistoryEvent(entityType, entityId, "reactivation");
}

function latestDemobilizationRequestHistoryEvent(entityType, entityId) {
  return latestRequestHistoryEvent(entityType, entityId, "demobilization");
}

function latestRequestHistoryEvent(entityType, entityId, kind = "any") {
  return historyEventsFor(entityType, entityId).find((event) => {
    const text = normalizeSearchValue(`${event.action || event.acao || ""} ${event.nextStatus || event.status_novo || ""} ${event.observation || event.observacao || ""}`);
    if (kind === "reactivation") return text.includes("solicitacao de reativacao") || text.includes("reativacao solicitada");
    if (kind === "demobilization") return text.includes("desmobilizacao solicitada") || text.includes("solicitacao de desmobilizacao");
    return text.includes("solicitacao de reativacao") || text.includes("reativacao solicitada") || text.includes("desmobilizacao solicitada") || text.includes("solicitacao de desmobilizacao");
  }) || null;
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
  const token = statusToken(status);
  const map = {
    aprovado: "Aprovado",
    "aprovado com pendencia": "Aprovado com pendencia",
    pendente: "Pendente",
    reprovado: "Reprovado",
    bloqueado: "Bloqueado",
  };
  if (token.includes("revalidacao solicitada")) return "Revalidação solicitada";
  if (token.includes("revisao solicitada")) return "Revisão solicitada";
  if (token.includes("em revalidacao")) return "Em revalidação";
  if (token.includes("em avaliacao")) return "Em avaliação";
  if (token.includes("enviado para")) return "Pendente";
  if (token.includes("rascunho pelo fornecedor")) return "Rascunho pelo Fornecedor";
  return map[token] || String(status || "").trim() || "Pendente";
}

function employeeWorkflowActionStatus(employee = {}, stepId = "") {
  return normalizeWorkflowStatusLabel(employeeWorkflowActions(employee)?.[stepId]?.status || "");
}

function calculateDocumentStatus(employee = {}, docs = employeeDocsFor(employee)) {
  const attachedDocs = (docs || []).filter(Boolean);
  if (!attachedDocs.length) return "Pendente";
  const fiscalWorkflowStatus = employeeWorkflowActionStatus(employee, "fiscal");
  if (statusMatches(fiscalWorkflowStatus, "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Bloqueado")) return "Revisão solicitada";
  if (statusMatches(fiscalWorkflowStatus, "Aprovado", "Aprovado com pendencia")) {
    if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada"))) return "Revisão solicitada";
    if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return "Vencido";
    return hasPendingApprovalException(employee) ? "Aprovado com pendência" : "Aprovado";
  }
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada"))) return "Revisão solicitada";
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return "Vencido";
  if (attachedDocs.some((doc) => statusMatches(docStatus(doc), "Pendente", "Em análise"))) return "Em análise";
  return hasPendingApprovalException(employee) ? "Aprovado com pendência" : "Aprovado";
}

function calculateHiringStatus(employee = {}, docs = employeeDocsFor(employee), documentStatus = calculateDocumentStatus(employee, docs)) {
  const rawStatus = normalizeHiringStatusLabel(employee.status || employee.hiringStatus || "");
  if (isManualEmployeeOperationalStatus(rawStatus)) return rawStatus;
  if (!employeeHasCoreData(employee)) return "Em cadastro";
  if (statusMatches(documentStatus, "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Vencido", "Pendente", "Em análise")) return "Pendente Documentação";
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
    .filter((event) => canAccessHistory(event) && aliases.includes(event.entityType || event.entidade_tipo) && String(event.entityId || event.entidade_id) === String(entityId))
    .sort((a, b) => String(b.createdAt || b.criado_em || "").localeCompare(String(a.createdAt || a.criado_em || "")));
}

function historyEventProfile(event = {}) {
  const direct = event.userProfile || event.perfil || event.profile || event.role || "";
  if (direct) return direct;
  const eventUserId = String(event.userId || event.usuario_id || "");
  if (eventUserId) {
    const matched = state.users.find((user) => sameId(user.id, eventUserId));
    if (matched) return roleName(matched.role || matched.perfil || matched.profile || "visitor");
  }
  const eventUserName = normalizeSearchValue(event.userName || event.usuario_nome || "");
  if (eventUserName) {
    const matchedByName = state.users.find((user) => normalizeSearchValue(user.name || user.nome || "") === eventUserName);
    if (matchedByName) return roleName(matchedByName.role || matchedByName.perfil || matchedByName.profile || "visitor");
  }
  return "Nao informado";
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
              <span class="mini-pill">${escapeHtml(historyEventProfile(event))}</span>
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

function renderHistoryEvents(events = []) {
  if (!events.length) return `<div class="empty">Nenhum historico relacionado a esta area.</div>`;
  return `
    <div class="history-list">
      ${events
        .map((event) => {
          const previousValue = event.previousStatus ?? event.status_anterior ?? "";
          const nextValue = event.nextStatus ?? event.status_novo ?? "";
          return `
            <div class="item-card history-entry">
              <div class="item-row">
                <div>
                  <strong>${escapeHtml(event.action || event.acao || "Alteracao registrada")}</strong>
                  <span class="muted">${formatDateTime(event.createdAt || event.criado_em)} - ${escapeHtml(event.userName || event.usuario_nome || "Sistema")}</span>
                </div>
                <span class="mini-pill">${escapeHtml(historyEventProfile(event))}</span>
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
        .join("")}
    </div>
  `;
}

function companyTopicHistoryEvents(company, topic) {
  const events = (state.historico || []).filter((event) => canAccessHistory(event));
  const companyId = String(company.id);
  const employeeIds = new Set(state.employees.filter((employee) => sameId(employee.companyId, company.id)).map((employee) => String(employee.id)));
  const companyDocs = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  const documentIds = new Set(companyDocs.map((doc) => String(doc.id)));
  const medicineDocIds = new Set(companyDocs.filter((doc) => documentOperationalSector(doc) === "Medicina").map((doc) => String(doc.id)));
  const ehsDocIds = new Set(companyDocs.filter((doc) => documentOperationalSector(doc) === "EHS").map((doc) => String(doc.id)));
  const patrimonialDocIds = new Set(companyDocs.filter((doc) => documentOperationalSector(doc) === "Patrimonial").map((doc) => String(doc.id)));
  const companyFiscalIds = new Set([normalizeCompany(company).fiscalId, ...(normalizeCompany(company).fiscaisAdicionais || [])].filter(Boolean).map((id) => String(id)));
  const textOf = (event) => normalizeSearchValue(`${event.action || event.acao || ""} ${event.observation || event.observacao || ""}`);
  const filtered = events.filter((event) => {
    const entityType = String(event.entityType || event.entidade_tipo || "").toLowerCase();
    const entityId = String(event.entityId || event.entidade_id || "");
    const text = textOf(event);
    const isCompanyEvent = ["empresa", "company", "companies"].includes(entityType) && entityId === companyId;
    const isContractEvent = ["contrato", "contract", "contracts"].includes(entityType) && entityId === companyId;
    const isEmployeeEvent = ["funcionario", "employee", "employees"].includes(entityType) && employeeIds.has(entityId);
    const isDocumentEvent = ["documento", "document", "documents"].includes(entityType) && documentIds.has(entityId);
    const isFiscalEvent = ["fiscal", "fiscais"].includes(entityType) && companyFiscalIds.has(entityId);

    if (topic === "general") return isCompanyEvent || (isContractEvent && text.includes("empresa"));
    if (topic === "contracts") return isContractEvent || (isCompanyEvent && text.includes("contrato"));
    if (topic === "people") return isEmployeeEvent || (isCompanyEvent && text.includes("funcion"));
    if (topic === "docs") return isDocumentEvent || (isCompanyEvent && text.includes("document"));
    if (topic === "medicine") return (["documento", "document", "documents"].includes(entityType) && medicineDocIds.has(entityId)) || text.includes("medicina");
    if (topic === "ehs") return (["documento", "document", "documents"].includes(entityType) && ehsDocIds.has(entityId)) || text.includes("ehs") || text.includes("ssma");
    if (topic === "patrimonial") return (["documento", "document", "documents"].includes(entityType) && patrimonialDocIds.has(entityId)) || text.includes("patrimonial");
    if (topic === "managers") return isFiscalEvent || (isCompanyEvent && (text.includes("fiscal") || text.includes("gestor")));
    return isCompanyEvent || isContractEvent || isEmployeeEvent || isDocumentEvent || isFiscalEvent;
  });
  return filtered
    .sort((a, b) => String(b.createdAt || b.criado_em || "").localeCompare(String(a.createdAt || a.criado_em || "")))
    .slice(0, 8);
}

function renderCompanyTabHistory(company, topic, title = "Histórico da area") {
  const events = companyTopicHistoryEvents(company, topic);
  return `
    <section class="record-section">
      <div class="record-section-title">
        <h3>${title}</h3>
        <span class="mini-pill">${events.length} evento(s)</span>
      </div>
      ${renderHistoryEvents(events)}
    </section>
  `;
}

function renderRecordActionBar(type, item) {
  const isEmployee = type === "employee";
  const role = currentUser()?.role || "visitor";
  const operationalStatus = normalizeHiringStatusLabel(item.status || "");
  const reactivationRequested = isReactivationRequestedStatus(operationalStatus);
  const workflowLocked = isOperationalWorkflowClosedStatus(operationalStatus) || reactivationRequested;
  const canEditRecord = isEmployee
    ? can("edit.employee", item) && (!currentUser() || role !== "supplier" || employeeWorkflowEditableBySupplier(item)) && !workflowLocked
    : can("edit.company", item) && role !== "supplier" && !workflowLocked;
  const canStatus = isEmployee ? can("updateHiringStatus", item) : can("edit.company", item) && role !== "supplier" && !workflowLocked;
  const canRequestReactivation = ["supplier", "admin", "fiscal"].includes(role) && workflowLocked && !reactivationRequested;
  const canReviewReactivation = ["admin", "fiscal"].includes(role) && reactivationRequested;
  return `
    <div class="record-action-bar">
      <button class="btn secondary compact" type="button" data-close>${icon("arrow")} Voltar</button>
      ${canEditRecord ? `<button class="btn primary compact" type="button" data-record-edit="${type}" data-id="${item.id}">${icon("edit")} Editar cadastro</button>` : ""}
      ${
        isEmployee && canStatus && !workflowLocked
          ? `
            <button class="btn warning compact" type="button" data-employee-action="inactivate" data-id="${item.id}">Inativar</button>
            <button class="btn danger compact" type="button" data-employee-action="block" data-id="${item.id}">Bloquear</button>
          `
          : ""
      }
      ${
        !isEmployee && canStatus && !workflowLocked
          ? `<button class="btn warning compact" type="button" data-demobilize="company" data-id="${item.id}">Desmobilizar contrato</button>`
          : ""
      }
      ${
        workflowLocked
          ? `
            ${canRequestReactivation ? `<button class="btn special compact" type="button" data-reactivation-type="${type}" data-reactivation-action="request" data-id="${item.id}">${icon("reload")} Solicitar Reativação</button>` : ""}
            ${canReviewReactivation ? `<button class="btn success compact" type="button" data-reactivation-type="${type}" data-reactivation-action="approve" data-id="${item.id}">${icon("approve")} Aprovar reativação</button><button class="btn warning compact" type="button" data-reactivation-type="${type}" data-reactivation-action="reject" data-id="${item.id}">${icon("block")} Rejeitar reativação</button>` : ""}
          `
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
        <h3>Histórico Completo</h3>
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
    { title: "Funcionários vinculados", detail: `${employees.length} funcionario(s)`, status: employees.some((employee) => normalizeEmployee(employee).status === "Bloqueado") ? "Bloqueado" : "Aprovado" },
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
  const role = currentUser()?.role || "visitor";
  const canManageFiscais = ["admin", "fiscal"].includes(role);
  const scopedFiscalIds = getScopedFiscalIdsFromAccessibleCompanies();
  const allFiscais = (state.fiscais || []).map(normalizeFiscal);
  const scopedFiscais = role === "admin"
    ? allFiscais
    : allFiscais.filter((fiscal) => scopedFiscalIds.has(String(fiscal.id)) || normalizeSearchValue(fiscal.email || "") === normalizeSearchValue(currentUser()?.email || ""));
  const fiscais = filtered(scopedFiscais, [
    (fiscal) => fiscal.nome,
    (fiscal) => fiscal.email,
    (fiscal) => fiscal.matricula,
    (fiscal) => fiscal.setor,
    (fiscal) => fiscalStatusLabel(fiscal.status),
    (fiscal) => fiscal.usuarioEmail,
  ]);
  const linkedCompaniesLabel = (fiscal) => fiscalLinkedCompanies(fiscal).map((company) => company.name).join(", ") || "Sem vinculo";
  const linkedContractsLabel = (fiscal) => fiscalLinkedContracts(fiscal).join(", ") || "Sem contrato";
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <h2>Base de fiscais</h2>
          <span class="muted">Fiscais podem ser responsaveis por empresas mesmo sem usuario/login no sistema.</span>
        </div>
      </div>
      ${
        canManageFiscais
          ? `
            <form id="fiscalQuickForm" class="form-grid company-form">
              ${inputField("nome", "Nome do fiscal", "", "required")}
              ${inputField("email", "E-mail", "", "type='email'")}
              ${inputField("matricula", "Matrícula", "")}
              ${inputField("telefone", "Telefone", "")}
              ${inputField("setor", "Setor", "Fiscalizacao")}
              ${selectField("status", "Status", "sem_acesso", fiscalStatuses.map((status) => ({ value: status, label: fiscalStatusLabel(status) })))}
              <div class="form-actions wide"><button class="btn secondary" type="submit">${icon("plus")} Cadastrar fiscal</button></div>
            </form>
          `
          : `<div class="item-card"><span class="muted">Somente leitura para este perfil.</span></div>`
      }
      <table>
        <thead><tr><th>Fiscal</th><th>Contato</th><th>Setor</th><th>Empresas vinculadas</th><th>Contratos vinculados</th><th>Status</th><th>Acesso</th><th>Acoes</th></tr></thead>
        <tbody>
          ${
            fiscais.length
              ? fiscais.map((fiscal) => `
                <tr>
                  <td><strong>${escapeHtml(fiscal.nome)}</strong><br><span class="muted">${escapeHtml(fiscal.matricula || "Sem matricula")}</span></td>
                  <td>${escapeHtml(fiscal.email || "Sem e-mail")}<br><span class="muted">${escapeHtml(fiscal.telefone || "Sem telefone")}</span></td>
                  <td>${escapeHtml(fiscal.setor || "Nao informado")}</td>
                  <td>${escapeHtml(linkedCompaniesLabel(fiscal))}</td>
                  <td>${escapeHtml(linkedContractsLabel(fiscal))}</td>
                  <td>${statusBadge(fiscalStatusLabel(fiscal.status))}</td>
                  <td>${escapeHtml(fiscal.usuarioEmail || "Sem acesso")}</td>
                  <td>
                    <div class="actions wrap">
                      ${canManageFiscais && fiscal.status !== "com_acesso" && fiscal.status !== "inativo" ? `<button class="btn primary compact" type="button" data-fiscal-access="${fiscal.id}">${icon("users")} Criar acesso ao sistema</button>` : ""}
                      ${canManageFiscais && fiscal.status !== "inativo" ? `<button class="btn warning compact" type="button" data-fiscal-inactivate="${fiscal.id}">Inativar</button>` : `<span class="mini-pill">${fiscal.status === "inativo" ? "Inativo" : "Somente leitura"}</span>`}
                    </div>
                  </td>
                </tr>
              `).join("")
              : emptyRow(8)
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
      <td><button class="link-button strong" type="button" data-company-detail="${company.id}">${escapeHtml(item.name)}</button><br><span class="muted">${item.email || "E-mail não informado"}</span></td>
      <td>${companyTradeName(item)}</td>
      <td>${item.cnpj}</td>
      <td>${companyPrimaryContract(item)}</td>
      <td>${companyCostCenter(item)}</td>
      <td>${item.fiscal}</td>
      <td>${item.manager || item.responsible || "Não informado"}</td>
      <td>${statusBadge(item.status)}</td>
      <td><strong>${companyPendingDocumentsCount(company.id)}</strong></td>
      <td><strong>${companyEmployeeCount(company.id)}</strong></td>
      <td>${companyRowActions(company.id)}</td>
    </tr>
  `;
}

function companyRowActions(id) {
  return `
      <div class="actions wrap">
        <button class="btn secondary compact" type="button" data-company-detail="${id}">${icon("company")} Abrir Empresa</button>
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
    ${sectionHead("Funcionários / FIT", "Lista operacional de trabalhadores vinculados a empresas, contratos e status documentais.")}
    ${editingEmployee ? renderEmployeeEditor(editingEmployee) : ""}
    ${toolbar("Buscar por nome, CPF, matricula, empresa, contrato, centro de custo ou status")}
    ${renderEmployeeStatusFilters()}
    ${renderOperationalFilters("employees", baseItems, { quicks: ["Todos", "Ativo", "Bloqueado", "Pendente", "Medicina", "EHS", "Desmobilizado"], exportKey: "funcionarios-ativos" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("employees", "ID/Matrícula", "id")}${sortableHeader("employees", "Nome", "name")}${sortableHeader("employees", "CPF", "cpf")}<th>Empresa</th><th>Contrato</th>${sortableHeader("employees", "Funcao", "sector")}<th>Centro de custo</th>${sortableHeader("employees", "Status documental", "status")}<th>Status contratacao</th><th>Etapa atual do fluxo</th><th>ASO</th><th>Treinamento</th><th>Ultima atualizacao</th><th>Acoes</th></tr></thead>
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
          inputField("registration", "Matrícula do funcionario", item.registration, "required"),
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
        ${formSection("Endereço", [
          inputField("cep", "CEP", item.cep, "required inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
          inputField("city", "Cidade", item.city, "required"),
          inputField("district", "Bairro", item.district, "required"),
          inputField("street", "Rua", item.street, "required"),
          inputField("number", "Número", item.number, "required"),
          inputField("complement", "Complemento", item.complement),
        ])}
        ${formSection("Status operacional", [
          inputField("asoValidity", "Validade de ASO", item.asoValidity, "type='date' required"),
          inputField("trainingValidity", "Validade de treinamento", item.trainingValidity, "type='date' required"),
          selectField("docStatus", "Status documental", item.docStatus || "Pendente", documentStatuses.map(option)),
          selectField("status", "Status", item.status || "Em analise", hiringStatuses.map(option)),
          textAreaField("notes", "Observações", item.notes),
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

function extractOperationalReasonText(raw = "") {
  const text = String(raw || "").trim();
  if (!text) return "";
  const match = text.match(/motivo:\s*([^\n\r]+)/i);
  if (match?.[1]) return match[1].trim();
  const firstLine = text.split("\n").map((line) => line.trim()).find(Boolean) || "";
  return firstLine.length > 140 ? `${firstLine.slice(0, 137)}...` : firstLine;
}

function workflowDisplayStatus(status = "") {
  const token = statusToken(status);
  if (token.includes("aprovado")) return "Concluido";
  if (token.includes("revisao solicitada") || token.includes("revalidacao solicitada") || token.includes("em revalidacao")) return "Em analise";
  if (token.includes("em avaliacao")) return "Em analise";
  if (token.includes("enviado para") || token.includes("rascunho pelo fornecedor")) return "Pendente";
  if (token.includes("reativacao solicitada")) return "Em analise";
  if (token.includes("inativo") || token.includes("desmobilizado") || token.includes("encerrado")) return "Concluido";
  if (token.includes("pendente")) return "Pendente";
  if (token.includes("em analise")) return "Em analise";
  return "Pendente";
}

function workflowDisplayClass(status = "") {
  const token = statusToken(status);
  if (token.includes("concluido")) return "ok";
  if (token.includes("bloqueado por etapa anterior")) return "warn";
  if (token.includes("reprovado") || token.includes("revisao solicitada") || token.includes("revalidacao solicitada") || token.includes("reativacao solicitada") || token.includes("em revalidacao") || token.includes("em avaliacao") || token.includes("enviado para") || token.includes("rascunho pelo fornecedor") || token.includes("em analise")) return "analysis";
  if (token.includes("inativo") || token.includes("desmobilizado") || token.includes("encerrado")) return "bad";
  return "warn";
}

function employeeWorkflowReason(employee, step) {
  const normalized = normalizeEmployee(employee);
  const action = employeeWorkflowActions(normalized)?.[step.id] || {};
  const actionReason = extractOperationalReasonText(action.motivo || action.observation || "");
  if (actionReason) return actionReason;
  if (statusMatches(step.status, "Em avaliação", "Enviado para Fiscal", "Enviado para Medicina", "Enviado para EHS", "Enviado para Patrimonial", "Rascunho pelo Fornecedor")) {
    return "Aguardando avaliacao do setor responsavel.";
  }
  if (statusMatches(step.status, "Bloqueado por etapa anterior")) {
    return "Aguardando conclusao da etapa anterior.";
  }
  if (String(step.status || "").startsWith("Aguardando")) {
    return "Aguardando aprovacao da etapa anterior.";
  }
  if (step.id === "liberacao") return statusMatches(step.status, "Aprovado") ? "Fluxo completo concluido." : "Aguardando conclusao das etapas anteriores.";
  const stepDocs = state.documents.filter((doc) => sameId(doc.employeeId, normalized.id) && documentOperationalSector(doc) === step.sector);
  const issueDoc = stepDocs.find((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Vencido", "Pendente", "Em analise", "A vencer"));
  if (!issueDoc) return "";
  const docReason = extractOperationalReasonText(documentVisibleNotes(issueDoc));
  if (docReason) return docReason;
  return `${issueDoc.type || "Documento"} em ${docStatus(issueDoc).toLowerCase()}.`;
}

function employeeOperationalStages(employee) {
  const normalized = normalizeEmployee(employee);
  const workflowSteps = employeeWorkflowSteps(normalized);
  const byId = Object.fromEntries(workflowSteps.map((step) => [step.id, step]));
  const supplierStatus = employeeHasCoreData(normalized) ? "Concluido" : "Pendente";
  const documentStep = byId.fiscal || { status: "Pendente" };
  const medicineStep = byId.medicina || { status: "Pendente" };
  const ehsStep = byId.ehs || { status: "Pendente" };
  const patrimonialStep = byId.patrimonial || { status: "Pendente" };
  const liberacaoStep = byId.liberacao || { status: "Pendente" };
  return [
    {
      key: "supplier",
      label: "Fornecedor",
      status: supplierStatus,
      reason: supplierStatus === "Concluido" ? "Cadastro base enviado pelo fornecedor." : "Aguardando dados obrigatorios do fornecedor.",
    },
    {
      key: "documentation",
      label: "Documentação",
      status: workflowStepPresentationStatus(documentStep, documentStep.status, 0, workflowSteps),
      reason: employeeWorkflowReason(normalized, { ...documentStep, id: "fiscal", sector: "Fiscal" }),
    },
    {
      key: "medicine",
      label: "Medicina",
      status: workflowStepPresentationStatus(medicineStep, medicineStep.status, 1, workflowSteps),
      reason: employeeWorkflowReason(normalized, { ...medicineStep, id: "medicina", sector: "Medicina" }),
    },
    {
      key: "ehs",
      label: "EHS/SSMA",
      status: workflowStepPresentationStatus(ehsStep, ehsStep.status, 2, workflowSteps),
      reason: employeeWorkflowReason(normalized, { ...ehsStep, id: "ehs", sector: "EHS" }),
    },
    {
      key: "patrimonial",
      label: "Patrimonial",
      status: workflowStepPresentationStatus(patrimonialStep, patrimonialStep.status, 3, workflowSteps),
      reason: employeeWorkflowReason(normalized, { ...patrimonialStep, id: "patrimonial", sector: "Patrimonial" }),
    },
    {
      key: "released",
      label: "Liberado",
      status: workflowStepPresentationStatus(liberacaoStep, liberacaoStep.status, 4, workflowSteps),
      reason: employeeWorkflowReason(normalized, { ...liberacaoStep, id: "liberacao", sector: "Fiscal" }),
    },
  ];
}

function employeeCurrentOperationalStage(employee) {
  const status = normalizeHiringStatusLabel(employee.status);
  if (isOperationalWorkflowClosedStatus(status)) return "Funcionário inativo/desmobilizado. Workflow operacional encerrado.";
  if (isReactivationRequestedStatus(status)) return "Reativação solicitada - aguardando análise.";
  const stages = employeeOperationalStages(employee);
  const firstPending = stages.find((stage) => !statusMatches(stage.status, "Concluido"));
  return firstPending ? `${firstPending.label} (${firstPending.status})` : "Liberado (Concluido)";
}

function renderEmployeeWorkflowInline(employee) {
  const status = normalizeHiringStatusLabel(employee.status);
  if (isOperationalWorkflowClosedStatus(status)) {
    return `
      <div class="history-list">
        <div class="item-card">
          <strong>Workflow operacional encerrado</strong>
          <span class="muted">Funcionário inativo/desmobilizado. Workflow operacional encerrado.</span>
        </div>
      </div>
    `;
  }
  if (isReactivationRequestedStatus(status)) {
    return `
      <div class="history-list">
        <div class="item-card">
          <strong>Reativação solicitada</strong>
          <span class="muted">Solicitação encaminhada para análise. Workflow pausado até decisão.</span>
        </div>
      </div>
    `;
  }
  const stages = employeeOperationalStages(employee);
  return `
    <div class="history-list">
      ${stages.map((stage) => `<div class="item-card"><div class="item-row"><strong>${stage.label}</strong><span class="status ${workflowDisplayClass(stage.status)}">${stage.status}</span></div>${stage.reason ? `<span class="muted">${escapeHtml(stage.reason)}</span>` : ""}</div>`).join("")}
    </div>
  `;
}

function renderEmployeeRow(employee) {
  const item = normalizeEmployee(employee);
  const group = employeeVisualGroup(item);
  const company = state.companies.find((entry) => sameId(entry.id, item.companyId));
  const currentStage = employeeCurrentOperationalStage(item);
  const stageReason = (employeeOperationalStages(item).find((stage) => !statusMatches(stage.status, "Concluido")) || {}).reason || "Fluxo sem pendencias.";
  return `
    <tr class="employee-row employee-row-${group.key}">
      <td><button class="link-button" type="button" data-employee-record="${employee.id}">${escapeHtml(employeeRegistration(item))}</button></td>
      <td><button class="link-button strong" type="button" data-employee-record="${employee.id}">${escapeHtml(item.name)}</button><br><span class="muted">${item.address || "Endereço nao informado"}</span></td>
      <td>${item.cpf}</td>
      <td>${companyName(item.companyId)}</td>
      <td>${item.contract || company?.contract || "Nao informado"}</td>
      <td>${item.role}</td>
      <td>${item.costCenter || employeeCostCenter(item, company)}</td>
      <td>${statusBadge(item.docStatus)}</td>
      <td>${statusBadge(item.status)}</td>
      <td><strong>${escapeHtml(currentStage)}</strong><br><span class="muted">${escapeHtml(stageReason)}</span></td>
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
  if (!items.length) return emptyRow(14);
  const groups = [
    { key: "active", title: "Funcionários ativos" },
    { key: "blocked", title: "Funcionários bloqueados" },
    { key: "inactive", title: "Funcionários desmobilizados/inativos" },
  ];
  return groups
    .map((group) => {
      const employees = items.filter((employee) => employeeVisualGroup(employee).key === group.key);
      if (!employees.length) return "";
      return `
        <tr class="employee-group-row employee-group-${group.key}">
          <td colspan="14">
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
  if (statusMatches(status, "Bloqueado")) return { key: "blocked", title: "Funcionários bloqueados" };
  if (statusMatches(status, "Desmobilizado", "Inativo")) return { key: "inactive", title: "Funcionários desmobilizados/inativos" };
  return { key: "active", title: "Funcionários ativos" };
}

function openEmployeeRecord(id) {
  const employee = visibleEmployees().find((item) => sameId(item.id, id));
  if (!employee || !canAccessEmployee(employee)) return;
  const item = normalizeEmployee(employee);
  const company = normalizeCompany(state.companies.find((entry) => sameId(entry.id, item.companyId)) || {});
  const contractSource = normalizeCompany(state.companies.find((entry) => sameId(entry.id, item.contractSourceId || item.companyId)) || company);
  const currentStage = employeeCurrentOperationalStage(item);
  const tabs = employeeRecordTabs();
  const defaultTab = tabs[0]?.[0] || "summary";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop employee-record-backdrop";
  modal.innerHTML = `
    <section class="modal employee-record-modal">
      ${renderRecordActionBar("employee", item)}
      <div class="employee-record-header">
        <div class="employee-avatar">${avatarMarkup(employeePhotoUrl(item), employeeInitials(item.name), `Foto de ${item.name || ""}`)}</div>
        <div class="employee-record-title">
          <span class="eyebrow">Ficha detalhada do funcionario / FIT</span>
          <h2>${item.name}</h2>
          <div class="employee-record-meta">
            <span>CPF ${item.cpf || "Nao informado"}</span>
            <span>Empresa ${company.name || "Empresa nao informada"}</span>
            <span>Contrato ${item.contract || contractSource.contract || company.contract || "Nao informado"}</span>
            <span>CC ${item.costCenter || employeeCostCenter(item, contractSource || company)}</span>
            <span>Fiscal ${item.companyFiscal || contractSource.fiscal || company.fiscal || "Nao informado"}</span>
            <span>Gestor ${item.contractManager || contractSource.manager || contractSource.responsible || company.manager || company.responsible || "Nao informado"}</span>
            <span>Servico ${item.serviceType || contractSource.serviceType || contractSource.risk || company.serviceType || company.risk || "Nao informado"}</span>
            <span>Unidade ${item.unitSector || contractSource.unitSector || contractUnit(contractSource || company) || "Nao informado"}</span>
            <span>Matrícula ${employeeRegistration(item)}</span>
            <span>${item.role || "Funcao nao informada"}</span>
            <span>Atualizado ${formatDateTime(employeeUpdatedAt(item))}</span>
          </div>
        </div>
        <div class="employee-record-status">
          ${statusBadge(item.status)}
          ${statusBadge(item.docStatus)}
          ${statusBadge(employeeActiveState(item))}
          ${statusBadge(currentStage)}
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
      <div class="modal-body record-footer">${renderRecordFooter("Funcionário/FIT", employeeActivityRows(item), "funcionario", item.id)}</div>
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
    const reactivation = event.target.closest("[data-reactivation-type]");
    if (reactivation) {
      event.stopPropagation();
      const handled = handleReactivationAction(
        reactivation.dataset.reactivationType,
        reactivation.dataset.reactivationAction,
        reactivation.dataset.id,
        { source: "Ficha do funcionário" },
      );
      if (handled) {
        modal.remove();
        openEmployeeRecord(id);
      }
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
  modal.addEventListener("submit", async (event) => {
    const form = event.target.closest("[data-employee-patrimonial-form]");
    if (!form) return;
    event.preventDefault();
    const submit = form.querySelector("button[type='submit']");
    if (submit?.disabled) return;
    if (submit) submit.disabled = true;
    try {
      await saveEmployeePatrimonialFields(item.id, new FormData(form));
    } finally {
      if (submit) submit.disabled = false;
    }
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
    ["contracts", "Vínculo / Contrato"],
    ["docs", "Documentos Pessoais"],
    ["medicine", "Medicina"],
    ["ehs", "EHS / SSMA"],
    ["patrimonial", "Segurança Patrimonial"],
    ["requests", "Solicitações"],
    ["history", "Histórico"],
  ];
  const allowed = new Set(["summary", "contracts", "requests", "history", ...allowedEmployeeTabs()]);
  return allTabs.filter(([tab]) => allowed.has(tab));
}

function renderEmployeeRecordTab(employee, tab) {
  const normalized = normalizeEmployee(employee);
  const company = normalizeCompany(state.companies.find((item) => sameId(item.id, normalized.companyId)) || {});
  const contractSource = normalizeCompany(state.companies.find((item) => sameId(item.id, normalized.contractSourceId || normalized.companyId)) || company);
  const companyDocs = state.documents.filter((doc) => sameId(doc.companyId, normalized.companyId) && !doc.employeeId);
  const employeeDocs = state.documents.filter((doc) => sameId(doc.employeeId, normalized.id));
  const allDocs = [...employeeDocs, ...companyDocs];
  if (tab === "summary") {
    const stages = employeeOperationalStages(normalized);
    return `
      <div class="detail-grid">
        ${detailCard("CPF", normalized.cpf || "Nao informado")}
        ${detailCard("Empresa", company.name || "Nao informado")}
        ${detailCard("Contrato", normalized.contract || contractSource.contract || company.contract || "Nao informado")}
        ${detailCard("Centro de custo", normalized.costCenter || employeeCostCenter(normalized, contractSource || company))}
        ${detailCard("Fiscal responsável", normalized.companyFiscal || contractSource.fiscal || company.fiscal || "Nao informado")}
        ${detailCard("Gestor do contrato", normalized.contractManager || contractSource.manager || contractSource.responsible || company.manager || company.responsible || "Nao informado")}
        ${detailCard("Tipo de servico", normalized.serviceType || contractSource.serviceType || contractSource.risk || company.serviceType || company.risk || "Nao informado")}
        ${detailCard("Unidade / setor", normalized.unitSector || contractSource.unitSector || contractUnit(contractSource || company) || "Nao informado")}
        ${detailCard("Status documental", statusBadge(normalized.docStatus))}
        ${detailCard("Status contratacao", statusBadge(normalized.status))}
        ${detailCard("Etapa atual", employeeCurrentOperationalStage(normalized))}
        ${detailCard("Ultima atualizacao", formatDateTime(employeeUpdatedAt(normalized)) || "Nao informado")}
      </div>
      <div class="employee-flow-summary">
        <div class="item-card">
          <strong>Fluxo operacional</strong>
          ${renderEmployeeWorkflowInline(normalized)}
        </div>
        <div class="item-card">
          <strong>Resumo das etapas</strong>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Etapa</th><th>Status</th><th>Motivo/Pendencia</th></tr></thead>
              <tbody>${stages.map((stage) => `<tr><td><strong>${stage.label}</strong></td><td><span class="status ${workflowDisplayClass(stage.status)}">${stage.status}</span></td><td>${escapeHtml(stage.reason || "Sem pendencia.")}</td></tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
      </div>
      ${renderEmployeeApprovalCards(normalized)}
    `;
  }
  if (tab === "personal") {
    return `
      <div class="detail-grid">
        ${detailCard("Nome", normalized.name)}
        ${detailCard("CPF", normalized.cpf || "Nao informado")}
        ${detailCard("Matrícula", employeeRegistration(normalized))}
        ${detailCard("Data de nascimento", formatDate(normalized.birthDate))}
        ${detailCard("Nome da mae", normalized.motherName || "Nao informado")}
        ${detailCard("Nome do pai", normalized.fatherName || "Nao informado")}
        ${detailCard("Empresa", company.name || "Nao informado")}
        ${detailCard("Contrato vinculado", normalized.contract || contractSource.contract || company.contract || "Nao informado")}
        ${detailCard("Centro de custo", normalized.costCenter || employeeCostCenter(normalized, contractSource || company))}
        ${detailCard("Funcao", normalized.role || "Nao informado")}
        ${detailCard("Status", statusBadge(normalized.status))}
        ${detailCard("Data de admissao", formatDate(normalized.admission || normalized.startDate))}
        ${detailCard("Situacao", statusBadge(employeeActiveState(normalized)))}
        ${detailCard("CEP", normalized.cep || "Nao informado")}
        ${detailCard("Cidade", normalized.city || "Nao informado")}
        ${detailCard("Bairro", normalized.district || "Nao informado")}
        ${detailCard("Rua", normalized.street || "Nao informado")}
        ${detailCard("Número", normalized.number || "Nao informado")}
        ${detailCard("Complemento", normalized.complement || "Nao informado")}
        ${detailCard("UF", normalized.uf || "Nao informado")}
        ${detailCard("Endereço completo", normalized.address || "Nao informado")}
        ${detailCard("Observações", normalized.notes || "Sem observacoes")}
      </div>
    `;
  }
  if (tab === "contracts") {
    return `
      <div class="detail-grid">
        ${detailCard("Empresa vinculada", company.name || "Nao informado")}
        ${detailCard("Contrato selecionado", normalized.contract || contractSource.contract || company.contract || "Nao informado")}
        ${detailCard("Centro de custo", normalized.costCenter || employeeCostCenter(normalized, contractSource || company))}
        ${detailCard("Fiscal responsável", normalized.companyFiscal || contractSource.fiscal || company.fiscal || "Nao informado")}
        ${detailCard("Gestor do contrato", normalized.contractManager || contractSource.manager || contractSource.responsible || company.manager || company.responsible || "Nao informado")}
        ${detailCard("Tipo de servico", normalized.serviceType || contractSource.serviceType || contractSource.risk || company.serviceType || company.risk || "Nao informado")}
        ${detailCard("Unidade / setor", normalized.unitSector || contractSource.unitSector || contractUnit(contractSource || company) || "Nao informado")}
      </div>
      <div class="contract-context-actions">
        ${company.id ? `<button class="btn secondary compact" type="button" data-company-detail="${company.id}">${icon("company")} Abrir empresa</button>` : ""}
      </div>
      ${renderCompanyTabHistory(company, "general", "Histórico do vinculo contratual")}
    `;
  }
  if (tab === "docs") return renderEmployeeDocsTable(employeeDocs, "Documentos pessoais do funcionario");
  if (tab === "medicine") {
    const medicineDocs = employeeDocs.filter((doc) => /aso|exame|medic/i.test(doc.type));
    return `
      <div class="detail-grid">
        ${detailCard("Validade ASO", formatDate(normalized.asoValidity))}
        ${detailCard("Status documental", statusBadge(normalized.docStatus))}
        ${detailCard("Status medicina", statusBadge(employeeMedicineStatus(normalized, medicineDocs)))}
      </div>
      ${renderEmployeeDocsTable(medicineDocs, "Documentos de medicina ocupacional")}
    `;
  }
  if (tab === "ehs") {
    const ehsDocs = employeeDocs.filter((doc) => /nr-|treinamento|epi|segur/i.test(doc.type));
    return `
      <div class="detail-grid">
        ${detailCard("Validade treinamento", formatDate(normalized.trainingValidity))}
        ${detailCard("Status EHS", statusBadge(employeeEhsStatus(normalized, ehsDocs)))}
        ${detailCard("Funcao analisada", normalized.role || "Nao informado")}
      </div>
      ${renderEmployeeDocsTable(ehsDocs, "Treinamentos e seguranca do trabalho")}
    `;
  }
  if (tab === "patrimonial") {
    const isPatrimonialEditor = ["admin", "patrimonial"].includes(currentUser()?.role || "");
    const patrimonialReleaseDate = normalized.patrimonialReleaseDate || normalized.releaseDate || "";
    const patrimonialBadge = normalized.badgeNumber || normalized.cracha || normalized.crachaNumber || "";
    return `
      <div class="detail-grid">
        ${detailCard("Liberação patrimonial", statusBadge(employeePatrimonialStatus(normalized)))}
        ${detailCard("Empresa", company.name || "Nao informado")}
        ${detailCard("Contrato", normalized.contract || contractSource.contract || company.contract || "Nao informado")}
        ${detailCard("Matrícula", normalized.registration || employeeRegistration(normalized))}
      </div>
      ${isPatrimonialEditor ? `
        <form class="employee-patrimonial-form" data-employee-patrimonial-form="${normalized.id}">
          <div class="detail-grid compact">
            ${inputField("patrimonialRegistration", "Matrícula", normalized.registration || employeeRegistration(normalized), "required")}
            ${inputField("badgeNumber", "Crachá", patrimonialBadge)}
            ${inputField("patrimonialReleaseDate", "Data de liberacao", patrimonialReleaseDate, "date")}
            ${textAreaField("patrimonialNotes", "Observações patrimoniais", normalized.patrimonialNotes || "")}
          </div>
          <div class="actions wrap">
            <button class="btn primary compact" type="submit">${icon("save")} Salvar patrimonial</button>
          </div>
        </form>
      ` : `<div class="item-card"><strong>Controle patrimonial</strong><span class="muted">Acesso final condicionado a documentação, medicina, EHS e aprovacao fiscal.</span></div>`}
    `;
  }
  if (tab === "requests") {
    const requestEvents = employeeRequestEvents(normalized);
    return `
      <div class="detail-grid">
        ${detailCard("Solicitações registradas", requestEvents.length)}
        ${detailCard("Etapa atual", employeeCurrentOperationalStage(normalized))}
        ${detailCard("Status contratacao", statusBadge(normalized.status))}
        ${detailCard("Status documental", statusBadge(normalized.docStatus))}
      </div>
      ${renderEmployeeRequestTable(requestEvents)}
    `;
  }
  if (tab === "history") {
    return renderEmployeeHistoryTable(employeeHistoryEvents(normalized), [
      `<div class="item-card"><strong>Cadastro do trabalhador/FIT</strong><span class="muted">${formatDate(normalized.admission || normalized.startDate)} - ${normalized.name}</span></div>`,
      `<div class="item-card"><strong>Empresa vinculada</strong><span class="muted">${company.name || "Nao informado"}</span></div>`,
      `<div class="item-card"><strong>Documentos associados</strong><span class="muted">${allDocs.length} documento(s) monitorados.</span></div>`,
      `<div class="item-card"><strong>Status atual</strong><span class="muted">${normalized.status}</span></div>`,
    ]);
  }
  return renderEmployeeHistoryTable(employeeHistoryEvents(normalized));
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
              <strong>${step.id === "ehs" ? "EHS / SSMA" : step.label.replace(" / Documentos pessoais", "")}</strong>
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
          <thead><tr><th>Documento</th><th>Validade</th><th>Status</th><th>Observações</th></tr></thead>
          <tbody>
            ${docs.length ? docs.map((doc) => `<tr><td><strong>${doc.type}</strong></td><td>${formatDate(doc.dueDate)}</td><td>${statusBadge(docStatus(doc))}</td><td>${doc.notes || "<span class='muted'>Sem observacao</span>"}</td></tr>`).join("") : emptyRow(4)}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function employeeHistoryEvents(employee = {}) {
  const item = normalizeEmployee(employee);
  return historyEventsFor("funcionario", item.id);
}

function employeeRequestEvents(employee = {}) {
  return employeeHistoryEvents(employee).filter((event) => {
    const text = normalizeSearchValue(`${event.action || event.acao || ""} ${event.observation || event.observacao || ""} ${event.status || event.nextStatus || ""}`);
    return text.includes("solicit") || text.includes("revalid") || text.includes("enviado para") || text.includes("avaliacao");
  });
}

function renderEmployeeRequestTable(events = []) {
  const rows = events.length
    ? events.map((event) => {
        const previousValue = event.previousStatus ?? event.status_anterior ?? "";
        const nextValue = event.nextStatus ?? event.status_novo ?? "";
        const sector = event.sector || event.setor || "Nao informado";
        return `
          <tr>
            <td><strong>${formatDateTime(event.createdAt || event.criado_em)}</strong></td>
            <td>${escapeHtml(event.userName || event.usuario_nome || "Sistema")}</td>
              <td><span class="mini-pill">${escapeHtml(historyEventProfile(event))}</span></td>
            <td>${escapeHtml(event.action || event.acao || "Solicitação")}</td>
            <td>${escapeHtml(sector)}</td>
            <td>${escapeHtml(event.observation || event.observacao || "Sem motivo")}</td>
            <td>${escapeHtml(previousValue || "Nao informado")}</td>
            <td>${escapeHtml(nextValue || "Nao informado")}</td>
          </tr>
        `;
      }).join("")
    : emptyRow(8);
  return `
    <section class="employee-request-section">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Data/Hora</th><th>Usuário</th><th>Perfil</th><th>Acao</th><th>Setor</th><th>Motivo/Observacao</th><th>Status anterior</th><th>Status novo</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderEmployeeHistoryTable(events = [], fallbackItems = []) {
  const rows = events.length
    ? events.map((event) => {
        const previousValue = event.previousStatus ?? event.status_anterior ?? "";
        const nextValue = event.nextStatus ?? event.status_novo ?? "";
        return `
          <tr>
            <td><strong>${formatDateTime(event.createdAt || event.criado_em)}</strong></td>
            <td>${escapeHtml(event.userName || event.usuario_nome || "Sistema")}</td>
              <td><span class="mini-pill">${escapeHtml(historyEventProfile(event))}</span></td>
            <td>${escapeHtml(event.action || event.acao || "Alteracao registrada")}</td>
            <td>${escapeHtml(event.sector || event.setor || "Nao informado")}</td>
            <td>${escapeHtml(event.observation || event.observacao || "Sem observacao")}</td>
            <td>${escapeHtml(previousValue || "Nao informado")}</td>
            <td>${escapeHtml(nextValue || "Nao informado")}</td>
          </tr>
        `;
      }).join("")
    : "";
  return `
    <section class="employee-history-section">
      ${fallbackItems.length && !rows ? `<div class="history-list">${fallbackItems.join("")}</div>` : ""}
      <div class="table-wrap">
        <table>
          <thead><tr><th>Data/Hora</th><th>Usuário</th><th>Perfil</th><th>Acao</th><th>Setor</th><th>Motivo/Observacao</th><th>Status anterior</th><th>Status novo</th></tr></thead>
          <tbody>${rows || emptyRow(8)}</tbody>
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
          ${employeeWorkflowReason(employee, step) ? `<span class="muted">${escapeHtml(employeeWorkflowReason(employee, step))}</span>` : ""}
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
    label: "Liberação final",
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
      <button class="btn danger compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="review">${icon("block")} Solicitar Revisão</button>
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
  const employee = state.employees.find((item) => sameId(item.id, employeeId));
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
  const actor = currentUser()?.name || currentUser()?.email || "Usuário do sistema";
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
      alert("Matrícula do gestor obrigatoria. A aprovacao com pendencia nao foi salva.");
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
    Reprovado: "Solicitar Revisão",
    "Revisão solicitada": "Solicitar Revisão",
    "Revalidação solicitada": "Revalidação solicitada",
    "Reativação solicitada": "Reativação solicitada",
    "Em revalidação": "Em revalidação",
    "Em avaliação": "Em avaliação",
    "Rascunho pelo Fornecedor": "Rascunho pelo Fornecedor",
    "Bloqueado por etapa anterior": "Bloqueado por etapa anterior",
    Bloqueado: "Bloqueado",
    Inativo: "Inativo",
    Inativa: "Inativa",
    Desmobilizado: "Desmobilizado",
    Desmobilizada: "Desmobilizada",
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
  if (docs.some((doc) => statusMatches(doc.status, "Revalidação solicitada") || statusMatches(docStatus(doc), "Revalidação solicitada"))) return "Revalidação solicitada";
  if (docs.some((doc) => statusMatches(doc.status, "Revisão solicitada") || statusMatches(docStatus(doc), "Revisão solicitada"))) return "Revisão solicitada";
  if (docs.some((doc) => statusMatches(docStatus(doc), "Vencido"))) return exception ? "Aprovado com pendencia" : "Pendente";
  if (pending || docs.some((doc) => ["Pendente", "A vencer", "Em análise"].some((value) => statusMatches(docStatus(doc), value)))) return exception ? "Aprovado com pendencia" : "Pendente";
  if (approved || docs.some((doc) => ["Aprovado", "A vencer"].some((value) => statusMatches(docStatus(doc), value)))) return "Aprovado";
  return exception ? "Aprovado com pendencia" : "Pendente";
}

function workflowStatusClass(status) {
  const token = statusToken(status);
  if (token.includes("bloqueado por etapa anterior")) return "warn";
  if (token.includes("revisao solicitada") || token.includes("revalidacao solicitada") || token.includes("em revalidacao")) return "analysis";
  if (token.includes("em avaliacao") || token.includes("enviado para") || token.includes("rascunho pelo fornecedor")) return "analysis";
  if (token.includes("reativacao solicitada") || token.includes("desmobilizado") || token.includes("desmobilizada") || token.includes("inativo") || token.includes("inativa")) return "warn";
  return {
    Aprovado: "ok",
    "Aprovado com pendencia": "conditional",
    Pendente: "warn",
    Reprovado: "analysis",
    "Revisão solicitada": "analysis",
    "Revalidação solicitada": "analysis",
    "Reativação solicitada": "warn",
    "Em revalidação": "analysis",
    "Em avaliação": "analysis",
    "Rascunho pelo Fornecedor": "info",
    Bloqueado: "blocked",
    Inativo: "bad",
    Inativa: "bad",
    Desmobilizado: "bad",
    Desmobilizada: "bad",
    "Pendente Documentação": "warn",
    "Pendente Medicina": "warn",
    "Pendente EHS": "warn",
    "Pendente Patrimonial": "warn",
    "Acesso ativo": "ok",
    "Acesso inativo": "bad",
    "Convite enviado": "analysis",
    "Sem usuário de acesso": "warn",
    "Aguardando liberação de acesso": "warn",
    "Aguardando Correção": "analysis",
  }[status] || statusClass(status);
}

function workflowIsConcludedStatus(status = "") {
  return statusMatches(status, "Aprovado", "Aprovado com pendencia", "Aprovado com pendência", "Liberado") || isOperationalWorkflowClosedStatus(status);
}

function workflowIsReviewStatus(status = "") {
  const token = statusToken(status);
  return token === "reprovado" || token.includes("revisao solicitada") || token.includes("revalidacao solicitada") || token.includes("em revalidacao");
}

function workflowIsEvaluationStatus(status = "") {
  const token = statusToken(status);
  return token.includes("em avaliacao") || token.includes("em revalidacao") || token.includes("enviado para") || token.includes("rascunho pelo fornecedor");
}

function workflowStepPresentationStatus(step, rawStatus, index, steps = []) {
  const normalizedRaw = String(rawStatus || "").trim();
  const previousStep = steps[index - 1];
  const role = currentUser()?.role || "";
  const sectorRole = { Fiscal: "fiscal", Medicina: "medicina", EHS: "ehs", Patrimonial: "patrimonial" }[step.sector] || "";
  const isSectorViewer = role === "admin" || role === sectorRole;
  if (workflowIsConcludedStatus(normalizedRaw)) return normalizedRaw === "Aprovado com pendencia" ? "Aprovado com pendência" : normalizedRaw;
  if (statusToken(normalizedRaw).includes("revalidacao solicitada")) return "Revalidação solicitada";
  if (workflowIsReviewStatus(normalizedRaw)) return normalizedRaw === "Em revalidação" ? "Em revalidação" : `Revisão solicitada pelo ${step.sector}`;
  if (workflowIsEvaluationStatus(normalizedRaw)) {
    if (statusToken(normalizedRaw).includes("enviado para") && isSectorViewer) return `Em avaliação ${step.sector}`;
    return normalizedRaw === "Rascunho pelo Fornecedor" && isSectorViewer ? "Em avaliação Fiscal" : normalizedRaw;
  }
  if (index === 0) return isSectorViewer ? "Em avaliação Fiscal" : "Rascunho pelo Fornecedor";
  if (previousStep && !workflowIsConcludedStatus(previousStep.status)) return "Bloqueado por etapa anterior";
  return isSectorViewer ? `Em avaliação ${step.sector}` : `Enviado para ${step.sector}`;
}

function employeeWorkflowEditableBySupplier(employee) {
  const steps = employeeWorkflowSteps(employee);
  const active = steps.find((step) => !workflowIsConcludedStatus(step.status));
  if (!active) return false;
  const token = statusToken(active.status);
  return token.includes("rascunho pelo fornecedor") || token.includes("revisao solicitada") || token.includes("revalidacao solicitada");
}

function employeeWorkflowCurrentStep(employee) {
  return employeeWorkflowSteps(employee).find((step) => !workflowIsConcludedStatus(step.status));
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
  if (statusMatches(status, "Reativação solicitada")) return "Reativação solicitada";
  if (statusMatches(status, "Desmobilização solicitada")) return "Desmobilização solicitada";
  if (statusMatches(status, "Desmobilizado", "Inativo")) return "Inativo";
  if (isPendingHiringStatus(status)) return "Ativo com pendência";
  return "Ativo";
}

function employeeMedicineStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "medicina");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada", "Reativação solicitada", "Inativo")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const medicineDocs = docs.filter((doc) => /aso|exame|medic/i.test(doc.type));
  if (medicineDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Vencido", "Pendente", "Em análise"))) return "Pendente";
  if (medicineDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer"))) return "Aprovado";
  return employee.asoValidity && !isPastDate(employee.asoValidity) ? "Aprovado" : "Pendente";
}

function employeeEhsStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "ehs");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada", "Reativação solicitada", "Inativo")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const ehsDocs = docs.filter((doc) => /nr-|treinamento|epi|segur/i.test(doc.type));
  if (ehsDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Vencido", "Pendente", "Em análise"))) return "Pendente";
  if (ehsDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado", "A vencer"))) return "Aprovado";
  return employee.trainingValidity && !isPastDate(employee.trainingValidity) ? "Aprovado" : "Pendente";
}

function employeePatrimonialStatus(employee, docs = []) {
  const workflowStatus = employeeWorkflowActionStatus(employee, "patrimonial");
  if (statusMatches(workflowStatus, "Aprovado", "Aprovado com pendencia")) return "Aprovado";
  if (statusMatches(workflowStatus, "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Bloqueado")) return "Pendente";
  if (statusMatches(employee.status, "Bloqueado", "Desmobilizado", "Desmobilização solicitada", "Reativação solicitada", "Inativo")) return "Pendente";
  if (statusMatches(employee.status, "Liberado", "Aprovado")) return "Aprovado";
  const patrimonialDocs = docs.filter((doc) => documentOperationalSector(doc) === "Patrimonial");
  if (patrimonialDocs.some((doc) => statusMatches(docStatus(doc), "Reprovado", "Revisão solicitada", "Revalidação solicitada", "Vencido", "Pendente", "Em análise"))) return "Pendente";
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
    (item) => item.name,
    (item) => item.type,
    (item) => companyName(item.companyId),
    (item) => employeeName(item.employeeId),
    (item) => state.employees.find((employee) => sameId(employee.id, item.employeeId))?.cpf,
    (item) => employeeRegistration(state.employees.find((employee) => sameId(employee.id, item.employeeId)) || {}),
    (item) => state.companies.find((company) => sameId(company.id, item.companyId))?.contract,
    (item) => employeeCostCenter(state.employees.find((employee) => sameId(employee.id, item.employeeId)) || {}, state.companies.find((company) => sameId(company.id, item.companyId))),
    (item) => docStatus(item),
    (item) => item.dueDate,
  ]);
  const items = sortItems("documents", applyOperationalFilters("documents", filteredItems));
  const { pageItems, totalPages } = paginateItems("documents", items);
  return `
    ${sectionHead("Controle de documentos", "Registre obrigatorios, vencimentos e aprovacoes.", "Novo documento", "document")}
    ${toolbar("Buscar por documento, empresa, funcionario, CPF, matricula, contrato ou status")}
    ${renderOperationalFilters("documents", baseItems, { quicks: ["Todos", "Pendente", "Vencido", "A vencer", "Medicina", "EHS"], exportKey: "documentos-vencidos" })}
    <section class="panel table-wrap">
      <table>
        <thead><tr>${sortableHeader("documents", "Documento", "sector")}${sortableHeader("documents", "Empresa", "company")}<th>Funcionário</th>${sortableHeader("documents", "Vencimento", "dueDate")}${sortableHeader("documents", "Status", "status")}<th>Observações</th><th>Acoes</th></tr></thead>
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
    (item) => normalizeCompany(item).fiscal,
    (item) => normalizeCompany(item).manager || normalizeCompany(item).responsible,
    (item) => normalizeCompany(item).endDate,
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
            <thead><tr>${sortableHeader("contracts", "Contrato", "contract")}${sortableHeader("contracts", "Empresa", "company")}${sortableHeader("contracts", "Unidade", "sector")}<th>Período</th><th>Dias</th>${sortableHeader("contracts", "Status", "status")}<th>Acoes</th></tr></thead>
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
  const company = visibleCompanies().find((item) => sameId(item.id, id));
  if (!company || !canAccessContract(company)) return;
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
          ["people", "Funcionários"],
          ["docs", "Documentos"],
          ["approvals", "Aprovações"],
          ["history", "Histórico"],
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
      <div><span>Funcionários</span><strong>${employees.length}</strong></div>
      <div><span>Pendencias</span><strong>${pendencies}</strong></div>
      <div><span>Vencimentos proximos</span><strong>${expiring}</strong></div>
      <div><span>Bloqueios ativos</span><strong>${blocks}</strong></div>
    </div>
  `;
}

function openCompanyEditorModal(id = null, context = {}) {
  const company = id ? state.companies.find((item) => sameId(item.id, id)) : null;
  if (!can("create.company") && !can("edit.company", company)) return;
  const modal = document.createElement("div");
  modal.className = "modal-backdrop company-editor-backdrop";
  modal.innerHTML = `
    <section class="modal company-detail-modal">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Cadastro de empresa</span>
          <h2>${company ? "Editar empresa" : "Nova empresa"}</h2>
        </div>
        <button class="btn icon" type="button" data-close title="Fechar">${icon("close")}</button>
      </div>
      <div class="modal-body">
        ${renderCompanyEditor(company, context)}
      </div>
    </section>
  `;
  document.body.appendChild(modal);
  bindInputMasks(modal);
  bindImageUploadPreviews(modal);
  bindCompanyContractFiscalToggle(modal);
  const form = modal.querySelector("#companyEditorForm");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = event.currentTarget.querySelector("button[type='submit']");
      if (submit?.disabled) return;
      if (submit) submit.disabled = true;
      try {
        const saved = await saveCompanyFromForm(new FormData(event.currentTarget));
        if (saved) {
          modal.remove();
          if (saved?.id) openCompanyDetails(saved.id);
        }
      } catch (error) {
        alert(`Nao foi possivel salvar a empresa.\n\n${persistenceMessage(error)}`);
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  }
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelector("[data-company-open-new]")?.addEventListener("click", () => {
    modal.remove();
    openCompanyEditorModal(null);
  });
  modal.querySelector("[data-demobilize='company']")?.addEventListener("click", (event) => {
    event.preventDefault();
    const companyId = event.currentTarget.dataset.id;
    modal.remove();
    demobilizeCompany(companyId);
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });
}

function openCompanyDetails(id, initialTab = "general") {
  const company = visibleCompanies().find((item) => sameId(item.id, id));
  if (!company || !canAccessCompany(company)) return;
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const pendencies = companyPendingDocumentsCount(company.id);
  const activeTab = initialTab || "general";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop company-detail-backdrop";
  modal.innerHTML = `
    <section class="modal contract-detail-modal company-detail-modal">
      ${renderRecordActionBar("company", item)}
      <div class="employee-record-header company-record-header">
        <div class="employee-avatar company-avatar">${avatarMarkup(companyLogoUrl(item), employeeInitials(item.name), `Logo da empresa ${item.name || ""}`)}</div>
        <div class="employee-record-title">
          <span class="eyebrow">Ficha detalhada da empresa</span>
          <h2>${item.name}</h2>
          <div class="employee-record-meta">
            <span>${companyTradeName(item)}</span>
            <span>CNPJ ${item.cnpj || "Nao informado"}</span>
            <span>ID/Código ${companyCode(item)}</span>
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
      ${renderCompanyOperationalSummary(item, employees, companyDocuments(company.id))}
      <div class="contract-tabs" role="tablist">
        ${[
          ["general", "Dados Gerais"],
          ["contracts", "Contratos"],
          ["people", "Funcionários"],
          ["docs", "Documentos da Empresa"],
          ["medicine", "Medicina Ocupacional"],
          ["ehs", "EHS / SSMA"],
          ["patrimonial", "Segurança Patrimonial"],
          ["managers", "Fiscais e Gestores"],
          ["requests", "Solicitações"],
          ["history", "Histórico"],
        ]
          .map(([tab, label], index) => `<button class="${tab === activeTab || (!activeTab && index === 0) ? "active" : ""}" type="button" data-company-tab="${tab}">${label}</button>`)
          .join("")}
      </div>
      <div class="modal-body company-tab-content">${renderCompanyTab(company, activeTab)}</div>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("click", (event) => {
    const recordEdit = event.target.closest("[data-record-edit]");
    if (recordEdit) {
      event.stopPropagation();
      modal.remove();
      openCompanyEditorModal(recordEdit.dataset.id);
      return;
    }
    const reactivation = event.target.closest("[data-reactivation-type]");
    if (reactivation) {
      event.stopPropagation();
      const handled = handleReactivationAction(
        reactivation.dataset.reactivationType,
        reactivation.dataset.reactivationAction,
        reactivation.dataset.id,
        { source: "Ficha da empresa" },
      );
      if (handled) {
        const activeCompanyTab = modal.querySelector("[data-company-tab].active")?.dataset.companyTab || activeTab;
        modal.remove();
        openCompanyDetails(id, activeCompanyTab);
      }
      return;
    }
    const requestAction = event.target.closest("[data-request-action]");
    if (requestAction) {
      event.stopPropagation();
      const handled = handleOperationalRequestAction(
        requestAction.dataset.requestKind,
        requestAction.dataset.requestAction,
        requestAction.dataset.requestEntityType,
        requestAction.dataset.id,
        { source: "Fila de solicitações da empresa" },
      );
      if (handled) {
        const activeCompanyTab = modal.querySelector("[data-company-tab].active")?.dataset.companyTab || activeTab;
        modal.remove();
        openCompanyDetails(id, activeCompanyTab);
      }
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
    modal.remove();
    openCompanyEditorModal(null, { template: normalizeCompany(company) });
  });
  modal.querySelector("[data-company-employee-new]")?.addEventListener("click", () => {
    const companyId = modal.querySelector("[data-company-employee-new]")?.dataset.companyId || company.id;
    modal.remove();
    openForm("employee", null, { companyId });
  });
  modal.querySelectorAll("[data-company-contract-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openCompanyDetails(button.dataset.companyContractOpen);
    });
  });
  modal.querySelectorAll("[data-company-contract-close]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (closeCompanyContract(button.dataset.companyContractClose)) modal.remove();
    });
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
  modal.querySelectorAll("[data-document-archive]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    archiveDocument(button.dataset.documentArchive);
    modal.querySelector(".company-tab-content").innerHTML = renderCompanyTab(company, modal.querySelector("[data-company-tab].active")?.dataset.companyTab || "general");
    bindCompanyDetailEvents(modal, company);
  }));
  modal.querySelector("#fiscalQuickForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveFiscalFromForm(new FormData(event.currentTarget));
    modal.querySelector(".company-tab-content").innerHTML = renderCompanyTab(company, "managers");
    bindCompanyDetailEvents(modal, company);
  });
  modal.querySelectorAll("[data-fiscal-access]").forEach((button) => button.addEventListener("click", async (event) => {
    event.stopPropagation();
    const fiscal = state.fiscais.find((item) => sameId(item.id, button.dataset.fiscalAccess));
    if (!fiscal) return;
    await createAccessForFiscal(fiscal);
    modal.querySelector(".company-tab-content").innerHTML = renderCompanyTab(company, "managers");
    bindCompanyDetailEvents(modal, company);
  }));
  modal.querySelectorAll("[data-fiscal-inactivate]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    inactivateFiscal(button.dataset.fiscalInactivate);
    modal.querySelector(".company-tab-content").innerHTML = renderCompanyTab(company, "managers");
    bindCompanyDetailEvents(modal, company);
  }));
}

function renderCompanyTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const documents = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  const workflowSummary = employees.reduce(
    (acc, employee) => {
      const normalized = normalizeEmployee(employee);
      const stages = employeeOperationalStages(normalized);
      const stage = (key) => stages.find((entry) => entry.key === key);
      if (statusMatches(normalized.status, "Bloqueado")) acc.blocked += 1;
      if (statusMatches(normalized.status, "Desmobilizado", "Desmobilização solicitada", "Inativo")) acc.demobilized += 1;
      if (statusMatches(stage("released")?.status, "Concluido")) acc.released += 1;
      if (!statusMatches(stage("documentation")?.status, "Concluido")) acc.pendingDocumentation += 1;
      if (!statusMatches(stage("medicine")?.status, "Concluido")) acc.pendingMedicine += 1;
      if (!statusMatches(stage("ehs")?.status, "Concluido")) acc.pendingEhs += 1;
      if (!statusMatches(stage("patrimonial")?.status, "Concluido")) acc.pendingPatrimonial += 1;
      return acc;
    },
    {
      total: employees.length,
      released: 0,
      pendingDocumentation: 0,
      pendingMedicine: 0,
      pendingEhs: 0,
      pendingPatrimonial: 0,
      blocked: 0,
      demobilized: 0,
    },
  );
  if (tab === "general") {
    return `
      <div class="detail-grid">
        ${detailCard("Razão social", item.name)}
        ${detailCard("Nome fantasia", companyTradeName(item))}
        ${detailCard("CNPJ", item.cnpj)}
        ${detailCard("Inscrição estadual", item.stateRegistration || item.inscricaoEstadual || item.inscricao_estadual || "Nao informado")}
        ${detailCard("Código da empresa", companyCode(item))}
        ${detailCard("Código filial", companyBranchCode(item))}
        ${detailCard("Centro de custo da empresa", companyCostCenter(item))}
        ${detailCard("CEP", item.cep || "Nao informado")}
        ${detailCard("Endereço", companyAddress(item))}
        ${detailCard("Município/UF", [item.city || item.municipio, item.uf].filter(Boolean).join("/") || "Nao informado")}
        ${detailCard("Telefone", item.phone || "Nao informado")}
        ${detailCard("E-mail", item.email || "Nao informado")}
        ${detailCard("Contato principal", companyMainContact(item))}
        ${detailCard("Responsavel legal", companyLegalResponsible(item))}
        ${detailCard("Status", statusBadge(item.status))}
        ${detailCard("Fiscal responsável", item.fiscal || "Nao informado")}
        ${detailCard("Fiscais adicionais", fiscalNames(item.fiscaisAdicionais))}
        ${detailCard("Observações", item.notes || item.observacoes || "Sem observacoes")}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th colspan="2">Resumo operacional de funcionários</th></tr></thead>
          <tbody>
            <tr><td>Total de funcionários</td><td><strong>${workflowSummary.total}</strong></td></tr>
            <tr><td>Liberados</td><td><strong>${workflowSummary.released}</strong></td></tr>
            <tr><td>Pendentes documentação</td><td><strong>${workflowSummary.pendingDocumentation}</strong></td></tr>
            <tr><td>Pendentes medicina</td><td><strong>${workflowSummary.pendingMedicine}</strong></td></tr>
            <tr><td>Pendentes EHS/SSMA</td><td><strong>${workflowSummary.pendingEhs}</strong></td></tr>
            <tr><td>Pendentes patrimonial</td><td><strong>${workflowSummary.pendingPatrimonial}</strong></td></tr>
            <tr><td>Bloqueados</td><td><strong>${workflowSummary.blocked}</strong></td></tr>
            <tr><td>Desmobilizados</td><td><strong>${workflowSummary.demobilized}</strong></td></tr>
          </tbody>
        </table>
      </div>
      ${renderCompanyTabHistory(company, "general", "Histórico da empresa")}
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
          <thead><tr><th>Número do contrato</th><th>Objeto/Escopo</th><th>Início</th><th>Término</th><th>Status</th><th>Centro de custo</th><th>Gestor</th><th>Documentos</th><th>Ações</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>${item.contract || "Não informado"}</strong><span>${Number.isFinite(days) ? `${days} dia(s) restantes` : "Prazo não informado"}</span></td>
              <td>${item.scope || item.objeto || "Prestação de serviços terceirizados"}</td>
              <td>${formatDate(item.startDate)}</td>
              <td>${formatDate(item.endDate)}</td>
              <td>${statusBadge(item.status)}</td>
              <td>${companyCostCenter(item)}</td>
              <td>${item.responsible || "Não informado"}</td>
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
      <div class="contract-inner-toolbar">
        ${can("create.employee") ? `<button class="btn primary compact" type="button" data-company-employee-new data-company-id="${company.id}">${icon("plus")} Novo Funcionário</button>` : ""}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Matrícula/ID</th><th>Nome</th><th>CPF</th><th>Função</th><th>Contrato</th><th>Status documental</th><th>Status de contratação</th><th>ASO</th><th>Treinamento</th><th>Ações</th></tr></thead>
          <tbody>${employees.length ? employees.map((employee) => {
            const normalized = normalizeEmployee(employee);
            return `<tr><td>${employeeRegistration(normalized)}</td><td><strong>${normalized.name}</strong></td><td>${normalized.cpf}</td><td>${normalized.role}</td><td>${normalized.contract || item.contract || "Não informado"}</td><td>${statusBadge(normalized.docStatus)}</td><td>${statusBadge(normalized.status)}</td><td>${formatDate(normalized.asoValidity)}</td><td>${formatDate(normalized.trainingValidity)}</td><td><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir funcionário</button></td></tr>`;
          }).join("") : emptyRow(10)}</tbody>
        </table>
      </div>
      ${renderCompanyTabHistory(company, "people", "Histórico de funcionários / FIT")}
    `;
  }
  if (tab === "docs") {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Documento</th><th>Status</th><th>Validade</th><th>Responsável pela análise</th><th>Anexar</th><th>Visualizar</th><th>Aprovar/Solicitar Revisão</th></tr></thead>
          <tbody>${documents.length ? documents.map((doc) => `<tr><td><strong>${doc.type}</strong><br><span class="muted">${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</span></td><td>${statusBadge(docStatus(doc))}</td><td>${formatDate(doc.dueDate)}${docStatus(doc) === "Vencido" ? `<br>${statusBadge("Vencido")}` : ""}</td><td>${documentOperationalSector(doc)}</td><td><span class="mini-pill">Preparado</span></td><td><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Visualizar</button></td><td>${documentRowActions(doc) || `<span class="mini-pill">Sem permissao</span>`}</td></tr>`).join("") : emptyRow(7)}</tbody>
        </table>
      </div>
      ${renderCompanyTabHistory(company, "docs", "Histórico de documentos")}
    `;
  }
  if (tab === "medicine") {
    const medicineDocs = documents.filter((doc) => documentOperationalSector(doc) === "Medicina" || /pcmso|pca|aso|exame/i.test(doc.type || ""));
    const asoDates = employees.map((employee) => normalizeEmployee(employee).asoValidity).filter(Boolean);
    const maxAsoDate = asoDates.sort().at(-1) || null;
    return `
      <div class="detail-grid">
        ${detailCard("PCMSO", statusBadge(medicineDocs.some((doc) => /pcmso/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("PCA", statusBadge(medicineDocs.some((doc) => /pca/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("ASO / validade", maxAsoDate ? formatDate(maxAsoDate) : "Não informado")}
        ${detailCard("Anexos de medicina", medicineDocs.length)}
      </div>
      ${renderEmployeeDocsTable(medicineDocs, "Documentos de medicina ocupacional")}
      ${renderCompanyTabHistory(company, "medicine", "Histórico de medicina ocupacional")}
    `;
  }
  if (tab === "ehs") {
    const ehsDocs = documents.filter((doc) => documentOperationalSector(doc) === "EHS" || /pgr|ltcat|treinamento|nr-|epi|ppra|pcmat|ppr/i.test(doc.type || ""));
    return `
      <div class="detail-grid">
        ${detailCard("PGR", statusBadge(ehsDocs.some((doc) => /pgr/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("LTCAT", statusBadge(ehsDocs.some((doc) => /ltcat/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("Treinamentos", statusBadge(ehsDocs.some((doc) => /treinamento|nr-|epi/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("Anexos de segurança", ehsDocs.length)}
      </div>
      ${renderEmployeeDocsTable(ehsDocs, "Documentos de EHS / SSMA")}
      ${renderCompanyTabHistory(company, "ehs", "Histórico de EHS / SSMA")}
    `;
  }
  if (tab === "patrimonial") {
    const patrimonialDocs = documents.filter((doc) => documentOperationalSector(doc) === "Patrimonial" || /patrimonial|cracha|acesso|liberacao/i.test(doc.type || ""));
    return `
      <div class="detail-grid">
        ${detailCard("Liberação patrimonial", statusBadge(patrimonialDocs.some((doc) => statusMatches(docStatus(doc), "Aprovado")) ? "Aprovado" : "Pendente"))}
        ${detailCard("Crachá / acesso", statusBadge(patrimonialDocs.some((doc) => /cracha|acesso/i.test(doc.type || "")) ? "Aprovado" : "Pendente"))}
        ${detailCard("Observações", item.notes || item.observacoes || "Sem observações")}
        ${detailCard("Anexos patrimoniais", patrimonialDocs.length)}
      </div>
      ${renderEmployeeDocsTable(patrimonialDocs, "Documentos de seguranca patrimonial")}
      ${renderCompanyTabHistory(company, "patrimonial", "Histórico de seguranca patrimonial")}
    `;
  }
  if (tab === "managers") {
    const fiscalIds = [item.fiscalId, ...(item.fiscaisAdicionais || [])].filter(Boolean);
    const linkedFiscais = fiscalIds.map((id) => state.fiscais.find((fiscal) => sameId(fiscal.id, id))).filter(Boolean).map(normalizeFiscal);
    return `
      <div class="detail-grid">
        ${detailCard("Fiscal responsável da empresa", item.fiscal || "Não informado")}
        ${detailCard("Fiscais substitutos", linkedFiscais.length ? linkedFiscais.map((fiscal) => fiscal.nome).join(", ") : "Não informado")}
        ${detailCard("Gestor do contrato", item.manager || item.responsible || "Não informado")}
        ${detailCard("Status da fiscalização", statusBadge(companyHasNoFiscal(item) ? "Pendente" : "Aprovado"))}
      </div>
      ${renderFiscalRegistry()}
      ${renderCompanyTabHistory(company, "managers", "Histórico de fiscais e gestores")}
    `;
  }
  if (tab === "history") {
    return renderHistoryTimeline("empresa", company.id, [
      `<div class="item-card"><strong>Empresa cadastrada</strong><span class="muted">${item.name} - ${item.cnpj}</span></div>`,
      `<div class="item-card"><strong>Contrato atual</strong><span class="muted">${item.contract || "Nao informado"} - ${formatDate(item.startDate)} ate ${formatDate(item.endDate)}</span></div>`,
      `<div class="item-card"><strong>Funcionários vinculados</strong><span class="muted">${employees.length} funcionario(s)</span></div>`,
      `<div class="item-card"><strong>Documentos vinculados</strong><span class="muted">${documents.length} documento(s)</span></div>`,
    ]);
  }
  return renderHistoryTimeline("empresa", company.id, [
    `<div class="item-card"><strong>Empresa cadastrada</strong><span class="muted">${item.name} - ${item.cnpj}</span></div>`,
    `<div class="item-card"><strong>Contrato atual</strong><span class="muted">${item.contract || "Nao informado"} - ${formatDate(item.startDate)} ate ${formatDate(item.endDate)}</span></div>`,
    `<div class="item-card"><strong>Funcionários vinculados</strong><span class="muted">${employees.length} funcionario(s)</span></div>`,
    `<div class="item-card"><strong>Documentos vinculados</strong><span class="muted">${documents.length} documento(s)</span></div>`,
  ]);
}

function closeCompanyContract(id) {
  const company = state.companies.find((item) => sameId(item.id, id));
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
  const company = state.companies.find((item) => sameId(item.id, id));
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
        ${detailCard("Período", `${formatDate(item.startDate)} ate ${formatDate(item.endDate)}`)}
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
        ${detailCard("Número do contrato", item.contract || "Nao informado")}
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
          <thead><tr><th>Funcionário/FIT</th><th>CPF</th><th>Funcao</th><th>ASO</th><th>Treinamento</th><th>Status</th><th>Acoes</th></tr></thead>
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
          <thead><tr><th>Documento</th><th>Funcionário</th><th>Validade</th><th>Status</th><th>Observações</th><th>Acoes</th></tr></thead>
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
    return renderHistoryTimeline("contrato", company.id, [
      `<div class="item-card"><strong>Contrato registrado</strong><span class="muted">${formatDate(item.startDate)} - ${item.name}</span></div>`,
      `<div class="item-card"><strong>Status atual</strong><span class="muted">${item.status}</span></div>`,
      `<div class="item-card"><strong>Documentos monitorados</strong><span class="muted">${documents.length} documento(s) associados ao contrato.</span></div>`,
      `<div class="item-card"><strong>Funcionários vinculados</strong><span class="muted">${employees.length} funcionario(s)/FIT vinculados.</span></div>`,
      `<div class="item-card"><strong>Pendencias atuais</strong><span class="muted">${pendingDocs.length} documento(s) e ${blockedEmployees.length} bloqueio(s) em acompanhamento.</span></div>`,
    ]);
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
  if (typeof value === "number") {
    const suffix = value === 1 ? ` ${singularizeDetailLabel(label)}` : "";
    return `<div class="detail-card"><span>${label}</span><strong>${value}${suffix}</strong></div>`;
  }
  return `<div class="detail-card"><span>${label}</span><strong>${value}</strong></div>`;
}

function singularizeDetailLabel(label = "") {
  const text = String(label || "").trim();
  if (!text) return "";
  const [first, ...rest] = text.split(/\s+/);
  const replacements = {
    Aprovados: "Aprovado",
    Aprovadas: "Aprovada",
    Reprovados: "Reprovado",
    Reprovadas: "Reprovada",
    Pendentes: "Pendente",
    Liberados: "Liberado",
    Funcionarios: "Funcionário",
    Funcionários: "Funcionário",
    Anexos: "Anexo",
    Solicitações: "Solicitação",
    Solicitacoes: "Solicitação",
    Aprovações: "Aprovação",
    Aprovacoes: "Aprovação",
    Documentos: "Documento",
    Vinculos: "Vínculo",
    Vínculos: "Vínculo",
    Usuários: "Usuário",
    Usuarios: "Usuário",
    Históricos: "Histórico",
    Historicos: "Histórico",
    Contratos: "Contrato",
    Matrículas: "Matrícula",
    Matriculas: "Matrícula",
  };
  return [replacements[first] || first, ...rest].join(" ");
}

function renderApprovals() {
  const baseItems = visibleDocuments().filter((doc) => ["Pendente", "Reprovado", "Revisão solicitada", "A vencer", "Vencido"].includes(docStatus(doc)));
  const filteredItems = filtered(baseItems, [(doc) => doc.type, (doc) => companyName(doc.companyId), (doc) => employeeName(doc.employeeId), (doc) => docStatus(doc)]);
  const items = sortItems("approvals", applyOperationalFilters("approvals", filteredItems));
  const { pageItems, totalPages } = paginateItems("approvals", items);
  return `
    <section class="panel">
      <div class="modal-head">
        <div>
          <h2>Aprovações documentais</h2>
          <span class="muted">Fila de documentos para avaliacao do fiscal.</span>
        </div>
        <span class="mini-pill">${items.length} item(ns)</span>
      </div>
      <div class="modal-body">
        ${toolbar("Buscar por documento, empresa, funcionario ou status")}
        ${renderOperationalFilters("approvals", baseItems, { quicks: ["Todos", "Pendente", "Revisão solicitada", "Vencido", "A vencer", "Medicina", "EHS"], exportKey: "pendencias-por-setor" })}
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
    ["Funcionários bloqueados", employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado")).length, "bad"],
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
          ${["Politica documental", "Medicina ocupacional", "Treinamento EHS", "Liberação fiscal"].map((item, index) => `<div class="item-card"><div class="item-row"><strong>${item}</strong>${statusBadge(index === 0 && complianceScore > 70 ? "Aprovado" : "Pendente")}</div><span class="muted">Controle preparado para auditoria e rastreabilidade.</span></div>`).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="modal-head"><h2>Resumo executivo</h2></div>
        <div class="modal-body item-list">
          <div class="item-card"><strong>${companies.length} empresas monitoradas</strong><span class="muted">Carteira visivel conforme perfil do usuario.</span></div>
          <div class="item-card"><strong>${employees.length} funcionarios vinculados</strong><span class="muted">Status de contratacao e documentação acompanhados.</span></div>
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
    ...blockedEmployees.map((employee) => ({ ...employee, blockType: "Funcionário", blockName: employee.name, blockCompanyId: employee.companyId })),
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
                  const isEmployee = item.blockType === "Funcionário";
                  const company = state.companies.find((entry) => sameId(entry.id, item.blockCompanyId));
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
  const doc = visibleDocuments().find((item) => sameId(item.id, id));
  if (!doc || !canAccessDocument(doc)) {
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
            ${detailCard("Funcionário", doc.employeeId ? employeeName(doc.employeeId) : "Documento da empresa")}
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
  const items = filtered(state.users, [
    (item) => item.name,
    (item) => item.email,
    (item) => roleName(item.role),
    (item) => companyName(item.companyId),
    (item) => companyContractFromUser(item),
    (item) => userCreationTypeLabel(item),
    (item) => (item.active === false ? "Inativo" : "Ativo"),
    (item) => formatDateTime(item.lastAccessAt || item.lastAccess || item.updatedAt || item.createdAt),
  ]);
  const totalUsers = state.users.length;
  const activeUsers = state.users.filter((user) => user.active !== false).length;
  const linkedUsers = state.users.filter((user) => Boolean(user.companyId)).length;
  const inviteUsers = state.users.filter((user) => user.creationMode === "real").length;
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Administracao</span>
          <h2>Usuários e Acessos</h2>
          <span class="muted">Visao consolidada dos acessos do portal, alinhada as demais secoes administrativas.</span>
        </div>
        <div class="actions wrap">
          <button class="btn primary" type="button" data-create="user">${icon("plus")} Novo Usuário</button>
        </div>
      </div>
      <div class="access-summary-grid">
        <div class="item-card"><strong>Total de usuarios</strong><span class="muted">${totalUsers} conta(s) cadastrada(s).</span></div>
        <div class="item-card"><strong>Usuários ativos</strong><span class="muted">${activeUsers} acesso(s) liberado(s).</span></div>
        <div class="item-card"><strong>Convites ativos</strong><span class="muted">${inviteUsers} usuario(s) em fluxo de primeiro acesso.</span></div>
      </div>
      <div class="enterprise-strip users-strip">
        <div><span>Vinculados</span><strong>${linkedUsers}</strong></div>
        <div><span>Sem vinculo</span><strong>${totalUsers - linkedUsers}</strong></div>
        <div><span>Ultimo acesso</span><strong>Disponivel na lista</strong></div>
        <div><span>Central</span><strong>Administracao</strong></div>
      </div>
      ${toolbar("Buscar por nome, e-mail, perfil, empresa, contrato, tipo ou status")}
      <table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Empresa</th><th>Contrato</th><th>Tipo</th><th>Status</th><th>Ultimo acesso</th><th>Acoes</th></tr></thead>
        <tbody>
          ${items.length ? items.map(renderUserRow).join("") : emptyRow(9)}
        </tbody>
      </table>
    </section>
  `;
}

const ADMINISTRATION_SECTIONS = [
  ["users", "Usuários e Acessos", "Visao consolidada de acessos e convites."],
  ["fiscais", "Fiscais", "Responsáveis operacionais por empresa e contrato."],
  ["fornecedores", "Fornecedores", "Responsáveis da empresa e do portal."],
  ["medicina", "Medicina", "Usuários da fila de Medicina ocupacional."],
  ["ehs", "EHS / SSMA", "Usuários da fila de seguranca do trabalho."],
  ["patrimonial", "Segurança Patrimonial", "Usuários da fila de liberacao final."],
];

function administrationSectionConfig(section = "users") {
  return ADMINISTRATION_SECTIONS.find(([id]) => id === section) || ADMINISTRATION_SECTIONS[0];
}

function userAccessStatusLabel(user = {}) {
  const item = mapUserFromDb(user);
  const rawUser = typeof user === "object" ? user : {};
  if (item.active === false || rawUser.active === false) return "Acesso inativo";
  if (rawUser.creationMode === "real" && !rawUser.lastAccessAt && !rawUser.lastAccess) return "Convite enviado";
  return "Acesso ativo";
}

function userLastAccessLabel(user = {}) {
  return formatDateTime(user.lastAccessAt || user.lastAccess || user.updatedAt || user.createdAt);
}

function fiscalLinkedCompanies(fiscal = {}) {
  const item = normalizeFiscal(fiscal);
  return visibleCompanies()
    .filter((company) => {
      const normalized = normalizeCompany(company);
      const fiscalIds = [normalized.fiscalId, ...(normalized.fiscaisAdicionais || [])].filter(Boolean).map((id) => String(id));
      if (fiscalIds.includes(String(item.id))) return true;
      const fiscalName = normalizeSearchValue(normalized.fiscal || "");
      const itemName = normalizeSearchValue(item.nome || "");
      const itemEmail = normalizeSearchValue(item.email || "");
      return fiscalName && (fiscalName === itemName || fiscalName === itemEmail);
    })
    .map((company) => normalizeCompany(company));
}

function fiscalLinkedContracts(fiscal = {}) {
  return fiscalLinkedCompanies(fiscal)
    .map((company) => company.contract || "Nao informado")
    .filter(Boolean);
}

function matchedUserForFiscal(fiscal = {}) {
  const item = normalizeFiscal(fiscal);
  return state.users.find((user) => {
    const userEmail = normalizeSearchValue(user.email || "");
    const fiscalEmail = normalizeSearchValue(item.usuarioEmail || item.email || "");
    return (
      (fiscalEmail && userEmail === fiscalEmail) ||
      (item.usuarioId && sameId(user.id, item.usuarioId)) ||
      (item.authUserId && sameId(user.authUserId, item.authUserId))
    );
  }) || null;
}

function fiscalAccessStatus(fiscal = {}) {
  const item = normalizeFiscal(fiscal);
  const user = matchedUserForFiscal(item);
  if (item.status === "inativo") return "Acesso inativo";
  if (user && user.active === false) return "Acesso inativo";
  if (user) return userAccessStatusLabel(user);
  if (item.usuarioEmail || item.usuarioId || item.authUserId) return "Convite enviado";
  return "Sem usuário de acesso";
}

function supplierUserForCompany(company = {}) {
  const item = normalizeCompany(company);
  return state.users.find((user) => user.role === "supplier" && sameId(user.companyId, item.id)) || null;
}

function supplierAccessStatus(company = {}) {
  const user = supplierUserForCompany(company);
  if (!user) return "Aguardando liberação de acesso";
  return userAccessStatusLabel(user);
}

function renderAdministrationSectionTabs() {
  const activeSection = administrationSectionConfig(administrationSection)[0];
  return `
    <div class="contract-tabs admin-tabs" role="tablist">
      ${ADMINISTRATION_SECTIONS.map(([sectionId, title, helper]) => `<button class="${activeSection === sectionId ? "active" : ""}" type="button" data-admin-section="${sectionId}" title="${escapeAttr(helper)}">${title}</button>`).join("")}
    </div>
  `;
}

function renderAdministrationUserSection() {
  return renderUsers();
}

function renderAdministrationFiscalSection() {
  const items = filtered((state.fiscais || []).map(normalizeFiscal), [
    (fiscal) => fiscal.nome,
    (fiscal) => fiscal.email,
    (fiscal) => fiscal.telefone,
    (fiscal) => fiscal.matricula,
    (fiscal) => fiscal.setor,
    (fiscal) => fiscalAccessStatus(fiscal),
    (fiscal) => fiscalLinkedCompanies(fiscal).map((company) => company.name).join(" "),
    (fiscal) => fiscalLinkedContracts(fiscal).join(" "),
  ]);
  const rows = items.length
    ? items
        .map((fiscal) => {
          const linkedCompanies = fiscalLinkedCompanies(fiscal);
          const linkedContracts = fiscalLinkedContracts(fiscal);
          const user = matchedUserForFiscal(fiscal);
          return `
            <tr>
              <td><strong>${escapeHtml(fiscal.nome || "Fiscal nao informado")}</strong></td>
              <td>${escapeHtml(fiscal.email || "Sem e-mail")}<br><span class="muted">${escapeHtml(fiscal.telefone || "Sem telefone")}</span></td>
              <td>${escapeHtml(fiscal.matricula || "Sem matricula")}</td>
              <td>${escapeHtml(fiscal.setor || "Nao informado")}</td>
              <td>${escapeHtml(linkedCompanies.length ? linkedCompanies.map((company) => company.name).join(", ") : "Sem vinculo")}</td>
              <td>${escapeHtml(linkedContracts.length ? linkedContracts.join(", ") : "Sem contrato")}</td>
              <td>${statusBadge(fiscalAccessStatus(fiscal))}</td>
              <td>
                <div class="actions wrap">
                  ${user ? `<button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${user.id}">Enviar convite</button>` : ""}
                  ${user ? `<button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${user.id}" data-reset="1">Reenviar convite</button>` : ""}
                  ${user ? `<button class="btn warning compact" type="button" data-user-action="toggle-access" data-id="${user.id}">${user.active === false ? "Reativar acesso" : "Inativar acesso"}</button>` : ""}
                  ${user ? `<button class="btn secondary compact" type="button" data-user-action="change-link" data-id="${user.id}">Editar vínculo</button>` : ""}
                  ${!user && fiscal.status !== "inativo" ? `<button class="btn secondary compact" type="button" data-fiscal-access="${fiscal.id}">${icon("users")} Criar acesso ao sistema</button>` : ""}
                  ${!user && linkedCompanies.length ? `<button class="btn secondary compact" type="button" data-company-detail="${linkedCompanies[0].id}">Editar vínculo</button>` : ""}
                  ${fiscal.status !== "inativo" ? `<button class="btn warning compact" type="button" data-fiscal-inactivate="${fiscal.id}">Inativar fiscal</button>` : `<span class="mini-pill">Inativo</span>`}
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : emptyRow(8);
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <h2>Fiscais</h2>
          <span class="muted">Fiscais podem existir sem usuario de acesso e sao vinculados por empresa ou contrato.</span>
        </div>
      </div>
      <table>
        <thead><tr><th>Nome</th><th>Contato</th><th>Matrícula</th><th>Setor</th><th>Empresa vinculada</th><th>Contrato vinculado</th><th>Status do acesso</th><th>Acoes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderAdministrationSupplierSection() {
  const companies = filtered(state.companies.map(normalizeCompany), [
    (company) => company.name,
    (company) => company.tradeName,
    (company) => company.cnpj,
    (company) => company.contract,
    (company) => supplierAccessStatus(company),
    (company) => supplierUserForCompany(company)?.name || company.contact || company.responsible,
    (company) => supplierUserForCompany(company)?.email || company.email,
  ]);
  const rows = companies.length
    ? companies
        .map((company) => {
          const supplierUser = supplierUserForCompany(company);
          const contracts = [company.contract].filter(Boolean);
          return `
            <tr>
              <td><strong>${escapeHtml(company.contact || company.responsible || "Responsavel nao informado")}</strong><br><span class="muted">${escapeHtml(company.name)}</span></td>
              <td>${escapeHtml(supplierUser?.email || company.email || "Sem e-mail")}</td>
              <td>${escapeHtml(supplierUser?.phone || supplierUser?.telefone || company.phone || "Sem telefone")}</td>
              <td>${escapeHtml(company.name)}</td>
              <td>${escapeHtml(contracts.join(", ") || "Sem contrato")}</td>
              <td>${statusBadge(supplierAccessStatus(company))}</td>
              <td>${escapeHtml(supplierUser ? userCreationTypeLabel(supplierUser) : "Sem usuario")}</td>
              <td>
                <div class="actions wrap">
                  ${supplierUser ? `<button class="btn secondary compact" type="button" data-edit="user" data-id="${supplierUser.id}">${icon("edit")} Editar vinculo</button>` : ""}
                  ${supplierUser ? `<button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${supplierUser.id}">Enviar convite</button>` : `<button class="btn primary compact" type="button" data-create="user" data-role="supplier" data-company-id="${company.id}" data-creation-mode="real">${icon("plus")} Criar acesso</button>`}
                  ${supplierUser ? `<button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${supplierUser.id}" data-reset="1">Reenviar convite</button>` : ""}
                  ${supplierUser ? `<button class="btn warning compact" type="button" data-user-action="toggle-access" data-id="${supplierUser.id}">${supplierUser.active === false ? "Reativar acesso" : "Inativar acesso"}</button>` : ""}
                </div>
              </td>
            </tr>
          `;
        })
        .join("")
    : emptyRow(8);
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <h2>Fornecedores</h2>
          <span class="muted">Responsáveis vinculados a empresas e contratos com liberação de acesso ao portal.</span>
        </div>
      </div>
      <table>
        <thead><tr><th>Responsavel</th><th>E-mail</th><th>Telefone</th><th>Empresa vinculada</th><th>Contratos vinculados</th><th>Status do acesso</th><th>Tipo de usuario</th><th>Acoes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderAdministrationSectorSection(role, title, helper) {
  const items = filtered((state.users || []).filter((user) => user.role === role), [
    (user) => user.name,
    (user) => user.email,
    (user) => roleName(user.role),
    (user) => userAccessStatusLabel(user),
    (user) => userCreationTypeLabel(user),
    (user) => userLastAccessLabel(user),
  ]);
  const rows = items.length
    ? items.map((user) => `
        <tr>
          <td><strong>${escapeHtml(user.name)}</strong></td>
          <td>${escapeHtml(user.email || "Sem e-mail")}</td>
          <td>${statusBadge(userAccessStatusLabel(user))}</td>
          <td>${escapeHtml(userCreationTypeLabel(user))}</td>
          <td>${escapeHtml(userLastAccessLabel(user))}</td>
          <td>
            <div class="actions wrap">
              <button class="btn secondary compact" type="button" data-edit="user" data-id="${user.id}">${icon("edit")} Editar</button>
              <button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${user.id}">Enviar convite</button>
              <button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${user.id}" data-reset="1">Reenviar convite</button>
              <button class="btn warning compact" type="button" data-user-action="toggle-access" data-id="${user.id}">${user.active === false ? "Reativar acesso" : "Inativar acesso"}</button>
            </div>
          </td>
        </tr>
      `).join("")
    : emptyRow(6);
  return `
    <section class="panel table-wrap">
      <div class="modal-head">
        <div>
          <h2>${title}</h2>
          <span class="muted">${helper}</span>
        </div>
        <div class="actions wrap">
          <button class="btn primary compact" type="button" data-create="user" data-role="${role}" data-creation-mode="real">${icon("plus")} Novo usuario</button>
        </div>
      </div>
      <div class="access-summary-grid">
        <div class="item-card"><strong>Perfis registrados</strong><span class="muted">${items.length} usuario(s) nesta fila.</span></div>
        <div class="item-card"><strong>Status ativo</strong><span class="muted">${items.filter((user) => user.active !== false).length} usuario(s) com acesso liberado.</span></div>
        <div class="item-card"><strong>Convites</strong><span class="muted">${items.filter((user) => user.creationMode === "real").length} usuario(s) com primeiro acesso em convite.</span></div>
      </div>
      <table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Status do acesso</th><th>Tipo</th><th>Ultimo acesso</th><th>Acoes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderAdministrationSection(section) {
  if (section === "users") return renderUsers();
  if (section === "fiscais") return renderAdministrationFiscalSection();
  if (section === "fornecedores") return renderAdministrationSupplierSection();
  if (section === "medicina") return renderAdministrationSectorSection("medicina", "Medicina", "Usuários que atuam na fila de Medicina ocupacional.");
  if (section === "ehs") return renderAdministrationSectorSection("ehs", "EHS / SSMA", "Usuários que atuam na fila de EHS / SSMA.");
  if (section === "patrimonial") return renderAdministrationSectorSection("patrimonial", "Segurança Patrimonial", "Usuários que atuam na fila de liberacao final.");
  return `<div class="empty">Secao administrativa indisponivel.</div>`;
}

function renderReports() {
  const companies = visibleCompanies();
  const employees = visibleEmployees();
  const documents = visibleDocuments();
  const metrics = operationalMetrics(companies, employees, documents);
  const sectorPendencies = [
    { setor: "Medicina Ocupacional", pendencias: metrics.medicinePendencies.length, responsavel: "ASO e exames", status: "Pendente" },
    { setor: "Segurança do Trabalho/EHS", pendencias: metrics.ehsPendencies.length, responsavel: "Treinamentos e requisitos EHS", status: "Pendente" },
    { setor: "Segurança Patrimonial", pendencias: metrics.patrimonialPendencies.length, responsavel: "Liberação final", status: "Pendente" },
  ];
  const blockRows = [
    ...metrics.blockedEmployees.map((employee) => ({
      tipo: "Funcionário",
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
        <div class="stat-card success"><span>Funcionários ativos</span><strong>${metrics.activeEmployees.length}</strong><small>Aptos/liberados</small></div>
        <div class="stat-card danger"><span>Bloqueios</span><strong>${blockRows.length}</strong><small>Restricoes em aberto</small></div>
      </div>
    </section>
    <div class="report-stack">
      ${renderReportTable("Documentos vencidos", "Controle de documentos fora do prazo.", "documentos-vencidos", ["Documento", "Empresa", "Funcionário", "Vencimento", "Status"], metrics.expiredDocs.map((doc) => [doc.type, companyName(doc.companyId), doc.employeeId ? employeeName(doc.employeeId) : "Empresa", formatDate(doc.dueDate), statusBadge(docStatus(doc))]))}
      ${renderReportTable("Documentos a vencer", "Itens proximos do vencimento.", "documentos-a-vencer", ["Documento", "Empresa", "Funcionário", "Vencimento", "Status"], metrics.expiringDocs.map((doc) => [doc.type, companyName(doc.companyId), doc.employeeId ? employeeName(doc.employeeId) : "Empresa", formatDate(doc.dueDate), statusBadge(docStatus(doc))]))}
      ${renderReportTable("Funcionários ativos", "Trabalhadores liberados para operacao.", "funcionarios-ativos", ["Nome", "CPF", "Empresa", "Funcao", "Status"], metrics.activeEmployees.map((employee) => {
        const item = normalizeEmployee(employee);
        return [item.name, item.cpf || "Nao informado", companyName(item.companyId), item.role || "Nao informado", statusBadge(item.status)];
      }))}
      ${renderReportTable("Funcionários inativos/desmobilizados", "Histórico de trabalhadores sem atividade atual.", "funcionarios-inativos", ["Nome", "CPF", "Empresa", "Funcao", "Status"], metrics.inactiveEmployees.map((employee) => {
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

function renderRequests() {
  const requestItems = requestQueueItems();
  const demobilizationRequests = requestItems.filter((item) => item.requestKind === "demobilization");
  const reactivationRequests = requestItems.filter((item) => item.requestKind === "reactivation");
  const requestCards = [
    ["Pendentes", "Fila operacional aberta", "warn", requestItems.length],
    ["Desmobilização", "Solicitações de desligamento", "danger", demobilizationRequests.length],
    ["Reativação", "Pedidos de retorno ao fluxo", "success", reactivationRequests.length],
    ["Funcionários", "Pedidos originados em vínculos", "info", requestItems.filter((item) => item.requestEntityType === "employee").length],
  ];
  return `
    <section class="hero-panel compact-hero">
      <div>
        <span class="eyebrow">Central operacional</span>
        <h2>Solicitações</h2>
        <p>Fila real de solicitações pendentes de desmobilização e reativação, com registro de auditoria e ação quando o perfil permite.</p>
      </div>
    </section>
    <div class="stats-grid">
      ${requestCards.map(([label, helper, tone, value]) => `<div class="stat-card ${tone}"><span>${label}</span><strong>${value}</strong><small>${helper}</small></div>`).join("")}
    </div>
    <div class="dashboard-grid">
      <section class="bi-card wide">
        <div class="bi-head"><div><span class="eyebrow">Fila operacional</span><h2>Desmobilização solicitada</h2></div><span class="mini-pill">${demobilizationRequests.length}</span></div>
        <div class="item-list dense-list">
          <div class="table-wrap">
            <table>
              <thead><tr><th>Data/Hora</th><th>Solicitação</th><th>Registro</th><th>Empresa</th><th>Usuário</th><th>Motivo/Observação</th><th>Ações</th></tr></thead>
              <tbody>${renderRequestRows(demobilizationRequests)}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="bi-card wide">
        <div class="bi-head"><div><span class="eyebrow">Fila operacional</span><h2>Reativação solicitada</h2></div><span class="mini-pill">${reactivationRequests.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Data/Hora</th><th>Solicitação</th><th>Registro</th><th>Empresa</th><th>Usuário</th><th>Motivo/Observação</th><th>Ações</th></tr></thead>
            <tbody>${renderRequestRows(reactivationRequests)}</tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderAdministration() {
  const section = administrationSectionConfig(administrationSection)[0];
  const totalUsers = state.users.length;
  const totalFiscais = state.fiscais.length;
  const activeFiscais = state.fiscais.filter((fiscal) => fiscal.status === "com_acesso").length;
  const supplierUsers = state.users.filter((user) => user.role === "supplier");
  const sectorUsers = state.users.filter((user) => ["medicina", "ehs", "patrimonial"].includes(user.role)).length;
  return `
    <section class="hero-panel compact-hero">
      <div>
        <span class="eyebrow">Administracao</span>
        <h2>Base de gestao de acessos</h2>
        <p>Entrada consolidada para usuarios, fiscais, fornecedores e equipes setoriais.</p>
      </div>
    </section>
    <div class="stats-grid four">
      <div class="stat-card info"><span>Usuários</span><strong>${totalUsers}</strong><small>Contas registradas</small></div>
      <div class="stat-card warning"><span>Fiscais</span><strong>${totalFiscais}</strong><small>${activeFiscais} com acesso ativo</small></div>
      <div class="stat-card special"><span>Fornecedores</span><strong>${supplierUsers.length}</strong><small>Acessos por empresa</small></div>
      <div class="stat-card success"><span>Setoriais</span><strong>${sectorUsers}</strong><small>Medicina, EHS e Patrimonial</small></div>
    </div>
    ${renderAdministrationSectionTabs()}
    <section class="panel admin-section-shell">
      <div class="modal-head">
        <div>
          <span class="eyebrow">Secao administrativa</span>
          <h2>${section === "users" ? "Usuários e Acessos" : administrationSectionConfig(section)[1]}</h2>
          <span class="muted">${administrationSectionConfig(section)[2]}</span>
        </div>
      </div>
      <div class="admin-section-content">
        ${renderAdministrationSection(section)}
      </div>
    </section>
    <div class="dashboard-grid">
      <section class="bi-card wide">
        <div class="bi-head"><div><span class="eyebrow">Estrutura</span><h2>Organizacao administrativa</h2></div></div>
        <div class="item-list dense-list">
          <div class="item-card"><strong>Usuários e Acessos</strong><span class="muted">Visao consolidada dos acessos do portal.</span></div>
          <div class="item-card"><strong>Fiscais</strong><span class="muted">Base operacional de responsaveis vinculados a empresas.</span></div>
          <div class="item-card"><strong>Fornecedores</strong><span class="muted">Responsáveis da empresa com liberacao de acesso.</span></div>
        </div>
      </section>
      <section class="bi-card">
        <div class="bi-head"><div><span class="eyebrow">Escopo</span><h2>Perfis setoriais</h2></div></div>
        <div class="item-list dense-list">
          <div class="item-card"><strong>Medicina</strong><span class="muted">Fila medica e aprovacoes de ASO/exames.</span></div>
          <div class="item-card"><strong>EHS / SSMA</strong><span class="muted">Fila de treinamentos e requisitos de seguranca.</span></div>
          <div class="item-card"><strong>Segurança Patrimonial</strong><span class="muted">Liberação final, matricula e cracha.</span></div>
        </div>
      </section>
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
  const userTypeBadge = user.creationMode === "test" ? `<span class="mini-pill">Usuário de teste</span>` : `<span class="mini-pill">Usuário real</span>`;
  const company = state.companies.find((item) => sameId(item.id, user.companyId));
  return `
    <tr>
      <td><strong>${user.name}</strong>${userTypeBadge ? `<br>${userTypeBadge}` : ""}</td>
      <td>${user.email}</td>
      <td>${roleName(user.role)}</td>
      <td>${company?.name || "Nao vinculado"}</td>
      <td>${companyContractFromUser(user)}</td>
      <td>${userCreationTypeLabel(user)}</td>
      <td>${statusBadge(user.active ? "Ativo" : "Inativo")}</td>
      <td>${formatDateTime(user.lastAccessAt || user.lastAccess || user.updatedAt || user.createdAt)}</td>
      <td>${userRowActions(user)}</td>
    </tr>
  `;
}

function userCreationTypeLabel(user = {}) {
  return user.creationMode === "real" ? "Real" : "Teste";
}

function companyContractFromUser(user = {}) {
  const company = state.companies.find((item) => sameId(item.id, user.companyId));
  return company?.contract || "Nao vinculado";
}

function userRowActions(user) {
  const item = mapUserFromDb(user);
  return `
    <div class="actions wrap">
      <button class="btn secondary compact" type="button" data-edit="user" data-id="${user.id}">${icon("edit")} Editar</button>
      <button class="btn warning compact" type="button" data-user-action="toggle-access" data-id="${user.id}">${item.active ? "Inativar acesso" : "Reativar acesso"}</button>
      <button class="btn secondary compact" type="button" data-user-action="reset-password" data-id="${user.id}">Redefinir senha</button>
      <button class="btn secondary compact" type="button" data-user-action="resend-invite" data-id="${user.id}">Reenviar convite</button>
      <button class="btn secondary compact" type="button" data-user-action="change-role" data-id="${user.id}">Alterar perfil</button>
      <button class="btn secondary compact" type="button" data-user-action="change-link" data-id="${user.id}">Alterar vínculo</button>
    </div>
  `;
}

function sectionHead(title, subtitle, buttonLabel = "", type = "") {
  const canCreate = buttonLabel && type && can(`create.${type}`);
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
    const employee = state.employees.find((entry) => sameId(entry.id, id));
    return employee ? employeeRowActions(employee) : "";
  }
  const collection = {
    employee: state.employees,
    document: state.documents,
    user: state.users,
  }[type];
  const item = collection?.find((entry) => sameId(entry.id, id));
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
  const canEditEmployee = can("edit.employee", item) && (!currentUser() || currentUser()?.role !== "supplier" || employeeWorkflowEditableBySupplier(item));
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
      ${can("approveDocuments", doc) ? `<button class="btn warning compact" type="button" data-doc-status="Revisão solicitada" data-id="${doc.id}">Solicitar Revisão</button>` : ""}
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
    "Acesso ativo": "ok",
    "Acesso inativo": "bad",
    "Convite enviado": "analysis",
    "Sem usuário de acesso": "warn",
    "Aguardando liberação de acesso": "warn",
    "Revisão solicitada": "analysis",
    "Revisão solicitada pelo Fiscal": "analysis",
    "Revisão solicitada pela Medicina": "analysis",
    "Revisão solicitada pelo EHS": "analysis",
    "Revisão solicitada pela Patrimonial": "analysis",
    "Em avaliação": "analysis",
    "Em avaliação Fiscal": "analysis",
    "Em avaliação Medicina": "analysis",
    "Em avaliação EHS": "analysis",
    "Em avaliação Patrimonial": "analysis",
    "Enviado para Fiscal": "info",
    "Enviado para Medicina": "info",
    "Enviado para EHS": "info",
    "Enviado para Patrimonial": "info",
    "Rascunho pelo Fornecedor": "info",
    "Revalidação solicitada": "analysis",
    "Em revalidação": "analysis",
    "Bloqueado por etapa anterior": "warn",
    "Aguardando Correção": "analysis",
    "Ativo com pendência": "analysis",
    Arquivado: "info",
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
    "Revisão solicitada": "analysis",
    "Revisão solicitada pelo Fiscal": "analysis",
    "Revisão solicitada pela Medicina": "analysis",
    "Revisão solicitada pela EHS": "analysis",
    "Revisão solicitada pela Patrimonial": "analysis",
    "Em avaliação": "analysis",
    "Em avaliação Fiscal": "analysis",
    "Em avaliação Medicina": "analysis",
    "Em avaliação EHS": "analysis",
    "Em avaliação Patrimonial": "analysis",
    "Enviado para Fiscal": "info",
    "Enviado para Medicina": "info",
    "Enviado para EHS": "info",
    "Enviado para Patrimonial": "info",
    "Rascunho pelo Fornecedor": "info",
    "Revalidação solicitada": "analysis",
    "Em revalidação": "analysis",
    "Aguardando Correção": "analysis",
    "Ativo com pendência": "analysis",
    Arquivado: "info",
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
        openCompanyEditorModal(null);
        return;
      }
      if (button.dataset.create === "employee") {
        editingEmployeeId = null;
        renderApp();
        return;
      }
      if (button.dataset.create === "user") {
        openForm("user", null, {
          defaultRole: button.dataset.role || "fiscal",
          companyId: button.dataset.companyId || "",
          defaultCreationMode: button.dataset.creationMode || "test",
        });
        return;
      }
      openForm(button.dataset.create);
    });
  });

  document.querySelectorAll("[data-admin-section]").forEach((button) => {
    button.addEventListener("click", () => {
      administrationSection = button.dataset.adminSection || "users";
      localStorage.setItem("sctempresas.adminSection", administrationSection);
      renderApp();
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

  document.querySelectorAll("[data-reactivation-type]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const handled = handleReactivationAction(button.dataset.reactivationType, button.dataset.reactivationAction, button.dataset.id, {
        source: "Fila principal",
      });
      if (handled && button.closest(".employee-record-backdrop")) {
        openEmployeeRecord(button.dataset.id);
      }
    });
  });

  document.querySelectorAll("[data-request-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      handleOperationalRequestAction(
        button.dataset.requestKind,
        button.dataset.requestAction,
        button.dataset.requestEntityType,
        button.dataset.id,
        { source: "Fila principal" },
      );
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
        openCompanyEditorModal(button.dataset.id);
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
    button.addEventListener("click", () => {
      removeItem(button.dataset.delete, button.dataset.id);
    });
  });

  document.querySelectorAll("[data-user-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.userAction;
      const user = state.users.find((item) => sameId(item.id, button.dataset.id));
      if (!user) return;
      if (action === "toggle-access") {
        await toggleUserAccess(user);
        return;
      }
      if (action === "reset-password" || action === "resend-invite") {
        await resendUserAccessInvite(user, action === "reset-password" || button.dataset.reset === "1");
        return;
      }
      if (action === "change-role" || action === "change-link") {
        openForm("user", user.id);
      }
    });
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
      const label = button.dataset.docStatus === "Aprovado" ? "Aprovar documento" : "Solicitar revisão do documento";
      console.log(label, button.dataset.id);
      updateDocumentStatus(button.dataset.id, button.dataset.docStatus);
    });
  });

  document.querySelectorAll("[data-demobilize]").forEach((button) => {
    button.addEventListener("click", () => demobilizeCompany(button.dataset.id));
  });

  document.querySelector("[data-new-company]")?.addEventListener("click", () => openCompanyEditorModal(null));

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
    } catch (error) {
      alert(`Nao foi possivel salvar a empresa.\n\n${persistenceMessage(error)}`);
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
    input.setAttribute("maxlength", "18");
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
  root.querySelectorAll("[data-mask='uf']").forEach((input) => {
    input.setAttribute("maxlength", "2");
    input.value = normalizeUf(input.value);
    input.addEventListener("input", () => {
      input.value = normalizeUf(input.value);
    });
  });
}

function bindEmployeeCompanyContractSync(root = document) {
  root.querySelectorAll("form").forEach((form) => {
    const companySelect = form.querySelector("[name='companyId']");
    const contractSourceSelect = form.querySelector("[name='contractSourceId']");
    const companyDisplay = form.querySelector("[name='companyDisplay']");
    const contractInput = form.querySelector("[name='contract']");
    if (!contractInput) return;
    const costCenterInput = form.querySelector("[name='costCenter']");
    const fiscalInput = form.querySelector("[name='companyFiscal']");
    const managerInput = form.querySelector("[name='contractManager']");
    const serviceTypeInput = form.querySelector("[name='serviceType']");
    const unitSectorInput = form.querySelector("[name='unitSector']");
    const syncFromContract = () => {
      const company = companySelect ? state.companies.find((item) => sameId(item.id, companySelect.value)) : null;
      const source = contractSourceSelect ? state.companies.find((item) => sameId(item.id, contractSourceSelect.value)) : company;
      const selectedCompany = normalizeCompany(source || company || {});
      const baseCompany = normalizeCompany(company || source || {});
      if (companyDisplay) companyDisplay.value = companyName(baseCompany.id || companySelect?.value || "");
      contractInput.value = selectedCompany.contract || contractInput.value || "";
      if (costCenterInput) costCenterInput.value = selectedCompany.costCenter || selectedCompany.contract || costCenterInput.value || "";
      if (fiscalInput) fiscalInput.value = selectedCompany.fiscal || fiscalInput.value || "";
      if (managerInput) managerInput.value = selectedCompany.manager || selectedCompany.responsible || managerInput.value || "";
      if (serviceTypeInput) serviceTypeInput.value = selectedCompany.serviceType || selectedCompany.risk || serviceTypeInput.value || "";
      if (unitSectorInput) unitSectorInput.value = selectedCompany.unitSector || contractUnit(selectedCompany) || contractUnit(baseCompany) || unitSectorInput.value || "";
    };
    if (contractSourceSelect) {
      contractSourceSelect.addEventListener("change", syncFromContract);
      syncFromContract();
      return;
    }
    if (!companySelect) return;
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

function openForm(type, id = null, context = {}) {
  if (type === "document") {
    const doc = id ? state.documents.find((item) => sameId(item.id, id)) : null;
    if (id && (!doc || !canAccessDocument(doc) || !can("edit.document", doc))) return;
    if (!id && !can("create.document")) return;
  }
  if (type === "user" && !canView("users")) return;
  const config = formConfig(type, id, context);
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
  bindImageUploadPreviews(modal);
  bindCompanyContractFiscalToggle(modal);
  bindEmployeeCompanyContractSync(modal);
  bindUserCreationMode(modal, type, id);
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

function bindUserCreationMode(root, type, id = null) {
  if (type !== "user") return;
  const form = root.querySelector("#modalForm");
  if (!form) return;
  const creationRadios = Array.from(form.querySelectorAll("input[name='creationMode']"));
  const passwordField = form.querySelector("[data-user-password-field]");
  const passwordInput = form.querySelector("[name='password']");
  const hint = form.querySelector("[data-user-creation-hint]");
  if (!creationRadios.length || !passwordField || !passwordInput) return;
  const sync = () => {
    const selected = creationRadios.find((radio) => radio.checked)?.value || "test";
    const isReal = selected === "real";
    passwordField.style.display = isReal ? "none" : "";
    passwordInput.disabled = isReal;
    if (isReal) {
      passwordInput.required = false;
      passwordInput.value = "";
      if (hint) hint.textContent = "Modo real: o sistema enviara convite de primeiro acesso para o e-mail informado.";
      return;
    }
    passwordInput.required = !id;
    if (hint) hint.textContent = "Modo teste: senha temporaria definida pelo administrador, sem envio de convite.";
  };
  creationRadios.forEach((radio) => radio.addEventListener("change", sync));
  sync();
}

function formConfig(type, id, context = {}) {
  const maps = {
    company: (companyId) => companyForm(companyId, context),
    employee: (employeeId) => employeeForm(employeeId, context),
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

function radioGroupField(name, label, selectedValue, options) {
  return `
    <fieldset class="wide radio-fieldset">
      <legend>${label}</legend>
      <div class="radio-group">
        ${options
          .map(
            (option) => `
              <label>
                <input type="radio" name="${name}" value="${escapeAttr(option.value)}" ${String(option.value) === String(selectedValue) ? "checked" : ""} />
                <span>${escapeHtml(option.label)}</span>
              </label>
            `,
          )
          .join("")}
      </div>
    </fieldset>
  `;
}

function formSection(title, fields) {
  return `
    <fieldset class="form-section wide">
      <legend>${title}</legend>
      <div class="form-section-grid">${fields.join("")}</div>
    </fieldset>
  `;
}

function companyUsesDifferentContractFiscal(item = {}) {
  if (typeof item.contractFiscalDifferent === "boolean") return item.contractFiscalDifferent;
  const primaryName = normalizeSearchValue(item.fiscal || "");
  const contractName = normalizeSearchValue(item.contractFiscal || "");
  const primaryEmail = normalizeSearchValue(item.fiscalEmail || item.fiscal_email || "");
  const contractEmail = normalizeSearchValue(item.contractFiscalEmail || item.contractFiscal_email || "");
  const primaryPhone = onlyDigits(item.fiscalTelefone || item.fiscal_telefone || "");
  const contractPhone = onlyDigits(item.contractFiscalPhone || item.contractFiscal_phone || "");
  if (!contractName && !contractEmail && !contractPhone) return false;
  return Boolean((primaryName && contractName && contractName !== primaryName) || (primaryEmail && contractEmail && contractEmail !== primaryEmail) || (primaryPhone && contractPhone && contractPhone !== primaryPhone));
}

function companyPrimaryFiscalSection(item = {}) {
  return formSection("Fiscal principal da empresa", [
    inputField("fiscal", "Nome do fiscal", item.fiscal || "", "required"),
    inputField("fiscalEmail", "E-mail do fiscal", item.fiscalEmail || item.fiscal_email || "", "type='email'"),
    inputField("fiscalTelefone", "Telefone do fiscal", item.fiscalTelefone || item.fiscal_telefone || ""),
  ]);
}

function companyContractFiscalSection(item = {}) {
  const different = companyUsesDifferentContractFiscal(item);
  const requiredAttr = different ? "required data-contract-fiscal-required='true'" : "data-contract-fiscal-required='true'";
  return formSection("Contrato Inicial", [
    inputField("contract", "Número do contrato", item.contract, "required"),
    inputField("costCenter", "Centro de custo", item.costCenter || "", "required"),
    inputField("contractServiceType", "Tipo de serviço do contrato", item.contractServiceType || item.serviceType || item.risk || "", "required"),
    selectField("contractStatus", "Status do contrato", item.contractStatus || item.status || "Ativa", ["Ativa", "Pendente", "Bloqueado", "Inativa", "Encerrado", "Desmobilizado"].map(option)),
    inputField("manager", "Gestor do contrato", item.manager || item.responsible, "required"),
    `<label class="wide" style="display:flex;align-items:center;gap:0.5rem;justify-content:flex-start;margin:0.25rem 0 0.5rem;"><input type="checkbox" name="useDifferentContractFiscal" data-contract-fiscal-toggle ${different ? "checked" : ""} /><span>Usar fiscal diferente neste contrato</span></label>`,
    `<div class="wide" data-contract-fiscal-fields style="${different ? "" : "display:none;"}">
      <div class="form-section-grid">
        ${inputField("contractFiscal", "Nome do fiscal do contrato", item.contractFiscal || item.fiscal || "", requiredAttr)}
        ${inputField("contractFiscalEmail", "E-mail do fiscal do contrato", item.contractFiscalEmail || item.contractFiscal_email || item.fiscalEmail || item.fiscal_email || "", `type='email' ${requiredAttr}`)}
        ${inputField("contractFiscalPhone", "Telefone do fiscal do contrato", item.contractFiscalPhone || item.contractFiscal_phone || item.fiscalTelefone || item.fiscal_telefone || "", requiredAttr)}
      </div>
    </div>`,
    inputField("startDate", "Data de início", item.startDate, "type='date' required"),
    inputField("endDate", "Data de fim", item.endDate, "type='date' required"),
    inputField("unitSector", "Unidade / setor", item.unitSector || ""),
    inputField("contractArea", "Área / departamento", item.contractArea || ""),
    inputField("branchCodeContract", "Código filial", companyBranchCode(item) === "Nao informado" ? "" : companyBranchCode(item)),
    inputField("contractNotes", "Observação do contrato", item.contractNotes || ""),
  ]);
}

function bindCompanyContractFiscalToggle(root = document) {
  root.querySelectorAll("form").forEach((form) => {
    const toggle = form.querySelector("[data-contract-fiscal-toggle]");
    const fields = form.querySelector("[data-contract-fiscal-fields]");
    if (!toggle || !fields) return;
    const requiredInputs = fields.querySelectorAll("[data-contract-fiscal-required='true']");
    const sync = () => {
      const enabled = toggle.checked;
      fields.style.display = enabled ? "" : "none";
      requiredInputs.forEach((input) => {
        if (enabled) input.setAttribute("required", "required");
        else input.removeAttribute("required");
      });
    };
    toggle.addEventListener("change", sync);
    sync();
  });
}

const IMAGE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_UPLOAD_ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function mediaFrameConfig(kind = "company", compact = false) {
  const isEmployee = kind === "employee";
  return {
    fit: isEmployee ? "cover" : "contain",
    radius: isEmployee ? "999px" : "12px",
    background: isEmployee ? "#eef2f7" : "#f8fafc",
    border: "1px solid rgba(15, 23, 42, 0.12)",
    minHeight: compact ? "0" : isEmployee ? "160px" : "140px",
    aspectRatio: compact ? "auto" : isEmployee ? "1 / 1" : "16 / 10",
    padding: compact ? "0" : "0.35rem",
  };
}

function mediaFrameMarkup(src, fallbackText, altText, kind = "company", compact = false, surface = true) {
  const styles = mediaFrameConfig(kind, compact);
  const wrapperStyle = [
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "width:100%",
    compact ? "height:100%" : "",
    surface ? `background:${styles.background}` : "background:transparent",
    surface ? `border:${styles.border}` : "border:0",
    `border-radius:${styles.radius}`,
    "box-sizing:border-box",
    "overflow:hidden",
    `padding:${surface ? styles.padding : "0"}`,
    !surface || styles.aspectRatio === "auto" ? "" : `aspect-ratio:${styles.aspectRatio}`,
    !surface || styles.minHeight === "0" ? "" : `min-height:${styles.minHeight}`,
  ]
    .filter(Boolean)
    .join(";");
  const imgStyle = [
    "display:block",
    "width:100%",
    "height:100%",
    `object-fit:${styles.fit}`,
    `background:${styles.background}`,
  ].join(";");
  const hasSrc = String(src || "").trim();
  if (hasSrc) {
    return `<span style="${wrapperStyle}"><img class="entity-avatar-image" src="${escapeAttr(src)}" alt="${escapeAttr(altText)}" style="${imgStyle}" /></span>`;
  }
  return `<span class="muted" style="${wrapperStyle};text-align:center;">${escapeHtml(fallbackText)}</span>`;
}

function imageUploadField(name, label, currentUrl = "", hint = "", kind = "company") {
  const preview = String(currentUrl || "").trim();
  const prompt = /foto/i.test(label) ? "Editar foto" : "Editar logo";
  const placeholder = kind === "employee" ? "FOTO" : "LOGO";
  return `
    <div class="wide image-upload-field ${escapeAttr(kind)}" data-image-upload-field="${escapeAttr(name)}" data-image-kind="${escapeAttr(kind)}">
      <div class="image-upload-stage">
        <div class="image-upload-preview" data-image-preview="${escapeAttr(name)}" data-current-src="${escapeAttr(preview)}">
          ${mediaFrameMarkup(preview, placeholder, `Preview de ${label}`, kind, false, false)}
        </div>
        <label class="btn icon image-upload-trigger" for="${escapeAttr(name)}-input" aria-label="${escapeAttr(prompt)}" title="${escapeAttr(prompt)}">
          ${icon("camera")}
        </label>
      </div>
      <input id="${escapeAttr(name)}-input" name="${name}" type="file" accept="image/png,image/jpeg,image/webp" data-image-upload="${escapeAttr(name)}" class="image-upload-input" />
    </div>
  `;
}

function renderImagePreview(preview, src = "", label = "", kind = "company") {
  if (!preview) return;
  if (preview.dataset.objectUrl) {
    try {
      URL.revokeObjectURL(preview.dataset.objectUrl);
    } catch (_) {
      // Ignora falha ao limpar preview anterior.
    }
    delete preview.dataset.objectUrl;
  }
  if (!src) {
    preview.innerHTML = mediaFrameMarkup("", kind === "employee" ? "FOTO" : "LOGO", label, kind, false, false);
    return;
  }
  preview.innerHTML = mediaFrameMarkup(src, label, label, kind, false, false);
}

function bindImageUploadPreviews(root = document) {
  root.querySelectorAll("[data-image-upload-field]").forEach((field) => {
    const input = field.querySelector("input[type='file']");
    const preview = field.querySelector("[data-image-preview]");
    if (!input || !preview) return;
    const label = input.getAttribute("data-image-upload") || input.name || "imagem";
    const kind = field.dataset.imageKind || "company";
    const syncPreview = () => {
      const file = input.files?.[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        preview.dataset.objectUrl = objectUrl;
        renderImagePreview(preview, objectUrl, `Preview de ${label}`, kind);
        return;
      }
      const currentSrc = preview.dataset.currentSrc || "";
      renderImagePreview(preview, currentSrc, `Imagem atual de ${label}`, kind);
    };
    input.addEventListener("change", syncPreview);
    syncPreview();
  });
}

async function uploadImageToDocuments(form, fieldName, folder, recordId, fallbackUrl = "", label = "imagem") {
  const file = form.get(fieldName);
  const fallback = String(fallbackUrl || "").trim();
  if (!file || !file.name || typeof file.size !== "number") return fallback;
  if (!IMAGE_UPLOAD_ALLOWED_TYPES.has(file.type)) {
    alert(`${label} invalida. Use JPG, JPEG, PNG ou WEBP.`);
    return fallback;
  }
  if (file.size > IMAGE_UPLOAD_MAX_BYTES) {
    alert(`${label} muito grande. Limite maximo de 5 MB.`);
    return fallback;
  }
  if (!supabaseClient || !isOnlineMode()) {
    console.warn(`[Imagem] Nao foi possivel enviar ${label}; usando valor atual.`, { fieldName, folder, recordId });
    alert(`Nao foi possivel enviar ${label} agora. O cadastro sera salvo sem a imagem nova.`);
    return fallback;
  }
  const cleanName = String(file.name).replace(/[^\w.-]+/g, "_");
  const path = `${folder}/${recordId}/${crypto.randomUUID()}-${cleanName}`;
  const context = {
    table: "storage.objects",
    operation: `upload ${label}`,
    payload: {
      bucket: "documents",
      path,
      fileName: file.name,
      fileSize: file.size,
      fieldName,
      folder,
      recordId,
    },
  };
  try {
    await ensureOnlineSession(context.table);
    const { error } = await supabaseClient.storage.from("documents").upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw error;
    const signed = await supabaseClient.storage.from("documents").createSignedUrl(path, 60 * 60 * 24 * 7);
    if (signed?.data?.signedUrl) return signed.data.signedUrl;
    const publicUrl = supabaseClient.storage.from("documents").getPublicUrl(path)?.data?.publicUrl || "";
    if (publicUrl) return publicUrl;
    throw new Error("Nao foi possivel gerar uma URL de acesso para a imagem enviada.");
  } catch (error) {
    console.warn(`[Imagem] Falha ao enviar ${label}; mantendo valor anterior.`, error);
    alert(`Nao foi possivel enviar ${label}.\n\n${persistenceMessage(error)}`);
    return fallback;
  }
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

function companyForm(id, context = {}) {
  const item = normalizeCompany(state.companies.find((company) => sameId(company.id, id)) || context.template || {});
  return {
    title: id ? "Editar empresa" : "Nova empresa",
    fields: [
      formSection("Dados da empresa", [
        imageUploadField("logoFile", "Logo da empresa", companyLogoUrl(item), "", "company"),
        inputField("name", "Razão social", item.name, "required"),
        inputField("tradeName", "Nome fantasia", companyTradeName(item) === item.name ? "" : companyTradeName(item)),
        inputField("cnpj", "CNPJ", item.cnpj, "required inputmode='numeric' maxlength='18' data-mask='cnpj' placeholder='00.000.000/0000-00'"),
        inputField("serviceType", "Tipo de serviço principal", item.serviceType || item.risk || "", "required"),
        inputField("phone", "Telefone da empresa", item.phone, "required inputmode='numeric' maxlength='15' data-mask='phone' placeholder='(00) 00000-0000'"),
        inputField("email", "E-mail da empresa", item.email, "type='email' required"),
        inputField("branchCode", "Matriz / Filial", companyBranchCode(item) === "Nao informado" ? "" : companyBranchCode(item)),
        selectField("status", "Status", item.status || "Ativa", ["Ativa", "Pendente", "Bloqueada", "Inativa", "Desmobilizada"].map(option)),
        inputField("cep", "CEP", item.cep || "", "inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
        inputField("city", "Cidade", item.city || item.municipio || ""),
        inputField("uf", "UF", item.uf || "", "inputmode='text' maxlength='2' data-mask='uf' placeholder='UF'"),
        inputField("district", "Bairro", item.district || ""),
        inputField("street", "Logradouro", item.street || ""),
        inputField("number", "Número", item.number || ""),
        inputField("complement", "Complemento", item.complement || ""),
        inputField("companyCode", "Código da empresa", companyCode(item) === item.id ? "" : companyCode(item)),
      ]),
      companyPrimaryFiscalSection(item),
      formSection("Fornecedor responsável", [
        inputField("supplierName", "Nome do responsável", item.supplierName || item.contact || item.responsible || ""),
        inputField("supplierEmail", "E-mail do responsável", item.supplierEmail || ""),
        inputField("supplierPhone", "Telefone do responsável", item.supplierPhone || ""),
        inputField("supplierRole", "Cargo / função", item.supplierRole || ""),
      ]),
      companyContractFiscalSection(item),
      textAreaField("notes", "Observações da empresa", companyVisibleNotes(item)),
    ],
    save(form) {
      return saveCompanyFromForm(form);
    },
  };
}

function employeeForm(id, context = {}) {
  const item = state.employees.find((employee) => sameId(employee.id, id)) || {};
  const role = currentUser()?.role || "visitor";
  const isSupplier = role === "supplier";
  const canEditOperationalLink = ["admin", "fiscal"].includes(role);
  const supplierWorkflowLocked = isSupplier && id && !employeeWorkflowEditableBySupplier(item);
  const visibleCompanyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  const fallbackCompanyId = context.companyId || item.companyId || visibleCompanyOptions[0]?.value || state.companies[0]?.id || "";
  const hasCompanyContext = Boolean(context.companyId);
  const contractContext = hasCompanyContext ? employeeContractContext(fallbackCompanyId, employeeContractSourceId(item)) : null;
  const linkedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, item.companyId)) || {});
  const activeCompany = hasCompanyContext ? contractContext.baseCompany : linkedCompany;
  const selectedContract = hasCompanyContext ? contractContext.selectedCompany : linkedCompany;
  const contractOptions = hasCompanyContext ? contractContext.options : activeCompanyContractOptions(item.companyId || fallbackCompanyId);
  const selectedContractId = hasCompanyContext ? contractContext.selectedId : employeeContractSourceId(item) || item.companyId || fallbackCompanyId;
  const docs = employeeDocsFor(item);
  const documentStatus = calculateDocumentStatus(item, docs);
  const hiringStatus = calculateHiringStatus(item, docs, documentStatus);
  const legacyAddress = parseLegacyEmployeeAddress(item.address);
  const currentCep = item.cep || legacyAddress.cep || "";
  const registrationField = isSupplier
    ? `<div class="wide item-card"><strong>Matrícula do funcionario</strong><span class="muted">Preenchida posteriormente pela Segurança Patrimonial.</span></div>`
    : inputField("registration", "Matrícula do funcionario", item.registration, "required");
  const companyField = hasCompanyContext
    ? `
      <input type="hidden" name="companyId" value="${escapeAttr(fallbackCompanyId)}" />
      ${inputField("companyDisplay", "Empresa vinculada", activeCompany.name || companyName(fallbackCompanyId), "readonly")}
    `
    : selectField("companyId", "Empresa vinculada", item.companyId || fallbackCompanyId, visibleCompanyOptions);
  const inheritedCostCenter = selectedContract.costCenter || selectedContract.contract || linkedCompany.costCenter || linkedCompany.contract || "";
  const inheritedFiscal = selectedContract.fiscal || linkedCompany.fiscal || "";
  const inheritedManager = selectedContract.manager || selectedContract.responsible || linkedCompany.manager || linkedCompany.responsible || "";
  const inheritedServiceType = selectedContract.serviceType || selectedContract.risk || linkedCompany.serviceType || linkedCompany.risk || "";
  const inheritedUnitSector = selectedContract.unitSector || contractUnit(selectedContract) || contractUnit(linkedCompany);
  return {
    title: id ? "Editar funcionario" : hasCompanyContext ? "Novo funcionario da empresa" : "Novo funcionario",
    fields: [
      registrationField,
      inputField("name", "Nome completo", item.name, "required"),
      inputField("cpf", "CPF", item.cpf, "required inputmode='numeric' maxlength='14' data-mask='cpf' placeholder='000.000.000-00'"),
      inputField("birthDate", "Data de nascimento", item.birthDate, "type='date' required"),
      inputField("motherName", "Nome da mae", item.motherName, "required"),
      inputField("fatherName", "Nome do pai", item.fatherName),
      inputField("role", "Funcao", item.role, "required"),
      imageUploadField("photoFile", "Foto do funcionário", employeePhotoUrl(item), "", "employee"),
      companyField,
      hasCompanyContext
        ? formSection("Vinculo contratual", [
            selectField("contractSourceId", "Contrato ativo", selectedContractId, contractOptions),
            inputField("contract", "Número do contrato", selectedContract.contract || linkedCompany.contract || "", "readonly"),
            inputField("costCenter", "Centro de custo", inheritedCostCenter, "readonly"),
            inputField("companyFiscal", "Fiscal da empresa", inheritedFiscal, "readonly"),
            inputField("contractManager", "Gestor do contrato", inheritedManager, "readonly"),
            inputField("serviceType", "Tipo de servico", inheritedServiceType, "readonly"),
            inputField("unitSector", "Unidade / setor", inheritedUnitSector, "readonly"),
          ])
        : `${inputField("contract", "Número do contrato", item.contract || linkedCompany.contract || "", `${canEditOperationalLink ? "" : "readonly"} required`)}${inputField("costCenter", "Centro de custo", item.costCenter || linkedCompany.costCenter || linkedCompany.contract || "", canEditOperationalLink ? "required" : "required readonly")}${inputField("companyFiscal", "Fiscal da empresa", item.companyFiscal || linkedCompany.fiscal || "", canEditOperationalLink ? "" : "readonly")}${inputField("contractManager", "Gestor do contrato", item.contractManager || linkedCompany.manager || linkedCompany.responsible || "", canEditOperationalLink ? "" : "readonly")}${inputField("serviceType", "Tipo de servico", item.serviceType || linkedCompany.serviceType || linkedCompany.risk || "", "readonly")}${inputField("unitSector", "Unidade / setor", item.unitSector || contractUnit(linkedCompany), "readonly")}`,
      inputField("asoValidity", "Validade de ASO", item.asoValidity || today(), "type='date'"),
      inputField("trainingValidity", "Validade de treinamento", item.trainingValidity || today(), "type='date'"),
      inputField("docStatus", "Status documental", documentStatus, "readonly"),
      inputField("status", "Status de contratacao", hiringStatus, "readonly"),
      formSection("Endereço", [
        inputField("cep", "CEP", currentCep, "required inputmode='numeric' maxlength='9' data-mask='cep' placeholder='00000-000'"),
        inputField("street", "Rua / Logradouro", item.street || legacyAddress.street || "", "required"),
        inputField("number", "Número", item.number || legacyAddress.number || "", "required inputmode='numeric'"),
        inputField("complement", "Complemento", item.complement || legacyAddress.complement || ""),
        inputField("district", "Bairro", item.district || legacyAddress.district || "", "required"),
        inputField("city", "Cidade", item.city || legacyAddress.city || "", "required"),
        inputField("uf", "Estado / UF", normalizeUf(item.uf || legacyAddress.uf || ""), "required inputmode='text' maxlength='2' data-mask='uf' placeholder='UF'"),
      ]),
      textAreaField("notes", "Observações", item.notes),
    ],
    save(form) {
      if (supplierWorkflowLocked) {
        alert("Funcionário em avaliacao. A edicao fica bloqueada ate haver solicitacao de revisao ou revalidacao.");
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
      const selectedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, form.get("companyId"))) || activeCompany || {});
      const selectedContractCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, form.get("contractSourceId"))) || selectedCompany || {});
      const resolvedCompanyId = form.get("companyId") || selectedCompany.id || "";
      const resolvedContract = form.get("contract") || selectedContractCompany.contract || selectedCompany.contract || "";
      const resolvedCostCenter = hasCompanyContext
        ? selectedContractCompany.costCenter || selectedContractCompany.contract || ""
        : canEditOperationalLink
          ? form.get("costCenter")
          : selectedCompany.costCenter || selectedCompany.contract || "";
      const resolvedFiscal = hasCompanyContext
        ? selectedContractCompany.fiscal || ""
        : canEditOperationalLink
          ? form.get("companyFiscal")
          : selectedCompany.fiscal || "";
      const resolvedManager = hasCompanyContext
        ? selectedContractCompany.manager || selectedContractCompany.responsible || ""
        : canEditOperationalLink
          ? form.get("contractManager")
          : selectedCompany.manager || selectedCompany.responsible || "";
      const resolvedServiceType = hasCompanyContext
        ? selectedContractCompany.serviceType || selectedContractCompany.risk || ""
        : form.get("serviceType") || selectedCompany.serviceType || selectedCompany.risk || "";
      const resolvedUnitSector = hasCompanyContext
        ? selectedContractCompany.unitSector || contractUnit(selectedContractCompany)
        : form.get("unitSector") || contractUnit(selectedCompany);
      const employeeBase = {
        ...item,
        name: form.get("name"),
        companyId: resolvedCompanyId,
        role: form.get("role"),
        cpf: validation.cpf,
        contract: resolvedContract,
        contractSourceId: hasCompanyContext ? selectedContractCompany.id || resolvedCompanyId : item.contractSourceId || resolvedCompanyId,
        costCenter: resolvedCostCenter,
        companyFiscal: resolvedFiscal,
        contractManager: resolvedManager,
        serviceType: resolvedServiceType,
        unitSector: resolvedUnitSector,
        asoValidity: form.get("asoValidity"),
        trainingValidity: form.get("trainingValidity"),
        address: form.get("address"),
        notes: form.get("notes"),
      };
      const nextDocStatus = calculateDocumentStatus(employeeBase, employeeDocsFor({ ...item, id: id || item.id, companyId: resolvedCompanyId }));
      const nextHiringStatus = calculateHiringStatus({ ...employeeBase, docStatus: nextDocStatus }, employeeDocsFor({ ...item, id: id || item.id, companyId: resolvedCompanyId }), nextDocStatus);
      upsert("employees", id, {
        ...employeeBase,
        docStatus: nextDocStatus,
        status: nextHiringStatus,
        notes: form.get("notes"),
      });
    },
  };
}

function documentForm(id) {
  const item = state.documents.find((doc) => sameId(doc.id, id)) || {};
  const comments = documentSectorComments(item);
  const companyOptions = visibleCompanies().map((company) => ({ value: company.id, label: company.name }));
  const employeeSource = currentUser()?.role === "admin" ? state.employees : visibleEmployees();
  const employees = [{ value: "", label: "Documento da empresa" }].concat(
    employeeSource.map((employee) => ({ value: employee.id, label: `${employee.name} - ${companyName(employee.companyId)}` })),
  );
  return {
    title: id ? "Editar documento" : "Novo documento",
    fields: [
      selectField("companyId", "Empresa", item.companyId || companyOptions[0]?.value, companyOptions),
      selectField("employeeId", "Funcionário", item.employeeId || "", employees),
      selectField("type", "Tipo de documento", item.type || documentTypes[0], documentTypes.map(option)),
      inputField("dueDate", "Vencimento", item.dueDate || today(), "type='date'"),
      selectField("status", "Status manual", item.status || "Pendente", ["Aprovado", "Pendente", "Reprovado"].map(option)),
      inputField("filePath", "Arquivo ou URL do documento", item.filePath || ""),
      fileField("documentFile", "Enviar arquivo"),
      textAreaField("notes", "Observações gerais", documentVisibleNotes(item)),
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
  if (!canAccessCompany(payload.companyId)) {
    throw new PersistenceError("Falha em public.documents: sua permissao nao permite usar esta empresa no documento.", {
      table: "public.documents",
      operation: "validacao de escopo",
      hint: "company_id fora do escopo do usuario logado.",
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
    if (!canAccessEmployee(employee)) {
      throw new PersistenceError("Falha em public.documents: funcionario fora do escopo do usuario logado.", {
        table: "public.documents",
        operation: "validacao de escopo",
        hint: "employee_id fora do escopo permitido para o perfil atual.",
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

function userForm(id, context = {}) {
  const item = state.users.find((user) => sameId(user.id, id)) || {};
  const creationMode = context.defaultCreationMode || (item.creationMode === "real" ? "real" : "test");
  const defaultRole = context.defaultRole || item.role || "fiscal";
  const defaultCompanyId = context.companyId ?? item.companyId ?? "";
  return {
    title: id ? "Editar usuario" : "Novo usuario",
    fields: [
      !id
        ? radioGroupField("creationMode", "Tipo de criacao", creationMode, [
            { value: "test", label: "Usuário de teste" },
            { value: "real", label: "Usuário real / enviar convite" },
          ])
        : `<div class="wide item-card"><strong>Modo de criacao</strong><span class="muted">Edicao de usuario existente.</span></div>`,
      !id ? `<div class="wide item-card"><span class="muted" data-user-creation-hint>Modo teste: senha temporaria definida pelo administrador, sem envio de convite.</span></div>` : "",
      inputField("name", "Nome", item.name, "required"),
      inputField("email", "E-mail", item.email, "type='email' required"),
      `<div class="wide" data-user-password-field>${inputField("password", "Senha temporaria", "", id ? "" : "minlength='6' required")}</div>`,
      selectField("role", "Perfil", defaultRole, [
        { value: "admin", label: "Administrador" },
        { value: "fiscal", label: "Fiscal" },
        { value: "medicina", label: "Medicina" },
        { value: "ehs", label: "EHS" },
        { value: "patrimonial", label: "Patrimonial" },
        { value: "supplier", label: "Fornecedor" },
        { value: "visitor", label: "Visitante" },
      ]),
      selectField(
        "companyId",
        "Empresa vinculada",
        defaultCompanyId,
        [{ value: "", label: "Selecione uma empresa" }].concat(state.companies.map((company) => ({ value: company.id, label: company.name }))),
      ),
      selectField("active", "Status", item.active === false ? "false" : "true", [
        { value: "true", label: "Ativo" },
        { value: "false", label: "Inativo" },
      ]),
    ],
    async save(form) {
      const email = String(form.get("email") || "").trim().toLowerCase();
      const creationType = id ? (item.creationMode || "test") : (form.get("creationMode") === "real" ? "real" : "test");
      const localExisting = state.users.find((user) => user.id !== id && String(user.email || "").trim().toLowerCase() === email);
      if (localExisting && id) {
        alert("E-mail ja cadastrado. Edite o usuario existente ou informe outro e-mail.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Informe um e-mail valido para criar o usuario.");
        return;
      }
      const role = String(form.get("role") || "").trim();
      const companyId = optionalNull(form.get("companyId"));
      if (["fiscal", "supplier"].includes(role) && !companyId) {
        alert("Fiscal e fornecedor precisam ser criados com um vinculo de empresa.");
        return;
      }
      const rawPassword = String(form.get("password") || "");
      if (!id && creationType === "test" && rawPassword.length < 6) {
        alert("Senha temporaria obrigatoria com no minimo 6 caracteres para usuario de teste.");
        return;
      }
      const payload = {
        id: id || null,
        name: String(form.get("name") || "").trim(),
        email,
        password: creationType === "test" ? optionalNull(rawPassword) : null,
        creationMode: creationType,
        role,
        companyId,
        setor: optionalNull(item.setor),
        matricula: optionalNull(item.matricula),
        active: form.get("active") === "true",
        createdAt: item.createdAt || new Date().toISOString(),
        isNew: !id,
      };
      if (isOnlineMode()) {
        try {
          const saved = await syncUserRecord(payload);
          state.users = state.users.filter((user) => sameId(user.id, id) || String(user.email || "").trim().toLowerCase() !== saved.email);
          upsert("users", saved.id, { ...payload, ...saved, isNew: false });
          if (!id && creationType === "real") {
            alert("Convite enviado para o e-mail informado.");
          } else {
            alert(id ? "Usuário atualizado com sucesso." : "Usuário criado com sucesso.");
          }
        } catch (error) {
          const message = id ? "Erro ao atualizar usuario" : "Erro ao criar usuario";
          throw new PersistenceError(`${message}: ${persistenceMessage(error)}`, error?.context || { table: "public.usuarios", operation: "salvar usuario", payload: mapUserToDb(payload, { includeId: Boolean(id) }) }, error);
        }
        return;
      }
      upsert("users", id, payload);
      alert(id ? "Usuário atualizado com sucesso." : "Usuário criado com sucesso.");
    },
  };
}

async function toggleUserAccess(user) {
  const nextActive = user.active === false;
  const updated = { ...user, active: nextActive, updatedAt: new Date().toISOString() };
  try {
    if (isOnlineMode()) {
      const saved = await syncUserRecord(updated);
      state.users = state.users.map((item) => (sameId(item.id, saved.id) ? { ...item, ...saved } : item));
    } else {
      upsert("users", user.id, updated);
      saveState();
    }
    renderApp();
    alert(nextActive ? "Acesso reativado com sucesso." : "Acesso inativado com sucesso.");
  } catch (error) {
    console.error("[Usuários] Falha ao alternar acesso", error);
    alert(`Nao foi possivel alterar o acesso.\n\n${persistenceMessage(error)}`);
  }
}

async function resendUserAccessInvite(user, isReset = false) {
  const email = String(user.email || "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    alert("O usuario selecionado nao possui e-mail valido.");
    return;
  }
  try {
    await sendFirstAccessInviteEmail(email);
    alert(isReset ? "Link de redefinicao enviado." : "Convite reenviado com sucesso.");
  } catch (error) {
    console.error("[Usuários] Falha ao reenviar convite/redefinir senha", error);
    alert(`Nao foi possivel enviar o e-mail.\n\n${persistenceMessage(error)}`);
  }
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
  const existingCompany = id ? state.companies.find((company) => sameId(company.id, id)) : null;
  if (id && (!existingCompany || !canAccessCompany(existingCompany) || !can("edit.company", existingCompany))) {
    alert("Seu perfil nao possui permissao para editar esta empresa.");
    return false;
  }
  if (!id && !can("create.company")) {
    alert("Seu perfil nao possui permissao para criar empresa.");
    return false;
  }
  const validation = validateCompanyRegistration({
    id,
    cnpj: form.get("cnpj"),
    phone: form.get("phone"),
    cep: form.get("cep"),
  });
  if (!validation.ok) {
    alert(validation.message);
    return false;
  }
  const previous = existingCompany;
  const isNewCompany = !previous;
  const previousStatus = previous?.status || "";
  const recordId = id || previous?.id || crypto.randomUUID();
  const uploadedLogoUrl = await uploadImageToDocuments(
    form,
    "logoFile",
    "company-images",
    recordId,
    previous?.logoUrl || previous?.logo || previous?.logo_url || "",
    "logo da empresa",
  );
  const fiscalNameInput = String(form.get("fiscal") || previous?.fiscal || "").trim();
  const fiscalEmailInput = normalizeEmail(optionalText(form.get("fiscalEmail")) || previous?.fiscalEmail || "");
  const fiscalPhoneInput = optionalText(form.get("fiscalTelefone")) || previous?.fiscalTelefone || "";
  const additionalFiscalFieldExists = form.has("fiscaisAdicionais");
  const supplierName = String(form.get("supplierName") || previous?.supplierName || previous?.contact || previous?.responsible || "").trim();
  const supplierEmail = normalizeEmail(optionalText(form.get("supplierEmail")) || previous?.supplierEmail || "");
  const supplierPhone = optionalText(form.get("supplierPhone")) || previous?.supplierPhone || "";
  const supplierRole = String(form.get("supplierRole") || previous?.supplierRole || "").trim();
  const manager = String(form.get("manager") || "").trim();
  const useDifferentContractFiscal = form.get("useDifferentContractFiscal") === "on" || form.get("useDifferentContractFiscal") === "true";
  const contractFiscalNameInput = String(form.get("contractFiscal") || "").trim();
  const contractFiscalEmailInput = normalizeEmail(optionalText(form.get("contractFiscalEmail")));
  const contractFiscalPhoneInput = optionalText(form.get("contractFiscalPhone"));
  const contractNumber = String(form.get("contract") || "").trim();
  const costCenter = String(form.get("costCenter") || "").trim();
  const serviceType = String(form.get("serviceType") || previous?.serviceType || previous?.risk || "").trim();
  const contractServiceType = String(form.get("contractServiceType") || previous?.contractServiceType || serviceType || "").trim();
  const contractStatus = String(form.get("contractStatus") || previous?.contractStatus || form.get("status") || "Ativa").trim();
  const contractArea = String(form.get("contractArea") || previous?.contractArea || "").trim();
  const contractNotes = String(form.get("contractNotes") || previous?.contractNotes || "").trim();
  const branchCode = optionalText(form.get("branchCode")) || previous?.branchCode || previous?.codigoFilial || "";
  const branchCodeContract = optionalText(form.get("branchCodeContract")) || previous?.branchCodeContract || branchCode || previous?.codigoFilial || "";
  const city = optionalText(form.get("city")) || previous?.city || previous?.municipio || "";
  const uf = normalizeUf(form.get("uf"));
  const district = optionalText(form.get("district")) || previous?.district || "";
  const street = optionalText(form.get("street")) || previous?.street || "";
  const number = optionalText(form.get("number")) || previous?.number || "";
  const complement = optionalText(form.get("complement")) || previous?.complement || "";
  const notes = optionalText(form.get("notes")) || previous?.notes || previous?.observacoes || "";
  if (!fiscalNameInput) {
    alert("Informe o nome do fiscal principal.");
    return false;
  }
  if (!fiscalEmailInput) {
    alert("Informe o e-mail do fiscal principal.");
    return false;
  }
  if (!fiscalPhoneInput) {
    alert("Informe o telefone do fiscal principal.");
    return false;
  }
  if (!contractNumber) {
    alert("Informe o numero do contrato.");
    return false;
  }
  if (!costCenter) {
    alert("Informe o centro de custo padrao da empresa.");
    return false;
  }
  if (!manager) {
    alert("Informe o gestor do contrato.");
    return false;
  }
  if (useDifferentContractFiscal) {
    if (!contractFiscalNameInput) {
      alert("Informe o nome do fiscal do contrato.");
      return false;
    }
    if (!contractFiscalEmailInput) {
      alert("Informe o e-mail do fiscal do contrato.");
      return false;
    }
    if (!contractFiscalPhoneInput) {
      alert("Informe o telefone do fiscal do contrato.");
      return false;
    }
  }
  const quickFiscal = createQuickFiscalFromCompanyForm(form);
  const selectedFiscalId = quickFiscal?.id || optionalNull(form.get("fiscalId"));
  const selectedFiscal = selectedFiscalId ? state.fiscais.find((fiscal) => sameId(fiscal.id, selectedFiscalId)) : null;
  const fiscalName = selectedFiscal?.nome || fiscalNameInput;
  const fiscalEmail = selectedFiscal?.email || fiscalEmailInput;
  const fiscalPhone = selectedFiscal?.telefone || fiscalPhoneInput;
  const additionalFiscalIds = additionalFiscalFieldExists
    ? form.getAll("fiscaisAdicionais").filter(Boolean).filter((fiscalId) => fiscalId !== selectedFiscalId)
    : previous?.fiscaisAdicionais || [];
  const isSupplier = currentUser()?.role === "supplier";
  const effectiveFiscalId = isSupplier && previous ? previous.fiscalId || null : selectedFiscalId;
  const effectiveFiscal = isSupplier && previous ? previous.fiscal || fiscalName : fiscalName;
  const effectiveAdditionalFiscais = isSupplier && previous ? previous.fiscaisAdicionais || [] : additionalFiscalIds;
  const effectiveManager = isSupplier && previous ? previous.manager || manager : manager;
  const effectiveResponsible = isSupplier && previous ? previous.responsible || previous.contact || supplierName || manager : supplierName || manager;
  const effectiveCostCenter = isSupplier && previous ? previous.costCenter || costCenter : costCenter;
  const effectiveContractFiscalDifferent = isSupplier && previous ? Boolean(previous.contractFiscalDifferent) : useDifferentContractFiscal;
  const effectiveContractFiscal = effectiveContractFiscalDifferent ? contractFiscalNameInput || previous?.contractFiscal || fiscalName : fiscalName;
  const effectiveContractFiscalEmail = effectiveContractFiscalDifferent ? contractFiscalEmailInput || previous?.contractFiscalEmail || fiscalEmail : fiscalEmail;
  const effectiveContractFiscalPhone = effectiveContractFiscalDifferent ? contractFiscalPhoneInput || previous?.contractFiscalPhone || fiscalPhone : fiscalPhone;
  const saved = upsert("companies", recordId, {
    logoUrl: uploadedLogoUrl || previous?.logoUrl || previous?.logo || previous?.logo_url || "",
    name: form.get("name"),
    tradeName: optionalText(form.get("tradeName")) || previous?.tradeName || previous?.nomeFantasia || null,
    cnpj: validation.cnpj,
    companyCode: optionalText(form.get("companyCode")) || previous?.companyCode || previous?.codigoEmpresa || null,
    branchCode: branchCode || previous?.branchCode || previous?.codigoFilial || null,
    branchCodeContract,
    fiscal: effectiveFiscal,
    fiscalId: effectiveFiscalId,
    fiscalEmail,
    fiscalTelefone: fiscalPhone,
    fiscaisAdicionais: effectiveAdditionalFiscais,
    manager: effectiveManager,
    responsible: effectiveResponsible,
    contact: effectiveResponsible,
    supplierName: effectiveResponsible,
    supplierEmail,
    supplierPhone,
    supplierRole,
    costCenter: effectiveCostCenter,
    phone: validation.phone,
    cep: validation.cep,
    city,
    uf,
    district,
    street,
    number,
    complement,
    email: form.get("email"),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    status: form.get("status"),
    contract: contractNumber,
    serviceType,
    contractServiceType,
    contractStatus,
    contractFiscalDifferent: effectiveContractFiscalDifferent,
    contractFiscal: effectiveContractFiscal,
    contractFiscalEmail: effectiveContractFiscalEmail,
    contractFiscalPhone: effectiveContractFiscalPhone,
    unitSector: optionalText(form.get("unitSector")) || previous?.unitSector || "",
    contractArea,
    contractNotes,
    risk: previous?.risk || "Medio",
    notes: `${notes || previous?.notes || previous?.observacoes || ""}`,
  });
  const companyAuditAction = createHistoryEvent({
    entityType: "empresa",
    entityId: saved.id,
    action: isNewCompany ? "Criacao de empresa" : "Edicao de empresa",
    previousStatus: previousStatus || null,
    nextStatus: saved.status || null,
    observation: `${isNewCompany ? "Cadastro" : "Atualizacao"} da empresa ${saved.name}. Contrato: ${saved.contract || "Nao informado"}.`,
  });
  state.historico = upsertById(state.historico, companyAuditAction);
  syncHistoryEvent(companyAuditAction);
  if (quickFiscal) {
    recordFiscalHistory(quickFiscal, "Fiscal criado", "", quickFiscal.status, `Fiscal ${quickFiscal.nome} criado no cadastro rapido da empresa ${saved.name}.`);
    syncFiscalRecord(quickFiscal)
      .then((onlineFiscal) => {
        saved.fiscalId = onlineFiscal.id;
        saved.fiscal = onlineFiscal.nome;
        saved.fiscalEmail = onlineFiscal.email || saved.fiscalEmail || "";
        saved.fiscalTelefone = onlineFiscal.telefone || saved.fiscalTelefone || "";
        syncEmpresaFiscais(saved).catch((error) => console.warn("Nao foi possivel salvar vinculo empresa_fiscais.", error));
      })
      .catch((error) => {
        console.warn("Nao foi possivel salvar fiscal online.", error);
      });
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
  if ((previous?.manager || previous?.responsible || "") !== (saved.manager || saved.responsible || "")) {
    const history = createHistoryEvent({
      entityType: "empresa",
      entityId: saved.id,
      action: "Troca de gestor",
      previousStatus: previous?.manager || previous?.responsible || "",
      nextStatus: saved.manager || saved.responsible || "",
      observation: `Gestor do contrato da empresa ${saved.name} alterado.`,
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
    console.warn("Nao foi possivel sincronizar a empresa online. O cadastro local foi mantido.", error);
    alert(`Empresa salva localmente, mas nao foi possivel sincronizar online.\n\n${persistenceMessage(error)}`);
  }
  try {
    recordManualStatusHistory("empresa", saved.id, previousStatus, saved.status, `Empresa ${saved.name} salva pelo formulario.`);
    // Evita travar a UI no clique de salvar; recalculo operacional roda em segundo plano.
    setTimeout(() => {
      try {
        const statusChanges = applyAutomaticStatusRules({ source: "Empresa salva", scope: { companyId: saved.id } });
        persistAutomaticStatusChanges(statusChanges);
        if (statusChanges.length) renderApp();
      } catch (secondaryError) {
        console.warn("Empresa salva, mas recalculo operacional assincrono falhou.", secondaryError);
      }
    }, 0);
  } catch (error) {
    console.warn("Empresa salva, mas uma rotina secundaria de historico/status falhou.", error);
  }
  saveState();
  editingCompanyId = null;
  render();
  return saved;
}

function createQuickFiscalFromCompanyForm(form) {
  if (currentUser()?.role === "supplier") return null;
  const nome = String(form.get("fiscal") || "").trim();
  const email = normalizeEmail(optionalText(form.get("fiscalEmail")));
  if (!nome || !email) return null;
  const fiscals = (state.fiscais || []).map(normalizeFiscal);
  const existingFiscal = email
    ? fiscals.find((fiscal) => normalizeEmail(fiscal.email) === email)
    : nome
      ? fiscals.find((fiscal) => normalizeSearchValue(fiscal.nome) === normalizeSearchValue(nome))
      : null;
  const fiscal = normalizeFiscal({
    ...(existingFiscal || {}),
    id: existingFiscal?.id || crypto.randomUUID(),
    nome: nome || existingFiscal?.nome || "",
    email: email || existingFiscal?.email || "",
    matricula: existingFiscal?.matricula || "",
    telefone: optionalText(form.get("fiscalTelefone")) || existingFiscal?.telefone || "",
    setor: existingFiscal?.setor || "Fiscalizacao",
    status: existingFiscal?.status || "sem_acesso",
    usuarioEmail: existingFiscal?.usuarioEmail || null,
    usuarioId: existingFiscal?.usuarioId || null,
    authUserId: existingFiscal?.authUserId || null,
    createdAt: existingFiscal?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  state.fiscais = upsertById(state.fiscais || [], fiscal);
  return fiscal;
}

function parseLegacyEmployeeAddress(address = "") {
  const parts = String(address || "")
    .split(",")
    .map((part) => String(part || "").trim())
    .filter(Boolean);
  if (!parts.length) return {};
  const [street = "", number = "", complement = "", district = "", city = "", cep = ""] = parts;
  const cepDigits = onlyDigits(cep);
  return {
    street,
    number,
    complement,
    district,
    city,
    uf: "",
    cep: cepDigits.length === 8 ? formatCep(cepDigits) : "",
  };
}

function normalizeUf(value = "") {
  return String(value || "").trim().toUpperCase().slice(0, 2);
}

function buildEmployeeAddressFromParts({ street = "", number = "", complement = "", district = "", city = "", uf = "", cep = "" } = {}) {
  const cityUf = [String(city || "").trim(), normalizeUf(uf)].filter(Boolean).join("/");
  const parts = [street, number, complement, district, cityUf, formatCep(cep)]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  return parts.join(", ");
}

async function saveFiscalFromForm(form) {
  if (!["admin", "fiscal"].includes(currentUser()?.role || "visitor")) {
    alert("Somente administrador ou fiscal pode cadastrar fiscais.");
    return;
  }
  const nome = String(form.get("nome") || "").trim();
  const email = normalizeEmail(optionalText(form.get("email")));
  const fiscals = (state.fiscais || []).map(normalizeFiscal);
  const existingFiscal = email
    ? fiscals.find((fiscal) => normalizeEmail(fiscal.email) === email)
    : nome
      ? fiscals.find((fiscal) => normalizeSearchValue(fiscal.nome) === normalizeSearchValue(nome))
      : null;
  const fiscal = normalizeFiscal({
    ...(existingFiscal || {}),
    id: existingFiscal?.id || crypto.randomUUID(),
    nome: nome || existingFiscal?.nome || "",
    email: email || existingFiscal?.email || "",
    matricula: optionalText(form.get("matricula")) || existingFiscal?.matricula || "",
    telefone: optionalText(form.get("telefone")) || existingFiscal?.telefone || "",
    setor: optionalText(form.get("setor")) || existingFiscal?.setor || "Fiscalizacao",
    status: form.get("status") || existingFiscal?.status || "sem_acesso",
    usuarioEmail: existingFiscal?.usuarioEmail || null,
    usuarioId: existingFiscal?.usuarioId || null,
    authUserId: existingFiscal?.authUserId || null,
    createdAt: existingFiscal?.createdAt || new Date().toISOString(),
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
  if (!["admin", "fiscal"].includes(currentUser()?.role || "visitor") || !canAccessFiscal(fiscal)) {
    alert("Seu perfil nao possui permissao para inativar este fiscal.");
    return;
  }
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
  const existingEmployee = id ? state.employees.find((employee) => sameId(employee.id, id)) : null;
  if (id && (!existingEmployee || !canAccessEmployee(existingEmployee) || !can("edit.employee", existingEmployee))) {
    alert("Seu perfil nao possui permissao para editar este funcionario.");
    return;
  }
  if (!id && !can("create.employee")) {
    alert("Seu perfil nao possui permissao para cadastrar funcionario.");
    return;
  }
  if (!form.get("companyId")) {
    alert("Selecione uma empresa vinculada para o funcionario.");
    return;
  }
  if (!canAccessCompany(form.get("companyId"))) {
    alert("Empresa fora do escopo do perfil logado.");
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
  const uf = normalizeUf(form.get("uf"));
  if (uf.length !== 2) {
    alert("UF invalida. Informe 2 letras.");
    return;
  }
  const existing = existingEmployee;
  const isNewEmployee = !existing;
  const previousStatus = existing?.status || "";
  const recordId = id || existing?.id || crypto.randomUUID();
  const linkedCompany = normalizeCompany(state.companies.find((company) => sameId(company.id, form.get("companyId"))) || {});
  const existingContractSourceId = employeeContractSourceId(existingEmployee || {});
  const selectedContractCompany = normalizeCompany(
    state.companies.find((company) => sameId(company.id, form.get("contractSourceId") || existingContractSourceId || form.get("companyId"))) || linkedCompany,
  );
  const canEditFullEmployee =
    currentUser()?.role === "admin" ||
    currentUser()?.role === "fiscal" ||
    (currentUser()?.role === "supplier" && (!existing || sameId(existing.companyId, currentUser()?.companyId)));
  const canEditOperationalLink = ["admin", "fiscal"].includes(currentUser()?.role);
  const hasContractContext = Boolean(form.get("contractSourceId") || existingContractSourceId);
  const resolvedContract = String(hasContractContext ? selectedContractCompany.contract || selectedContractCompany.contract_number || selectedContractCompany.contractNumber || "" : form.get("contract") || linkedCompany.contract || "").trim();
  const resolvedCostCenter = hasContractContext
    ? String(selectedContractCompany.costCenter || selectedContractCompany.contract || "").trim()
    : canEditOperationalLink
      ? String(form.get("costCenter") || linkedCompany.costCenter || linkedCompany.contract || "").trim()
      : String(linkedCompany.costCenter || linkedCompany.contract || "").trim();
  const resolvedFiscal = hasContractContext
    ? String(selectedContractCompany.fiscal || "").trim()
    : canEditOperationalLink
      ? String(form.get("companyFiscal") || linkedCompany.fiscal || "").trim()
      : String(linkedCompany.fiscal || "").trim();
  const resolvedManager = hasContractContext
    ? String(selectedContractCompany.manager || selectedContractCompany.responsible || "").trim()
    : canEditOperationalLink
      ? String(form.get("contractManager") || linkedCompany.manager || linkedCompany.responsible || "").trim()
      : String(linkedCompany.manager || linkedCompany.responsible || "").trim();
  const resolvedServiceType = hasContractContext
    ? String(selectedContractCompany.serviceType || selectedContractCompany.risk || "").trim()
    : String(form.get("serviceType") || linkedCompany.serviceType || linkedCompany.risk || "").trim();
  const resolvedUnitSector = hasContractContext
    ? String(selectedContractCompany.unitSector || contractUnit(selectedContractCompany)).trim()
    : String(form.get("unitSector") || contractUnit(linkedCompany)).trim();
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
  const uploadedPhotoUrl = await uploadImageToDocuments(
    form,
    "photoFile",
    "employee-images",
    recordId,
    existing?.photoUrl || existing?.photo || existing?.photo_url || "",
    "foto do funcionario",
  );
  const payload = {
    name: form.get("name"),
    cpf: cpfDigits,
    registration: form.get("registration"),
    birthDate: form.get("birthDate"),
    motherName: form.get("motherName"),
    fatherName: form.get("fatherName"),
    role: form.get("role"),
    companyId: form.get("companyId"),
    contractSourceId: hasContractContext ? selectedContractCompany.id || form.get("companyId") : existingContractSourceId || form.get("companyId"),
    contract: resolvedContract,
    costCenter: resolvedCostCenter,
    companyFiscal: resolvedFiscal,
    contractManager: resolvedManager,
    serviceType: resolvedServiceType,
    unitSector: resolvedUnitSector,
    cep: cepDigits,
    uf,
    city: form.get("city"),
    district: form.get("district"),
    street: form.get("street"),
    number: form.get("number"),
    complement: form.get("complement"),
    asoValidity: form.get("asoValidity"),
    trainingValidity: form.get("trainingValidity"),
    photoUrl: uploadedPhotoUrl || existing?.photoUrl || existing?.photo || existing?.photo_url || "",
    address: buildEmployeeAddressFromParts({
      street: form.get("street"),
      number: form.get("number"),
      complement: form.get("complement"),
      district: form.get("district"),
      city: form.get("city"),
      uf,
      cep: form.get("cep"),
    }),
    notes: form.get("notes"),
  };
  const fiscalPayload = existing
    ? { ...existing, notes: form.get("notes"), photoUrl: payload.photoUrl }
    : payload;
  const draft = { ...(canEditFullEmployee ? payload : fiscalPayload), id: recordId };
  if ((currentUser()?.role || "visitor") === "supplier") {
    const workflowActions = { ...(existing?.workflowActions || draft.workflowActions || {}) };
    const reviewStep = existing ? employeeWorkflowSteps(existing).find((step) => workflowIsReviewStatus(step.status)) : null;
    if (reviewStep) {
      workflowActions[reviewStep.id] = {
        ...(workflowActions[reviewStep.id] || {}),
        status: "Em revalidação",
        sector: reviewStep.sector,
        label: reviewStep.label,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser()?.name || currentUser()?.email || "Usuário do sistema",
        action: "resubmit",
      };
    } else {
      workflowActions.fiscal = {
        ...(workflowActions.fiscal || {}),
        status: "Enviado para Fiscal",
        sector: "Fiscal",
        label: "Fiscal / Documentos pessoais",
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser()?.name || currentUser()?.email || "Usuário do sistema",
        action: "submit",
      };
    }
    draft.workflowActions = workflowActions;
  }
  const linkedDocs = employeeDocsFor(draft);
  draft.docStatus = calculateDocumentStatus(draft, linkedDocs);
  draft.status = calculateHiringStatus(draft, linkedDocs, draft.docStatus);
  const saved = upsert("employees", recordId, draft);
  const employeeAuditAction = createHistoryEvent({
    entityType: "funcionario",
    entityId: saved.id,
    action: isNewEmployee ? "Criacao de funcionario" : "Edicao de funcionario",
    previousStatus: previousStatus || null,
    nextStatus: saved.status || null,
    observation: `${isNewEmployee ? "Cadastro" : "Atualizacao"} do funcionario ${saved.name}.`,
  });
  state.historico = upsertById(state.historico, employeeAuditAction);
  syncHistoryEvent(employeeAuditAction);
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
    recordManualStatusHistory("funcionario", saved.id, previousStatus, saved.status, `Funcionário ${saved.name} salvo pelo formulario.`);
    persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Funcionário salvo", scope: { employeeId: saved.id, companyId: saved.companyId } }));
  } catch (error) {
    console.warn("Funcionário salvo, mas uma rotina secundaria de historico/status falhou.", error);
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
  if (!canAccessEmployee(employee)) {
    alert("Seu perfil nao possui acesso a este funcionario.");
    return;
  }
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

  const actor = currentUser()?.name || currentUser()?.email || "Usuário do sistema";
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
      const pendingLine = `[${timestamp}] ${actor}: Solicitação de desmobilizacao pendente de aprovacao. Motivo: ${reason.trim()}`;
      employee.notes = currentNotes ? `${currentNotes}\n${pendingLine}` : pendingLine;
      employee.status = "Desmobilização solicitada";
      const history = createHistoryEvent({
        entityType: "funcionario",
        entityId: employee.id,
        action: "Desmobilização solicitada",
        previousStatus,
        nextStatus: employee.status,
        observation: `Motivo: ${reason.trim()}. Aguardando aprovacao do responsavel.`,
      });
      state.historico = upsertById(state.historico, history);
      syncHistoryEvent(history);
      syncCollection("employees", employee).catch((error) => alert(`Nao foi possivel atualizar online: ${error.message}`));
      saveState();
      render();
      alert("Desmobilização registrada como pendente. O status so muda apos aprovacao do responsavel.");
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

async function saveEmployeePatrimonialFields(employeeId, form) {
  const employee = state.employees.find((item) => sameId(item.id, employeeId));
  if (!employee) return;
  const role = currentUser()?.role || "visitor";
  if (!["admin", "patrimonial"].includes(role)) {
    alert("Seu perfil nao possui permissao para editar patrimonio deste funcionario.");
    return;
  }
  if (!canAccessEmployee(employee)) {
    alert("Seu perfil nao possui acesso a este funcionario.");
    return;
  }
  const previous = normalizeEmployee(employee);
  const previousStatus = previous.status || "";
  employee.registration = String(form.get("patrimonialRegistration") || previous.registration || "").trim();
  employee.matricula = employee.registration;
  employee.badgeNumber = String(form.get("badgeNumber") || "").trim();
  employee.cracha = employee.badgeNumber;
  employee.crachaNumber = employee.badgeNumber;
  employee.patrimonialReleaseDate = String(form.get("patrimonialReleaseDate") || "").trim();
  employee.releaseDate = employee.patrimonialReleaseDate;
  employee.patrimonialNotes = String(form.get("patrimonialNotes") || "").trim();
  const visibleNotes = employeeVisibleNotes(employee);
  const patrimonialLine = `[${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date())}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Atualizacao patrimonial. Matrícula: ${employee.registration || "Nao informada"}. Crachá: ${employee.badgeNumber || "Nao informado"}. Liberação: ${employee.patrimonialReleaseDate || "Nao informada"}. Observações: ${employee.patrimonialNotes || "Sem observacoes"}`;
  employee.notes = visibleNotes ? `${visibleNotes}\n${patrimonialLine}` : patrimonialLine;
  employee.updatedAt = new Date().toISOString();
  const history = createHistoryEvent({
    entityType: "funcionario",
    entityId: employee.id,
    action: "Atualizacao patrimonial",
    previousStatus,
    nextStatus: employee.status || previousStatus,
    observation: `Matrícula ${employee.registration || "Nao informada"}; cracha ${employee.badgeNumber || "Nao informado"}; liberacao ${employee.patrimonialReleaseDate || "Nao informada"}. ${employee.patrimonialNotes || ""}`.trim(),
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  try {
    await syncCollection("employees", employee);
  } catch (error) {
    console.error("Falha ao salvar dados patrimoniais do funcionario", {
      table: "employees",
      employeeId,
      payload: mapEmployeeToDb(employee),
      error,
    });
    alert(`Nao foi possivel salvar o patrimonio online: ${persistenceMessage(error)}`);
    return;
  }
  saveState();
  renderApp();
  openEmployeeRecord(employeeId);
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
  if (!canAccessDocument(doc)) {
    alert("Seu perfil nao possui acesso a este documento.");
    return;
  }
  if (!can("approveDocuments", doc)) return;
  const isReviewRequest = statusMatches(status, "Revisão solicitada", "Revalidação solicitada", "Em revalidação");
  let reviewReason = "";
  if (isReviewRequest) {
    reviewReason = prompt(`Informe o motivo obrigatorio para solicitar revisao do documento ${doc.type}:`);
    if (!reviewReason || !reviewReason.trim()) {
      alert("Motivo obrigatorio. A solicitacao de revisao nao foi salva.");
      return;
    }
  }
  const previous = structuredClone(doc);
  const previousStatus = doc.status || "";
  doc.status = status;
  const visibleNotes = documentVisibleNotes(doc);
  const reviewLine = isReviewRequest
    ? `[${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date())}] ${currentUser()?.name || currentUser()?.email || "Sistema"}: Revisao solicitada. Motivo: ${reviewReason.trim()}`
    : "";
  doc.notes = [visibleNotes, reviewLine].filter(Boolean).join("\n");
  doc.auditTrail = [
    ...documentAuditTrail(previous),
    {
      at: new Date().toISOString(),
      user: currentUser()?.email || currentUser()?.name || "Sistema",
      action: "Status atualizado",
      sector: "Fiscal",
      status,
      comment: `${roleName(currentUser().role)} marcou documento como ${status.toLowerCase()}.${isReviewRequest ? ` Motivo: ${reviewReason.trim()}` : ""}`,
    },
  ];
  const history = createHistoryEvent({
    entityType: "documento",
    entityId: doc.id,
    action: "Status documental",
    previousStatus,
    nextStatus: status,
    observation: isReviewRequest ? `Status alterado manualmente para ${status}. Motivo: ${reviewReason.trim()}` : `Status alterado manualmente para ${status}`,
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

function cascadeCompanyInactiveOrDemobilized(companyOrId, nextStatus, { familyScope = false, source = "", reason = "" } = {}) {
  const baseCompany =
    typeof companyOrId === "object"
      ? normalizeCompany(companyOrId)
      : normalizeCompany(state.companies.find((item) => sameId(item.id, companyOrId)) || {});
  if (!baseCompany.id) return { companies: [], employees: [] };

  const affectedCompanies = familyScope ? companyFamilyEntries(baseCompany) : [baseCompany];
  const affectedCompanyIds = new Set(affectedCompanies.map((entry) => String(entry.id)));
  const employeeStatus =
    nextStatus === "Desmobilizada"
      ? "Desmobilizado"
      : nextStatus === "Desmobilização solicitada"
        ? "Desmobilização solicitada"
        : "Inativo";
  const companyAction = familyScope
    ? {
        Inativa: "Inativação de empresa",
        Desmobilizada: "Desmobilização de empresa",
        "Desmobilização solicitada": "Solicitação de desmobilização de empresa",
      }[nextStatus] || "Cascata operacional de empresa"
    : {
        Inativa: "Encerramento de contrato",
        Desmobilizada: "Desmobilização de contrato",
        "Desmobilização solicitada": "Solicitação de desmobilização de contrato",
      }[nextStatus] || "Cascata operacional de contrato";
  const employeeAction = `Cascata - ${companyAction}`;
  const changedCompanies = [];
  const changedEmployees = [];

  affectedCompanies.forEach((company) => {
    const record = state.companies.find((entry) => sameId(entry.id, company.id));
    if (!record) return;
    const previousStatus = record.status || "";
    const previousContractStatus = record.contractStatus || "";
    const contractChanged = previousContractStatus !== nextStatus;
    const statusChanged = previousStatus !== nextStatus;
    if (!contractChanged && !statusChanged) return;
    record.status = nextStatus;
    if ("contractStatus" in record) record.contractStatus = nextStatus;
    const history = createHistoryEvent({
      entityType: "contrato",
      entityId: record.id,
      action: companyAction,
      previousStatus: previousStatus || previousContractStatus || "",
      nextStatus,
      observation: reason || `${companyAction} aplicada${source ? ` por ${source}` : ""}.`,
    });
    state.historico = upsertById(state.historico, history);
    syncHistoryEvent(history);
    syncCollection("companies", record).catch((error) => {
      console.warn("Nao foi possivel salvar cascata de contrato online.", error);
    });
    changedCompanies.push(record.id);
  });

  state.employees
    .filter((employee) => [...affectedCompanyIds].some((companyId) => employeeLinkedToCompanyOrContract(employee, companyId)))
    .forEach((employee) => {
      const previousStatus = employee.status || "";
      if (previousStatus === employeeStatus) return;
      employee.status = employeeStatus;
      const history = createHistoryEvent({
        entityType: "funcionario",
        entityId: employee.id,
        action: employeeAction,
        previousStatus,
        nextStatus: employeeStatus,
        observation:
          reason ||
          `Funcionário ${employee.name || "sem nome"} ${employeeStatus.toLowerCase()} automaticamente por ${companyAction.toLowerCase()} da empresa ${baseCompany.name || "Nao informada"}.`,
      });
      state.historico = upsertById(state.historico, history);
      syncHistoryEvent(history);
      syncCollection("employees", employee).catch((error) => {
        console.warn("Nao foi possivel salvar cascata de funcionario online.", error);
      });
      changedEmployees.push(employee.id);
    });

  if (changedCompanies.length || changedEmployees.length) saveState();
  return { companies: changedCompanies, employees: changedEmployees };
}

function requestReactivation(entityType, id, { source = "" } = {}) {
  const actorRole = currentUser()?.role || "visitor";
  const isEmployee = entityType === "employee";
  const item = isEmployee
    ? state.employees.find((entry) => sameId(entry.id, id))
    : state.companies.find((entry) => sameId(entry.id, id));
  if (!item) return false;
  if (isEmployee ? !canAccessEmployee(item) : !canAccessCompany(item)) {
    alert("Seu perfil nao possui acesso a este registro.");
    return false;
  }
  if (!(actorRole === "supplier" || ["admin", "fiscal"].includes(actorRole))) {
    alert("Seu perfil nao possui permissao para solicitar reativacao.");
    return false;
  }
  const currentStatus = normalizeHiringStatusLabel(item.status || item.contractStatus || "");
  if (isReactivationRequestedStatus(currentStatus)) {
    alert("Existe uma solicitacao de reativacao em aberto para este registro.");
    return false;
  }
  if (!isOperationalWorkflowClosedStatus(currentStatus)) {
    alert("Somente registros inativos, bloqueados ou desmobilizados podem solicitar reativacao.");
    return false;
  }
  const reason = prompt(`Informe o motivo obrigatorio para solicitar reativacao de ${isEmployee ? "funcionario" : "contrato"}:`);
  if (!reason || !reason.trim()) {
    alert("Motivo obrigatorio. A solicitacao de reativacao nao foi salva.");
    return false;
  }
  const previousStatus = item.status || item.contractStatus || "";
  item.status = "Reativação solicitada";
  if (!isEmployee || "contractStatus" in item) item.contractStatus = "Reativação solicitada";
  const timestamp = currentSystemTime();
  const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Solicitação de reativação. Motivo: ${reason.trim()}`;
  if (isEmployee) {
    const currentNotes = employeeVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  } else {
    const currentNotes = companyVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  }
  const history = createHistoryEvent({
    entityType: isEmployee ? "funcionario" : "contrato",
    entityId: item.id,
    action: "Solicitação de reativação",
    previousStatus,
    nextStatus: "Reativação solicitada",
    observation: reason.trim(),
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  syncCollection(isEmployee ? "employees" : "companies", item).catch((error) => {
    console.warn("Nao foi possivel salvar solicitacao de reativacao online.", error);
  });
  saveState();
  renderApp();
  if (source) console.log(source, item.id);
  alert("Solicitação de reativação enviada para análise.");
  return true;
}

function approveReactivation(entityType, id, { source = "" } = {}) {
  const actorRole = currentUser()?.role || "visitor";
  const isEmployee = entityType === "employee";
  const item = isEmployee
    ? state.employees.find((entry) => sameId(entry.id, id))
    : state.companies.find((entry) => sameId(entry.id, id));
  if (!item) return false;
  if (!(actorRole === "admin" || (actorRole === "fiscal" && (isEmployee ? canAccessEmployee(item) : canAccessCompany(item))))) {
    alert("Seu perfil nao possui permissao para aprovar reativacao.");
    return false;
  }
  if (!isReactivationRequestedStatus(item.status || item.contractStatus || "")) {
    alert("Aprovacao permitida somente para registros com reativacao solicitada.");
    return false;
  }
  const previousStatus = item.status || item.contractStatus || "";
  let nextStatus = "Ativa";
  if (isEmployee) {
    const reopened = { ...item, status: "", workflowActions: {} };
    const docs = employeeDocsFor(reopened);
    const docStatus = calculateDocumentStatus(reopened, docs);
    nextStatus = calculateHiringStatus(reopened, docs, docStatus);
    item.workflowActions = {};
    item.docStatus = docStatus;
  } else {
    item.contractStatus = "Ativa";
  }
  item.status = nextStatus;
  if (!isEmployee || "contractStatus" in item) item.contractStatus = nextStatus;
  const timestamp = currentSystemTime();
  const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Reativação aprovada.`;
  if (isEmployee) {
    const currentNotes = employeeVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  } else {
    const currentNotes = companyVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  }
  const history = createHistoryEvent({
    entityType: isEmployee ? "funcionario" : "contrato",
    entityId: item.id,
    action: "Reativação aprovada",
    previousStatus,
    nextStatus,
    observation: `Reativação aprovada${source ? ` por ${source}` : ""}.`,
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  syncCollection(isEmployee ? "employees" : "companies", item).catch((error) => {
    console.warn("Nao foi possivel salvar aprovacao de reativacao online.", error);
  });
  if (isEmployee) {
    persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Reativacao aprovada", scope: { employeeId: item.id, companyId: item.companyId } }));
  }
  saveState();
  renderApp();
  return true;
}

function rejectReactivation(entityType, id, { source = "" } = {}) {
  const actorRole = currentUser()?.role || "visitor";
  const isEmployee = entityType === "employee";
  const item = isEmployee
    ? state.employees.find((entry) => sameId(entry.id, id))
    : state.companies.find((entry) => sameId(entry.id, id));
  if (!item) return false;
  if (!(actorRole === "admin" || (actorRole === "fiscal" && (isEmployee ? canAccessEmployee(item) : canAccessCompany(item))))) {
    alert("Seu perfil nao possui permissao para rejeitar reativacao.");
    return false;
  }
  if (!isReactivationRequestedStatus(item.status || item.contractStatus || "")) {
    alert("Rejeicao permitida somente para registros com reativacao solicitada.");
    return false;
  }
  const reason = prompt(`Informe o motivo da rejeicao da reativacao de ${isEmployee ? "funcionario" : "contrato"}:`);
  if (!reason || !reason.trim()) {
    alert("Motivo obrigatorio. A rejeicao da reativacao nao foi salva.");
    return false;
  }
  const latestRequest = latestReactivationHistoryEvent(isEmployee ? "funcionario" : "contrato", item.id);
  const restoreStatus = latestRequest?.previousStatus || latestRequest?.statusAnterior || latestRequest?.status_anterior || "";
  const previousStatus = item.status || item.contractStatus || "";
  const fallbackStatus = isEmployee ? "Desmobilizado" : "Desmobilizada";
  item.status = restoreStatus || fallbackStatus;
  if (!isEmployee || "contractStatus" in item) item.contractStatus = restoreStatus || fallbackStatus;
  const timestamp = currentSystemTime();
  const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Reativação rejeitada. Motivo: ${reason.trim()}`;
  if (isEmployee) {
    const currentNotes = employeeVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  } else {
    const currentNotes = companyVisibleNotes(item);
    item.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  }
  const history = createHistoryEvent({
    entityType: isEmployee ? "funcionario" : "contrato",
    entityId: item.id,
    action: "Reativação rejeitada",
    previousStatus,
    nextStatus: item.status || previousStatus,
    observation: reason.trim(),
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  syncCollection(isEmployee ? "employees" : "companies", item).catch((error) => {
    console.warn("Nao foi possivel salvar rejeicao de reativacao online.", error);
  });
  saveState();
  renderApp();
  return true;
}

function demobilizeCompany(id) {
  const company = state.companies.find((item) => sameId(item.id, id));
  if (!company) return;
  if (!canAccessCompany(company) || !can("edit.company", company) || currentUser()?.role === "supplier") {
    alert("Seu perfil nao possui permissao para desmobilizar este contrato.");
    return;
  }
  if (!confirm(`Deseja desmobilizar o contrato da empresa ${company.name}?`)) return;
  const reason = prompt(`Informe o motivo obrigatorio para desmobilizar o contrato da empresa ${company.name}:`);
  if (!reason || !reason.trim()) {
    alert("Motivo obrigatorio. A desmobilizacao nao foi aplicada.");
    return;
  }
  cascadeCompanyInactiveOrDemobilized(company, "Desmobilizada", {
    familyScope: true,
    source: "Desmobilização de empresa",
    reason: reason.trim(),
  });
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
    alert("Funcionários nao sao excluidos fisicamente. Use Desmobilizar, Inativar ou Bloquear para manter o historico.");
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
  const meta = companyMeta(company);
  const fiscal = company.fiscalId ? state.fiscais?.find((item) => sameId(item.id, company.fiscalId)) : null;
  const fiscalName = fiscal?.nome || company.fiscal || "Nao informado";
  const contractFiscal = meta.contractFiscal || company.contractFiscal || fiscalName;
  const contractFiscalEmail = meta.contractFiscalEmail || company.contractFiscalEmail || company.contractFiscal_email || "";
  const contractFiscalPhone = meta.contractFiscalPhone || company.contractFiscalPhone || company.contractFiscal_phone || "";
  const contractFiscalDifferent =
    typeof meta.contractFiscalDifferent === "boolean"
      ? meta.contractFiscalDifferent
      : typeof company.contractFiscalDifferent === "boolean"
        ? company.contractFiscalDifferent
        : companyUsesDifferentContractFiscal({
            fiscal: fiscalName,
            fiscalEmail: fiscal?.email || company.fiscalEmail || company.fiscal_email || "",
            fiscalTelefone: fiscal?.telefone || company.fiscalTelefone || company.fiscal_telefone || "",
            contractFiscal,
            contractFiscalEmail,
            contractFiscalPhone,
          });
  return {
    ...company,
    fiscalId: company.fiscalId || company.fiscal_id || null,
    fiscaisAdicionais: company.fiscaisAdicionais || company.fiscais_adicionais || [],
    fiscal: fiscalName,
    fiscalEmail: fiscal?.email || company.fiscalEmail || company.fiscal_email || "",
    fiscalTelefone: fiscal?.telefone || company.fiscalTelefone || company.fiscal_telefone || "",
    fiscalMatrícula: fiscal?.matricula || company.fiscalMatrícula || company.fiscal_matricula || "",
    fiscalSetor: fiscal?.setor || company.fiscalSetor || company.fiscal_setor || "",
    supplierName: meta.supplierName || company.supplierName || company.contact || company.responsible || "",
    supplierEmail: meta.supplierEmail || company.supplierEmail || "",
    supplierPhone: meta.supplierPhone || company.supplierPhone || "",
    supplierRole: meta.supplierRole || company.supplierRole || "",
    logoUrl: meta.logoUrl || company.logoUrl || company.logo || company.logo_url || "",
    contractFiscalDifferent,
    contractFiscal,
    contractFiscalEmail,
    contractFiscalPhone,
    manager: company.manager || company.gestorContrato || company.responsible || company.contact || "Nao informado",
    responsible: company.responsible || company.contact || "Nao informado",
    costCenter: company.costCenter || company.centro_custo || "",
    serviceType: meta.serviceType || company.serviceType || company.tipoServico || company.tipo_servico || company.risk || "",
    contractServiceType: meta.contractServiceType || company.contractServiceType || company.serviceType || company.risk || "",
    contractStatus: meta.contractStatus || company.contractStatus || company.status || "Ativa",
    contractArea: meta.contractArea || company.contractArea || "",
    contractNotes: meta.contractNotes || company.contractNotes || "",
    branchCodeContract: meta.branchCodeContract || company.branchCodeContract || company.branchCode || company.codigoFilial || "",
    street: meta.street || company.street || company.rua || "",
    number: meta.number || company.number || company.numero || "",
    complement: meta.complement || company.complement || company.complemento || "",
    district: meta.district || company.district || company.bairro || "",
    notes: companyVisibleNotes(company),
    unitSector: company.unitSector || company.unit || company.unidade || company.sector || company.setor || "",
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
  const contractSource = normalizeCompany(state.companies.find((company) => sameId(company.id, employeeContractSourceId(employee) || meta.contractSourceId || linkedCompany.id)) || linkedCompany);
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
    contractSourceId: employeeContractSourceId(employee) || meta.contractSourceId || contractSource.id || "",
    contract: employee.contract || meta.contract || contractSource.contract || linkedCompany.contract || "",
    costCenter: employee.costCenter || employee.centroCusto || meta.costCenter || contractSource.costCenter || linkedCompany.costCenter || linkedCompany.contract || "",
    companyFiscal: employee.companyFiscal || meta.companyFiscal || contractSource.fiscal || linkedCompany.fiscal || "",
    contractManager: employee.contractManager || meta.contractManager || contractSource.manager || contractSource.responsible || linkedCompany.manager || linkedCompany.responsible || "",
    serviceType: employee.serviceType || meta.serviceType || contractSource.serviceType || contractSource.risk || linkedCompany.serviceType || linkedCompany.risk || "",
    unitSector: employee.unitSector || meta.unitSector || contractSource.unitSector || contractUnit(contractSource) || contractUnit(linkedCompany) || "",
    cep: formatCep(employee.cep || meta.cep || ""),
    city: employee.city || meta.city || "",
    district: employee.district || employee.bairro || meta.district || "",
    street: employee.street || employee.rua || meta.street || "",
    number: employee.number || employee.numero || meta.number || "",
    complement: employee.complement || employee.complemento || meta.complement || "",
    uf: normalizeUf(employee.uf || employee.estado || employee.state || meta.uf || ""),
    badgeNumber: employee.badgeNumber || employee.cracha || employee.crachaNumber || meta.badgeNumber || meta.cracha || meta.crachaNumber || "",
    photoUrl: employee.photoUrl || employee.photo || employee.photo_url || meta.photoUrl || meta.photo || meta.photo_url || "",
    patrimonialReleaseDate: employee.patrimonialReleaseDate || employee.releaseDate || meta.patrimonialReleaseDate || meta.releaseDate || "",
    patrimonialNotes: employee.patrimonialNotes || meta.patrimonialNotes || "",
    asoValidity: employee.asoValidity || employee.admission || "",
    trainingValidity: employee.trainingValidity || "",
    docStatus: normalizeDocumentStatusLabel(employee.docStatus || documentStatus),
    address: employee.address || buildEmployeeAddressFromParts({
      street: employee.street || employee.rua || meta.street || "",
      number: employee.number || employee.numero || meta.number || "",
      complement: employee.complement || employee.complemento || meta.complement || "",
      district: employee.district || employee.bairro || meta.district || "",
      city: employee.city || meta.city || "",
      uf: employee.uf || employee.estado || employee.state || meta.uf || "",
      cep: employee.cep || meta.cep || "",
    }) || "",
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

function employeeContractSourceId(employee = {}) {
  const meta = employeeMeta(employee);
  return employee.contractSourceId || employee.contract_source_id || meta.contractSourceId || meta.contract_source_id || "";
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
    contractSourceId: item.contractSourceId || "",
    serviceType: item.serviceType || "",
    unitSector: item.unitSector || "",
    cep: onlyDigits(item.cep),
    city: item.city || "",
    district: item.district || "",
    street: item.street || "",
    number: item.number || "",
    complement: item.complement || "",
    uf: normalizeUf(item.uf || ""),
    badgeNumber: item.badgeNumber || "",
    photoUrl: item.photoUrl || item.photo || item.photo_url || "",
    patrimonialReleaseDate: item.patrimonialReleaseDate || "",
    patrimonialNotes: item.patrimonialNotes || "",
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
    name: profile.nome || profile.name || profile.email || "Usuário",
    email: profile.email || "",
    role: DB_PROFILE_TO_APP_ROLE[dbPerfil] || DB_PROFILE_TO_APP_ROLE[roleKey] || "visitor",
    active: profile.ativo ?? profile.active ?? true,
    companyId: profile.empresa_id || profile.company_id || null,
    authUserId: profile.auth_user_id || profile.authUserId || null,
    setor: profile.setor || null,
    matricula: profile.matricula || null,
    creationMode: profile.creationMode || profile.creation_mode || null,
    lastAccessAt: profile.lastAccessAt || profile.last_access_at || null,
    lastAccess: profile.lastAccess || profile.last_access || null,
    createdAt: profile.created_at || profile.createdAt || null,
  };
}

function mapProfileToDb(user) {
  const perfil = normalizePerfilUsuário(user.role);
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
  const perfil = normalizePerfilUsuário(user.role || user.perfil).toLowerCase();
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
  payload.perfil = normalizePerfilUsuário(payload.perfil).toLowerCase();
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
  if (profileRequiresMatrícula(payload.perfil) && !payload.matricula) {
    throw new PersistenceError("Matrícula obrigatoria para este perfil.", {
      table: "public.usuarios",
      operation: "validacao",
      payload,
      hint: "matricula obrigatoria pelo perfil",
    });
  }
}

function normalizePerfilUsuário(value = "visitante") {
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

function profileRequiresMatrícula(perfil) {
  return false;
}

function mapCompanyFromDb(company) {
  const legacyAddress = parseLegacyCompanyAddress(company.endereco || company.address || "");
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
    city: company.municipio || legacyAddress.city,
    uf: company.uf || legacyAddress.uf,
    street: legacyAddress.street,
    number: legacyAddress.number,
    complement: legacyAddress.complement,
    district: legacyAddress.district,
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
    logoUrl: company.logo_url || company.logoUrl || company.logo || "",
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
    observacoes: serializeCompanyNotes(item) || null,
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
    cep: employee.cep,
    city: employee.city || employee.municipio,
    district: employee.district || employee.bairro,
    street: employee.street || employee.rua,
    number: employee.number || employee.numero,
    complement: employee.complement || employee.complemento,
    uf: employee.uf || employee.estado,
    photoUrl: employee.photo_url || employee.photoUrl || employee.photo || "",
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
  const company = state.companies.find((item) => sameId(item.id, id));
  if (!company || !canAccessCompany(company)) return "Nao informado";
  return company.name || "Nao informado";
}

function companyFamilyKey(company = {}) {
  const cnpjKey = onlyDigits(company.cnpj || company.cnpjNumber || "");
  const nameKey = normalizeSearchValue(companyTradeName(company) || company.name || "");
  const codeKey = normalizeSearchValue(companyCode(company));
  return cnpjKey || codeKey || nameKey;
}

function activeCompanyContractOptions(companyId) {
  const baseCompany = normalizeCompany(state.companies.find((item) => sameId(item.id, companyId)) || {});
  const baseKey = companyFamilyKey(baseCompany);
  const family = uniqueById(
    visibleCompanies()
      .map((company) => normalizeCompany(company))
      .filter((company) => {
        if (!company.id) return false;
        const active = statusMatches(company.status, "Ativa", "Pendente", "Aprovado");
        return active && companyFamilyKey(company) === baseKey;
      }),
  );
  const items = family.length ? family : [baseCompany];
  return items.map((company) => ({
      value: company.id,
      label: `${company.contract || "Contrato nao informado"} - ${companyTradeName(company) || company.name || "Empresa"}`,
  }));
}

function employeeContractContext(companyId, contractSourceId = "") {
  const baseCompany = normalizeCompany(state.companies.find((item) => sameId(item.id, companyId)) || {});
  const options = activeCompanyContractOptions(companyId);
  const availableIds = options.map((option) => String(option.value));
  const selectedId = availableIds.includes(String(contractSourceId))
    ? String(contractSourceId)
    : String(options[0]?.value || companyId || "");
  const selectedCompany = normalizeCompany(state.companies.find((item) => sameId(item.id, selectedId)) || baseCompany);
  return {
    baseCompany,
    options,
    selectedId,
    selectedCompany,
  };
}

function companyContractsFor(company) {
  const familyKey = companyFamilyKey(company);
  const family = uniqueById(
    visibleCompanies()
      .map((entry) => normalizeCompany(entry))
      .filter((entry) => entry.id && companyFamilyKey(entry) === familyKey),
  );
  const active = family.filter((entry) => !statusMatches(entry.contractStatus || entry.status, "Inativa", "Inativo", "Desmobilizada", "Desmobilizado", "Encerrada", "Encerrado"));
  const inactive = family.filter((entry) => !active.some((item) => sameId(item.id, entry.id)));
  return { active, inactive, all: family };
}

function companyEmployeeGroups(company) {
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const active = employees.filter((employee) => {
    const status = normalizeEmployee(employee).status;
    return !statusMatches(status, "Inativo", "Desmobilizado", "Desmobilização solicitada");
  });
  const inactive = employees.filter((employee) => !active.some((item) => sameId(item.id, employee.id)));
  return { active, inactive, all: employees };
}

function companyRequestItems(company) {
  return requestQueueItems(company.id);
}

function requestQueueItems(scopeCompanyId = null) {
  const entries = [];
  const isScoped = Boolean(scopeCompanyId);
  const scopeRoot = isScoped ? normalizeCompany(state.companies.find((item) => sameId(item.id, scopeCompanyId)) || { id: scopeCompanyId }) : null;
  const scopeFamilyIds = isScoped
    ? new Set([String(scopeCompanyId), ...companyFamilyEntries(scopeRoot || { id: scopeCompanyId }).map((entry) => String(entry.id))])
    : new Set();
  const sameScope = (value) => !isScoped || scopeFamilyIds.has(String(value));
  const currentRequestStatus = (value) => statusMatches(value, "Reativação solicitada", "Desmobilização solicitada");
  const fallbackRequestEvent = (record, entityType, kind) => {
    const currentStatus = record.status || record.contractStatus || "";
    return {
      id: `status-${kind}-${entityType}-${record.id}`,
      entityType: entityType === "employee" ? "funcionario" : "contrato",
      entityId: record.id,
      action: kind === "reactivation" ? "Solicitação de reativação" : "Desmobilização solicitada",
      previousStatus: "",
      nextStatus: currentStatus,
      status: currentStatus,
      createdAt: record.updatedAt || record.updated_at || record.createdAt || record.created_at || "",
      userName: "Sistema",
      observation: "Solicitação identificada pelo status atual; histórico não encontrado.",
    };
  };

  state.employees
    .map((employee) => normalizeEmployee(employee))
    .filter((employee) => currentRequestStatus(employee.status))
    .filter((employee) => sameScope(employee.companyId) || sameScope(employee.contractSourceId))
    .forEach((employee) => {
      const kind = statusMatches(employee.status, "Reativação solicitada") ? "reactivation" : "demobilization";
      const historyEvent = latestRequestHistoryEvent("funcionario", employee.id, kind) || fallbackRequestEvent(employee, "employee", kind);
      const company = normalizeCompany(state.companies.find((item) => sameId(item.id, employee.companyId || employee.contractSourceId)) || {});
      entries.push({
        ...historyEvent,
        requestKind: kind,
        requestEntityType: "employee",
        requestEntityId: String(employee.id),
        requestTargetType: "Funcionário",
        requestTargetName: employee.name || "Nao informado",
        requestCompanyId: company.id || employee.companyId || employee.contractSourceId || "",
        requestCompanyName: company.name || companyName(employee.companyId || employee.contractSourceId || ""),
        requestRecord: employee,
      });
    });

  state.companies
    .map((company) => normalizeCompany(company))
    .filter((company) => currentRequestStatus(company.contractStatus || company.status || ""))
    .filter((company) => sameScope(company.id))
    .forEach((company) => {
      const kind = statusMatches(company.contractStatus || company.status || "", "Reativação solicitada") ? "reactivation" : "demobilization";
      const historyEvent = latestRequestHistoryEvent("contrato", company.id, kind) || fallbackRequestEvent(company, "company", kind);
      entries.push({
        ...historyEvent,
        requestKind: kind,
        requestEntityType: "company",
        requestEntityId: String(company.id),
        requestTargetType: "Empresa",
        requestTargetName: company.name || "Nao informado",
        requestCompanyId: company.id,
        requestCompanyName: company.name || "Nao informado",
        requestRecord: company,
      });
    });

  return entries.sort((a, b) => String(b.createdAt || b.criado_em || "").localeCompare(String(a.createdAt || a.criado_em || "")));
}

function renderRequestRowActions(entry) {
  const role = currentUser()?.role || "visitor";
  const canReview = ["admin", "fiscal"].includes(role) && (
    entry.requestEntityType === "employee"
      ? canAccessEmployee(entry.requestRecord)
      : canAccessCompany(entry.requestRecord)
  );
  if (!canReview) return `<span class="mini-pill">Sem permissão</span>`;
  if (entry.requestKind === "reactivation") {
    return `
      <div class="actions wrap">
        <button class="btn success compact" type="button" data-reactivation-type="${entry.requestEntityType}" data-reactivation-action="approve" data-id="${entry.requestEntityId}">${icon("approve")} Aprovar reativação</button>
        <button class="btn warning compact" type="button" data-reactivation-type="${entry.requestEntityType}" data-reactivation-action="reject" data-id="${entry.requestEntityId}">${icon("block")} Rejeitar reativação</button>
      </div>
    `;
  }
  return `
    <div class="actions wrap">
      <button class="btn success compact" type="button" data-request-action="approve" data-request-kind="demobilization" data-request-entity-type="${entry.requestEntityType}" data-id="${entry.requestEntityId}">${icon("approve")} Aprovar desmobilização</button>
      <button class="btn warning compact" type="button" data-request-action="reject" data-request-kind="demobilization" data-request-entity-type="${entry.requestEntityType}" data-id="${entry.requestEntityId}">${icon("block")} Rejeitar desmobilização</button>
    </div>
  `;
}

function renderRequestRows(entries = []) {
  return entries.length
    ? entries
        .map((entry) => `
          <tr>
            <td><strong>${formatDateTime(entry.createdAt || entry.criado_em)}</strong></td>
            <td>${statusBadge(entry.requestKind === "reactivation" ? "Reativação solicitada" : "Desmobilização solicitada")}</td>
            <td><strong>${escapeHtml(entry.requestTargetName || "Nao informado")}</strong><br><span class="muted">${escapeHtml(entry.requestTargetType || (entry.requestEntityType === "employee" ? "Funcionário" : "Empresa"))}</span></td>
            <td>${escapeHtml(entry.requestCompanyName || "Nao informado")}</td>
            <td>${escapeHtml(entry.userName || entry.usuario_nome || "Sistema")}</td>
            <td>${escapeHtml(entry.observation || entry.observacao || "Sem observacao")}</td>
            <td>${renderRequestRowActions(entry)}</td>
          </tr>
        `)
        .join("")
    : emptyRow(7);
}

function handleReactivationAction(entityType, action, id, { source = "" } = {}) {
  if (action === "request") return requestReactivation(entityType, id, { source });
  if (action === "approve") return approveReactivation(entityType, id, { source });
  if (action === "reject") return rejectReactivation(entityType, id, { source });
  return false;
}

function approveDemobilizationRequest(entityType, id, { source = "" } = {}) {
  const isEmployee = entityType === "employee";
  const record = isEmployee
    ? state.employees.find((item) => sameId(item.id, id))
    : state.companies.find((item) => sameId(item.id, id));
  if (!record) return false;
  const role = currentUser()?.role || "visitor";
  if (!(role === "admin" || (role === "fiscal" && (isEmployee ? canAccessEmployee(record) : canAccessCompany(record))))) {
    alert("Seu perfil nao possui permissao para aprovar esta solicitacao.");
    return false;
  }

  const latestRequest = latestDemobilizationRequestHistoryEvent(isEmployee ? "funcionario" : "contrato", record.id);
  const requestReason = latestRequest?.observation || latestRequest?.observacao || "Solicitação pendente.";
  const previousStatus = record.status || record.contractStatus || "";

  if (isEmployee) {
    record.status = "Desmobilizado";
    const timestamp = currentSystemTime();
    const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Desmobilização aprovada. Motivo original: ${requestReason}`;
    const currentNotes = employeeVisibleNotes(record);
    record.notes = currentNotes ? `${currentNotes}\n${note}` : note;
    const history = createHistoryEvent({
      entityType: "funcionario",
      entityId: record.id,
      action: "Desmobilização aprovada",
      previousStatus,
      nextStatus: record.status,
      observation: `${requestReason}${source ? ` | ${source}` : ""}`,
    });
    state.historico = upsertById(state.historico, history);
    syncHistoryEvent(history);
    syncCollection("employees", record).catch((error) => {
      console.warn("Nao foi possivel salvar aprovacao de desmobilizacao online.", error);
    });
    persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Desmobilizacao aprovada", scope: { employeeId: record.id, companyId: record.companyId } }));
    saveState();
    renderApp();
    return true;
  }

  cascadeCompanyInactiveOrDemobilized(record, "Desmobilizada", {
    familyScope: true,
    source: source || "Aprovação de solicitação de desmobilização",
    reason: requestReason,
  });
  persistAutomaticStatusChanges(applyAutomaticStatusRules({ source: "Desmobilizacao aprovada", scope: { companyId: record.id } }));
  renderApp();
  return true;
}

function rejectDemobilizationRequest(entityType, id, { source = "" } = {}) {
  const isEmployee = entityType === "employee";
  const record = isEmployee
    ? state.employees.find((item) => sameId(item.id, id))
    : state.companies.find((item) => sameId(item.id, id));
  if (!record) return false;
  const role = currentUser()?.role || "visitor";
  if (!(role === "admin" || (role === "fiscal" && (isEmployee ? canAccessEmployee(record) : canAccessCompany(record))))) {
    alert("Seu perfil nao possui permissao para rejeitar esta solicitacao.");
    return false;
  }
  const reason = prompt(`Informe o motivo da rejeição da desmobilização de ${isEmployee ? "funcionario" : "contrato"}:`);
  if (!reason || !reason.trim()) {
    alert("Motivo obrigatorio. A rejeição nao foi salva.");
    return false;
  }

  const latestRequest = latestDemobilizationRequestHistoryEvent(isEmployee ? "funcionario" : "contrato", record.id);
  const restoreStatus = latestRequest?.previousStatus || latestRequest?.statusAnterior || latestRequest?.status_anterior || "";
  const previousStatus = record.status || record.contractStatus || "";

  if (isEmployee) {
    record.status = restoreStatus || "Liberado";
    const timestamp = currentSystemTime();
    const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Desmobilização rejeitada. Motivo: ${reason.trim()}`;
    const currentNotes = employeeVisibleNotes(record);
    record.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  } else {
    record.status = restoreStatus || "Ativa";
    if ("contractStatus" in record) record.contractStatus = record.status;
    const timestamp = currentSystemTime();
    const note = `[${timestamp}] ${currentUser()?.name || currentUser()?.email || "Usuário do sistema"}: Desmobilização rejeitada. Motivo: ${reason.trim()}`;
    const currentNotes = companyVisibleNotes(record);
    record.notes = currentNotes ? `${currentNotes}\n${note}` : note;
  }

  const history = createHistoryEvent({
    entityType: isEmployee ? "funcionario" : "contrato",
    entityId: record.id,
    action: "Desmobilização rejeitada",
    previousStatus,
    nextStatus: isEmployee ? record.status : record.status || previousStatus,
    observation: `${reason.trim()}${source ? ` | ${source}` : ""}`,
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  syncCollection(isEmployee ? "employees" : "companies", record).catch((error) => {
    console.warn("Nao foi possivel salvar rejeicao de desmobilizacao online.", error);
  });
  saveState();
  renderApp();
  return true;
}

function handleOperationalRequestAction(kind, action, entityType, id, { source = "" } = {}) {
  if (kind === "reactivation") return handleReactivationAction(entityType, action, id, { source });
  if (kind === "demobilization") {
    if (action === "approve") return approveDemobilizationRequest(entityType, id, { source });
    if (action === "reject") return rejectDemobilizationRequest(entityType, id, { source });
  }
  return false;
}

function fiscalNames(ids = []) {
  const names = ids
    .map((id) => state.fiscais.find((fiscal) => sameId(fiscal.id, id)))
    .filter(Boolean)
    .map((fiscal) => normalizeFiscal(fiscal).nome);
  return names.length ? names.join(", ") : "Nenhum";
}

function employeeName(id) {
  const employee = state.employees.find((item) => sameId(item.id, id));
  if (!employee || !canAccessEmployee(employee)) return "Nao informado";
  return employee.name || "Nao informado";
}

function docStatus(doc) {
  if (statusMatches(doc.status, "Arquivado")) return "Arquivado";
  if (doc.status === "Reprovado" || doc.status === "Revisão solicitada") return "Revisão solicitada";
  const todayDate = new Date(today());
  const due = new Date(doc.dueDate);
  if (Number.isNaN(due.getTime())) return doc.status || "Pendente";
  const diffDays = Math.ceil((due - todayDate) / 86400000);
  if (diffDays < 0) return "Vencido";
  if (diffDays <= 30) return "A vencer";
  return ["Aprovado", "Regular", "Aprovado com pendência"].includes(doc.status) ? "Aprovado" : "Pendente";
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

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function formatCpf(value = "") {
  const digits = onlyDigits(value);
  const baseDigits = digits.slice(0, 11);
  const extraDigits = digits.slice(11);
  const formattedBase = baseDigits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  return `${formattedBase}${extraDigits}`;
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

const STRICT_COMPANY_CNPJ_CHECK_DIGITS = false;

function validateCompanyRegistration({ id = null, cnpj = "", phone = "", cep = "" } = {}) {
  const cnpjDigits = onlyDigits(cnpj);
  const cnpjFormatted = formatCnpj(cnpjDigits);
  const phoneDigits = onlyDigits(phone);
  const cepDigits = onlyDigits(cep);

  if (cnpjDigits.length !== 14) {
    return { ok: false, message: "CNPJ invalido. Use o formato 00.000.000/0000-00." };
  }
  if (STRICT_COMPANY_CNPJ_CHECK_DIGITS && !isValidCnpj(cnpjDigits)) {
    return { ok: false, message: "CNPJ invalido. Verifique os digitos informados." };
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
    cnpj: cnpjFormatted,
    phone: formatPhone(phoneDigits),
    cep: cepDigits ? formatCep(cepDigits) : "",
  };
}

function validateEmployeeRegistration({ id = null, cpf = "" } = {}) {
  const cpfDigits = onlyDigits(cpf);
  if (cpfDigits.length < 11) {
    return { ok: false, message: "CPF incompleto. Informe 11 digitos." };
  }
  if (cpfDigits.length > 11) {
    return { ok: false, message: "CPF possui numeros demais." };
  }
  const duplicated = state.employees.some((employee) => !sameId(employee.id, id) && onlyDigits(employee.cpf || "") === cpfDigits);
  if (duplicated) {
    return { ok: false, message: "CPF ja cadastrado." };
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

function renderCompanyOperationalSummary(company, employees = [], docs = []) {
  const normalizedEmployees = employees.map((employee) => normalizeEmployee(employee));
  const medicineWaiting = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Aguardando medicina") || employeeMedicineStatus(employee, docs) === "Pendente").length;
  const medicineApproved = normalizedEmployees.filter((employee) => employeeMedicineStatus(employee, docs) === "Aprovado").length;
  const medicineRejected = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Bloqueado") || statusMatches(employee.docStatus, "Reprovado")).length;
  const ehsWaiting = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Aguardando EHS/RH") || employeeEhsStatus(employee, docs) === "Pendente").length;
  const ehsApproved = normalizedEmployees.filter((employee) => employeeEhsStatus(employee, docs) === "Aprovado").length;
  const ehsRejected = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Bloqueado") || statusMatches(employee.docStatus, "Reprovado")).length;
  const patrimonialWaiting = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Aguardando patrimonial") || employeePatrimonialStatus(employee, docs) === "Pendente").length;
  const patrimonialReleased = normalizedEmployees.filter((employee) => employeePatrimonialStatus(employee, docs) === "Aprovado").length;
  const blockedEmployees = normalizedEmployees.filter((employee) => statusMatches(employee.status, "Bloqueado")).length;
  const docsExpiring = docs.filter((doc) => ["A vencer", "Vencido", "Pendente", "Reprovado"].includes(docStatus(doc))).length;
  return `
    <div class="company-summary-strip">
      <div class="stat-card success"><span>Funcionários ativos</span><strong>${normalizedEmployees.filter((employee) => !statusMatches(employee.status, "Inativo", "Desmobilizado", "Desmobilização solicitada")).length}</strong></div>
      <div class="stat-card warn"><span>Pendencias</span><strong>${companyPendingDocumentsCount(company.id)}</strong></div>
      <div class="stat-card analysis"><span>Medicina</span><strong>${medicineWaiting}</strong><small>${medicineApproved} aprovados / ${medicineRejected} reprovados</small></div>
      <div class="stat-card analysis"><span>EHS / SSMA</span><strong>${ehsWaiting}</strong><small>${ehsApproved} aprovados / ${ehsRejected} reprovados</small></div>
      <div class="stat-card analysis"><span>Patrimonial</span><strong>${patrimonialWaiting}</strong><small>${patrimonialReleased} liberados</small></div>
      <div class="stat-card danger"><span>Bloqueios</span><strong>${blockedEmployees}</strong><small>${docsExpiring} documentos pendentes</small></div>
    </div>
  `;
}

function companyDocumentActions(doc) {
  return `
    <div class="actions wrap">
      <button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Visualizar</button>
      ${can("approveDocuments", doc) ? `<button class="btn success compact" type="button" data-doc-status="Aprovado" data-id="${doc.id}">Aprovar</button>` : ""}
      ${can("approveDocuments", doc) ? `<button class="btn warning compact" type="button" data-doc-status="Revisão solicitada" data-id="${doc.id}">Solicitar Revisão</button>` : ""}
      ${can("edit.document", doc) ? `<button class="btn secondary compact" type="button" data-edit="document" data-id="${doc.id}">${icon("edit")} Editar</button>` : ""}
      ${can("edit.document", doc) ? `<button class="btn secondary compact" type="button" data-document-archive="${doc.id}">Arquivar</button>` : ""}
    </div>
  `;
}

function archiveDocument(id) {
  const doc = state.documents.find((item) => sameId(item.id, id));
  if (!doc) return;
  if (!canAccessDocument(doc) || !can("edit.document", doc)) {
    alert("Seu perfil nao possui permissao para arquivar este documento.");
    return;
  }
  const previousStatus = doc.status || "";
  doc.status = "Arquivado";
  const history = createHistoryEvent({
    entityType: "documento",
    entityId: doc.id,
    action: "Arquivamento de documento",
    previousStatus,
    nextStatus: doc.status,
    observation: `Documento ${doc.type || "sem tipo"} arquivado pela ficha da empresa.`,
  });
  state.historico = upsertById(state.historico, history);
  syncHistoryEvent(history);
  syncCollection("documents", doc).catch((error) => {
    logPersistenceError(error, { table: "public.documents", operation: "arquivar documento", payload: mapDocumentToDb(doc) });
    alert(`Nao foi possivel arquivar online.\n\n${persistenceMessage(error)}`);
  });
  saveState();
  render();
}

function renderCompanyTab(company, tab) {
  const item = normalizeCompany(company);
  const employees = state.employees.filter((employee) => sameId(employee.companyId, company.id));
  const documents = state.documents.filter((doc) => sameId(doc.companyId, company.id));
  const { active: activeContracts, inactive: inactiveContracts, all: allContracts } = companyContractsFor(item);
  const { active: activeEmployees, inactive: inactiveEmployees } = companyEmployeeGroups(item);
  const medicineDocs = documents.filter((doc) => documentOperationalSector(doc) === "Medicina" || /pcmso|pca|aso|exame/i.test(doc.type || ""));
  const ehsDocs = documents.filter((doc) => documentOperationalSector(doc) === "EHS" || /pgr|ltcat|treinamento|nr-|epi|ppra|pcmat|ppr/i.test(doc.type || ""));
  const patrimonialDocs = documents.filter((doc) => documentOperationalSector(doc) === "Patrimonial" || /patrimonial|cracha|acesso|liberacao/i.test(doc.type || ""));
  const activeCompanyDocs = documents.filter((doc) => !statusMatches(docStatus(doc), "Arquivado"));
  const archivedCompanyDocs = documents.filter((doc) => statusMatches(docStatus(doc), "Arquivado"));
  if (tab === "general") {
    return `
      ${renderCompanyOperationalSummary(item, employees, documents)}
      <div class="detail-grid">
        ${detailCard("Razão social", item.name)}
        ${detailCard("Nome fantasia", companyTradeName(item))}
        ${detailCard("CNPJ", item.cnpj)}
        ${detailCard("Telefone", item.phone || "Nao informado")}
        ${detailCard("CEP", item.cep || "Nao informado")}
        ${detailCard("Endereço", companyAddress(item))}
        ${detailCard("E-mail", item.email || "Nao informado")}
        ${detailCard("Status", statusBadge(item.status))}
        ${detailCard("Observações", item.notes || item.observacoes || "Sem observacoes")}
      </div>
      ${renderCompanyTabHistory(company, "general", "Histórico geral da empresa")}
    `;
  }
  if (tab === "contracts") {
    const contractRow = (contractCompany) => {
      const entry = normalizeCompany(contractCompany);
      return `
        <tr>
          <td><strong>${entry.contract || "Nao informado"}</strong><br><span class="muted">${entry.name}</span></td>
          <td>${employeeCostCenter({}, entry)}</td>
          <td>${entry.contractFiscal || entry.fiscal || "Nao informado"}</td>
          <td>${entry.manager || entry.responsible || "Nao informado"}</td>
          <td>${entry.contractServiceType || entry.serviceType || entry.risk || "Nao informado"}</td>
          <td>${entry.unitSector || contractUnit(entry)}</td>
          <td>${formatDate(entry.startDate)}<br><span class="muted">ate ${formatDate(entry.endDate)}</span></td>
          <td>${statusBadge(entry.contractStatus || entry.status)}</td>
          <td class="actions wrap">
            <button class="btn secondary compact" type="button" data-company-contract-open="${entry.id}">${icon("docs")} Abrir contrato</button>
            ${can("edit.company", entry) ? `<button class="btn warning compact" type="button" data-company-contract-close="${entry.id}">Encerrar contrato</button>` : ""}
          </td>
        </tr>
      `;
    };
    return `
      <div class="contract-inner-toolbar">
        ${can("create.company") ? `<button class="btn primary compact" type="button" data-company-contract-new data-company-id="${company.id}">${icon("plus")} Novo Contrato</button>` : ""}
      </div>
      <div class="company-contract-summary">
        <div class="stat-card success"><span>Contratos ativos</span><strong>${activeContracts.length}</strong></div>
        <div class="stat-card neutral"><span>Encerrados / inativos</span><strong>${inactiveContracts.length}</strong></div>
      </div>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Contratos ativos</h3><span class="mini-pill">${activeContracts.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Contrato</th><th>Centro de custo</th><th>Fiscal</th><th>Gestor</th><th>Tipo de servico</th><th>Unidade/Setor</th><th>Vigencia</th><th>Status</th><th>Acoes</th></tr></thead>
            <tbody>${activeContracts.length ? activeContracts.map(contractRow).join("") : emptyRow(9)}</tbody>
          </table>
        </div>
      </section>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Contratos encerrados / inativos</h3><span class="mini-pill">${inactiveContracts.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Contrato</th><th>Centro de custo</th><th>Fiscal</th><th>Gestor</th><th>Tipo de servico</th><th>Unidade/Setor</th><th>Vigencia</th><th>Status</th><th>Acoes</th></tr></thead>
            <tbody>${inactiveContracts.length ? inactiveContracts.map(contractRow).join("") : emptyRow(9)}</tbody>
          </table>
        </div>
      </section>
      ${renderCompanyTabHistory(company, "contracts", "Histórico de contratos")}
    `;
  }
  if (tab === "people") {
    const employeeRow = (employee) => {
      const normalized = normalizeEmployee(employee);
      return `<tr><td><strong>${employeeRegistration(normalized)}</strong></td><td><strong>${normalized.name}</strong></td><td>${normalized.cpf}</td><td>${normalized.role}</td><td>${normalized.contract || item.contract || "Nao informado"}</td><td>${statusBadge(normalized.docStatus)}</td><td>${statusBadge(normalized.status)}</td><td>${formatDate(normalized.asoValidity)}</td><td>${formatDate(normalized.trainingValidity)}</td><td><button class="btn secondary compact" type="button" data-employee-record="${employee.id}">${icon("users")} Abrir FIT</button></td></tr>`;
    };
    return `
      <div class="contract-inner-toolbar">
        ${can("create.employee") ? `<button class="btn primary compact" type="button" data-company-employee-new data-company-id="${company.id}">${icon("plus")} Novo Funcionário</button>` : ""}
      </div>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Funcionários ativos</h3><span class="mini-pill">${activeEmployees.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Matrícula/ID</th><th>Nome</th><th>CPF</th><th>Funcao</th><th>Contrato</th><th>Status documental</th><th>Status contratacao</th><th>ASO</th><th>Treinamento</th><th>Acoes</th></tr></thead>
            <tbody>${activeEmployees.length ? activeEmployees.map(employeeRow).join("") : emptyRow(10)}</tbody>
          </table>
        </div>
      </section>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Funcionários inativos / desmobilizados</h3><span class="mini-pill">${inactiveEmployees.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Matrícula/ID</th><th>Nome</th><th>CPF</th><th>Funcao</th><th>Contrato</th><th>Status documental</th><th>Status contratacao</th><th>ASO</th><th>Treinamento</th><th>Acoes</th></tr></thead>
            <tbody>${inactiveEmployees.length ? inactiveEmployees.map(employeeRow).join("") : emptyRow(10)}</tbody>
          </table>
        </div>
      </section>
      ${renderCompanyTabHistory(company, "people", "Histórico de funcionarios / FIT")}
    `;
  }
  if (tab === "docs") {
    const docRow = (doc) => `
      <tr>
        <td><strong>${doc.type}</strong><br><span class="muted">${doc.employeeId ? employeeName(doc.employeeId) : "Empresa"}</span></td>
        <td>${statusBadge(docStatus(doc))}</td>
        <td>${formatDate(doc.dueDate)}${docStatus(doc) === "Vencido" ? `<br>${statusBadge("Vencido")}` : ""}</td>
        <td>${documentOperationalSector(doc)}</td>
        <td><span class="mini-pill">Preparado</span></td>
        <td><button class="btn secondary compact" type="button" data-document-detail="${doc.id}">${icon("docs")} Visualizar</button></td>
        <td>${companyDocumentActions(doc)}</td>
      </tr>
    `;
    return `
      <div class="company-split-section">
        <div class="record-section-title"><h3>Documentos ativos</h3><span class="mini-pill">${activeCompanyDocs.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Documento</th><th>Status</th><th>Validade</th><th>Area</th><th>Anexo</th><th>Visualizar</th><th>Acoes</th></tr></thead>
            <tbody>${activeCompanyDocs.length ? activeCompanyDocs.map(docRow).join("") : emptyRow(7)}</tbody>
          </table>
        </div>
      </section>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Documentos arquivados</h3><span class="mini-pill">${archivedCompanyDocs.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Documento</th><th>Status</th><th>Validade</th><th>Area</th><th>Anexo</th><th>Visualizar</th><th>Acoes</th></tr></thead>
            <tbody>${archivedCompanyDocs.length ? archivedCompanyDocs.map(docRow).join("") : emptyRow(7)}</tbody>
          </table>
        </div>
      </section>
      ${renderCompanyTabHistory(company, "docs", "Histórico de documentos da empresa")}
    `;
  }
  if (tab === "medicine") {
    const pending = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Aguardando medicina") || employeeMedicineStatus(employee, documents) === "Pendente").length;
    const approved = employees.filter((employee) => employeeMedicineStatus(employee, documents) === "Aprovado").length;
    const rejected = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado") || statusMatches(normalizeEmployee(employee).docStatus, "Reprovado")).length;
    const asoExpiring = employees.filter((employee) => isPastDate(normalizeEmployee(employee).asoValidity) || employeeHasExpiredDocuments(employee)).length;
    return `
      <div class="detail-grid">
        ${detailCard("Aguardando medicina", pending)}
        ${detailCard("Aprovados medicina", approved)}
        ${detailCard("Reprovados medicina", rejected)}
        ${detailCard("ASO vencido / vencendo", asoExpiring)}
      </div>
      ${renderEmployeeDocsTable(medicineDocs, "Documentos de medicina ocupacional")}
      ${renderCompanyTabHistory(company, "medicine", "Histórico de medicina ocupacional")}
    `;
  }
  if (tab === "ehs") {
    const pending = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Aguardando EHS/RH") || employeeEhsStatus(employee, documents) === "Pendente").length;
    const approved = employees.filter((employee) => employeeEhsStatus(employee, documents) === "Aprovado").length;
    const rejected = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado") || statusMatches(normalizeEmployee(employee).docStatus, "Reprovado")).length;
    const trainings = employees.filter((employee) => isPastDate(normalizeEmployee(employee).trainingValidity) || employeeHasExpiredDocuments(employee)).length;
    return `
      <div class="detail-grid">
        ${detailCard("Aguardando EHS", pending)}
        ${detailCard("Aprovados EHS", approved)}
        ${detailCard("Reprovados EHS", rejected)}
        ${detailCard("Treinamentos vencidos / vencendo", trainings)}
      </div>
      ${renderEmployeeDocsTable(ehsDocs, "Documentos de EHS / SSMA")}
      ${renderCompanyTabHistory(company, "ehs", "Histórico de EHS / SSMA")}
    `;
  }
  if (tab === "patrimonial") {
    const pending = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Aguardando patrimonial") || employeePatrimonialStatus(employee, documents) === "Pendente").length;
    const released = employees.filter((employee) => employeePatrimonialStatus(employee, documents) === "Aprovado").length;
    const blocked = employees.filter((employee) => statusMatches(normalizeEmployee(employee).status, "Bloqueado")).length;
    const badges = employees.filter((employee) => employee.registration || employee.matricula).length;
    return `
      <div class="detail-grid">
        ${detailCard("Aguardando liberacao", pending)}
        ${detailCard("Liberados", released)}
        ${detailCard("Bloqueados", blocked)}
        ${detailCard("Matrícula / cracha", badges)}
      </div>
      ${renderEmployeeDocsTable(patrimonialDocs, "Documentos de seguranca patrimonial")}
      ${renderCompanyTabHistory(company, "patrimonial", "Histórico de seguranca patrimonial")}
    `;
  }
  if (tab === "managers") {
    const fiscalIds = [item.fiscalId, ...(item.fiscaisAdicionais || [])].filter(Boolean);
    const linkedFiscais = fiscalIds.map((id) => state.fiscais.find((fiscal) => sameId(fiscal.id, id))).filter(Boolean).map(normalizeFiscal);
    const contractRows = allContracts.map((entry) => `<tr><td><strong>${entry.contract || "Nao informado"}</strong></td><td>${entry.contractFiscal || entry.fiscal || "Nao informado"}</td><td>${entry.manager || entry.responsible || "Nao informado"}</td><td>${entry.unitSector || contractUnit(entry)}</td><td>${statusBadge(entry.contractStatus || entry.status)}</td></tr>`).join("");
    return `
      <div class="detail-grid">
        ${detailCard("Fiscal principal", item.fiscal || "Nao informado")}
        ${detailCard("Fiscais vinculados", linkedFiscais.length ? linkedFiscais.map((fiscal) => fiscal.nome).join(", ") : "Nao informado")}
        ${detailCard("Gestor principal", item.manager || item.responsible || "Nao informado")}
        ${detailCard("Contratos relacionados", allContracts.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Contrato</th><th>Fiscal</th><th>Gestor</th><th>Unidade/Setor</th><th>Status</th></tr></thead>
          <tbody>${allContracts.length ? contractRows : emptyRow(5)}</tbody>
        </table>
      </div>
      ${renderCompanyTabHistory(company, "managers", "Histórico de fiscais e gestores")}
    `;
  }
  if (tab === "requests") {
    const companyRequests = companyRequestItems(item);
    const demobilizationRequests = companyRequests.filter((entry) => entry.requestKind === "demobilization");
    const reactivationRequests = companyRequests.filter((entry) => entry.requestKind === "reactivation");
    return `
      <div class="detail-grid">
        ${detailCard("Pendentes", companyRequests.length)}
        ${detailCard("Desmobilização", demobilizationRequests.length)}
        ${detailCard("Reativação", reactivationRequests.length)}
        ${detailCard("Empresa/FIT", companyRequests.filter((entry) => entry.requestEntityType === "employee").length)}
      </div>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Desmobilização solicitada</h3><span class="mini-pill">${demobilizationRequests.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Data/Hora</th><th>Solicitação</th><th>Registro</th><th>Empresa</th><th>Usuário</th><th>Motivo/Observação</th><th>Ações</th></tr></thead>
            <tbody>${renderRequestRows(demobilizationRequests)}</tbody>
          </table>
        </div>
      </section>
      <section class="company-split-section">
        <div class="record-section-title"><h3>Reativação solicitada</h3><span class="mini-pill">${reactivationRequests.length}</span></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Data/Hora</th><th>Solicitação</th><th>Registro</th><th>Empresa</th><th>Usuário</th><th>Motivo/Observação</th><th>Ações</th></tr></thead>
            <tbody>${renderRequestRows(reactivationRequests)}</tbody>
          </table>
        </div>
      </section>
      ${renderCompanyTabHistory(company, "general", "Histórico da fila operacional")}
    `;
  }
  if (tab === "history") {
    return renderHistoryTimeline("empresa", company.id, [
      `<div class="item-card"><strong>Empresa cadastrada</strong><span class="muted">${item.name} - ${item.cnpj}</span></div>`,
      `<div class="item-card"><strong>Contratos vinculados</strong><span class="muted">${allContracts.length} contrato(s)</span></div>`,
      `<div class="item-card"><strong>Funcionários vinculados</strong><span class="muted">${employees.length} funcionario(s)</span></div>`,
      `<div class="item-card"><strong>Documentos vinculados</strong><span class="muted">${documents.length} documento(s)</span></div>`,
    ]);
  }
  return renderCompanyTab(company, "general");
}

function employeeWorkflowSteps(employee) {
  const item = normalizeEmployee(employee);
  const workflow = item.workflowActions || {};
  const docs = state.documents.filter((doc) => sameId(doc.employeeId, item.id));
  const fiscalDocs = docs.filter((doc) => documentOperationalSector(doc) === "Fiscal");
  const medicineDocs = docs.filter((doc) => documentOperationalSector(doc) === "Medicina");
  const ehsDocs = docs.filter((doc) => documentOperationalSector(doc) === "EHS");
  const patrimonialDocs = docs.filter((doc) => documentOperationalSector(doc) === "Patrimonial");
  const terminalStatus = normalizeHiringStatusLabel(item.status || "");
  const closedFlow = isManualEmployeeOperationalStatus(terminalStatus) && !statusMatches(terminalStatus, "Reativação solicitada");
  const sequence = [
    { id: "fiscal", sector: "Fiscal", label: "Fiscal / Documentos pessoais", icon: "docs", docs: fiscalDocs, detail: "Cadastro, CPF, vinculo e documentos pessoais" },
    { id: "medicina", sector: "Medicina", label: "Medicina", icon: "shield", docs: medicineDocs, detail: "ASO, exames e validade ocupacional" },
    { id: "ehs", sector: "EHS", label: "EHS / SSMA", icon: "factory", docs: ehsDocs, detail: "Treinamentos, NR, EPI e seguranca" },
    { id: "patrimonial", sector: "Patrimonial", label: "Segurança Patrimonial", icon: "block", docs: patrimonialDocs, detail: "Acesso, credencial e liberacao patrimonial" },
  ];
  const steps = [];
  sequence.forEach((step, index) => {
    const previousStep = steps[index - 1];
    const rawStatus = String(workflow[step.id]?.status || "").trim();
    let status = rawStatus;
    if (closedFlow) {
      status = terminalStatus;
    } else if (!status) {
      if (index === 0) {
        status = employeeHasCoreData(item) ? "Enviado para Fiscal" : "Rascunho pelo Fornecedor";
      } else if (previousStep && !workflowIsConcludedStatus(previousStep.status)) {
        status = `Aguardando ${previousStep.label}`;
      } else {
        status = `Enviado para ${step.sector}`;
      }
    } else if (statusMatches(status, "Reprovado", "Revisão solicitada")) {
      status = `Revisão solicitada pelo ${step.sector}`;
    } else if (statusMatches(status, "Revalidação solicitada")) {
      status = "Revalidação solicitada";
    } else if (statusMatches(status, "Em revalidação")) {
      status = `Em revalidação ${step.sector}`;
    } else if (statusMatches(status, "Em avaliação")) {
      status = `Em avaliação ${step.sector}`;
    }
    if (statusMatches(status, "Aprovado com pendencia")) status = "Aprovado com pendência";
    steps.push({
      id: step.id,
      sector: step.sector,
      label: step.label,
      icon: step.icon,
      status,
      detail: step.detail,
      docs: step.docs,
      reason: employeeWorkflowReason(item, { ...step, status }),
    });
  });
  const allApproved = steps.every((step) => workflowIsConcludedStatus(step.status));
  steps.push({
    id: "liberacao",
    sector: "Fiscal",
    label: "Liberação final",
    icon: "approve",
    status:
      workflow.liberacao?.status ||
      (closedFlow
        ? terminalStatus
        : allApproved
          ? "Liberado"
          : workflowIsConcludedStatus(item.status)
            ? item.status
            : steps.find((step) => !workflowIsConcludedStatus(step.status))?.status || "Em avaliação Fiscal"),
    detail: "Consolidacao fiscal para inicio ou manutencao",
    reason: closedFlow ? "Fluxo encerrado pelo status operacional atual." : allApproved ? "Fluxo completo concluido." : "Aguardando conclusao das etapas anteriores.",
  });
  return steps;
}

function renderWorkflowStepActions(employee, step) {
  const currentStep = employeeWorkflowCurrentStep(employee);
  const role = currentUser()?.role || "visitor";
  const canActNow = currentStep && sameId(currentStep.id, step.id) && canActOnWorkflowStep(step);
  const canRequestRevalidation = ["admin", "supplier"].includes(role) && workflowIsConcludedStatus(step.status) && step.id !== "liberacao";
  if (!canActNow && !canRequestRevalidation) return "";
  return `
    <div class="workflow-step-actions">
      ${canActNow ? `<button class="btn success compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="approve">${icon("approve")} Aprovar</button>` : ""}
      ${canActNow ? `<button class="btn warning compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="review">${icon("block")} Solicitar Revisão</button>` : ""}
      ${canActNow ? `<button class="btn special compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="approve_pending">${icon("clock")} Aprovar com pendência</button>` : ""}
      ${canRequestRevalidation ? `<button class="btn secondary compact" type="button" data-employee-id="${employee.id}" data-workflow-step="${step.id}" data-workflow-action="revalidate">${icon("reload")} Solicitar revalidação</button>` : ""}
    </div>
  `;
}

function canActOnWorkflowStep(step) {
  const role = currentUser()?.role || "visitor";
  if (role === "admin") return true;
  if (role === "fiscal") return step.id === "fiscal" || step.id === "liberacao";
  if (role === "medicina") return step.id === "medicina";
  if (role === "ehs") return step.id === "ehs";
  if (role === "patrimonial") return step.id === "patrimonial";
  return false;
}

function collectWorkflowActionData(action, step, employee) {
  const actor = currentUser()?.name || currentUser()?.email || "Usuário do sistema";
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

  if (action === "review") {
    const reason = prompt(`Informe o motivo obrigatorio para solicitar revisao de ${step.label} de ${employee.name}:`);
    if (!reason || !reason.trim()) {
      alert("Motivo obrigatorio. A solicitacao de revisao nao foi salva.");
      return null;
    }
    return {
      ...base,
      status: "Revisão solicitada",
      motivo: reason.trim(),
      observation: `Revisão solicitada. Motivo: ${reason.trim()}`,
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
      alert("Matrícula do gestor obrigatoria. A aprovacao com pendencia nao foi salva.");
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

  if (action === "revalidate") {
    const reason = prompt(`Informe o motivo para solicitar revalidacao de ${step.label}:`);
    if (!reason || !reason.trim()) {
      alert("Motivo obrigatorio. A revalidacao nao foi salva.");
      return null;
    }
    return {
      ...base,
      status: "Revalidação solicitada",
      motivo: reason.trim(),
      observation: `Revalidacao solicitada. Motivo: ${reason.trim()}`,
    };
  }

  return null;
}

function updateEmployeeWorkflowStep(employeeId, stepId, action) {
  const employee = state.employees.find((item) => sameId(item.id, employeeId));
  if (!employee) return;
  const item = normalizeEmployee(employee);
  const step = employeeWorkflowSteps(item).find((entry) => entry.id === stepId);
  const role = currentUser()?.role || "visitor";
  const canRequestRevalidation = ["admin", "supplier"].includes(role) && workflowIsConcludedStatus(step?.status || "") && step?.id !== "liberacao";
  if (!step || (!canActOnWorkflowStep(step) && !(action === "revalidate" && canRequestRevalidation))) {
    alert("Seu perfil nao possui permissao para atuar nesta etapa.");
    return;
  }

  const currentStep = employeeWorkflowCurrentStep(item);
  if (action !== "revalidate" && (!currentStep || !sameId(currentStep.id, step.id))) {
    alert("Esta etapa ainda nao esta disponivel para avaliacao.");
    return;
  }

  const workflowAction = collectWorkflowActionData(action, step, item);
  if (!workflowAction) return;

  const previousStatus = step.status || "";
  const workflowActions = { ...(item.workflowActions || {}) };
  workflowActions[stepId] = workflowAction;
  employee.workflowActions = workflowActions;

  const timestamp = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date());
  const noteLine = `[${timestamp}] ${workflowAction.updatedBy}: ${step.label} - ${workflowAction.status}. ${workflowAction.observation}`;
  const currentNotes = employeeVisibleNotes(employee);
  employee.notes = currentNotes ? `${currentNotes}\n${noteLine}` : noteLine;

  const history = createHistoryEvent({
    entityType: "funcionario",
    entityId: employee.id,
    action:
      action === "review"
        ? `Solicitação de revisao - ${step.label}`
        : action === "revalidate"
          ? `Revalidacao solicitada - ${step.label}`
          : `Workflow ${step.label}`,
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

boot();
