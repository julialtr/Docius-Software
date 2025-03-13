"use client";

import type React from "react";
import { Clock, ShoppingCart, Tag } from "lucide-react";

import { ReadProduto } from "./interfaces";

import { TableCell, TableRow } from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function DetalhesProdutoReceita({
  produtoId,
  produto,
}: {
  produtoId: number | null;
  produto: ReadProduto;
}) {
  return (
    produtoId === produto.id &&
    produto.receita && (
      <TableRow>
        <TableCell colSpan={5} className="p-0 border-t-0">
          <div className="bg-amber-50/50 p-4">
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {produto.receita.nome}
                </CardTitle>
                <CardDescription>{produto.receita.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">
                      <span className="font-medium">Tempo de Preparo:</span>{" "}
                      {produto.receita.tempo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">
                      <span className="font-medium">Rendimento:</span>{" "}
                      {produto.receita.qtdPorcoes} {produto.receita.qtdPorcoes}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-1">
                    <Tag className="h-4 w-4 text-amber-600" />
                    Ingredientes
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {produto.receita.ingredientes.map((ingrediente) => {
                      return (
                        <div
                          key={ingrediente.id}
                          className="flex items-center justify-between p-2 bg-white rounded border border-amber-100"
                        >
                          <span className="font-medium">
                            {ingrediente?.categoriaIngrediente.nome}
                          </span>
                          <Badge variant="outline" className="bg-amber-50">
                            {ingrediente.medida}{" "}
                            {ingrediente.unidadeMedida.sigla}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TableCell>
      </TableRow>
    )
  );
}
