"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadMensagem } from "./interfaces";

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

import { useDadosChatbot } from "@/context/DadosChatbotContext";

export default function AlertaExclusao({
  floatingChat,
  desabilitado,
  onDadosChange,
}: {
  floatingChat: boolean;
  desabilitado: boolean;
  onDadosChange: (novosDados: ReadMensagem[]) => void;
}) {
  const { criaThread, deletaThread } = useDadosChatbot();

  const handleDelete = async () => {
    deletaThread();
    criaThread();
    onDadosChange([]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="h-10 shrink-0" disabled={desabilitado}>
          <Trash2 className="h-5 w-5 " />
          <span className={floatingChat ? "sr-only" : ""}>Limpar conversa</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o histórico da conversa? Esta ação
            não pode ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() => handleDelete()}
            className="bg-red-600 hover:bg-red-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
