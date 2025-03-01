"use client";

import type React from "react";
import { useState } from "react";
import { Globe, MapPin, Pencil } from "lucide-react";
import Link from "next/link";

import { ReadFornecedores } from "./interfaces";
import AlertaExclusao from "./AlertaExclusao";

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

export default function TabelaFornecedores({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onFornecedorChange,
}: {
  dados: ReadFornecedores[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadFornecedores[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onFornecedorChange: (fornecedor: ReadFornecedores) => void;
}) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadFornecedores>>(null);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.endereco?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.site?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const handleEdit = (fornecedor: ReadFornecedores) => {
    onFornecedorChange(fornecedor);
    onIsDialogOpenChange(true);
  };

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
                <SortIcon<ReadFornecedores>
                  columnKey="nome"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("endereco", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Endereço
                <SortIcon<ReadFornecedores>
                  columnKey="endereco"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("site", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Site
                <SortIcon<ReadFornecedores>
                  columnKey="site"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead className="w-[100px] hover:bg-transparent p-0 font-semibold flex items-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosFiltrados?.map((fornecedor) => (
            <TableRow key={fornecedor.id}>
              <TableCell className="font-medium">{fornecedor.nome}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {fornecedor.endereco.length ? (
                    <MapPin className="h-4 w-4 text-gray-500" />
                  ) : null}
                  {fornecedor.endereco}
                </div>
              </TableCell>
              <TableCell>
                <Link
                  href={fornecedor.site}
                  target="_blank"
                  className="flex items-center gap-1 text-amber-700 hover:text-amber-900"
                >
                  {fornecedor.site.length ? (
                    <Globe className="h-4 w-4" />
                  ) : null}
                  {fornecedor.site}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-700 hover:text-amber-900"
                    onClick={() => handleEdit(fornecedor)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertaExclusao
                    dados={dados}
                    id={fornecedor.id}
                    onDadosChange={onDadosChange}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
