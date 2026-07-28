import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ScorePill({ score }: { score: number }) {
  const tone =
    score >= 80
      ? "bg-success/12 text-success border-success/30"
      : score >= 60
        ? "bg-warning/12 text-warning border-warning/30"
        : "bg-destructive/12 text-destructive border-destructive/30";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums",
        tone,
      )}
    >
      <Sparkles className="size-3" />
      {score}
    </span>
  );
}

export function CompanyCard({
  company,
  selected,
  onToggleSelect,
  onToggleFavorite,
}: {
  company: Company;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "surface-card hover-lift group relative flex flex-col rounded-2xl p-5",
        selected && "border-primary/60 glow-ring",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight">{company.name}</h3>
            {company.aiScore !== null && <ScorePill score={company.aiScore} />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{company.category}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => onToggleFavorite?.(company.id)}
                aria-label="Favoritar"
              >
                <Heart
                  className={cn(
                    "size-4 transition-colors",
                    company.favorite ? "fill-destructive text-destructive" : "text-muted-foreground",
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Favoritar</TooltipContent>
          </Tooltip>
          {onToggleSelect && (
            <Checkbox
              checked={!!selected}
              onCheckedChange={() => onToggleSelect(company.id)}
              aria-label={`Selecionar ${company.name}`}
              className="ml-1"
            />
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span className="min-w-0">
            {company.address} · {company.city}/{company.state}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="size-4 shrink-0" />
          <span className="truncate">{company.phone}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-4 shrink-0" />
          <span className="truncate">{company.openingHours}</span>
        </p>
        <p className="flex items-center gap-2">
          <Star className="size-4 shrink-0 fill-warning text-warning" />
          <span className="tabular-nums text-foreground">{company.rating.toFixed(1)}</span>
          <span>({company.reviews} avaliações)</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {company.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full text-[11px] font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
        <Button asChild size="sm" variant="secondary" className="gap-1.5">
          <Link to="/empresas/$companyId" params={{ companyId: company.id }}>
            Ver detalhes
          </Link>
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(company.name)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir no Google"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Abrir no Google</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a href={company.website} target="_blank" rel="noreferrer" aria-label="Abrir site">
                <Globe className="size-4" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Abrir site</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-success"
              onClick={() => toast.success(`Conversa iniciada com ${company.name}`)}
              aria-label="WhatsApp"
            >
              <MessageCircle className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>WhatsApp</TooltipContent>
        </Tooltip>
      </div>
    </article>
  );
}
