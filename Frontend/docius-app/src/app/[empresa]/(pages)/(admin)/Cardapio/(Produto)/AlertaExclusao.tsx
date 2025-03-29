"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadCategoriaProduto } from "../(CategoriaProduto)/interfaces";
import { ReadCardapio } from "../interfaces";
import { ReadProduto } from "../../Cadastros/Produtos/interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import { useToast } from "@/hooks/use-toast";

export default function AlertaExclusao({
  dados,
  produto,
  onDadosChange,
}: {
  dados: ReadCardapio;
  produto: ReadProduto;
  onDadosChange: (novosDados: ReadCardapio) => void;
}) {
  const { toast } = useToast();

  const updateCardapio = (
    categorias: ReadCategoriaProduto[],
    id: number,
    parentId: number
  ): ReadCategoriaProduto[] => {
    return categorias.map((categoria) => {
      if (categoria.id === parentId) {
        return {
          ...categoria,
          produto: categoria.produto.filter((item) => item.id !== id),
        };
      }

      return {
        ...categoria,
        categoriaProdutoInferior: updateCardapio(
          categoria.categoriaProdutoInferior,
          id,
          parentId
        ),
      };
    });
  };

  const findParentCategoria = (
    categorias: ReadCategoriaProduto[],
    id: number
  ): ReadCategoriaProduto | null => {
    for (const categoria of categorias) {
      const itemFound = categoria.produto.find((item) => item.id === id);
      if (itemFound) {
        return categoria;
      }

      const found = findParentCategoria(categoria.categoriaProdutoInferior, id);
      if (found) {
        return found;
      }
    }
    return null;
  };

  const handleDelete = (id: number) => {
    const parentCategoria = findParentCategoria(dados.categoriaProduto, id);

    if (parentCategoria) {
      onDadosChange({
        ...dados,
        categoriaProduto: updateCardapio(
          dados.categoriaProduto,
          id,
          parentCategoria.id
        ),
      });

      toast({
        title: "Produto removido",
        description: "O produto foi removido com sucesso.",
        variant: "success",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-700 hover:text-red-900"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover o produto do cardápio? Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              handleDelete(produto.id);
              e.stopPropagation();
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
