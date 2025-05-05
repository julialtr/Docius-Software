"use client";

import type React from "react";
import { X } from "lucide-react";

import { ReadReceita } from "./interfaces";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";

import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";

export default function TabelaReceitaCategoriaIngrediente({
  receita,
  onReceitaChange,
  onCategoriaIngredienteChange,
}: {
  receita: ReadReceita | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
  onCategoriaIngredienteChange: (
    categoriaIngrediente: ReadReceitaCategoriaIngrediente | null
  ) => void;
}) {
  const removerCategoriaIngrediente = (categoriaIngredienteId: number) => {
    if (!receita) return;

    const novaListaCategoriasIngredientes =
      receita.receitaCategoriaIngrediente.filter(
        (categoriaIngrediente) =>
          categoriaIngrediente.id !== categoriaIngredienteId
      );

    onReceitaChange({
      ...receita,
      receitaCategoriaIngrediente: novaListaCategoriasIngredientes,
    });

    onCategoriaIngredienteChange(null);
  };

  const handleClickCategoriaIngrediente = (
    categoriaIngrediente: ReadReceitaCategoriaIngrediente
  ) => {
    onCategoriaIngredienteChange(categoriaIngrediente);
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-50 rounded-md border p-4">
        {receita && receita?.receitaCategoriaIngrediente?.length > 0 ? (
          <div className="space-y-2">
            {receita?.receitaCategoriaIngrediente.map(
              (receitaCategoriaIngrediente) => (
                <div
                  key={receitaCategoriaIngrediente.id}
                  className="flex items-center justify-between bg-white p-3 rounded-md border"
                  onClick={() =>
                    handleClickCategoriaIngrediente(receitaCategoriaIngrediente)
                  }
                >
                  <div className="font-medium">
                    {receitaCategoriaIngrediente.categoriaIngrediente.nome}
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-amber-50">
                      {receitaCategoriaIngrediente.medida}{" "}
                      {receitaCategoriaIngrediente.unidadeMedida.sigla}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        removerCategoriaIngrediente(
                          receitaCategoriaIngrediente.id
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            Nenhuma categoria de ingrediente adicionada. Adicione categorias de
            ingredientes abaixo.
          </div>
        )}
      </div>
    </div>
  );
}
