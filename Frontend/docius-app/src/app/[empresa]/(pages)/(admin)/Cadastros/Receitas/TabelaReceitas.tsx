"use client";

import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Pencil,
} from "lucide-react";

import { ReadReceita } from "./interfaces";
import AlertaExclusao from "./AlertaExclusao";
import DetalhesReceitaIngrediente from "./DetalhesReceitaIngrediente";

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

export default function TabelaReceitas({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onReceitaChange,
}: {
  dados: ReadReceita[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadReceita[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onReceitaChange: (receita: ReadReceita) => void;
}) {
  const [sortConfig, setSortConfig] = useState<SortConfig<ReadReceita>>(null);
  const [receitaId, setReceitaId] = useState<number | null>(null);

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const toggleReceitaExpand = (id: number) => {
    setReceitaId(receitaId === id ? null : id);
  };

  const handleEdit = (receita: ReadReceita) => {
    onReceitaChange(receita);
    onIsDialogOpenChange(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]" />
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("nome", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Nome
                <SortIcon<ReadReceita>
                  columnKey="nome"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("descricao", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Descrição
                <SortIcon<ReadReceita>
                  columnKey="descricao"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortConfig(requestSort("tempo", sortConfig))}
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Tempo
                <SortIcon<ReadReceita>
                  columnKey="tempo"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("qtdPorcoes", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Rendimento
                <SortIcon<ReadReceita>
                  columnKey="qtdPorcoes"
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
          {dadosFiltrados?.map((receita) => (
            <React.Fragment key={receita.id}>
              <TableRow>
                <TableCell>
                  {receita.receitaCategoriaIngrediente.length ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleReceitaExpand(receita.id)}
                    >
                      {receitaId === receita.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">{receita.nome}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {receita.descricao}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-amber-600" />
                    {new Date(`1970-01-01T${receita.tempo}`).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {receita.qtdPorcoes}{" "}
                  {receita.qtdPorcoes > 1
                    ? "porções"
                    : receita.qtdPorcoes == 0
                    ? "0"
                    : "porção"}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-amber-700 hover:text-amber-900"
                      onClick={() => handleEdit(receita)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertaExclusao
                      dados={dados}
                      receita={receita}
                      onDadosChange={onDadosChange}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <DetalhesReceitaIngrediente
                receitaId={receitaId}
                receita={receita}
              />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
