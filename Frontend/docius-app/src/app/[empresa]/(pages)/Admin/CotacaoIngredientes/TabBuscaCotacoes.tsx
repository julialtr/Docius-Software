"use client";

import type React from "react";
import { useState } from "react";
import { Search, AlertTriangle, RefreshCw } from "lucide-react";

import { findProdutos } from "@/services/proxy";
import { ReadWebScrapingDados } from "./interfaces";
import { ReadFornecedor } from "../Cadastros/Fornecedores/interfaces";
import ListaFornecedores from "./TabelaFornecedores";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { TabsContent } from "@/app/_components/ui/tabs";

import { useToast } from "@/hooks/use-toast";
import { useDadosCotacao } from "@/context/DadosCotacaoContext";

export default function TabBuscaCotacoes({
  fornecedores,
  onDadosChange,
}: {
  fornecedores: ReadFornecedor[];
  onDadosChange: (novosDados: ReadWebScrapingDados[]) => void;
}) {
  const { incrementaId } = useDadosCotacao();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [idsMercados, setIdsMercados] = useState<number[]>([]);

  const buscarCotacoes = async () => {
    const dadosFiltro = { idsMercados: idsMercados, textoPesquisa: searchTerm };

    if (!searchTerm.trim()) {
      toast({
        title: "Texto não informado",
        description: "Digite um termo para buscar cotações.",
        variant: "warning",
      });
      return;
    }

    if (dadosFiltro.idsMercados.length === 0) {
      toast({
        title: "Nenhum fornecedor selecionado",
        description: "Selecione pelo menos um fornecedor para buscar cotações.",
        variant: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await findProdutos(dadosFiltro);

      if (response.mensagem !== "") {
        toast({
          title: "Erro ao buscar cotações",
          description: response.mensagem,
          variant: "destructive",
        });

        return;
      }

      const dadosAtualizados = response.dados.map(
        (item: ReadWebScrapingDados) => ({
          ...item,
          fornecedor: fornecedores.find((f) => f.id === item.idMercado) || null,
          automatica: true,
          id: incrementaId(),
        })
      );

      onDadosChange(dadosAtualizados);

      toast({
        title: "Cotação realizada",
        description: `Foram encontrados ${dadosAtualizados.length} resultados.`,
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          title: "Erro ao buscar cotações",
          description: "Ocorreu um erro ao buscar as cotações.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdsMercadosChange = (novosDados: number[]) => {
    setIdsMercados(novosDados);
  };

  return (
    <TabsContent value="buscaCotacoes" className="space-y-6">
      {/* Alerta sobre cotações automáticas */}
      <Alert
        variant="warning"
        className="bg-amber-50 border-amber-200 text-amber-800"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          As cotações automáticas estão disponíveis apenas para Fort Atacadista
          e Giassi. Para outros fornecedores, você precisará adicionar as
          cotações manualmente na página de resultados.
        </AlertDescription>
      </Alert>

      {/* Alerta sobre instabilidades */}
      <Alert
        variant="warning"
        className="bg-amber-50 border-amber-200 text-amber-800"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Essa funcionalidade está apresentando instabilidade em ambiente de
          produção. Estamos trabalhando para corrigir o problema o mais breve
          possível.
        </AlertDescription>
      </Alert>

      {/* Campo de busca */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar ingredientes</CardTitle>
          <CardDescription>
            Digite o descritivo do ingrediente para buscar cotações de preços
            nos fornecedores selecionados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={buscarCotacoes}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de fornecedores */}
      <ListaFornecedores
        idsMercados={idsMercados}
        fornecedores={fornecedores}
        onIdsMercadosChange={handleIdsMercadosChange}
      />
    </TabsContent>
  );
}
