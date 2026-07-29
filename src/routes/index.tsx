import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Lock, Mail, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

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

const API_SPRING_URL = "http://localhost:8080/auth/register";

const schema = z
.object({
  name: z.string().trim().min(3, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().trim().min(6, "Informe sua senha").max(100),
  confirmPassword: z.string().trim().min(1, "Confirme sua senha"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function Onsubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }

    setLoading(true);
    const {name, email, password} = parsed.data;

    try{
      const response = await fetch(API_SPRING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!response.ok) {
            throw new Error(`Erro no servidor: Status ${response.status}`);
          }

        toast.success("Conta criada com sucesso!");
        navigate({ to: "/login" });
      } catch (error) {
      console.error("Falha ao salvar Usuário:", error);
      
      form.reset();
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={Onsubmit} className="mt-4 space-y-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
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
                name="email"
                required
                defaultValue=""
                className="h-9 pl-8 text-xs"
                placeholder="voce@empresa.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
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
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                defaultValue=""
                className="h-9 pl-8 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <Checkbox 
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(!!checked)}
              /> Exibir Senha
            </label>
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
