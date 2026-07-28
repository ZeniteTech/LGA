import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { ScorePill } from "@/components/lga/company-card";
import { EmptyState } from "@/components/lga/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { stageLabels } from "@/lib/data";

export const Route = createFileRoute("/empresas/$companyId")({
  head: () => ({
    meta: [
      { title: "Perfil da empresa — LeadGen Automation" },
      {
        name: "description",
        content:
          "Dados completos do Google Places, avaliações, localização, score de IA e histórico de análises do lead.",
      },
      { property: "og:title", content: "Perfil da empresa — LeadGen Automation" },
      {
        property: "og:description",
        content: "Tudo sobre o lead em uma única página, pronto para o contato comercial.",
      },
    ],
  }),
  component: CompanyDetailPage,
});

function CompanyDetailPage() {
  const { companyId } = Route.useParams();
  const { data: company, isLoading } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => api.getCompany(companyId),
  });

  if (isLoading) {
    return (
      <AppShell title="Carregando…" crumbs={[{ label: "Empresas", to: "/empresas" }]}>
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  if (!company) {
    return (
      <AppShell title="Empresa não encontrada" crumbs={[{ label: "Empresas", to: "/empresas" }]}>
        <EmptyState
          icon={MapPin}
          title="Esse lead não existe mais"
          description="A empresa pode ter sido removida da base. Volte para a listagem e tente novamente."
          action={
            <Button asChild>
              <Link to="/empresas">Voltar para empresas</Link>
            </Button>
          }
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      title={company.name}
      description={`${company.category} · ${company.city}/${company.state}`}
      crumbs={[{ label: "Empresas", to: "/empresas" }, { label: company.name }]}
      action={
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost" size="sm" className="gap-1.5">
            <Link to="/empresas">
              <ArrowLeft className="size-4" /> Voltar
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast.success("Adicionada aos favoritos")}
          >
            <Heart className="size-4" /> Favoritar
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => toast.success("Conversa iniciada no WhatsApp")}
          >
            <MessageCircle className="size-4" /> WhatsApp
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="surface-card overflow-hidden rounded-2xl">
            <div className="grid grid-cols-3 gap-1">
              {company.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1} de ${company.name}`}
                  loading="lazy"
                  className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-48"
                />
              ))}
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <Info icon={MapPin} label="Endereço" value={company.address} />
              <Info
                icon={MapPin}
                label="Cidade / Estado"
                value={`${company.city} / ${company.state}`}
              />
              <Info icon={Phone} label="Telefone" value={company.phone} />
              <Info icon={Clock} label="Horário" value={company.openingHours} />
              <Info
                icon={Globe}
                label="Website"
                value={company.website}
                href={company.website}
              />
              <Info
                icon={Star}
                label="Avaliação Google"
                value={`${company.rating.toFixed(1)} · ${company.reviews} avaliações`}
              />
            </div>
          </div>

          <div className="surface-card overflow-hidden rounded-2xl">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-base font-semibold">Localização</h2>
            </div>
            <iframe
              title={`Mapa de ${company.name}`}
              className="h-72 w-full border-0 grayscale-[35%]"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${company.address}, ${company.city}`,
              )}&z=15&output=embed`}
            />
          </div>

          <div className="surface-card rounded-2xl p-5">
            <Tabs defaultValue="analise">
              <TabsList>
                <TabsTrigger value="analise">Análise IA</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="observacoes">Observações</TabsTrigger>
              </TabsList>
              <TabsContent value="analise" className="mt-5 space-y-4">
                {company.aiScore === null ? (
                  <EmptyState
                    icon={Sparkles}
                    title="Ainda sem análise de IA"
                    description="Envie este lead para a fila de processamento e receba score, resumo e recomendações."
                    action={
                      <Button asChild>
                        <Link to="/ia">Processar com IA</Link>
                      </Button>
                    }
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <ScorePill score={company.aiScore} />
                      <Progress value={company.aiScore} className="h-2 flex-1" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {company.aiSummary ??
                        "Lead com bom encaixe de perfil. Recomenda-se contato consultivo."}
                    </p>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Próximas recomendações</p>
                      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <li>· Abordagem por WhatsApp citando o volume de avaliações no Google.</li>
                        <li>· Enviar proposta com foco em automação de atendimento.</li>
                        <li>· Agendar follow-up em 3 dias úteis.</li>
                      </ul>
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="historico" className="mt-5">
                <ol className="space-y-4">
                  {[
                    { t: "Análise de IA concluída", d: "Score 92 · modelo lga-analyst-v3", w: "24/07" },
                    { t: "Lead capturado no Google Places", d: "Pesquisa: Advocacia em Limeira", w: "24/07" },
                    { t: "Movido no pipeline", d: "Primeiro Contato → Reunião Agendada", w: "26/07" },
                  ].map((h) => (
                    <li key={h.t} className="flex items-start gap-3">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{h.t}</p>
                        <p className="text-xs text-muted-foreground">
                          {h.d} · {h.w}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </TabsContent>
              <TabsContent value="observacoes" className="mt-5 space-y-3">
                <Textarea
                  defaultValue={company.notes}
                  placeholder="Registre contexto do contato, objeções e próximos passos…"
                  className="min-h-32"
                />
                <Button size="sm" onClick={() => toast.success("Observações salvas")}>
                  Salvar observações
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="surface-card rounded-2xl p-5">
            <p className="text-sm text-muted-foreground">Etapa atual</p>
            <p className="mt-1 text-lg font-semibold">{stageLabels[company.stage]}</p>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <Link to="/pipeline">Abrir no pipeline</Link>
            </Button>
          </div>

          <div className="surface-card rounded-2xl p-5">
            <p className="text-sm font-medium">Tags</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {company.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="surface-card rounded-2xl p-5">
            <p className="text-sm font-medium">Ações rápidas</p>
            <div className="mt-3 space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(company.name)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="size-4" /> Abrir no Google
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                <a href={company.website} target="_blank" rel="noreferrer">
                  <Globe className="size-4" /> Abrir site
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => toast.success("Proposta comercial em geração")}
              >
                <Sparkles className="size-4" /> Gerar proposta com IA
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-sm text-primary hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}
