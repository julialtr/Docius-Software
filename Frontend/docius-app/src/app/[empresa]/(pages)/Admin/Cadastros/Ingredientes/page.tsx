"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Loading from "@/app/loading";

import TabelaIngredientes from "./TabelaIngredientes";
import FormularioIngredientes from "./FormularioIngredientes";
import { ReadIngrediente } from "./interfaces";
import { findIngredientes } from "@/services/ingrediente";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";

export default function CadastroIngredientes() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadIngrediente[]>([]);
  const [ingrediente, setIngrediente] = useState<ReadIngrediente | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findIngredientes({ categoriaIngredienteId: 0 });
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler ingredientes",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadIngrediente[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleIngredienteChange = (ingrediente: ReadIngrediente | null) => {
    setIngrediente(ingrediente);
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
              Ingredientes
            </h1>
            <p className="text-gray-600">
              Gerencie os ingredientes cadastrados no sistema
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FormularioIngredientes
              dados={dados}
              isDialogOpen={isDialogOpen}
              ingrediente={ingrediente}
              onDadosChange={handleDadosChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onIngredienteChange={handleIngredienteChange}
            />
          </div>

          {/* Ingredients Table */}
          <TabelaIngredientes
            dados={dados}
            searchTerm={searchTerm}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onIngredienteChange={handleIngredienteChange}
          />
        </div>
      </main>
    </div>
  );
}
