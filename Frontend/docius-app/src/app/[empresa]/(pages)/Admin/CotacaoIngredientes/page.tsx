"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

import { ReadWebScrapingDados } from "./interfaces";
import { ReadFornecedor } from "../Cadastros/Fornecedores/interfaces";
import { findFornecedores } from "@/services/fornecedor";
import TabBuscaCotacoes from "./TabBuscaCotacoes";
import TabResultados from "./TabResultados";
import FormularioCotacao from "./FormularioCotacao";
import Menu from "@/app/_components/Menu";

import { Tabs, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";

import { useToast } from "@/hooks/use-toast";

export default function Cotacao() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [dados, setDados] = useState<ReadWebScrapingDados[]>([]);
  const [cotacao, setCotacao] = useState<ReadWebScrapingDados | null>(null);
  const [fornecedores, setFornecedores] = useState<ReadFornecedor[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findFornecedores();
        setFornecedores(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler fornecedores",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadWebScrapingDados[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleCotacaoChange = (cotacao: ReadWebScrapingDados | null) => {
    setCotacao(cotacao);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Cotação de Ingredientes
            </h1>
            <p className="text-gray-600">
              Pesquise e compare preços de ingredientes em diferentes
              fornecedores
            </p>
          </div>

          <Tabs defaultValue="buscaCotacoes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="buscaCotacoes">Busca cotações</TabsTrigger>
              <TabsTrigger value="resultados">
                Resultados ({dados.length})
              </TabsTrigger>
            </TabsList>

            <TabBuscaCotacoes
              fornecedores={fornecedores}
              onDadosChange={handleDadosChange}
            />

            <TabResultados
              dados={dados}
              onDadosChange={handleDadosChange}
              onCotacaoChange={handleCotacaoChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
            />
          </Tabs>

          {/* Dialog para adicionar/editar cotação */}
          <FormularioCotacao
            dados={dados}
            isDialogOpen={isDialogOpen}
            cotacao={cotacao}
            fornecedores={fornecedores}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onCotacaoChange={handleCotacaoChange}
          />
        </div>
      </main>
    </div>
  );
}
