"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { ReadProduto } from "../../Cadastros/Produtos/interfaces";
import { ReadCardapio } from "../interfaces";
import { ReadCategoriaProduto } from "../(CategoriaProduto)/interfaces";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

import { useToast } from "@/hooks/use-toast";

export default function FormularioProduto({
  dados,
  produto,
  produtos,
  isDialogOpen,
  categoriaSuperiorId,
  onDadosChange,
  onProdutoChange,
  onIsDialogOpenChange,
}: {
  dados: ReadCardapio;
  produto: ReadProduto | null;
  produtos: ReadProduto[];
  isDialogOpen: boolean;
  categoriaSuperiorId: number | null;
  onDadosChange: (novosDados: ReadCardapio) => void;
  onProdutoChange: (produto: ReadProduto | null) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
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
      qtdProdutos: 0,
    },
  });

  useEffect(() => {
    if (produto) {
      setDadosProduto(produto);
    }
  }, [produto]);

  const updateCardapio = (
    categorias: ReadCategoriaProduto[],
    data: ReadProduto,
    parentId?: number
  ): ReadCategoriaProduto[] => {
    return categorias?.map((cat) => {
      if (cat.id === parentId) {
        return {
          ...cat,
          produto: [...cat.produto, data],
        };
      }

      return {
        ...cat,
        categoriaProdutoInferior: updateCardapio(
          cat.categoriaProdutoInferior,
          data,
          parentId
        ),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosProduto) return;

    let novoCardapio = { ...dados };

    if (categoriaSuperiorId) {
      dadosProduto.categoriaProdutoId = categoriaSuperiorId;

      novoCardapio.categoriaProduto = updateCardapio(
        novoCardapio.categoriaProduto,
        dadosProduto,
        categoriaSuperiorId
      );
    } else {
      novoCardapio.categoriaProduto = updateCardapio(
        novoCardapio.categoriaProduto,
        dadosProduto
      );
    }

    onDadosChange(novoCardapio);

    toast({
      title: "Produto adicionado",
      description: "As informações foram salvas com sucesso",
      variant: "success",
    });

    handleCloseDialog();
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
        qtdProdutos: 0,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Select
              value={produto?.id.toString()}
              onValueChange={(value) => {
                const selectedProduto = produtos.find(
                  (p) => p.id === Number(value)
                );
                onProdutoChange(selectedProduto || null);
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto..." />
              </SelectTrigger>
              <SelectContent>
                {produtos?.map((produto) => (
                  <SelectItem key={produto.id} value={produto.id.toString()}>
                    {produto.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
