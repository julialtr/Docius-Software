"use client";

import type React from "react";
import { useState } from "react";
import { ExternalLink, Pencil, Scale, Tag } from "lucide-react";
import Link from "next/link";

import { ReadIngrediente } from "./interfaces";
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
import { formatMoney } from "@/utils/format";

export default function TabelaIngredientes({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onIngredienteChange,
}: {
  dados: ReadIngrediente[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadIngrediente[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onIngredienteChange: (ingrediente: ReadIngrediente) => void;
}) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadIngrediente>>(null);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.fornecedor?.nome
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item?.categoriaIngrediente?.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const handleEdit = (ingrediente: ReadIngrediente) => {
    onIngredienteChange(ingrediente);
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
                onClick={() =>
                  setSortConfig(requestSort("categoriaIngrediente", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Categoria
                <SortIcon<ReadIngrediente>
                  columnKey="categoriaIngrediente"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("nome", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Nome
                <SortIcon<ReadIngrediente>
                  columnKey="nome"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("marca", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Marca
                <SortIcon<ReadIngrediente>
                  columnKey="marca"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("medida", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Medida
                <SortIcon<ReadIngrediente>
                  columnKey="medida"
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
                <SortIcon<ReadIngrediente>
                  columnKey="preco"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("quantidade", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Quantidade
                <SortIcon<ReadIngrediente>
                  columnKey="quantidade"
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
                <SortIcon<ReadIngrediente>
                  columnKey="fornecedor"
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
          {dadosFiltrados?.map((ingrediente) => (
            <TableRow key={ingrediente.id}>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4 text-amber-600" />
                  {ingrediente.categoriaIngrediente?.nome}
                </div>
              </TableCell>
              <TableCell className="font-medium">{ingrediente.nome}</TableCell>
              <TableCell>{ingrediente.marca}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Scale className="h-4 w-4 text-gray-500" />
                  {ingrediente.medida} {ingrediente.unidadeMedida?.sigla}
                </div>
              </TableCell>
              <TableCell>{formatMoney(ingrediente.preco)}</TableCell>
              <TableCell>{ingrediente.quantidade}</TableCell>
              <TableCell>
                {ingrediente.fornecedor?.site ? (
                  <Link
                    href={ingrediente.fornecedor?.site}
                    target="_blank"
                    className="flex items-center gap-1 text-amber-700 hover:text-amber-900"
                  >
                    {ingrediente.fornecedor?.nome}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : (
                  ingrediente.fornecedor?.nome
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-700 hover:text-amber-900"
                    onClick={() => handleEdit(ingrediente)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertaExclusao
                    dados={dados}
                    ingrediente={ingrediente}
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
