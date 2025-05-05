"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

import PainelReceitas from "./PainelReceitas";
import PainelPrecificacao from "./PainelPrecificacao";
import { ReadPrecificacao } from "./interfaces";
import { findPrecificacoes } from "@/services/precificacao";

import Menu from "@/app/_components/Menu";

export default function Precificacao() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [dados, setDados] = useState<ReadPrecificacao[]>([]);
  const [precificacao, setPrecificacao] = useState<ReadPrecificacao | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findPrecificacoes();
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler precificações",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePrecificacaoChange = (precificacao: ReadPrecificacao | null) => {
    setPrecificacao(precificacao);
  };

  const handleDadosChange = (novosDados: ReadPrecificacao[]) => {
    setDados(novosDados);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Menu />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Precificação
            </h1>
            <p className="text-gray-600">
              Calcule e gerencie os preços dos seus produtos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PainelReceitas
              dados={dados}
              precificacao={precificacao}
              onPrecificacaoChange={handlePrecificacaoChange}
            />
            <PainelPrecificacao
              dados={dados}
              precificacao={precificacao}
              onDadosChange={handleDadosChange}
              onPrecificacaoChange={handlePrecificacaoChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
