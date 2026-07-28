import { createFileRoute } from "@tanstack/react-router";
import { Bot, CheckCircle2, Clock, Loader2, Play, Sparkles, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { ScorePill } from "@/components/lga/company-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { companies } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ia")({
  head: () => ({
    meta: [
      { title: "Processamento IA — LeadGen Automation" },
      {
        name: "description",
        content:
          "Acompanhe a fila de análise por Inteligência Artificial, logs em tempo real e recomendações geradas para cada lead.",
      },
      { property: "og:title", content: "Processamento IA — LeadGen Automation" },
      {
        property: "og:description",
        content: "Fila, progresso e resultados das análises de IA da sua prospecção.",
      },
    ],
  }),
  component: AiPage,
});

const queue = companies.slice(0, 6);

const logLines = [
  "conectando ao gateway de IA · modelo lga-analyst-v3",
  "carregando enriquecimento do Google Places",
  "avaliando presença digital e volume de avaliações",
  "cruzando dados com histórico do pipeline",
  "calculando score de aderência ao ICP",
  "gerando resumo executivo e recomendações",
];

function AiPage() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 100 / 18);
        const step = Math.floor((next / 100) * logLines.length);
        setLogs(logLines.slice(0, Math.max(1, step)));
        if (next >= 100) {
          clearInterval(id);
          setRunning(false);
          toast.success("Análise concluída · score médio 82");
        }
        return next;
      });
    }, 500);
    return () => clearInterval(id);
  }, [running]);

  const done = progress >= 100;
  const processedCount = Math.floor((progress / 100) * queue.length);
  const remaining = Math.max(0, Math.ceil(((100 - progress) / 100) * 9));

  return (
    <AppShell
      title="Processamento IA"
      description="Fila de análise inteligente das empresas selecionadas."
      crumbs={[{ label: "IA" }]}
      action={
        <Button
          className="gap-1.5"
          disabled={running}
          onClick={() => {
            setProgress(0);
            setLogs([]);
            setRunning(true);
          }}
        >
          {running ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
          {running ? "Processando…" : "Iniciar processamento"}
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary",
                  running && "animate-pulse glow-ring",
                )}
              >
                <Bot className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  {done ? "Análise concluída" : running ? "Analisando empresas" : "Fila pronta"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {processedCount} de {queue.length} empresas · modelo lga-analyst-v3
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="rounded-full gap-1.5">
              <Clock className="size-3" />
              {running ? `~${remaining}s restantes` : done ? "finalizado" : "aguardando"}
            </Badge>
          </div>

          <Progress value={progress} className="mt-6 h-2" />
          <p className="mt-2 text-right text-xs tabular-nums text-muted-foreground">
            {Math.round(progress)}%
          </p>

          <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 font-mono text-xs">
            <p className="mb-3 flex items-center gap-2 text-muted-foreground">
              <Terminal className="size-3.5" /> logs de execução
            </p>
            {logs.length === 0 && <p className="text-muted-foreground/60">aguardando início…</p>}
            {logs.map((l) => (
              <p key={l} className="animate-in fade-in py-0.5 text-muted-foreground">
                <span className="text-success">›</span> {l}
              </p>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-2xl p-5">
          <h2 className="text-base font-semibold">Fila de processamento</h2>
          <ul className="mt-4 space-y-2">
            {queue.map((c, i) => {
              const state = i < processedCount ? "done" : running && i === processedCount ? "run" : "wait";
              return (
                <li
                  key={c.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card/50 px-3 py-2.5"
                >
                  {state === "done" ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : state === "run" ? (
                    <Loader2 className="size-4 animate-spin text-primary" />
                  ) : (
                    <Clock className="size-4 text-muted-foreground/60" />
                  )}
                  <span className="truncate text-sm">{c.name}</span>
                  {state === "done" && c.aiScore !== null && <ScorePill score={c.aiScore} />}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {done && (
        <section className="animate-in fade-in slide-in-from-bottom-2 surface-card mt-4 rounded-2xl p-6 duration-500">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="size-4 text-primary" /> Resumo da análise
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { l: "Score médio", v: "82" },
              { l: "Leads de alta prioridade", v: "4" },
              { l: "Descartados pela IA", v: "1" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card/50 p-4">
                <p className="text-xs text-muted-foreground">{s.l}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm leading-relaxed text-muted-foreground">
            Priorize NorthPeak Software House e Moretti &amp; Advogados: ambos apresentam presença
            digital madura, decisor acessível e alto encaixe com o ICP. Recomenda-se abordagem
            consultiva por WhatsApp nas próximas 24 horas e envio de proposta focada em automação.
          </div>
        </section>
      )}
    </AppShell>
  );
}
