"use client";

import type React from "react";
import { useState } from "react";

import { ReadUsuarioPedidos } from "./interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import SortIcon from "@/app/_components/Sort";

import { requestSort, SortConfig, sortData } from "@/utils/sort";

export default function TabelaClientes({
  dados,
  searchTerm,
}: {
  dados: ReadUsuarioPedidos[];
  searchTerm: string;
}) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadUsuarioPedidos>>(null);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("nome", sortConfig))}
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
                onClick={() => setSortConfig(requestSort("email", sortConfig))}
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
              <TableCell className="font-medium">{cliente.nome}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell className="text-right">{cliente.qtdPedidos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
