"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { ReadUsuarioPedidos } from "./interfaces";
import { findUsuarios } from "@/services/usuario";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Menu from "@/app/_components/Menu";
import SortIcon from "@/app/_components/Sort";
import Loading from "@/app/loading";

import { requestSort, SortConfig, sortData } from "@/utils/sort";

import { Warning } from "@/hooks/warning";
import { useToast } from "@/hooks/use-toast";

export default function CadastroClientes() {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadUsuarioPedidos[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadUsuarioPedidos>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

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
            title: "Erro ao ler o cadastro de clientes",
            description: error.message,
          });
        } else if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler o cadastro de clientes",
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
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("nome", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Nome
                      <SortIcon<ReadUsuarioPedidos>
                        columnKey="nome"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("email", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Email
                      <SortIcon<ReadUsuarioPedidos>
                        columnKey="email"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("qtdPedidos", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center justify-end ml-auto"
                    >
                      Quantidade de Pedidos
                      <SortIcon<ReadUsuarioPedidos>
                        columnKey="qtdPedidos"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosFiltrados?.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {cliente.nome}
                    </TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell className="text-right">
                      {cliente.qtdPedidos}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
