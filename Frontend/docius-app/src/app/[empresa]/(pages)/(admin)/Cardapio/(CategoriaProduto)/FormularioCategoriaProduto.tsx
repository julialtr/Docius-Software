"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

import { ReadCategoriaProduto } from "./interfaces";
import { ReadCardapio } from "../interfaces";

import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { useDadosCategoriaProduto } from "@/context/DadosCategoriaProdutoContext";

export default function FormularioCategoriaProduto({
  dados,
  categoria,
  isDialogOpen,
  categoriaSuperiorId,
  onDadosChange,
  onCategoriaChange,
  onIsDialogOpenChange,
}: {
  dados: ReadCardapio;
  categoria: ReadCategoriaProduto | null;
  isDialogOpen: boolean;
  categoriaSuperiorId: number | null;
  onDadosChange: (novosDados: ReadCardapio) => void;
  onCategoriaChange: (categoria: ReadCategoriaProduto | null) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
}) {
  const { incrementaId } = useDadosCategoriaProduto();

  const { toast } = useToast();

  const [dadosCategoria, setDadosCategoria] = useState<ReadCategoriaProduto>({
    id: 0,
    nome: "",
    cardapioId: 0,
    categoriaProdutoInferior: [],
    categoriaProdutoSuperiorId: 0,
    produto: [],
    isOpen: false,
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

  const updateCardapio = (
    categorias: ReadCategoriaProduto[],
    data: ReadCategoriaProduto
  ): ReadCategoriaProduto[] => {
    return categorias.map((cat) => {
      if (cat.id === data.id) {
        return {
          ...cat,
          nome: data.nome,
        };
      }

      return {
        ...cat,
        categoriaProdutoInferior: updateCardapio(
          cat.categoriaProdutoInferior,
          data
        ),
      };
    });
  };

  const atualizarCategoriaSuperior = (
    categorias: ReadCategoriaProduto[]
  ): ReadCategoriaProduto[] => {
    if (!dadosCategoria.categoriaProdutoSuperiorId) {
      return [...categorias, dadosCategoria];
    }

    let categoriaAdicionada = false;

    const novaLista = categorias.map((cat) => {
      if (cat.id === dadosCategoria.categoriaProdutoSuperiorId) {
        categoriaAdicionada = true;
        return {
          ...cat,
          categoriaProdutoInferior: [
            ...cat.categoriaProdutoInferior,
            dadosCategoria,
          ],
        };
      }

      if (!categoriaAdicionada) {
        const novaCategoriaInferior = atualizarCategoriaSuperior(
          cat.categoriaProdutoInferior
        );

        if (novaCategoriaInferior !== cat.categoriaProdutoInferior) {
          categoriaAdicionada = true;
          return { ...cat, categoriaProdutoInferior: novaCategoriaInferior };
        }
      }

      return cat;
    });

    return novaLista;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosCategoria) return;

    let novoCardapio = { ...dados };

    const ehAlteracao = dadosCategoria.id !== 0;

    if (ehAlteracao) {
      novoCardapio = {
        ...dados,
        categoriaProduto: updateCardapio(
          novoCardapio.categoriaProduto,
          dadosCategoria
        ),
      };
    } else {
      dadosCategoria.id = incrementaId();
      dadosCategoria.cardapioId = dados.id;
      dadosCategoria.categoriaProdutoSuperiorId = categoriaSuperiorId ?? 0;

      novoCardapio = {
        ...dados,
        categoriaProduto: atualizarCategoriaSuperior(dados.categoriaProduto),
      };
    }

    onDadosChange(novoCardapio);

    toast({
      title: ehAlteracao ? "Categoria atualizada" : "Categoria criada",
      description: "As informações foram salvas com sucesso",
      variant: "success",
    });

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onCategoriaChange(null);
    setDadosCategoria({
      id: 0,
      nome: "",
      cardapioId: 0,
      categoriaProdutoInferior: [],
      categoriaProdutoSuperiorId: 0,
      produto: [],
      isOpen: false,
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
          <DialogTitle>
            {dadosCategoria.id ? "Editar categoria" : "Adicionar categoria"}
          </DialogTitle>
          <DialogDescription>
            {dadosCategoria.id
              ? "Edite as informações da categoria no formulário abaixo."
              : "Preencha as informações da nova categoria no formulário abaixo."}
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
