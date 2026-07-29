import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Lock, Mail, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Criar conta — LeadGen Automation" },
      {
        name: "description",
        content:
          "Acesse a LeadGen Automation da ZenithTech e automatize toda a prospecção do seu time comercial.",
      },
      { property: "og:title", content: "Criar conta — LeadGen Automation" },
      {
        property: "og:description",
        content: "Prospecção inteligente com IA, do primeiro lead ao contrato fechado.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Conta criada com sucesso!");
      navigate({ to: "/" });
    }, 900);
  }

  return (
    <div className="grid-backdrop relative flex h-screen w-screen items-center justify-center overflow-hidden p-4">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-2xl border border-border/80 bg-card/60 p-5 shadow-2xl backdrop-blur-2xl duration-500">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary glow-ring">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold tracking-tight">LeadGen Automation</p>
            <p className="text-[10px] text-muted-foreground">by ZenithTech</p>
          </div>
        </div>

        <h1 className="mt-4 text-xl font-semibold tracking-tight">Criar conta</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Prospecção inteligente, do primeiro lead ao contrato fechado.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div className="space-y-1">
            <Label htmlFor="nome" className="text-xs">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="nome"
                type="text"
                required
                className="h-9 pl-8 text-xs"
                placeholder="Seu nome completo"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs">E-mail corporativo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                defaultValue=""
                className="h-9 pl-8 text-xs"
                placeholder="voce@empresa.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="senha" className="text-xs">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="senha"
                type="password"
                required
                defaultValue=""
                className="h-9 pl-8 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmar-senha" className="text-xs">Confirmar senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmar-senha"
                type="password"
                required
                defaultValue=""
                className="h-9 pl-8 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <Checkbox /> Exibir Senha
            </label>
            <button
              type="button"
              onClick={() => toast("Enviamos um link de recuperação para seu e-mail")}
              className="text-xs text-primary transition-opacity hover:opacity-80"
            >
              Esqueci a senha
            </button>
          </div>

          <Button type="submit" className="h-9 w-full gap-2 text-xs" disabled={loading}>
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
            {loading ? "Criando conta…" : "Criar conta"}
            {!loading && <ArrowRight className="size-3.5" />}
          </Button>

          <p className="pt-1 text-center text-xs text-muted-foreground">
            Já possui uma conta?{" "}
            <a
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Entrar
            </a>
          </p>
        </form>

        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          Ambiente protegido · ZenithTech © 2026
        </p>
      </div>
    </div>
  );
}
