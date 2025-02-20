"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findEmpresas } from "@/services/empresa";
import PaginaNaoEncontrada from "@/pages/Geral/PaginaNaoEncontrada";
import CarregandoPagina from "@/pages/Geral/CarregandoPagina";
import { Empresa } from "@/app/[empresa]/interfaces";
import { Usuario } from "@/pages/Usuario/interfaces";
import { login } from "@/services/usuario";
import router from "next/router";

export default function Login() {
  const [dadosEmpresa, setDadosEmpresa] = useState<Empresa>();
  const [dados, setDados] = useState<Usuario>({ email: "", senha: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const dominio = window.location.pathname.substring(1);

        if (dominio) {
          const data = await findEmpresas(dominio);
          setDadosEmpresa(data[0]);
        }
      } catch (error) {
        console.error(error);

        //Tratamento de Erro
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await login(dados);

      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      //Tratamento de Erro
    }
  };

  if (loading) return <CarregandoPagina />;

  return dadosEmpresa ? (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        {/* Seção do Logo */}
        <div className="text-center lg:w-1/3 space-y-4 order-1">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={`/assets/${dadosEmpresa?.caminhoLogo}?height=250&width=250&priority`}
              alt="Logo"
              width={250}
              height={250}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              src={`/assets/${dadosEmpresa?.caminhoImagem1}?height=200&width=200`}
              alt="Doce 1"
              width={200}
              height={200}
              className="rounded-2xl object-cover shadow-xl"
            />
            <Image
              src={`/assets/${dadosEmpresa?.caminhoImagem2}?height=200&width=200`}
              alt="Doce 2"
              width={200}
              height={200}
              className="rounded-2xl object-cover mt-8 shadow-xl"
            />
          </div>
        </div>

        {/* Formulário de Login */}
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
                  type="email"
                  required
                  value={dados?.email}
                  onChange={(e) =>
                    setDados({ ...dados, email: e.target.value })
                  }
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                </div>
                <Input
                  id="senha"
                  type="password"
                  required
                  value={dados?.senha}
                  onChange={(e) =>
                    setDados({ ...dados, senha: e.target.value })
                  }
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white"
                type="submit"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Ainda não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-amber-700 hover:text-amber-900 hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <PaginaNaoEncontrada />
  );
}
