import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Building2,
  ChevronLeft,
  Command,
  Github,
  History,
  KanbanSquare,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/buscar", label: "Buscar Leads", icon: Search },
  { to: "/empresas", label: "Empresas", icon: Building2 },
  { to: "/pipeline", label: "Pipeline", icon: KanbanSquare },
  { to: "/ia", label: "IA", icon: Bot },
  { to: "/historico", label: "Histórico", icon: History },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

const notifications = [
  { title: "Análise de IA concluída", detail: "18 empresas · score médio 78", time: "12 min" },
  { title: "Novo lead qualificado", detail: "NorthPeak Software House · 95", time: "1 h" },
  { title: "Proposta aguardando retorno", detail: "Grupo Ferreira Imobiliária", time: "3 h" },
];

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/dashboard" className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary glow-ring">
        <Sparkles className="size-4.5" />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-tight">
            LeadGen Automation
          </span>
          <span className="block truncate text-[11px] text-muted-foreground">by ZenithTech</span>
        </span>
      )}
    </Link>
  );
}

function SidebarNav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const active = item.to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.to);
        const link = (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active && "bg-sidebar-accent text-sidebar-accent-foreground",
              collapsed && "justify-center px-0",
            )}
          >
            <span
              className={cn(
                "absolute left-0 h-5 w-0.5 rounded-r-full bg-primary transition-all duration-200",
                active ? "opacity-100" : "opacity-0 group-hover:opacity-40",
              )}
            />
            <item.icon
              className={cn(
                "size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                active && "text-primary",
              )}
            />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );

        return collapsed ? (
          <Tooltip key={item.to}>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ) : (
          link
        );
      })}
    </nav>
  );
}

function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="border-t border-sidebar-border p-3">
      {!collapsed && (
        <div className="mb-3 rounded-xl border border-border/70 bg-card/60 p-3">
          <p className="text-xs font-medium">Créditos Google Places</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">6.800 de 10.000 requisições</p>
        </div>
      )}
      <Link
        to="/login"
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
          collapsed && "justify-center px-0",
        )}
      >
        <LogOut className="size-4.5 shrink-0" />
        {!collapsed && "Sair"}
      </Link>
    </div>
  );
}

export interface Crumb {
  label: string;
  to?: string;
}

export function AppShell({
  children,
  title,
  description,
  crumbs = [],
  action,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  action?: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out lg:flex",
            collapsed ? "w-[76px]" : "w-[264px]",
          )}
        >
          <div
            className={cn(
              "flex h-16 items-center border-b border-sidebar-border px-4",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <Logo compact={collapsed} />
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground"
                onClick={() => setCollapsed(true)}
                aria-label="Recolher menu"
              >
                <ChevronLeft className="size-4" />
              </Button>
            )}
          </div>
          <SidebarNav collapsed={collapsed} />
          <SidebarFooter collapsed={collapsed} />
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-3 top-20 size-6 rounded-full border border-border bg-card text-muted-foreground shadow-md"
              onClick={() => setCollapsed(false)}
              aria-label="Expandir menu"
            >
              <ChevronLeft className="size-3 rotate-180" />
            </Button>
          )}
        </aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Fechar menu"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="animate-in slide-in-from-left relative flex h-full w-[272px] flex-col border-r border-sidebar-border bg-sidebar duration-300">
              <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
              <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} />
              <SidebarFooter collapsed={false} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Abrir menu"
                >
                  <Menu className="size-5" />
                </Button>
                <nav
                  aria-label="Breadcrumb"
                  className="hidden min-w-0 items-center gap-1.5 text-sm text-muted-foreground md:flex"
                >
                  <Link to="/dashboard" className="transition-colors hover:text-foreground">
                    LGA
                  </Link>
                  {crumbs.map((c) => (
                    <span key={c.label} className="flex min-w-0 items-center gap-1.5">
                      <span className="text-muted-foreground/50">/</span>
                      {c.to ? (
                        <Link to={c.to} className="truncate transition-colors hover:text-foreground">
                          {c.label}
                        </Link>
                      ) : (
                        <span className="truncate text-foreground">{c.label}</span>
                      )}
                    </span>
                  ))}
                </nav>
                <div className="relative hidden min-w-0 flex-1 max-w-sm lg:block">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar em todo o sistema"
                    className="h-9 border-border/70 bg-card/60 pl-9 pr-14"
                  />
                  <kbd className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    <Command className="size-2.5" />K
                  </kbd>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <Button asChild size="sm" className="hidden gap-1.5 sm:inline-flex">
                  <Link to="/buscar">
                    <Plus className="size-4" />
                    Nova Pesquisa
                  </Link>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="size-5" />
                      <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80 p-0">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold">Notificações</p>
                      <Badge variant="secondary" className="text-[10px]">
                        3 novas
                      </Badge>
                    </div>
                    <ul className="divide-y divide-border">
                      {notifications.map((n) => (
                        <li
                          key={n.title}
                          className="cursor-pointer px-4 py-3 transition-colors hover:bg-accent/60"
                        >
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.detail}</p>
                          <p className="mt-1 text-[11px] text-muted-foreground/70">há {n.time}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full px-4 py-2.5 text-xs text-primary transition-colors hover:bg-accent/60"
                      onClick={() => toast.success("Notificações marcadas como lidas")}
                    >
                      Marcar todas como lidas
                    </button>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-1 rounded-full outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring">
                      <Avatar className="size-9 border border-border">
                        <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                          RF
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="text-sm font-medium">Rafael Ferraz</p>
                      <p className="text-xs font-normal text-muted-foreground">
                        rafael@zenithtech.com
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/perfil">
                        <User className="mr-2 size-4" /> Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/configuracoes">
                        <Settings className="mr-2 size-4" /> Configurações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="https://zenithtech.com" target="_blank" rel="noreferrer">
                        <Github className="mr-2 size-4" /> Documentação da API
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                      <Link to="/login">
                        <LogOut className="mr-2 size-4" /> Sair
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="animate-in fade-in slide-in-from-bottom-2 mx-auto w-full max-w-[1400px] duration-500">
              <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    {title}
                  </h1>
                  {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
                {action}
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
