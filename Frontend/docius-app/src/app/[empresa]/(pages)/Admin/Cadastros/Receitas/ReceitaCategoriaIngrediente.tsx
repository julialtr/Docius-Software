"use client";

import type React from "react";
import { useState } from "react";

import { ReadReceita } from "./interfaces";

import TabelaReceitaCategoriaIngrediente from "./TabelaReceitaCategoriaIngrediente";
import FormularioReceitaCategoriaIngrediente from "./FormularioReceitaCategoriaIngrediente";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";

export default function ReceitaCategoriaIngrediente({
  receita,
  onReceitaChange,
}: {
  receita: ReadReceita | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
}) {
  const [categoriaIngrediente, setCategoriaIngrediente] =
    useState<ReadReceitaCategoriaIngrediente | null>(null);

  const handleCategoriaIngredienteChange = (
    categoriaIngrediente: ReadReceitaCategoriaIngrediente | null
  ) => {
    setCategoriaIngrediente(categoriaIngrediente);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Categorias de ingredientes</h3>
      <TabelaReceitaCategoriaIngrediente
        receita={receita}
        onReceitaChange={onReceitaChange}
        onCategoriaIngredienteChange={handleCategoriaIngredienteChange}
        />
      <FormularioReceitaCategoriaIngrediente
        receita={receita}
        categoriaIngrediente={categoriaIngrediente}
        onReceitaChange={onReceitaChange}
        onCategoriaIngredienteChange={handleCategoriaIngredienteChange}
      />
    </div>
  );
}
