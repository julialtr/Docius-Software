"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

import { redefinirSenha } from "@/services/autenticacao";
import { RedefinirSenha } from "./interfaces";

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

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

import { useToast } from "@/hooks/use-toast";
import { Warning } from "@/hooks/warning";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const { dadosEmpresa } = useDadosEmpresa();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dados, setDados] = useState<RedefinirSenha>({ senha: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await redefinirSenha(dados);

      toast({
        title: "Senha alterada com sucesso",
        description: "Você será redirecionado para fazer o login",
        variant: "success",
      });

      router.push(`/${dadosEmpresa?.dominio}/Login`);
      router.refresh();
    } catch (error) {
      if (error instanceof Warning) {
        console.log(error);

        toast({
          variant: "warning",
          title: "Erro ao fazer redefinir a senha",
          description: error.message,
        });
      } else if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao fazer redefinir a senha",
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
              Redefinir senha
            </CardTitle>
            <p className="text-muted-foreground">
              Crie uma nova senha para sua conta
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Nova senha</Label>
                </div>
                <div className="relative">
                  <Input
                    id="senha"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    value={dados?.senha}
                    onChange={handleChange}
                    className="border-amber-200 focus:border-amber-500"
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
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Redefinindo..." : "Redefinir senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
