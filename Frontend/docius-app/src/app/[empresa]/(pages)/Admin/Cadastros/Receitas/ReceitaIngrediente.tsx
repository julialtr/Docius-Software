"use client";

import type React from "react";

import { ReadReceita } from "./interfaces";

import TabelaReceitaIngrediente from "./TabelaReceitaIngrediente";
import FormularioReceitaIngrediente from "./FormularioReceitaIngrediente";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";
import { useState } from "react";

export default function ReceitaIngrediente({
  receita,
  onReceitaChange,
}: {
  receita: ReadReceita | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
}) {
  const [ingrediente, setIngrediente] =
    useState<ReadReceitaCategoriaIngrediente | null>(null);

  const handleIngredienteChange = (
    ingrediente: ReadReceitaCategoriaIngrediente | null
  ) => {
    setIngrediente(ingrediente);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Ingredientes</h3>
      <TabelaReceitaIngrediente
        receita={receita}
        onReceitaChange={onReceitaChange}
        onIngredienteChange={handleIngredienteChange}
        />
      <FormularioReceitaIngrediente
        receita={receita}
        ingrediente={ingrediente}
        onReceitaChange={onReceitaChange}
        onIngredienteChange={handleIngredienteChange}
      />
    </div>
  );
}
