"use client";

import type React from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Pencil,
} from "lucide-react";

import { ReadProduto } from "./interfaces";
import AlertaExclusao from "./AlertaExclusao";
import DetalhesReceitaProduto from "./DetalhesReceitaProduto";

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
import { formatMoney } from "@/utils/format";

export default function TabelaProdutos({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onProdutoChange,
}: {
  dados: ReadProduto[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadProduto[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onProdutoChange: (produto: ReadProduto) => void;
}) {
  const [sortConfig, setSortConfig] = useState<SortConfig<ReadProduto>>(null);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(
    null
  );

  const dadosFiltrados = sortData(
    dados?.filter(
      (item) =>
        item?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.receita?.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  const toggleProductExpand = (id: number) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  const handleEdit = (produto: ReadProduto) => {
    onProdutoChange(produto);
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
                <SortIcon<ReadProduto>
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
                <SortIcon<ReadProduto>
                  columnKey="preco"
                  sortConfig={sortConfig}
                />
              </Button>
            </TableHead>

            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortConfig(requestSort("receita", sortConfig))
                }
                className="hover:bg-transparent p-0 font-semibold flex items-center"
              >
                Receita
                <SortIcon<ReadProduto>
                  columnKey="receita"
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
          {dadosFiltrados?.map((produto) => (
            <>
              <TableRow key={produto.id}>
                <TableCell>
                  {produto.receita && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleProductExpand(produto.id)}
                    >
                      {expandedProductId === produto.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </TableCell>
                <TableCell className="font-medium">{produto.nome}</TableCell>
                <TableCell>{formatMoney(produto.preco)}</TableCell>
                <TableCell>
                  {produto.receita ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200"
                    >
                      {produto.receita.nome}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 text-sm">Nenhuma</span>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-amber-700 hover:text-amber-900"
                      onClick={() => handleEdit(produto)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertaExclusao
                      dados={dados}
                      produto={produto}
                      onDadosChange={onDadosChange}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <DetalhesReceitaProduto
                expandedProductId={expandedProductId}
                produto={produto}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
