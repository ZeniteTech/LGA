import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpDown,
  CheckCheck,
  History,
  Search,
  SlidersHorizontal,
  Sparkles,
  SearchX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { CompanyCard } from "@/components/lga/company-card";
import { EmptyState } from "@/components/lga/empty-state";
import { CompanyCardSkeleton } from "@/components/lga/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { api } from "@/lib/api";
import {searchHistory, searchSuggestions } from "@/lib/data";
import { Target } from "inspector/promises";
import { Company } from "@/lib/types";

export const Route = createFileRoute("/authenticated/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar Leads — LeadGen Automation" },
      {
        name: "description",
        content:
          "Pesquise empresas em tempo real pelo Google Places, filtre por cidade e categoria e envie leads para análise de IA.",
      },
      { property: "og:title", content: "Buscar Leads — LeadGen Automation" },
      {
        property: "og:description",
        content: "Prospecção em tempo real com filtros avançados e enriquecimento por IA.",
      },
    ],
  }),
  component: SearchPage,
});

export function SearchPage() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [sort, setSort] = useState("score");
  const [selected, setSelected] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [busca, setBusca] = useState("");
  const [empresa, setEmpresa] = useState<Company[]>([]);

  //const searchEnterprise = useState<SearchEnterprise>;
  const API_GOOGLE_PLACES_URL = "https://lga-google-places-api.up.railway.app/enterprise/search_leads";
  // Buscando Empresas diretamente na API do Google Places, para evitar problemas de CORS e expor a chave da API no front-end, criamos um endpoint intermediário que faz a requisição para o Google Places.

  async function buscarEmpresas(e: React.FormEvent) {
    e.preventDefault();

    console.log("Chamou a função");
    console.log("Busca:", busca);

    try {
      const response = await fetch(
        `${API_GOOGLE_PLACES_URL}?nichoEmpresa_cidade=${encodeURIComponent(busca)}`
      );
      
      console.log(response.status);

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      const empresasConvertidas: Company[] = data.places.map((place: any) => ({
        id: place.id,

        name: place.displayName?.text ?? "",

        category: "Não informado",

        address: place.formattedAddress ?? "",

        city: "",

        state: "",

        phone: place.nationalPhoneNumber ?? "",

        website: place.websiteUri ?? "",

        rating: place.rating ?? 0,

        reviews: place.userRatingCount ?? 0,

        openingHours: "",

        tags: [],

        aiScore: null,

        aiSummary: "",

        favorite: false,

        stage: "novo-lead",

        createdAt: new Date().toISOString(),

        photos: [],

        notes: "",
      }));
      
      setEmpresa(empresasConvertidas);
      setSubmitted(busca);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const processing = useMutation({
    mutationFn: () => api.runAiAnalysis(selected),
    onSuccess: () => {
      toast.success(`${selected.length} empresas enviadas para a fila de IA`);
      navigate({ to: "/authenticated/ia" });
    },
  });

  const suggestions = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(term.toLowerCase().trim()),
  );

  function runSearch(value: string) {
    if (!value.trim()) {
      toast.error("Descreva o que você quer prospectar");
      return;
    }
    setTerm(value);
    setSubmitted(value);
    setSelected([]);
    setFocused(false);
  }

  return (
    <TooltipProvider delayDuration={150}>
      <AppShell
        title="Buscar Leads"
        description="Pesquise empresas reais pelo Google Places e qualifique com Inteligência Artificial."
        crumbs={[{ label: "Buscar Leads" }]}
      >
        <section className="surface-card grid-backdrop relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              <Sparkles className="mr-1.5 size-3 text-primary" /> Busca em tempo real
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
              O que vamos prospectar hoje?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Descreva o segmento e a região. A plataforma cuida do resto.
            </p>

            <form onSubmit={buscarEmpresas} className="relative mt-7">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  onKeyDown={(e) => e.key === "Enter" && buscarEmpresas(e)}
                  placeholder="Ex.: Escritórios de Advocacia em Limeira"
                  className="h-14 w-full rounded-2xl border border-border bg-card/80 pl-12 pr-32 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/60 focus:glow-ring sm:text-base"
                />
                {busca && (
                  <button
                    onClick={() => setBusca("")}
                    aria-label="Limpar"
                    className="absolute right-28 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 h-10 -translate-y-1/2 gap-1.5"
                >
                  Pesquisar
                </Button>
              </div>

              {focused && suggestions.length > 0 && (
                <ul className="animate-in fade-in slide-in-from-top-1 absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover p-1.5 text-left shadow-2xl duration-200">
                  {suggestions.slice(0, 5).map((s) => (
                    <li key={s}>
                      <button
                        onMouseDown={() => runSearch(s)}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                      >
                        <Search className="size-3.5 text-muted-foreground" />
                        <span className="truncate">{s}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <History className="size-3.5" /> Recentes:
              </span>
              {searchHistory.slice(0, 3).map((h) => (
                <button
                  key={h.id}
                  onClick={() => runSearch(h.query)}
                  className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
                >
                  {h.query}
                </button>
              ))}
            </div>
          </div>
        </section>

        {submitted !== null && (
          <>
            <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                 {/* {isFetching ? "Consultando Google Places…" : `${results.length} resultados`} */}
                </p>
                <p className="truncate text-xs text-muted-foreground">para “{submitted}”</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="h-9 w-[150px]">
                    <SlidersHorizontal className="mr-1 size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as cidades</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                {/* <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9 w-[190px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="h-9 w-[170px]">
                    <ArrowUpDown className="mr-1 size-3.5 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Maior score IA</SelectItem>
                    <SelectItem value="rating">Melhor avaliação</SelectItem>
                    <SelectItem value="reviews">Mais avaliações</SelectItem>
                    <SelectItem value="name">Nome (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* {!isFetching && results.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setSelected(results.map((r) => r.id))}
                >
                  <CheckCheck className="size-3.5" /> Selecionar todos
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                  Desmarcar todos
                </Button>
                {selected.length > 0 && (
                  <Badge className="rounded-full">{selected.length} empresas selecionadas</Badge>
                )}
              </div>
            )} */}

            { <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {/* {
                Array.from({ length: 6 }).map((_, i) => <CompanyCardSkeleton key={i} />)} */}
              {
                empresa.map((c) => (
                  <CompanyCard
                    key={c.id}
                    company={c}
                    selected={selected.includes(c.id)}
                    onToggleSelect={(id) =>
                      setSelected((prev) =>
                        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
                      )
                    }
                    onToggleFavorite={() => toast.success("Favorito atualizado")}
                  />
                ))}
            </div>}

            {/* {!isFetching && results.length === 0 && (
              <div className="mt-5">
                <EmptyState
                  icon={SearchX}
                  title="Nenhuma empresa encontrada"
                  description="Ajuste os filtros de cidade e categoria ou tente descrever o segmento de outra forma."
                  action={
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCity("all");
                        setCategory("all");
                      }}
                    >
                      Limpar filtros
                    </Button>
                  }
                />
              </div>
            )} */}
          </>
        )}

        {selected.length > 0 && (
          <div className="animate-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-50 -translate-x-1/2 duration-300">
            <div className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-card/95 px-4 py-3 shadow-2xl backdrop-blur-xl glow-ring">
              <span className="text-sm">
                <strong className="tabular-nums">{selected.length}</strong> empresas selecionadas
              </span>
              <Button
                size="sm"
                className="gap-1.5"
                disabled={processing.isPending}
                onClick={() => processing.mutate()}
              >
                <Sparkles className="size-4" />
                {processing.isPending ? "Enviando…" : "Iniciar processamento"}
              </Button>
            </div>
          </div>
        )}
      </AppShell>
    </TooltipProvider>
  );
}
