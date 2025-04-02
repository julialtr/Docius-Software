"use client";

import type React from "react";
import { useState } from "react";
import { Pencil } from "lucide-react";

import { ReadWebScrapingDados } from "./interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge";
import SortIcon from "@/app/_components/Sort";

import { requestSort, SortConfig, sortData } from "@/utils/sort";
import { formatMoney } from "@/utils/format";
import AlertaExclusao from "./AlertaExclusao";

export default function TabelaResultados({
  dados,
  searchTerm,
  onDadosChange,
  onCotacaoChange,
  onIsDialogOpenChange,
}: {
  dados: ReadWebScrapingDados[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadWebScrapingDados[]) => void;
  onCotacaoChange: (novosDados: ReadWebScrapingDados | null) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
}) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadWebScrapingDados>>(null);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.fornecedor?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const handleOpenDialog = (cotacao: ReadWebScrapingDados) => {
    onCotacaoChange(cotacao);
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
                <SortIcon<ReadWebScrapingDados>
                  columnKey="nome"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("preco", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Preço
                <SortIcon<ReadWebScrapingDados>
                  columnKey="preco"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("fornecedor", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Fornecedor
                <SortIcon<ReadWebScrapingDados>
                  columnKey="fornecedor"
                  sortConfig={sortConfig}
                />{" "}
              </Button>
            </TableHead>
            <TableHead className="w-[100px] hover:bg-transparent p-0 font-semibold flex items-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosFiltrados.map((cotacao) => (
            <TableRow
              key={cotacao.id}
              className={cotacao.automatica ? "" : "bg-amber-50/30"}
            >
              <TableCell className="font-medium">
                {cotacao.nome}
                {cotacao.automatica === false && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Manual
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-medium text-green-700">
                {formatMoney(cotacao.preco)}
              </TableCell>
              <TableCell>{cotacao.fornecedor?.nome}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-700 hover:text-amber-900"
                    onClick={() => handleOpenDialog(cotacao)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertaExclusao
                    dados={dados}
                    cotacao={cotacao}
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
