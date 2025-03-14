"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadFornecedor } from "./interfaces";
import { deleteFornecedor } from "@/services/fornecedor";

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
  fornecedor,
  onDadosChange,
}: {
  dados: ReadFornecedor[];
  fornecedor: ReadFornecedor;
  onDadosChange: (novosDados: ReadFornecedor[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteFornecedor(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Fornecedor excluído",
        description: "O fornecedor foi excluído com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao excluir fornecedor",
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
            {fornecedor?.qtdIngredientes
              ? "Aviso exclusão"
              : "Confirmar exclusão"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {fornecedor?.qtdIngredientes
              ? "Não é possível excluir um fornecedor com ingredientes vinculados"
              : "Tem certeza que deseja excluir o fornecedor? Esta ação não pode ser desfeita"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {fornecedor?.qtdIngredientes ? null : (
            <AlertDialogAction
              onClick={() => handleDelete(fornecedor.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
