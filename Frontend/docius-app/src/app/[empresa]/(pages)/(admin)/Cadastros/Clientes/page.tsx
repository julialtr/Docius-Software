"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { ReadUsuarioPedidos } from "./interfaces";
import { findUsuarios } from "@/services/usuario";

import { Input } from "@/app/_components/ui/input";
import Menu from "@/app/_components/Menu";
import Loading from "@/app/loading";

import { Warning } from "@/hooks/warning";
import { useToast } from "@/hooks/use-toast";
import TabelaClientes from "./TabelaClientes";

export default function CadastroClientes() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadUsuarioPedidos[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findUsuarios();
        setDados(response);
      } catch (error) {
        if (error instanceof Warning) {
          console.log(error);

          toast({
            variant: "warning",
            title: "Erro ao ler clientes",
            description: error.message,
          });
        } else if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler clientes",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Menu />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h1>
            <p className="text-gray-600">
              Gerencie os clientes cadastrados no sistema
            </p>
          </div>

          {/* Search and Actions */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Clients Table */}
          <TabelaClientes dados={dados} searchTerm={searchTerm} />
        </div>
      </main>
    </div>
  );
}
