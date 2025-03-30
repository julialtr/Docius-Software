"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import TabelaGastosFixos from "./TabelaGastosFixos";
import FormularioGastosFixos from "./FormularioGastosFixos";
import { ReadGastoFixo } from "./interfaces";
import { findGastosFixos } from "@/services/gastoFixo";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

export default function CadastroGastosFixos() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadGastoFixo[]>([]);
  const [gastoFixo, setGastoFixo] = useState<ReadGastoFixo | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findGastosFixos();
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler gastos fixos",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDadosChange = (novosDados: ReadGastoFixo[]) => {
    setDados(novosDados);
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleGastoFixoChange = (gastoFixo: ReadGastoFixo | null) => {
    setGastoFixo(gastoFixo);
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
              Gastos Fixos
            </h1>
            <p className="text-gray-600">
              Gerencie os gastos fixos mensais da sua confeitaria
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar gastos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FormularioGastosFixos
              dados={dados}
              isDialogOpen={isDialogOpen}
              gastoFixo={gastoFixo}
              onDadosChange={handleDadosChange}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onGastoFixoChange={handleGastoFixoChange}
            />
          </div>

          {/* Gastos Fixos Table */}
          <TabelaGastosFixos
            dados={dados}
            searchTerm={searchTerm}
            onDadosChange={handleDadosChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onGastoFixoChange={handleGastoFixoChange}
          />
        </div>
      </main>
    </div>
  );
}
