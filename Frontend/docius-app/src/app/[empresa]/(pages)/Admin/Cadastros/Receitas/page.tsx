"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Loading from "@/app/loading";

import FormularioReceitas from "./FormularioReceita";
import TabelaReceitas from "./TabelaReceitas";
import { ReadReceita } from "./interfaces";
import { findReceitas } from "@/services/receita";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";

export default function ReceitasPage() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadReceita[]>([]);
  const [receita, setReceita] = useState<ReadReceita | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findReceitas();
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler receitas",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadReceita[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleReceitaChange = (receita: ReadReceita | null) => {
    setReceita(receita);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Receitas</h1>
            <p className="text-gray-600">
              Gerencie as receitas da sua confeitaria
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FormularioReceitas
              dados={dados}
              onDadosChange={handleDadosChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onReceitaChange={handleReceitaChange}
              isDialogOpen={isDialogOpen}
              receita={receita}
            />
          </div>

          {/* Recipes Table */}
          <TabelaReceitas
            dados={dados}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onReceitaChange={handleReceitaChange}
            searchTerm={searchTerm}
          />
        </div>
      </main>
    </div>
  );
}
