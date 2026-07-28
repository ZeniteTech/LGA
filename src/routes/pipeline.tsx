import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { GripVertical, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { stageLabels, stageOrder } from "@/lib/data";
import type { Company, PipelineStage } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline — LeadGen Automation" },
      {
        name: "description",
        content:
          "CRM kanban integrado: arraste leads entre etapas, do primeiro contato ao fechamento do contrato.",
      },
      { property: "og:title", content: "Pipeline — LeadGen Automation" },
      {
        property: "og:description",
        content: "Gestão visual do funil comercial com drag and drop.",
      },
    ],
  }),
  component: PipelinePage,
});

const stageTone: Record<string, string> = {
  "novo-lead": "bg-muted-foreground",
  "primeiro-contato": "bg-secondary",
  "reuniao-agendada": "bg-primary",
  "proposta-enviada": "bg-warning",
  negociacao: "bg-warning",
  "cliente-fechado": "bg-success",
  perdido: "bg-destructive",
};

function PipelinePage() {
  const { data, isLoading } = useQuery({ queryKey: ["pipeline"], queryFn: api.getPipeline });
  const [board, setBoard] = useState<Company[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  useEffect(() => {
    if (data) setBoard(data);
  }, [data]);

  function drop(stage: PipelineStage) {
    if (!dragging) return;
    const company = board.find((c) => c.id === dragging);
    setBoard((prev) => prev.map((c) => (c.id === dragging ? { ...c, stage } : c)));
    setDragging(null);
    setOver(null);
    if (company && company.stage !== stage) {
      api.updateStage(company.id, stage);
      toast.success(`${company.name} → ${stageLabels[stage]}`);
    }
  }

  return (
    <AppShell
      title="Pipeline"
      description="Arraste os cards para mover os leads entre as etapas do funil."
      crumbs={[{ label: "Pipeline" }]}
    >
      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        <div className="flex min-w-max gap-4">
          {stageOrder.map((stage) => {
            const items = board.filter((c) => c.stage === stage);
            return (
              <section
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(stage);
                }}
                onDragLeave={() => setOver((o) => (o === stage ? null : o))}
                onDrop={() => drop(stage)}
                className={cn(
                  "flex w-[300px] shrink-0 flex-col rounded-2xl border border-border bg-surface/60 p-3 transition-colors",
                  over === stage && "border-primary/60 bg-primary/5",
                )}
              >
                <header className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", stageTone[stage])} />
                    <h2 className="text-sm font-semibold">{stageLabels[stage]}</h2>
                  </div>
                  <Badge variant="secondary" className="rounded-full text-[11px] tabular-nums">
                    {items.length}
                  </Badge>
                </header>

                <div className="flex flex-1 flex-col gap-2.5">
                  {isLoading &&
                    Array.from({ length: 2 }).map((_, i) => (
                      <Skeleton key={i} className="h-28 rounded-xl" />
                    ))}
                  {items.map((c) => (
                    <article
                      key={c.id}
                      draggable
                      onDragStart={() => setDragging(c.id)}
                      onDragEnd={() => setDragging(null)}
                      className={cn(
                        "surface-card cursor-grab rounded-xl p-3.5 transition-all active:cursor-grabbing",
                        dragging === c.id && "opacity-50",
                      )}
                    >
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                        <Link
                          to="/empresas/$companyId"
                          params={{ companyId: c.id }}
                          className="min-w-0 text-sm font-medium hover:text-primary"
                        >
                          <span className="line-clamp-2">{c.name}</span>
                        </Link>
                        <GripVertical className="size-4 shrink-0 text-muted-foreground/60" />
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">{c.category}</p>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="size-3 fill-warning text-warning" />
                          {c.rating.toFixed(1)}
                        </span>
                        {c.aiScore !== null && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 font-semibold tabular-nums",
                              c.aiScore >= 80
                                ? "bg-success/12 text-success"
                                : c.aiScore >= 60
                                  ? "bg-warning/12 text-warning"
                                  : "bg-destructive/12 text-destructive",
                            )}
                          >
                            IA {c.aiScore}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                  {!isLoading && items.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border/80 px-3 py-8 text-center text-xs text-muted-foreground">
                      Solte um lead aqui
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
