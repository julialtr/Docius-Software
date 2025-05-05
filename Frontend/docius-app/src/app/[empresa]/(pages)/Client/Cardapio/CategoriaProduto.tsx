"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Produto } from "./Produto";
import { ReadCategoriaProduto } from "../../Admin/Cadastros/Cardapio/(CategoriaProduto)/interfaces";

import { Button } from "@/app/_components/ui/button";

export function CategoriaProduto({
  categoria,
  nivel = 0,
}: {
  categoria: ReadCategoriaProduto;
  nivel: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const possuiCategoriaInferior =
    categoria.categoriaProdutoInferior &&
    categoria.categoriaProdutoInferior.length > 0;

  const possuiProduto = categoria.produto && categoria.produto.length > 0;

  const paddingLeft = nivel > 0 ? `${nivel * 1}rem` : "0";

  return (
    <div className="mb-6">
      <div
        className="mb-4 flex items-center justify-between border-l-4 border-amber-500 pl-3"
        style={{ marginLeft: paddingLeft }}
      >
        <h2
          className={`font-bold text-amber-900 ${
            nivel === 0 ? "text-2xl" : "text-xl"
          }`}
        >
          {categoria.nome}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-700 hover:bg-amber-50 hover:text-amber-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" />
              Recolher
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" />
              Expandir
            </>
          )}
        </Button>
      </div>

      {isOpen && (
        <>
          {possuiProduto && (
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ marginLeft: paddingLeft }}
            >
              {categoria.produto.map((produto) => (
                <Produto key={produto.id} produto={produto} />
              ))}
            </div>
          )}

          {possuiCategoriaInferior && (
            <div className="mt-4 space-y-6">
              {categoria.categoriaProdutoInferior &&
                categoria.categoriaProdutoInferior.map((categoriaInferior) => (
                  <CategoriaProduto
                    key={categoriaInferior.id}
                    categoria={categoriaInferior}
                    nivel={nivel + 1}
                  />
                ))}
            </div>
          )}

          {!possuiProduto && !possuiCategoriaInferior && (
            <div
              className="py-4 text-center text-gray-500"
              style={{ marginLeft: paddingLeft }}
            >
              Nenhum produto disponível nesta categoria.
            </div>
          )}
        </>
      )}
    </div>
  );
}
