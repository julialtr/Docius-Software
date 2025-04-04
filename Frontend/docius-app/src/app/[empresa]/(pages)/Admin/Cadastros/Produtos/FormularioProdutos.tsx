"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

import { createConvert, ReadProduto, updateConvert } from "./interfaces";
import { createProduto, updateProduto } from "@/services/produto";

import { ReadReceita } from "../Receitas/interfaces";
import { findReceitas } from "@/services/receita";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import { useToast } from "@/hooks/use-toast";

export default function FormularioProdutos({
  dados,
  isDialogOpen,
  produto,
  onDadosChange,
  onIsDialogOpenChange,
  onProdutoChange,
}: {
  dados: ReadProduto[];
  isDialogOpen: boolean;
  produto: ReadProduto | null;
  onDadosChange: (novosDados: ReadProduto[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onProdutoChange: (produto: ReadProduto | null) => void;
}) {
  const { toast } = useToast();

  const [dadosProduto, setDadosProduto] = useState<ReadProduto>({
    id: 0,
    nome: "",
    preco: 0,
    qtdPedidos: 0,
    receita: {
      id: 0,
      nome: "",
      descricao: "",
      tempo: "",
      qtdPorcoes: 0,
      receitaCategoriaIngrediente: [],
      qtdProdutos: 0
    },
  });

  const [dadosReceitas, setDadosReceitas] = useState<ReadReceita[]>([]);

  useEffect(() => {
    if (produto) {
      setDadosProduto(produto);
    }
  }, [produto]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDadosReceitas(await findReceitas());
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler receitas",
            description: error.message,
          });
        }
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosProduto((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setDadosProduto((prev) => updateNestedValue(prev, name, Number(value)));
  };

  const updateNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const newObj = { ...obj };

    let current: any = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) current[key] = {};
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;

    return newObj;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosProduto) return;

    try {
      if (dadosProduto.id) {
        const novoDado = await updateProduto(
          dadosProduto.id,
          updateConvert(dadosProduto)
        );

        onDadosChange(
          dados.map((f) => (f.id === dadosProduto.id ? novoDado : f))
        );
      } else {
        const novoDado = await createProduto(createConvert(dadosProduto));
        onDadosChange([...dados, novoDado[0]]);
      }

      toast({
        title: dadosProduto.id ? "Produto atualizado" : "Produto criado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o produto",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onProdutoChange(null);
    setDadosProduto({
      id: 0,
      nome: "",
      preco: 0,
      qtdPedidos: 0,
      receita: {
        id: 0,
        nome: "",
        descricao: "",
        tempo: "",
        qtdPorcoes: 0,
        receitaCategoriaIngrediente: [],
        qtdProdutos: 0
      },
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
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {produto ? "Editar produto" : "Novo produto"}
          </DialogTitle>
          <DialogDescription>
            {produto
              ? "Edite as informações do produto no formulário abaixo"
              : "Preencha as informações do novo produto no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={dadosProduto?.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receita.id">Receita</Label>
            <div className="flex gap-2">
              <Select
                value={dadosProduto.receita?.id.toString()}
                onValueChange={(value) =>
                  handleSelectChange("receita.id", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma receita" />
                </SelectTrigger>
                <SelectContent>
                  {dadosReceitas.map((receita) => (
                    <SelectItem
                      key={receita?.id}
                      value={receita?.id.toString()}
                    >
                      {receita?.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
