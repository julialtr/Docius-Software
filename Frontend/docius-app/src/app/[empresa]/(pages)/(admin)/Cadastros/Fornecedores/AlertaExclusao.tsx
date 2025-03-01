"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadFornecedores } from "./interfaces";
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
import { Warning } from "@/hooks/warning";

export default function AlertaExclusao({
  dados,
  id,
  onDadosChange,
}: {
  dados: ReadFornecedores[];
  id: number;
  onDadosChange: (novosDados: ReadFornecedores[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteFornecedor(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Fornecedor removido",
        description: "O fornecedor foi removido com sucesso.",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao deletar fornecedor",
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
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o fornecedor? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
