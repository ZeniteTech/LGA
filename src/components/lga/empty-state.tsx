import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center rounded-2xl px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
