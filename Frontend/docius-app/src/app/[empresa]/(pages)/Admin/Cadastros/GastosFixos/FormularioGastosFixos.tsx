"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

import { ReadGastoFixo } from "../GastosFixos/interfaces";
import { createGastoFixo, updateGastoFixo } from "@/services/gastoFixo";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";

import { useToast } from "@/hooks/use-toast";

export default function FormularioGastosFixos({
  dados,
  isDialogOpen,
  gastoFixo,
  onDadosChange,
  onIsDialogOpenChange,
  onGastoFixoChange,
}: {
  dados: ReadGastoFixo[];
  isDialogOpen: boolean;
  gastoFixo: ReadGastoFixo | null;
  onDadosChange: (novosDados: ReadGastoFixo[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onGastoFixoChange: (gastoFixo: ReadGastoFixo | null) => void;
}) {
  const { toast } = useToast();

  const [dadosGastoFixo, setDadosGastoFixo] = useState<ReadGastoFixo>({
    id: 0,
    nome: "",
    valor: 0,
  });

  useEffect(() => {
    if (gastoFixo) {
      setDadosGastoFixo(gastoFixo);
    }
  }, [gastoFixo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosGastoFixo((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosGastoFixo) return;

    try {
      if (dadosGastoFixo.id) {
        await updateGastoFixo(dadosGastoFixo.id, dadosGastoFixo);
        onDadosChange(
          dados.map((f) => (f.id === dadosGastoFixo.id ? dadosGastoFixo : f))
        );
      } else {
        const dadoCriado = await createGastoFixo(dadosGastoFixo);

        onDadosChange([...dados, dadoCriado[0]]);
      }

      toast({
        title: dadosGastoFixo.id
          ? "Gasto fixo atualizado"
          : "Gasto fixo criado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o gasto fixo",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onGastoFixoChange(null);
    setDadosGastoFixo({
      id: 0,
      nome: "",
      valor: 0,
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseDialog();
        } else {
          onIsDialogOpenChange(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {gastoFixo ? "Editar gasto fixo" : "Novo gasto fixo"}
          </DialogTitle>
          <DialogDescription>
            {gastoFixo
              ? "Edite as informações do gasto fixo no formulário abaixo"
              : "Preencha as informações do novo gasto fixo no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={dadosGastoFixo?.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valor">Valor (R$)</Label>
            <Input
              id="valor"
              name="valor"
              type="number"
              step="0.01"
              min="0"
              value={dadosGastoFixo?.valor}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
