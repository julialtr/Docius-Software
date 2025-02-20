"use client";

import { useEffect, useState } from "react";

import { findEmpresas } from "@/services/empresa";

import { Empresa } from "@/app/[empresa]/interfaces";

import PaginaNaoEncontrada from "@/pages/Geral/PaginaNaoEncontrada";
import CarregandoPagina from "@/pages/Geral/CarregandoPagina";
import Logo from "@/pages/Logo";
import Login from "@/pages/Login";

import { useToast } from "@/hooks/use-toast";
import { Warning } from "@/hooks/warning";

export default function Main() {
  const { toast } = useToast();
  
  const [dadosEmpresa, setDadosEmpresa] = useState<Empresa>();
  const [loading, setLoading] = useState(false);

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
        if (error instanceof Warning) {
          console.log(error);

          toast({
            variant: "warning",
            title: "Erro ao buscar empresas",
            description: error.message,
          });
        } else if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao buscar empresas",
            description: error.message,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CarregandoPagina />;

  return dadosEmpresa ? (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        <Logo dadosEmpresa={dadosEmpresa} />
        <Login />
      </div>
    </div>
  ) : (
    <PaginaNaoEncontrada />
  );
}
