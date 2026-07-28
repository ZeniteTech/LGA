import { createFileRoute } from "@tanstack/react-router";
import { Bot, Database, KeyRound, Palette, Plug, Users } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — LeadGen Automation" },
      {
        name: "description",
        content:
          "Configure a API do Google Places, modelos de IA, banco de dados Neon, usuários, preferências e integrações.",
      },
      { property: "og:title", content: "Configurações — LeadGen Automation" },
      {
        property: "og:description",
        content: "Controle total sobre integrações, IA e time da sua operação.",
      },
    ],
  }),
  component: SettingsPage,
});

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card rounded-2xl p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Separator className="my-5" />
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_320px] md:items-center md:gap-6">
      <div className="min-w-0">
        <Label className="text-sm">{label}</Label>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

const team = [
  { name: "Rafael Ferraz", email: "rafael@zenithtech.com", role: "Owner" },
  { name: "Marina Duarte", email: "marina@zenithtech.com", role: "Closer" },
  { name: "Igor Salles", email: "igor@zenithtech.com", role: "SDR" },
];

function SettingsPage() {
  return (
    <AppShell
      title="Configurações"
      description="Integrações, modelos e preferências da plataforma."
      crumbs={[{ label: "Configurações" }]}
      action={<Button onClick={() => toast.success("Configurações salvas")}>Salvar alterações</Button>}
    >
      <Tabs defaultValue="api">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="api">
            <KeyRound className="mr-1.5 size-3.5" /> Google Places
          </TabsTrigger>
          <TabsTrigger value="ia">
            <Bot className="mr-1.5 size-3.5" /> Modelos de IA
          </TabsTrigger>
          <TabsTrigger value="db">
            <Database className="mr-1.5 size-3.5" /> Banco de dados
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Users className="mr-1.5 size-3.5" /> Usuários
          </TabsTrigger>
          <TabsTrigger value="prefs">
            <Palette className="mr-1.5 size-3.5" /> Preferências
          </TabsTrigger>
          <TabsTrigger value="integracoes">
            <Plug className="mr-1.5 size-3.5" /> Integrações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="mt-5">
          <Section
            title="API Google Places"
            description="Credenciais e limites utilizados nas buscas em tempo real."
          >
            <Row label="Chave da API" hint="Armazenada com criptografia no backend">
              <Input type="password" defaultValue="AIzaSyD-••••••••••••••••••••" />
            </Row>
            <Row label="Raio padrão de busca" hint="Em quilômetros a partir da cidade">
              <Slider defaultValue={[25]} max={100} step={5} />
            </Row>
            <Row label="Resultados por pesquisa">
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 empresas</SelectItem>
                  <SelectItem value="60">60 empresas</SelectItem>
                  <SelectItem value="120">120 empresas</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Enriquecer com detalhes" hint="Telefone, site e horário (custo adicional)">
              <Switch defaultChecked />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="ia" className="mt-5">
          <Section
            title="Modelos de IA"
            description="Defina o modelo e o comportamento da análise de leads."
          >
            <Row label="Modelo de análise">
              <Select defaultValue="analyst-v3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst-v3">lga-analyst-v3 (recomendado)</SelectItem>
                  <SelectItem value="analyst-fast">lga-analyst-fast</SelectItem>
                  <SelectItem value="analyst-deep">lga-analyst-deep</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Score mínimo para qualificar" hint="Leads abaixo do corte ficam em triagem">
              <Slider defaultValue={[70]} max={100} step={5} />
            </Row>
            <Row label="Gerar proposta automaticamente" hint="Para leads com score acima de 85">
              <Switch defaultChecked />
            </Row>
            <Row label="Prompt de contexto do ICP">
              <Input defaultValue="Empresas B2B com time comercial estruturado" />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="db" className="mt-5">
          <Section
            title="Banco de dados"
            description="Conexão com o PostgreSQL hospedado na Neon."
          >
            <Row label="Host">
              <Input defaultValue="ep-lga-prod.sa-east-1.aws.neon.tech" />
            </Row>
            <Row label="Database">
              <Input defaultValue="lga_production" />
            </Row>
            <Row label="Pool de conexões">
              <Input defaultValue="20" />
            </Row>
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-success/25 bg-success/8 px-4 py-3">
              <Badge className="bg-success/15 text-success">Conectado</Badge>
              <span className="text-xs text-muted-foreground">
                Latência média 38 ms · última sincronização há 5 horas
              </span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto"
                onClick={() => toast.success("Conexão testada com sucesso")}
              >
                Testar conexão
              </Button>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="usuarios" className="mt-5">
          <Section title="Usuários" description="Membros com acesso à plataforma.">
            <ul className="divide-y divide-border">
              {team.map((m) => (
                <li key={m.email} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/15 text-xs text-primary">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {m.role}
                  </Badge>
                </li>
              ))}
            </ul>
            <Button variant="outline" onClick={() => toast.success("Convite enviado")}>
              Convidar usuário
            </Button>
          </Section>
        </TabsContent>

        <TabsContent value="prefs" className="mt-5">
          <Section title="Preferências" description="Ajustes de experiência e notificações.">
            <Row label="Tema" hint="A identidade LGA é otimizada para o tema escuro">
              <Select defaultValue="dark">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Idioma">
              <Select defaultValue="pt">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português (BR)</SelectItem>
                  <SelectItem value="en">English (US)</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Notificações de análise concluída">
              <Switch defaultChecked />
            </Row>
            <Row label="Resumo diário por e-mail">
              <Switch />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="integracoes" className="mt-5">
          <Section
            title="Integrações"
            description="Conecte a LGA ao restante do seu stack comercial."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { n: "WhatsApp Business", s: "Conectado" },
                { n: "Google Calendar", s: "Conectado" },
                { n: "Slack", s: "Em breve" },
                { n: "HubSpot CRM", s: "Em breve" },
              ].map((i) => (
                <div
                  key={i.n}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/50 px-4 py-3"
                >
                  <span className="text-sm font-medium">{i.n}</span>
                  <Badge
                    variant={i.s === "Conectado" ? "default" : "outline"}
                    className="rounded-full text-[11px]"
                  >
                    {i.s}
                  </Badge>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
