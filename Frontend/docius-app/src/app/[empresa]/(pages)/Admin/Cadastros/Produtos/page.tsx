"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Loading from "@/app/loading";

import FormularioProdutos from "./FormularioProdutos";
import TabelaProdutos from "./TabelaProdutos";
import { ReadProduto } from "./interfaces";
import { findProdutos } from "@/services/produto";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";

export default function ProdutosPage() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadProduto[]>([]);
  const [produto, setProduto] = useState<ReadProduto | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findProdutos();
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler produtos",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadProduto[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleProdutoChange = (produto: ReadProduto | null) => {
    setProduto(produto);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Produtos</h1>
            <p className="text-gray-600">
              Gerencie os produtos disponíveis para venda
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FormularioProdutos
              dados={dados}
              isDialogOpen={isDialogOpen}
              produto={produto}
              onDadosChange={handleDadosChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onProdutoChange={handleProdutoChange}
            />
          </div>

          {/* Products Table */}
          <TabelaProdutos
            dados={dados}
            searchTerm={searchTerm}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onProdutoChange={handleProdutoChange}
          />
        </div>
      </main>
    </div>
  );
}
