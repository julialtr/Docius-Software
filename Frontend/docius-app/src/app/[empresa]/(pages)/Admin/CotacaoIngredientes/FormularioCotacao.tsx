"use client";

import type React from "react";
import { useState, useEffect } from "react";

import { ReadWebScrapingDados } from "./interfaces";
import { ReadFornecedor } from "../Cadastros/Fornecedores/interfaces";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

import { useToast } from "@/hooks/use-toast";
import { useDadosCotacao } from "@/context/DadosCotacaoContext";

export default function FormularioCotacao({
  dados,
  isDialogOpen,
  cotacao,
  fornecedores,
  onDadosChange,
  onIsDialogOpenChange,
  onCotacaoChange,
}: {
  dados: ReadWebScrapingDados[];
  isDialogOpen: boolean;
  cotacao: ReadWebScrapingDados | null;
  fornecedores: ReadFornecedor[];
  onDadosChange: (novosDados: ReadWebScrapingDados[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onCotacaoChange: (novosDados: ReadWebScrapingDados | null) => void;
}) {
  const { incrementaId } = useDadosCotacao();
  const { toast } = useToast();

  const [dadosCotacao, setDadosCotacao] = useState<ReadWebScrapingDados>({
    id: 0,
    idMercado: 0,
    fornecedor: {
      id: 0,
      nome: "",
      site: "",
      endereco: "",
      qtdIngredientes: 0,
    },
    nome: "",
    preco: 0,
    automatica: false,
  });

  useEffect(() => {
    if (cotacao) {
      setDadosCotacao(cotacao);
    }
  }, [cotacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosCotacao) return;

    const fornecedor = fornecedores.find(
      (f) => f.id === dadosCotacao.fornecedor?.id
    );

    if (fornecedor) {
      const dadosAtualizados = {
        ...dadosCotacao,
        fornecedor: fornecedor,
        id: dadosCotacao.id ? dadosCotacao.id : incrementaId(),
      };    

      const dadosAtualizadosArray = dados.some(
        (f) => f.id === dadosAtualizados.id
      )
        ? dados.map((f) =>
            f.id === dadosAtualizados.id ? dadosAtualizados : f
          )
        : [...dados, dadosAtualizados];

      onDadosChange(dadosAtualizadosArray);

      toast({
        title: dadosCotacao.id ? "Cotação atualizada" : "Cotação criada",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onCotacaoChange(null);
    setDadosCotacao({
      id: 0,
      idMercado: 0,
      fornecedor: {
        id: 0,
        nome: "",
        site: "",
        endereco: "",
        qtdIngredientes: 0,
      },
      nome: "",
      preco: 0,
      automatica: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosCotacao((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectChange = (value: string) => {
    const fornecedor = fornecedores.find((f) => f.id === Number(value));

    if (fornecedor) {
      const dadosAtualizados = {
        ...dadosCotacao,
        fornecedor: fornecedor,
      };

      setDadosCotacao(dadosAtualizados);
    }
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
            {cotacao ? "Editar cotação" : "Adicionar cotação manual"}
          </DialogTitle>
          <DialogDescription>
            {cotacao
              ? "Edite as informações da cotação no formulário abaixo."
              : "Preencha as informações da cotação manual no formulário abaixo."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={dadosCotacao.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                min="0.01"
                value={dadosCotacao.preco}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor.id">Fornecedor</Label>
              <div className="flex gap-2">
                <Select
                  value={dadosCotacao.fornecedor?.id.toString()}
                  onValueChange={(value) => handleSelectChange(value)}
                  required
                  disabled={dadosCotacao.automatica}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map((fornecedor) => (
                      <SelectItem
                        key={fornecedor?.id}
                        value={fornecedor?.id.toString()}
                      >
                        {fornecedor?.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
