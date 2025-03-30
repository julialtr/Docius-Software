"use client";

import type React from "react";
import { Trash2 } from "lucide-react";

import { ReadProduto } from "./interfaces";
import { deleteProduto } from "@/services/produto";

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
  dados: ReadProduto[];
  produto: ReadProduto;
  onDadosChange: (novosDados: ReadProduto[]) => void;
}) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduto(id);
      onDadosChange(dados.filter((f) => f.id !== id));

      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao excluir produto",
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
            {produto?.qtdPedidos || produto?.categoriaProdutoId
              ? "Aviso exclusão"
              : "Confirmar exclusão"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {produto?.qtdPedidos
              ? "Não é possível excluir um produto com pedidos vinculados"
              : produto?.categoriaProdutoId
              ? "Não é possível excluir um produto utilizado no cardápio"
              : "Tem certeza que deseja excluir o produto? Esta ação não pode ser desfeita"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {produto?.qtdPedidos || produto?.categoriaProdutoId ? null : (
            <AlertDialogAction
              onClick={() => handleDelete(produto.id)}
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
