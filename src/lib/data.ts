import type { ActivityItem, SearchHistoryItem } from "./types";


/**
 * Local dataset used only to render the interface while the Spring Boot REST
 * API is being wired. No business rule lives here — it is display data.
 */

export const searchHistory: SearchHistoryItem[] = [
  {
    id: "h1",
    query: "Escritórios de Advocacia em Limeira",
    city: "Limeira",
    category: "Advocacia",
    results: 42,
    createdAt: "2026-07-28T09:12:00Z",
  },
  {
    id: "h2",
    query: "Software houses em Campinas",
    city: "Campinas",
    category: "Tecnologia",
    results: 28,
    createdAt: "2026-07-27T17:44:00Z",
  },
  {
    id: "h3",
    query: "Clínicas odontológicas em Piracicaba",
    city: "Piracicaba",
    category: "Saúde",
    results: 61,
    createdAt: "2026-07-27T10:03:00Z",
  },
  {
    id: "h4",
    query: "Imobiliárias em Americana",
    city: "Americana",
    category: "Imobiliário",
    results: 19,
    createdAt: "2026-07-26T15:31:00Z",
  },
  {
    id: "h5",
    query: "Agências de marketing em Limeira",
    city: "Limeira",
    category: "Marketing",
    results: 23,
    createdAt: "2026-07-25T11:08:00Z",
  },
];

export const activities: ActivityItem[] = [
  {
    id: "a1",
    kind: "ai",
    title: "18 empresas analisadas pela IA",
    description: "Score médio 78 · 6 leads classificados como alta prioridade",
    createdAt: "há 12 minutos",
  },
  {
    id: "a2",
    kind: "search",
    title: "Nova pesquisa executada",
    description: "Escritórios de Advocacia em Limeira · 42 resultados",
    createdAt: "há 38 minutos",
  },
  {
    id: "a3",
    kind: "pipeline",
    title: "NorthPeak Software House avançou",
    description: "Proposta Enviada → Negociação",
    createdAt: "há 2 horas",
  },
  {
    id: "a4",
    kind: "system",
    title: "Sincronização com Google Places",
    description: "1.284 registros atualizados no Neon PostgreSQL",
    createdAt: "há 5 horas",
  },
  {
    id: "a5",
    kind: "pipeline",
    title: "Nexo Marketing marcado como cliente",
    description: "Contrato anual · onboarding agendado",
    createdAt: "ontem",
  },
];

export const weeklySeries = [
  { day: "Seg", pesquisas: 12, qualificados: 5 },
  { day: "Ter", pesquisas: 19, qualificados: 9 },
  { day: "Qua", pesquisas: 15, qualificados: 7 },
  { day: "Qui", pesquisas: 27, qualificados: 14 },
  { day: "Sex", pesquisas: 32, qualificados: 18 },
  { day: "Sáb", pesquisas: 9, qualificados: 3 },
  { day: "Dom", pesquisas: 6, qualificados: 2 },
];

export const scoreDistribution = [
  { faixa: "0-40", leads: 12 },
  { faixa: "41-60", leads: 28 },
  { faixa: "61-80", leads: 46 },
  { faixa: "81-100", leads: 31 },
];

export const searchSuggestions = [
  "Escritórios de Advocacia em Limeira",
  "Software houses em Campinas",
  "Clínicas odontológicas em Piracicaba",
  "Contabilidades em Americana",
  "Agências de marketing em Ribeirão Preto",
  "Transportadoras em Sumaré",
];

export const stageLabels: Record<string, string> = {
  "novo-lead": "Novo Lead",
  "primeiro-contato": "Primeiro Contato",
  "reuniao-agendada": "Reunião Agendada",
  "proposta-enviada": "Proposta Enviada",
  negociacao: "Negociação",
  "cliente-fechado": "Cliente Fechado",
  perdido: "Perdido",
};

export const stageOrder = [
  "novo-lead",
  "primeiro-contato",
  "reuniao-agendada",
  "proposta-enviada",
  "negociacao",
  "cliente-fechado",
  "perdido",
] as const;
