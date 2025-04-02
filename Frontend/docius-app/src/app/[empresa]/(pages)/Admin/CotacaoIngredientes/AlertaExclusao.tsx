"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadWebScrapingDados } from "./interfaces";

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
  cotacao,
  onDadosChange,
}: {
  dados: ReadWebScrapingDados[];
  cotacao: ReadWebScrapingDados;
  onDadosChange: (novosDados: ReadWebScrapingDados[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    onDadosChange(dados.filter((c) => c.id !== id));
    toast({
      title: "Cotação removida",
      description: "A cotação foi removida com sucesso.",
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
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta cotação? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(cotacao.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
