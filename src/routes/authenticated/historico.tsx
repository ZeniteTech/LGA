import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, History as HistoryIcon, MapPin, Repeat, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/lga/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { searchHistory } from "@/lib/data";

export const Route = createFileRoute("/authenticated/historico")({
  head: () => ({
    meta: [
      { title: "Histórico de pesquisas — LeadGen Automation" },
      {
        name: "description",
        content:
          "Consulte todas as pesquisas realizadas, com filtros por data, cidade, categoria e quantidade de empresas encontradas.",
      },
      { property: "og:title", content: "Histórico — LeadGen Automation" },
      {
        property: "og:description",
        content: "Toda a memória da sua operação de prospecção em um só lugar.",
      },
    ],
  }),
  component: HistoryPage,
});

const cities = Array.from(new Set(searchHistory.map((h) => h.city)));
const categories = Array.from(new Set(searchHistory.map((h) => h.category)));

function HistoryPage() {
  const { data, isLoading } = useQuery({ queryKey: ["history"], queryFn: api.getHistory });
  const [term, setTerm] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");

  const list = useMemo(
    () =>
      (data ?? []).filter(
        (h) =>
          h.query.toLowerCase().includes(term.toLowerCase()) &&
          (city === "all" || h.city === city) &&
          (category === "all" || h.category === category),
      ),
    [data, term, city, category],
  );

  return (
    <AppShell
      title="Histórico"
      description="Todas as pesquisas executadas na plataforma."
      crumbs={[{ label: "Histórico" }]}
      action={
        <Button asChild className="gap-1.5">
          <Link to="/buscar">
            <Search className="size-4" /> Nova pesquisa
          </Link>
        </Button>
      }
    >
      <div className="surface-card grid gap-3 rounded-2xl p-4 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative min-w-0">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar no histórico"
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
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 w-full md:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 grid gap-3">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        {!isLoading &&
          list.map((h) => (
            <article
              key={h.id}
              className="surface-card hover-lift grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl p-5"
            >
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold">{h.query}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" /> {h.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {new Date(h.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Badge variant="secondary" className="rounded-full font-normal">
                    {h.category}
                  </Badge>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-lg font-semibold tabular-nums">{h.results}</p>
                  <p className="text-[11px] text-muted-foreground">empresas</p>
                </div>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link to="/buscar">
                    <Repeat className="size-3.5" /> Repetir
                  </Link>
                </Button>
              </div>
            </article>
          ))}
      </div>

      {!isLoading && list.length === 0 && (
        <div className="mt-5">
          <EmptyState
            icon={HistoryIcon}
            title="Nenhuma pesquisa encontrada"
            description="Ajuste os filtros ou execute uma nova pesquisa para começar a construir seu histórico."
            action={
              <Button asChild>
                <Link to="/buscar">Buscar leads</Link>
              </Button>
            }
          />
        </div>
      )}
    </AppShell>
  );
}
