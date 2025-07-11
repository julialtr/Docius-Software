"use client";

import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";

import { ReadProduto } from "./interfaces";
import AlertaExclusao from "./AlertaExclusao";
import DetalhesProdutoReceita from "./DetalhesProdutoReceita";

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
import { ImageViewer } from "@/app/_components/ImageViewer";

import { requestSort, SortConfig, sortData } from "@/utils/sort";
import { formatMoney } from "@/utils/format";
import { LINK_API } from "@/utils/constants";

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
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
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

  const toggleProdutoExpand = (id: number) => {
    setProdutoId(produtoId === id ? null : id);
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
            <TableHead className="w-[50px]" />
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
            <React.Fragment key={produto.id}>
              <TableRow>
                <TableCell>
                  {produto.receita && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleProdutoExpand(produto.id)}
                    >
                      {produtoId === produto.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {produto.caminhoFoto && (
                      <div
                        className="h-10 w-10 rounded-md overflow-hidden cursor-pointer border border-gray-200"
                        onClick={() =>
                          setImagemSelecionada(`${LINK_API}${produto.caminhoFoto}` || null)
                        }
                      >
                        <img
                          src={
                            `${LINK_API}${produto.caminhoFoto}` ||
                            "/placeholder.svg"
                          }
                          alt={produto.nome}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium">{produto.nome}</span>
                  </div>
                </TableCell>
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
              <DetalhesProdutoReceita produtoId={produtoId} produto={produto} />
              {imagemSelecionada && (
                <ImageViewer
                  imagens={[imagemSelecionada]}
                  isOpen={!!imagemSelecionada}
                  onClose={() => setImagemSelecionada(null)}
                />
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
