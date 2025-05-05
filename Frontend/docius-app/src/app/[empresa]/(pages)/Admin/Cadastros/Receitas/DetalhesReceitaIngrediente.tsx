"use client";

import type React from "react";

import { ReadReceita } from "./interfaces";

import { TableCell, TableRow } from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function DetalhesReceitaCategoriaIngrediente({
  receitaId,
  receita,
}: {
  receitaId: number | null;
  receita: ReadReceita;
}) {
  return (
    receitaId === receita.id &&
    receita.receitaCategoriaIngrediente && (
      <TableRow>
        <TableCell colSpan={6} className="p-0 border-t-0">
          <div className="bg-amber-50/50 p-4">
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Categorias de ingredientes da receita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {receita.receitaCategoriaIngrediente.map(
                    (receitaCategoriaIngrediente) => {
                      return (
                        <div
                          key={receitaCategoriaIngrediente.id}
                          className="flex items-center justify-between bg-white p-3 rounded-md border"
                        >
                          <div className="font-medium">
                            {
                              receitaCategoriaIngrediente?.categoriaIngrediente
                                ?.nome
                            }
                          </div>
                          <Badge variant="outline" className="bg-amber-50">
                            {receitaCategoriaIngrediente.medida}{" "}
                            {receitaCategoriaIngrediente.unidadeMedida?.sigla}
                          </Badge>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TableCell>
      </TableRow>
    )
  );
}
