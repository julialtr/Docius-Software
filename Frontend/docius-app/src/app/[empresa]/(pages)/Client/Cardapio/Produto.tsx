"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { FormularioProduto } from "./FormularioProduto";
import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";

import { formatMoney } from "@/utils/format";

export function Produto({ produto }: { produto: ReadProduto }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-semibold text-lg text-amber-900">
              {produto.nome}
            </h3>
            <span className="font-bold text-amber-700">
              {formatMoney(produto.preco)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>

      <FormularioProduto
        produto={produto}
        isDialogOpen={isDialogOpen}
        onIsDialogOpenChange={setIsDialogOpen}
      />
    </>
  );
}
