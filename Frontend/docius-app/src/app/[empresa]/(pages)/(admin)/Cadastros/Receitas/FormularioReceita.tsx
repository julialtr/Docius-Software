"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle, Save } from "lucide-react";
import ReceitaIngrediente from "./ReceitaIngrediente";

import { createConvert, ReadReceita, updateConvert } from "./interfaces";
import { createReceita, updateReceita } from "@/services/receita";

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
import { Textarea } from "@/app/_components/ui/textarea";
import { Separator } from "@/app/_components/ui/separator";

import { useToast } from "@/hooks/use-toast";

export default function FormularioReceitas({
  dados,
  isDialogOpen,
  receita,
  onDadosChange,
  onIsDialogOpenChange,
  onReceitaChange,
}: {
  dados: ReadReceita[];
  isDialogOpen: boolean;
  receita: ReadReceita | null;
  onDadosChange: (novosDados: ReadReceita[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onReceitaChange: (receita: ReadReceita | null) => void;
}) {
  const { toast } = useToast();

  const [dadosReceita, setDadosReceita] = useState<ReadReceita>({
    id: 0,
    nome: "",
    descricao: "",
    tempo: "",
    qtdPorcoes: 0,
    qtdProdutos: 0,
    receitaCategoriaIngrediente: [],
  });

  useEffect(() => {
    if (receita) {
      setDadosReceita(receita);
    }
  }, [receita]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosReceita((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });

    onReceitaChange({...dadosReceita, [e.target.name]: e.target.value})
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDadosReceita((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });

    onReceitaChange({...dadosReceita, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosReceita) return;

    if (!dadosReceita.receitaCategoriaIngrediente || !dadosReceita.receitaCategoriaIngrediente.length) {
      toast({
        title: "Erro ao salvar receita",
        description: "Adicione um ingrediente para continuar",
        variant: "warning",
      });

      return;
    }

    try {
      if (dadosReceita.id) {
        const novoDado = await updateReceita(
          dadosReceita.id,
          updateConvert(dadosReceita)
        );

        onDadosChange(
          dados.map((f) => (f.id === dadosReceita.id ? novoDado : f))
        );
      } else {
        const novoDado = await createReceita(createConvert(dadosReceita));
        onDadosChange([...dados, novoDado[0]]);
      }

      toast({
        title: dadosReceita.id ? "Receita atualizada" : "Receita criada",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar a receita",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onReceitaChange(null);
    setDadosReceita({
      id: 0,
      nome: "",
      descricao: "",
      tempo: "",
      qtdPorcoes: 0,
      qtdProdutos: 0,
      receitaCategoriaIngrediente: [],
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {receita ? "Editar receita" : "Nova receita"}
          </DialogTitle>
          <DialogDescription>
            {receita
              ? "Edite as informações da receita no formulário abaixo"
              : "Preencha as informações da nova receita no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={dadosReceita?.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tempo">Tempo de preparo</Label>
                <Input
                  id="tempo"
                  name="tempo"
                  type="time"
                  step="60"
                  value={dadosReceita?.tempo || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qtdPorcoes">Quantidade de porções</Label>
                <Input
                  id="qtdPorcoes"
                  name="qtdPorcoes"
                  type="number"
                  step="1"
                  min="1"
                  value={dadosReceita?.qtdPorcoes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                value={dadosReceita?.descricao}
                onChange={handleTextAreaChange}
                className="min-h-[50px] focus-visible:ring-0"
              />
            </div>
            <Separator />
            <ReceitaIngrediente
              receita={receita}
              onReceitaChange={onReceitaChange}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
