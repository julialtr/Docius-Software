"use client";

import { useState } from "react";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { UsuarioFiltro } from "@/app/[empresa]/(pages)/Login/interfaces";
import { login } from "@/services/usuario";

import Link from "next/link";

import Logo from "@/app/_components/Logo";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { Warning } from "@/hooks/warning";
import Loading from "@/app/loading";

export default function Login() {
  const { toast } = useToast();
  const { dadosEmpresa } = useDadosEmpresa();

  const [isLoading, setIsLoading] = useState(false);

  const [dados, setDados] = useState<UsuarioFiltro>({ email: "", senha: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(dados);

      localStorage.setItem("token", response.token);
    } catch (error) {
      if (error instanceof Warning) {
        console.log(error);

        toast({
          variant: "warning",
          title: "Erro ao fazer login",
          description: error.message,
        });
      } else if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDados((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        <Logo />
        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm order-2">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-amber-900">
              Bem-vindo de volta
            </CardTitle>
            <p className="text-muted-foreground">
              Entre com sua conta para fazer pedidos especiais
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                  value={dados?.email}
                  onChange={handleChange}
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                </div>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  required
                  disabled={isLoading}
                  value={dados?.senha}
                  onChange={handleChange}
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <Link
                href={`/${dadosEmpresa?.dominio}/Cadastros/Clientes`}
                passHref
                legacyBehavior
              >
                <Button
                  className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </Link>
            </form>
            <div className="mt-6 text-center text-sm">
              Ainda não tem uma conta?{" "}
              <Link
                href={`/${dadosEmpresa?.dominio}/Cadastro`}
                className="text-amber-700 hover:text-amber-900 hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
