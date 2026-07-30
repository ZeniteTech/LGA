import { activities, scoreDistribution, searchHistory, weeklySeries } from "./data";
import type { PipelineStage } from "./types";

/**
 * Thin REST client layer. Every call maps 1:1 to a Spring Boot endpoint.
 * While the API is not reachable the client resolves the local dataset, so
 * pages keep a single data-access contract and zero business logic.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    await new Promise((r) => setTimeout(r, 420));
    return fallback;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`Falha ao consultar ${path}`);
  return (await res.json()) as T;
}

export interface DashboardMetrics {
  companiesSearched: number;
  qualifiedLeads: number;
  aiAnalyzed: number;
  favorites: number;
  conversionRate: number;
  searchesToday: number;
}

export const api = {
  getDashboard: () =>
    request("/api/dashboard", {
      metrics: {
        companiesSearched: 1284,
        qualifiedLeads: 317,
        aiAnalyzed: 962,
        favorites: 48,
        conversionRate: 24.6,
        searchesToday: 32,
      } satisfies DashboardMetrics,
      weeklySeries,
      scoreDistribution,
      activities
    }),


  updateStage: (id: string, stage: PipelineStage) =>
    request(`/api/pipeline/${id}`, { id, stage }, { method: "PATCH" }),

  getHistory: () => request("/api/searches", searchHistory),

  runAiAnalysis: (ids: string[]) =>
    request("/api/ai/analyze", { queued: ids.length }, { method: "POST" }),
};
