import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  hint?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="surface-card hover-lift rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
          <Icon className="size-4.5" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
              positive ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}
