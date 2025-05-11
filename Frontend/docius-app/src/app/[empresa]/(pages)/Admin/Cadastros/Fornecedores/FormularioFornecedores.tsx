"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

import { ReadFornecedor } from "./interfaces";
import { createFornecedor, updateFornecedor } from "@/services/fornecedor";

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

export default function FormularioFornecedores({
  dados,
  isDialogOpen,
  fornecedor,
  onDadosChange,
  onIsDialogOpenChange,
  onFornecedorChange,
}: {
  dados: ReadFornecedor[];
  isDialogOpen: boolean;
  fornecedor: ReadFornecedor | null;
  onDadosChange: (novosDados: ReadFornecedor[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onFornecedorChange: (fornecedor: ReadFornecedor | null) => void;
}) {
  const { toast } = useToast();

  const [dadosFornecedor, setDadosFornecedor] = useState<ReadFornecedor>({
    id: 0,
    nome: "",
    endereco: "",
    site: "",
    qtdIngredientes: 0,
  });

  const [ehFornecedorPadrao, setEhFornecedorPadrao] = useState<boolean>(false);

  useEffect(() => {
    if (fornecedor) {
      setDadosFornecedor(fornecedor);
      setEhFornecedorPadrao(fornecedor.id === 1 || fornecedor.id === 2);
    } else setEhFornecedorPadrao(false);
  }, [fornecedor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosFornecedor((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosFornecedor) return;

    try {
      if (dadosFornecedor.id) {
        await updateFornecedor(dadosFornecedor.id, dadosFornecedor);
        onDadosChange(
          dados.map((f) => (f.id === dadosFornecedor.id ? dadosFornecedor : f))
        );
      } else {
        const dadoCriado = await createFornecedor(dadosFornecedor);

        onDadosChange([...dados, dadoCriado[0]]);
      }

      toast({
        title: dadosFornecedor.id
          ? "Fornecedor atualizado"
          : "Fornecedor criado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o fornecedor",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onFornecedorChange(null);
    setDadosFornecedor({
      id: 0,
      nome: "",
      endereco: "",
      site: "",
      qtdIngredientes: 0,
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
            {fornecedor ? "Editar fornecedor" : "Novo fornecedor"}
          </DialogTitle>
          <DialogDescription>
            {fornecedor
              ? "Edite as informações do fornecedor no formulário abaixo"
              : "Preencha as informações do novo fornecedor no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFornecedor?.nome}
              onChange={handleChange}
              required
              disabled={ehFornecedorPadrao}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endereco">
              Endereço{" "}
              <span className="text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="endereco"
              name="endereco"
              value={dadosFornecedor?.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site">
              Site{" "}
              <span className="text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="site"
              name="site"
              value={dadosFornecedor?.site}
              onChange={handleChange}
              disabled={ehFornecedorPadrao}
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
