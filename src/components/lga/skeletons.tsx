import { Skeleton } from "@/components/ui/skeleton";

export function CompanyCardSkeleton() {
  return (
    <div className="surface-card space-y-4 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3.5 w-3/5" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="surface-card space-y-4 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-9 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-28" />
    </div>
  );
}
