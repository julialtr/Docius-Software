"use client";

import type React from "react";
import { X } from "lucide-react";

import { ReadReceita } from "./interfaces";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";

import { Button } from "@/app/_components/ui/button";

import { Badge } from "@/app/_components/ui/badge";

export default function TabelaReceitaIngrediente({
  receita,
  onReceitaChange,
  onIngredienteChange,
}: {
  receita: ReadReceita | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
  onIngredienteChange: (
    ingrediente: ReadReceitaCategoriaIngrediente | null
  ) => void;
}) {
  const removerIngrediente = (ingredienteId: number) => {
    if (!receita) return;

    const novaListaIngredientes = receita.ingredientes.filter(
      (ingrediente) => ingrediente.id !== ingredienteId
    );

    onReceitaChange({ ...receita, ingredientes: novaListaIngredientes });

    onIngredienteChange(null);
  };

  const handleClickIngrediente = (
    ingrediente: ReadReceitaCategoriaIngrediente
  ) => {
    onIngredienteChange(ingrediente);
  };

  return (
    <div className="mb-6">
      <div className="bg-gray-50 rounded-md border p-4">
        {receita && receita?.ingredientes?.length > 0 ? (
          <div className="space-y-2">
            {receita?.ingredientes.map((ingrediente) => (
              <div
                key={ingrediente.id}
                className="flex items-center justify-between bg-white p-3 rounded-md border"
                onClick={() => handleClickIngrediente(ingrediente)}
              >
                <div className="font-medium">
                  {ingrediente.categoriaIngrediente.nome}
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-amber-50">
                    {ingrediente.medida} {ingrediente.unidadeMedida.sigla}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                    onClick={() => removerIngrediente(ingrediente.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            Nenhum ingrediente adicionado. Adicione ingredientes abaixo.
          </div>
        )}
      </div>
    </div>
  );
}
