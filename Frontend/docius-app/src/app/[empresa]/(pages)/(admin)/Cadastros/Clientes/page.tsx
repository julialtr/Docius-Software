"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";

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
import { requestSort, SortConfig, sortData } from "@/utils/sort";
import SortIcon from "@/app/_components/Sort";
import { ReadUsuarioPedidos } from "./interfaces";
import Loading from "@/app/loading";

// Dados mockados para exemplo
const clientesData = [
  { id: 1, nome: "Maria Silva", email: "maria@email.com", qtdPedidos: 15 },
  { id: 2, nome: "João Santos", email: "joao@email.com", qtdPedidos: 8 },
  { id: 3, nome: "Ana Oliveira", email: "ana@email.com", qtdPedidos: 23 },
  { id: 4, nome: "Pedro Costa", email: "pedro@email.com", qtdPedidos: 5 },
  { id: 5, nome: "Lucia Pereira", email: "lucia@email.com", qtdPedidos: 12 },
  { id: 6, nome: "Carlos Souza", email: "carlos@email.com", qtdPedidos: 19 },
  { id: 7, nome: "Julia Lima", email: "julia@email.com", qtdPedidos: 7 },
  { id: 8, nome: "Roberto Alves", email: "roberto@email.com", qtdPedidos: 31 },
];


export default function CadastroClientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<ReadUsuarioPedidos>>(null);
  const [isLoading, setIsLoading] = useState(false);

  //const [dados, setDados] = useState<ReadUsuarioPedidos>({
  //  id: 0,
  //  nome: "",
  //  email: "",
  //  qtdPedidos: 0,
  //});

  const dadosFiltrados = sortData(
    clientesData.filter(
      (item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  //useEffect(() => {
  //  const loginOnLoad = async () => {
  //    setIsLoading(true);
//
  //    try {
  //      const response = await login(dados);
  //      localStorage.setItem("token", response.token);
  //    } catch (error) {
  //      if (error instanceof Warning) {
  //        console.log(error);
//
  //        toast({
  //          variant: "warning",
  //          title: "Erro ao fazer login",
  //          description: error.message,
  //        });
  //      } else if (error instanceof Error) {
  //        console.error(error);
//
  //        toast({
  //          variant: "destructive",
  //          title: "Erro ao fazer login",
  //          description: error.message,
  //        });
  //      }
  //    } finally {
  //      setIsLoading(false);
  //    }
  //  };
//
  //  loginOnLoad();
  //}, []); // O array vazio faz com que o useEffect rode apenas uma vez

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
                {dadosFiltrados.map((cliente) => (
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
