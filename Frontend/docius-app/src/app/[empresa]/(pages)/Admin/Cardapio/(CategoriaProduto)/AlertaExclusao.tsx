"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadCategoriaProduto } from "./interfaces";
import { ReadCardapio } from "../interfaces";

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
  categoria,
  onDadosChange,
}: {
  dados: ReadCardapio;
  categoria: ReadCategoriaProduto;
  onDadosChange: (novosDados: ReadCardapio) => void;
}) {
  const { toast } = useToast();

  const updateCardapio = (
    categorias: ReadCategoriaProduto[],
    id: number,
    parentId: number
  ): ReadCategoriaProduto[] => {
    let categoriaRemovida = false;

    const novaLista = categorias.map((categoria) => {
      if (categoria.id === parentId) {
        categoriaRemovida = true;
        return {
          ...categoria,
          categoriaProdutoInferior: categoria.categoriaProdutoInferior.filter(
            (sub) => sub.id !== id
          ),
        };
      }

      if (!categoriaRemovida) {
        const novaCategoriaInferior = updateCardapio(
          categoria.categoriaProdutoInferior,
          id,
          parentId
        );

        if (novaCategoriaInferior !== categoria.categoriaProdutoInferior) {
          categoriaRemovida = true;
          return {
            ...categoria,
            categoriaProdutoInferior: novaCategoriaInferior,
          };
        }
      }

      return categoria;
    });

    return novaLista;
  };

  const handleDelete = (id: number) => {
    let novoCardapio: ReadCardapio;

    if (!categoria.categoriaProdutoSuperiorId) {
      novoCardapio = {
        ...dados,
        categoriaProduto: dados.categoriaProduto.filter((cat) => cat.id !== id),
      };
    } else {
      novoCardapio = {
        ...dados,
        categoriaProduto: [
          ...updateCardapio(
            dados.categoriaProduto,
            id,
            categoria.categoriaProdutoSuperiorId
          ),
        ],
      };
    }

    onDadosChange(novoCardapio);

    toast({
      title: "Categoria removida",
      description: "A categoria foi removida com sucesso.",
      variant: "success",
    });
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
            Tem certeza que deseja excluir a categoria? Esta ação não pode ser
            desfeita e também removerá todas as subcategorias e produtos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              handleDelete(categoria.id);
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
