"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

import { ReadCategoriaIngrediente } from "./interfaces";
import {
  createCategoriaIngrediente,
  updateCategoriaIngrediente,
} from "@/services/categoriaIngrediente";

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

export default function FormularioCategoriasIngredientes({
  dados,
  isDialogOpen,
  categoria,
  onDadosChange,
  onIsDialogOpenChange,
  onCategoriaChange,
}: {
  dados: ReadCategoriaIngrediente[];
  isDialogOpen: boolean;
  categoria: ReadCategoriaIngrediente | null;
  onDadosChange: (novosDados: ReadCategoriaIngrediente[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onCategoriaChange: (categoria: ReadCategoriaIngrediente | null) => void;
}) {
  const { toast } = useToast();

  const [dadosCategoria, setDadosCategoria] =
    useState<ReadCategoriaIngrediente>({
      id: 0,
      nome: "",
      qtdIngredientes: 0,
      qtdReceitas: 0
    });

  useEffect(() => {
    if (categoria) {
      setDadosCategoria(categoria);
    }
  }, [categoria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosCategoria((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosCategoria) return;

    try {
      if (dadosCategoria.id) {
        await updateCategoriaIngrediente(dadosCategoria.id, dadosCategoria);
        onDadosChange(
          dados.map((f) => (f.id === dadosCategoria.id ? dadosCategoria : f))
        );
      } else {
        const dadoCriado = await createCategoriaIngrediente(dadosCategoria);

        onDadosChange([...dados, dadoCriado[0]]);
      }

      toast({
        title: dadosCategoria.id ? "Categoria atualizada" : "Categoria criada",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar a categoria de ingrediente",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onCategoriaChange(null);
    setDadosCategoria({
      id: 0,
      nome: "",
      qtdIngredientes: 0,
      qtdReceitas: 0
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
            {categoria ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>
          <DialogDescription>
            {categoria
              ? "Edite as informações da categoria no formulário abaixo"
              : "Preencha as informações da categoria no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={dadosCategoria?.nome}
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
