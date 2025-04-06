"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Upload } from "lucide-react";

import { CreatePedidoProduto, CreatePersonalizacaoFoto } from "./interfaces";
import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Separator } from "@/app/_components/ui/separator";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import { Input } from "@/app/_components/ui/input";

import { formatMoney } from "@/utils/format";
import { useDadosCarrinhoCompras } from "@/context/DadosCarrinhoComprasContext";
import { useDadosPersonalizacaoFoto } from "@/context/DadosPersonalizacaoFotoContext";

export function FormularioProduto({
  pedidoProduto,
  produto,
  isDialogOpen,
  onIsDialogOpenChange,
}: {
  pedidoProduto?: CreatePedidoProduto;
  produto: ReadProduto;
  isDialogOpen: boolean;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
}) {
  const { adicionaItem, alteraItem } = useDadosCarrinhoCompras();
  const { incrementaId } = useDadosPersonalizacaoFoto();

  const [quantidade, setQuantidade] = useState(1);
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<CreatePersonalizacaoFoto[]>([]);

  useEffect(() => {
    if (pedidoProduto) {
      setQuantidade(pedidoProduto.quantidade);

      setDescricao(
        pedidoProduto.personalizacao
          ? pedidoProduto.personalizacao?.descricao
          : ""
      );

      setImagens(
        pedidoProduto.personalizacao
          ? pedidoProduto.personalizacao.personalizacaoFoto
          : []
      );
    }
  }, [pedidoProduto]);

  const handleQuantidadeChange = (delta: number) => {
    setQuantidade((prev) => Math.max(1, prev + delta));
  };

  const handleImagemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novasImagens: CreatePersonalizacaoFoto[] = [];

      Array.from(e.target.files).forEach((file) => {
        const imagemUrl = URL.createObjectURL(file);
        novasImagens.push({
          id: incrementaId(),
          caminho_foto: imagemUrl,
        });
      });

      setImagens((prev) => [...prev, ...novasImagens]);
    }
  };

  const removeImagem = (id: number) => {
    setImagens((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAdicionaProduto = () => {
    const possuiPersonalizacao = descricao.trim() !== "" || imagens.length > 0;

    if (pedidoProduto) {
      const novoItem = pedidoProduto;
      novoItem.quantidade = quantidade;

      if (possuiPersonalizacao) {
        novoItem.personalizacao = {
          descricao: descricao,
          personalizacaoFoto: imagens,
        };
      } else novoItem.personalizacao = undefined;

      alteraItem(pedidoProduto.id, novoItem);
    } else {
      adicionaItem({
        id: incrementaId(),
        produtoId: produto.id,
        quantidade: quantidade,
        ...(possuiPersonalizacao && {
          personalizacao: {
            descricao: descricao,
            personalizacaoFoto: imagens,
          },
        }),
      });
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setQuantidade(1);
    setDescricao("");
    setImagens([]);
    onIsDialogOpenChange(false);
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-amber-900">
            {produto?.nome}
          </DialogTitle>
          <DialogDescription>
            Personalize seu pedido conforme desejar
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preço */}
          <p className="mt-2 text-xl font-bold text-amber-700">
            {formatMoney(produto?.preco ?? 0)}
          </p>

          <Separator />

          {/* Quantidade */}
          <div>
            <Label htmlFor="quantidade">Quantidade</Label>
            <div className="mt-2 flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantidadeChange(-1)}
                disabled={quantidade <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantidade}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantidadeChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Personalização */}
          <div className="space-y-4">
            <h3 className="font-medium text-amber-900">
              Personalização (opcional)
            </h3>

            <div className="space-y-2">
              <Label htmlFor="descricao">Instruções especiais</Label>
              <Textarea
                id="descricao"
                placeholder="Ex: Sem açúcar, decoração especial, etc."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagens">Imagens de inspiração</Label>
              <div className="grid grid-cols-3 gap-2">
                {imagens.map((img) => (
                  <div
                    key={img.id}
                    className="relative h-20 w-full overflow-hidden rounded-md"
                  >
                    <Image
                      src={img.caminho_foto || "/placeholder.svg"}
                      alt="Imagem de inspiração"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6"
                      onClick={() => removeImagem(img.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                <div className="flex h-20 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                  <Label
                    htmlFor="imagem-upload"
                    className="flex cursor-pointer flex-col items-center justify-center text-xs text-gray-500"
                  >
                    <Upload className="mb-1 h-4 w-4" />
                    <span>Upload</span>
                    <Input
                      id="imagem-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImagemUpload}
                    />
                  </Label>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Adicione até 5 imagens para referência
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onIsDialogOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
            onClick={handleAdicionaProduto}
          >
            Adicionar ao Carrinho •{" "}
            {formatMoney(produto?.preco ?? 0 * quantidade)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
