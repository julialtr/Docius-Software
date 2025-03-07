"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadGastoFixo } from "../GastosFixos/interfaces";
import { deleteGastoFixo } from "@/services/gastoFixo";

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
  gastoFixo,
  onDadosChange,
}: {
  dados: ReadGastoFixo[];
  gastoFixo: ReadGastoFixo;
  onDadosChange: (novosDados: ReadGastoFixo[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteGastoFixo(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Gasto fixo excluído",
        description: "O gasto fixo foi excluído com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao excluir gasto fixo",
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
            Tem certeza que deseja excluir o gastoFixo? Esta ação não pode ser
            desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(gastoFixo.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
