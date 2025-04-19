"use client";

import { AlertCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

export function AlertaCancelamento({
  isDialogOpen,
  onIsDialogOpenChange,
  onConfirmar,
}: {
  isDialogOpen: boolean;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onConfirmar: () => void;
}) {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={onIsDialogOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
            <AlertDialogTitle>Cancelar pedido</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            Você tem certeza que deseja cancelar este pedido? O valor pago
            antecipadamente <strong>não será devolvido</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Voltar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmar}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Cancelar pedido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
