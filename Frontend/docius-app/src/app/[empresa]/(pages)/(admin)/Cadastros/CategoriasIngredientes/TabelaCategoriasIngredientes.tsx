"use client";

import type React from "react";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { TabelaIngredientes } from "./TabelaIngredientes";
import AlertaExclusao from "./AlertaExclusao";
import { ReadCategoriaIngrediente } from "./interfaces";

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
import { Badge } from "@/app/_components/ui/badge";

import { requestSort, SortConfig, sortData } from "@/utils/sort";

export default function TabelaCategoriasIngredientes({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onCategoriaChange,
}: {
  dados: ReadCategoriaIngrediente[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadCategoriaIngrediente[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onCategoriaChange: (categoria: ReadCategoriaIngrediente) => void;
}) {
  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadCategoriaIngrediente>>(null);

  const dadosFiltrados = sortData(
    dados?.filter((item) =>
      item?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const handleEdit = (categoria: ReadCategoriaIngrediente) => {
    onCategoriaChange(categoria);
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
                <SortIcon<ReadCategoriaIngrediente>
                  columnKey="nome"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("qtdIngredientes", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Quantidade de Ingredientes
                <SortIcon<ReadCategoriaIngrediente>
                  columnKey="qtdIngredientes"
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
          {dadosFiltrados?.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell className="font-medium">{categoria.nome}</TableCell>
              <TableCell>
                {categoria.ingredientes?.length ? (
                  <Badge variant="secondary">
                    {categoria.ingredientes?.length} ingrediente(s)
                  </Badge>
                ) : 0}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <TabelaIngredientes categoria={categoria} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-amber-700 hover:text-amber-900"
                    onClick={() => handleEdit(categoria)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertaExclusao
                    dados={dados}
                    categoria={categoria}
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
