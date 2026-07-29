import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Building2,
  Heart,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  Activity,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/app-shell";
import { ScorePill } from "@/components/lga/company-card";
import { StatCard } from "@/components/lga/stat-card";
import { StatCardSkeleton } from "@/components/lga/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { stageLabels, stageOrder } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LeadGen Automation" },
      {
        name: "description",
        content:
          "Acompanhe empresas pesquisadas, leads qualificados, análises de IA e a performance do seu pipeline comercial.",
      },
      { property: "og:title", content: "Dashboard — LeadGen Automation" },
      {
        property: "og:description",
        content: "Visão executiva da sua operação de prospecção inteligente.",
      },
    ],
  }),
  component: DashboardPage,
});

const chartTooltip = {
  contentStyle: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
    color: "var(--foreground)",
  },
};

function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: api.getDashboard });

  return (
    <AppShell
      title="Dashboard"
      description="Visão geral da operação de prospecção em tempo real."
      crumbs={[{ label: "Dashboard" }]}
      action={
        <Button asChild className="gap-1.5">
          <Link to="/buscar">
            <Search className="size-4" /> Buscar leads
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading || !data
          ? Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          : [
              {
                label: "Empresas pesquisadas",
                value: data.metrics.companiesSearched.toLocaleString("pt-BR"),
                delta: 12.4,
                icon: Building2,
                hint: "vs. semana anterior",
              },
              {
                label: "Leads qualificados",
                value: data.metrics.qualifiedLeads.toLocaleString("pt-BR"),
                delta: 8.1,
                icon: Target,
                hint: "score IA ≥ 70",
              },
              {
                label: "Analisadas pela IA",
                value: data.metrics.aiAnalyzed.toLocaleString("pt-BR"),
                delta: 21.7,
                icon: Bot,
                hint: "últimos 30 dias",
              },
              {
                label: "Empresas favoritas",
                value: String(data.metrics.favorites),
                delta: 4.2,
                icon: Heart,
                hint: "acompanhamento ativo",
              },
              {
                label: "Taxa média de conversão",
                value: `${data.metrics.conversionRate}%`,
                delta: -1.8,
                icon: TrendingUp,
                hint: "lead → cliente",
              },
              {
                label: "Pesquisas hoje",
                value: String(data.metrics.searchesToday),
                delta: 33.3,
                icon: Zap,
                hint: "limite diário 100",
              },
            ].map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-5 lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold">Volume de prospecção</h2>
              <p className="text-sm text-muted-foreground">Pesquisas e leads qualificados</p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              Últimos 7 dias
            </Badge>
          </div>
          {isLoading || !data ? (
            <Skeleton className="h-[260px] w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.weeklySeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <RechartsTooltip {...chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="pesquisas"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#g1)"
                />
                <Area
                  type="monotone"
                  dataKey="qualificados"
                  stroke="var(--success)"
                  strokeWidth={2}
                  fill="url(#g2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">Distribuição de score IA</h2>
          <p className="text-sm text-muted-foreground">Leads por faixa de pontuação</p>
          {isLoading || !data ? (
            <Skeleton className="mt-5 h-[260px] w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data.scoreDistribution}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="faixa"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip {...chartTooltip} cursor={{ fill: "var(--accent)" }} />
                <Bar dataKey="leads" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Activity className="size-4 text-primary" /> Timeline de atividades
          </h2>
          <ol className="mt-5 space-y-5">
            {(data?.activities ?? []).map((a) => (
              <li key={a.id} className="relative pl-6">
                <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary ring-4 ring-primary/15" />
                <span className="absolute left-[3.5px] top-5 h-[calc(100%+4px)] w-px bg-border last:hidden" />
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">{a.createdAt}</p>
              </li>
            ))}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
          </ol>
        </section>

        <section className="surface-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Adicionadas recentemente</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link to="/empresas">
                Ver todas <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {(data?.recentCompanies ?? []).map((c) => (
              <li key={c.id}>
                <Link
                  to="/empresas/$companyId"
                  params={{ companyId: c.id }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-accent/50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.category} · {c.city}/{c.state}
                    </p>
                  </div>
                  {c.aiScore !== null ? (
                    <ScorePill score={c.aiScore} />
                  ) : (
                    <Badge variant="outline" className="text-[10px]">
                      sem análise
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="my-3 h-9 w-full rounded-lg" />
              ))}
          </ul>
        </section>

        <section className="surface-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Pipeline resumido</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
              <Link to="/pipeline">
                Abrir <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 space-y-4">
            {stageOrder.slice(0, 6).map((stage, i) => {
              const value = [42, 28, 16, 11, 7, 5][i];
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{stageLabels[stage]}</span>
                    <span className="tabular-nums">{value}</span>
                  </div>
                  <Progress value={(value / 42) * 100} className="mt-1.5 h-1.5" />
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl border border-primary/25 bg-primary/8 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" /> Resumo da IA
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              6 leads com score acima de 85 estão parados há mais de 3 dias. Priorize NorthPeak
              Software House e Moretti &amp; Advogados para contato hoje.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
