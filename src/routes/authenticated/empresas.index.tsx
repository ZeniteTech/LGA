import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, Heart, LayoutGrid, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { CompanyCard } from "@/components/lga/company-card";
import { EmptyState } from "@/components/lga/empty-state";
import { CompanyCardSkeleton } from "@/components/lga/skeletons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { api } from "@/lib/api";
import { companies as dataset } from "@/lib/data";

export const Route = createFileRoute("/authenticated/empresas/")({
  head: () => ({
    meta: [
      { title: "Empresas — LeadGen Automation" },
      {
        name: "description",
        content:
          "Base completa de empresas capturadas, com score de IA, favoritos e filtros por cidade e categoria.",
      },
      { property: "og:title", content: "Empresas — LeadGen Automation" },
      {
        property: "og:description",
        content: "Sua base viva de leads B2B enriquecida por Inteligência Artificial.",
      },
    ],
  }),
  component: CompaniesPage,
});

const cities = Array.from(new Set(dataset.map((c) => c.city)));

function CompaniesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["companies"], queryFn: api.getCompanies });
  const [term, setTerm] = useState("");
  const [city, setCity] = useState("all");
  const [tab, setTab] = useState("todas");

  const list = useMemo(() => {
    return (data ?? []).filter((c) => {
      const q = term.toLowerCase();
      const matchTerm =
        !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      const matchCity = city === "all" || c.city === city;
      const matchTab =
        tab === "todas" ||
        (tab === "favoritas" && c.favorite) ||
        (tab === "qualificadas" && (c.aiScore ?? 0) >= 70) ||
        (tab === "sem-analise" && c.aiScore === null);
      return matchTerm && matchCity && matchTab;
    });
  }, [data, term, city, tab]);

  return (
    <TooltipProvider delayDuration={150}>
      <AppShell
        title="Empresas"
        description="Todas as empresas armazenadas na sua base PostgreSQL."
        crumbs={[{ label: "Empresas" }]}
      >
        <div className="surface-card grid grid-cols-1 gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Filtrar por nome ou categoria"
              className="h-10 pl-9"
            />
          </div>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-10 w-full md:w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="todas">
                <LayoutGrid className="mr-1.5 size-3.5" />
                Todas
              </TabsTrigger>
              <TabsTrigger value="qualificadas">Qualificadas</TabsTrigger>
              <TabsTrigger value="favoritas">
                <Heart className="mr-1.5 size-3.5" />
                Favoritas
              </TabsTrigger>
              <TabsTrigger value="sem-analise">Sem análise</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <CompanyCardSkeleton key={i} />)}
          {!isLoading &&
            list.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                onToggleFavorite={() => toast.success("Favorito atualizado")}
              />
            ))}
        </div>

        {!isLoading && list.length === 0 && (
          <div className="mt-5">
            <EmptyState
              icon={Building2}
              title="Nada por aqui ainda"
              description="Nenhuma empresa corresponde a esses filtros. Faça uma nova pesquisa para alimentar sua base."
              action={
                <Button
                  onClick={() => {
                    setTerm("");
                    setCity("all");
                    setTab("todas");
                  }}
                >
                  Limpar filtros
                </Button>
              }
            />
          </div>
        )}
      </AppShell>
    </TooltipProvider>
  );
}
