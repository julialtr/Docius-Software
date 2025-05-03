"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

import { CreateUsuario } from "../Admin/Cadastros/Clientes/interfaces";
import { createUsuario } from "@/services/usuario";

import Link from "next/link";
import { Label } from "@radix-ui/react-label";

import Logo from "@/app/_components/Logo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

export default function Cadastro() {
  const { toast } = useToast();
  const { dadosEmpresa } = useDadosEmpresa();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dados, setDados] = useState<CreateUsuario>({
    nome: "",
    email: "",
    senha: "",
    tipoUsuarioId: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dados.senha.length < 6) {
      toast({
        variant: "warning",
        title: "Senha fraca",
        description: "A senha deve ter pelo menos 6 caracteres",
      });
      return;
    }

    setIsLoading(true);

    try {
      await createUsuario(dados);

      toast({
        variant: "success",
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso",
      });

      window.location.href = `/${dadosEmpresa?.dominio}/Login`;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao fazer cadastro",
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
              Criar conta
            </CardTitle>
            <p className="text-muted-foreground">
              Preencha os dados abaixo para começar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={dados.nome}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-amber-200 focus:border-amber-400"
                  value={dados.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    required
                    className="border-amber-200 focus:border-amber-400"
                    value={dados.senha}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
            <div className="mt-6 text-center space-y-4">
              <div className="text-sm">
                Já tem uma conta?{" "}
                <Link
                  href={`/${dadosEmpresa?.dominio}/Login`}
                  className="text-amber-700 hover:text-amber-900 hover:underline"
                >
                  Entre aqui
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
