"use client";

import type React from "react";

import { ReadCardapio } from "./interfaces";
import { ReadCategoriaProduto } from "./(CategoriaProduto)/interfaces";
import AlertaExclusao from "./(Produto)/AlertaExclusao";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { formatMoney } from "@/utils/format";
import { LINK_API } from "@/utils/constants";

export default function ListaItens({
  dados,
  categoria,
  onDadosChange,
}: {
  dados: ReadCardapio;
  categoria: ReadCategoriaProduto | null;
  onDadosChange: (novoDado: ReadCardapio) => void;
}) {
  return (
    categoria &&
    categoria.produto.length > 0 && (
      <div className="space-y-3">
        {categoria.produto.map((produto) => (
          <Card key={produto.id} className="border-l-4 border-l-amber-400">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{produto.nome}</CardTitle>
                <AlertaExclusao
                  dados={dados}
                  produto={produto}
                  onDadosChange={onDadosChange}
                />
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-start gap-4">
                <div
                  className={
                    "relative overflow-hidden rounded-md group w-20 h-20 flex-shrink-0"
                  }
                >
                  <img
                    src={
                      produto.caminhoFoto
                        ? `${LINK_API}${produto.caminhoFoto}`
                        : "/assets/produto-sem-imagem.png"
                    }
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="py-3">
              <CardDescription>
                <div className="flex items-center text-green-700 font-medium">
                  {formatMoney(produto.preco)}
                </div>
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  );
}
