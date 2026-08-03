import { createFileRoute } from "@tanstack/react-router";
import { Bot, Building2, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/lga/stat-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — LeadGen Automation" },
      {
        name: "description",
        content:
          "Gerencie seus dados, metas comerciais e desempenho individual dentro da plataforma LeadGen Automation.",
      },
      { property: "og:title", content: "Perfil — LeadGen Automation" },
      {
        property: "og:description",
        content: "Seu desempenho de prospecção e dados de conta.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell
      title="Perfil"
      description="Seus dados e desempenho na operação comercial."
      crumbs={[{ label: "Perfil" }]}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface-card rounded-2xl p-6 text-center">
          <Avatar className="mx-auto size-20 border border-border">
            <AvatarFallback className="bg-primary/15 text-xl font-semibold text-primary">
              RF
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-semibold">Rafael Ferraz</h2>
          <p className="text-sm text-muted-foreground">Head of Sales · ZenithTech</p>
          <Badge className="mt-3 rounded-full">Plano Scale</Badge>
          <Separator className="my-5" />
          <div className="space-y-1 text-left text-sm">
            <p className="flex justify-between">
              <span className="text-muted-foreground">Membro desde</span>
              <span>Mar 2025</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Fuso horário</span>
              <span>GMT-3</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span>Comercial</span>
            </p>
          </div>
        </section>

        <section className="surface-card rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Dados da conta</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" defaultValue="Rafael Ferraz" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" defaultValue="rafael@zenithtech.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cargo">Cargo</Label>
              <Input id="cargo" defaultValue="Head of Sales" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fone">Telefone</Label>
              <Input id="fone" defaultValue="+55 19 99999-1234" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bio">Assinatura de abordagem</Label>
              <Textarea
                id="bio"
                className="min-h-24"
                defaultValue="Rafael Ferraz · ZenithTech — automação comercial para empresas B2B."
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={() => toast.success("Perfil atualizado")}>Salvar alterações</Button>
            <Button variant="outline" onClick={() => toast("Enviamos um link para seu e-mail")}>
              Alterar senha
            </Button>
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Leads prospectados" value="482" delta={9.4} icon={Building2} />
        <StatCard label="Leads qualificados" value="164" delta={12.1} icon={Target} />
        <StatCard label="Análises solicitadas" value="311" delta={18.6} icon={Bot} />
        <StatCard label="Conversão pessoal" value="27,8%" delta={3.2} icon={TrendingUp} />
      </div>
    </AppShell>
  );
}
