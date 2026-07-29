import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — LeadGen Automation" },
      {
        name: "description",
        content:
          "Acesse a LeadGen Automation da ZenithTech e automatize toda a prospecção do seu time comercial.",
      },
      { property: "og:title", content: "Entrar — LeadGen Automation" },
      {
        property: "og:description",
        content: "Prospecção inteligente com IA, do primeiro lead ao contrato fechado.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Bem-vindo de volta, Rafael");
      navigate({ to: "/dashboard" });
    }, 900);
  }

  return (
    <div className="grid-backdrop relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-3xl border border-border/80 bg-card/60 p-8 shadow-2xl backdrop-blur-2xl duration-500">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary glow-ring">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">LeadGen Automation</p>
            <p className="text-xs text-muted-foreground">by ZenithTech</p>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Entrar na plataforma</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Prospecção inteligente, do primeiro lead ao contrato fechado.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail corporativo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                defaultValue=""
                className="h-11 pl-9"
                placeholder="voce@empresa.com"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="senha">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="senha"
                type={"password"}
                required
                defaultValue=""
                className="h-11 pl-9"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => toast("Enviamos um link de recuperação para seu e-mail")}
              className="text-sm text-primary cursor-pointer transition-opacity hover:opacity-80"
            >
              Esqueci a senha
            </button>
          </div>

          <Button type="submit" className="h-11 w-full gap-2" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            {loading ? "Entrando…" : "Entrar"}
            {!loading && <ArrowRight className="size-4" />}
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Não possui uma conta?{" "}
            <a
              href="/"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Criar conta
            </a>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ambiente protegido · ZenithTech © 2026
        </p>
      </div>
    </div>
  );
}