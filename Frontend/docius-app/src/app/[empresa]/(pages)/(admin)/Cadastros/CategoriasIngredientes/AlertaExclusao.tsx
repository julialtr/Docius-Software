"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadCategoriaIngrediente } from "./interfaces";
import { deleteCategoriaIngrediente } from "@/services/categoriaIngrediente";

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
  dados: ReadCategoriaIngrediente[];
  categoria: ReadCategoriaIngrediente;
  onDadosChange: (novosDados: ReadCategoriaIngrediente[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteCategoriaIngrediente(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Categoria excluída",
        description: "A categoria foi excluída com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao excluir a categoria",
          description: error.message,
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-700 hover:text-red-900"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {categoria?.qtdIngredientes
              ? "Aviso exclusão"
              : "Confirmar exclusão"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {categoria?.qtdIngredientes
              ? "Não é possível excluir uma categoria com ingredientes vinculados"
              : "Tem certeza que deseja excluir a categoria? Esta ação não pode ser desfeita"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(categoria.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
