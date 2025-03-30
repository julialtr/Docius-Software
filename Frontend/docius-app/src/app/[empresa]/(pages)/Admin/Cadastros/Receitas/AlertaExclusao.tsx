"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadReceita } from "./interfaces";
import { deleteReceita } from "@/services/receita";

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
  receita,
  onDadosChange,
}: {
  dados: ReadReceita[];
  receita: ReadReceita;
  onDadosChange: (novosDados: ReadReceita[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteReceita(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Receita excluída",
        description: "A receita foi excluída com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao excluir receita",
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
            {receita?.qtdProdutos ? "Aviso exclusão" : "Confirmar exclusão"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {receita?.qtdProdutos
              ? "Não é possível excluir uma receita de um produto"
              : "Tem certeza que deseja excluir o receita? Esta ação não pode ser desfeita"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {receita?.qtdProdutos ? null : (
            <AlertDialogAction
              onClick={() => handleDelete(receita.id)}
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
