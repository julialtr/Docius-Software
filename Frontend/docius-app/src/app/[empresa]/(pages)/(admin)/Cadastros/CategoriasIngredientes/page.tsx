"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import TabelaCategoriasIngredientes from "./TabelaCategoriasIngredientes";
import FormularioCategoriasIngredientes from "./FormularioCategoriasIngredientes";
import { ReadCategoriaIngrediente } from "./interfaces";
import { findCategoriasIngredientes } from "@/services/categoriaIngrediente";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

export default function CategoriasIngredientes() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadCategoriaIngrediente[]>([]);
  const [categoria, setCategoria] = useState<ReadCategoriaIngrediente | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findCategoriasIngredientes();
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler as categorias",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadCategoriaIngrediente[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleCategoriaChange = (
    categoria: ReadCategoriaIngrediente | null
  ) => {
    setCategoria(categoria);
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
              Categorias de Ingredientes
            </h1>
            <p className="text-gray-600">
              Gerencie as categorias de ingredientes cadastradas no sistema
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FormularioCategoriasIngredientes
              dados={dados}
              isDialogOpen={isDialogOpen}
              categoria={categoria}
              onDadosChange={handleDadosChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onCategoriaChange={handleCategoriaChange}
            />
          </div>

          {/* Categories Table */}
          <TabelaCategoriasIngredientes
            dados={dados}
            searchTerm={searchTerm}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onCategoriaChange={handleCategoriaChange}
          />
        </div>
      </main>
    </div>
  );
}
