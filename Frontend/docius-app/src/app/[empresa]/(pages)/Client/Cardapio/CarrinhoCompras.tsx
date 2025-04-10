"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Minus,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { FormularioProduto } from "./FormularioProduto";
import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";
import { CreatePedidoProduto } from "./interfaces";
import { DatePickerModal } from "../Pagamento/DatePickerModal";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";

import { useDadosCarrinhoCompras } from "@/context/DadosCarrinhoComprasContext";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { formatMoney } from "@/utils/format";
import { calculaTotal } from "@/utils/calculo";

export function CarrinhoCompras() {
  const router = useRouter();
  const {
    pedidoProdutos,
    quantidadeItens,
    precoTotal,
    alteraItem,
    removeItem,
    limpaCarrinhoCompras,
    getProduto,
  } = useDadosCarrinhoCompras();
  const { dadosEmpresa } = useDadosEmpresa();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [produto, setProduto] = useState<ReadProduto | null>(null);
  const [pedidoProduto, setPedidoProduto] =
    useState<CreatePedidoProduto | null>(null);

  const handleQuantidadeChange = (item: CreatePedidoProduto, delta: number) => {
    const novaQuantidade = Math.max(1, item.quantidade + delta);
    alteraItem(item.id, { quantidade: novaQuantidade });
  };

  const handleProdutoChange = (pedidoProduto: CreatePedidoProduto) => {
    setPedidoProduto(pedidoProduto);
    setProduto(getProduto(pedidoProduto.produtoId) ?? null);
    setIsDialogOpen(true);
  };

  const handleCheckout = () => {
    setIsDatePickerOpen(true);
  };

  const handleConfirmarPedido = (data: Date, hora: string) => {
    setIsDatePickerOpen(false);
    setIsSheetOpen(false);

    const detalhesPedido = {
      pedidoProduto: pedidoProdutos,
      precoTotal,
      dataEntrega: data.toISOString(),
      horaEntrega: hora,
      numeroPedido: `${Math.floor(100000 + Math.random() * 900000)}`,
    };

    const usuarioId = localStorage.getItem("userId");

    localStorage.setItem(`pedido-${usuarioId}`, JSON.stringify(detalhesPedido));

    router.push(`/${dadosEmpresa?.dominio}/Client/Pagamento`);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative border-amber-200 text-amber-800 hover:bg-amber-50 hover:text-amber-900"
          >
            <ShoppingCart className="h-5 w-5" />
            {quantidadeItens > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-0 text-xs text-white">
                {quantidadeItens}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center text-amber-900">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Carrinho de compras
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({quantidadeItens} {quantidadeItens === 1 ? "item" : "itens"})
              </span>
            </SheetTitle>
          </SheetHeader>

          {pedidoProdutos.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="rounded-full bg-amber-100 p-6">
                <ShoppingCart className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Seu carrinho está vazio
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Adicione alguns produtos deliciosos para começar
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
                onClick={() => {
                  setIsSheetOpen(false);
                  router.push(`/${dadosEmpresa?.dominio}/Client/Cardapio`);
                }}
              >
                Explorar cardápio
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4 py-4">
                  {pedidoProdutos.map((pedidoProduto) => {
                    const produto = getProduto(pedidoProduto.produtoId);

                    return (
                      <div
                        key={pedidoProduto.id}
                        className="rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {produto?.nome ?? "Produto desconhecido"}
                            </h4>
                            <div className="mt-1 flex items-center text-sm text-gray-600">
                              <span className="font-medium text-amber-700">
                                {formatMoney(produto?.preco ?? 0)}
                              </span>
                              <span className="mx-1">×</span>
                              <span>{pedidoProduto.quantidade}</span>
                              <span className="ml-auto font-medium text-amber-700">
                                {formatMoney(
                                  calculaTotal(
                                    produto?.preco ?? 0,
                                    pedidoProduto.quantidade
                                  )
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                              onClick={() => handleProdutoChange(pedidoProduto)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-700 hover:bg-red-50 hover:text-red-900"
                              onClick={() => removeItem(pedidoProduto.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Quantidade */}
                        <div className="mt-2 flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-gray-200"
                            onClick={() =>
                              handleQuantidadeChange(pedidoProduto, -1)
                            }
                            disabled={pedidoProduto.quantidade <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {pedidoProduto.quantidade}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-gray-200"
                            onClick={() =>
                              handleQuantidadeChange(pedidoProduto, 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Personalização */}
                        {pedidoProduto.personalizacao && (
                          <div className="mt-3 rounded-md bg-amber-50 p-2 text-sm">
                            {pedidoProduto.personalizacao.descricao && (
                              <p className="text-amber-800">
                                {pedidoProduto.personalizacao.descricao}
                              </p>
                            )}

                            {pedidoProduto.personalizacao.personalizacaoFoto
                              .length > 0 && (
                              <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                                {pedidoProduto.personalizacao.personalizacaoFoto.map(
                                  (img) => (
                                    <div
                                      key={img.id}
                                      className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md"
                                    >
                                      <Image
                                        src={
                                          img.caminhoFoto || "/placeholder.svg"
                                        }
                                        alt="Imagem de inspiração"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="space-y-4 pt-4">
                <Separator />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-lg font-bold text-amber-700">
                      {formatMoney(precoTotal)}
                    </span>
                  </div>
                </div>

                <SheetFooter className="flex-col gap-2 sm:flex-col">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
                    onClick={handleCheckout}
                  >
                    Finalizar pedido
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    onClick={limpaCarrinhoCompras}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Limpar carrinho de compras
                  </Button>
                </SheetFooter>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {produto && pedidoProduto && (
        <FormularioProduto
          produto={produto}
          pedidoProduto={pedidoProduto}
          isDialogOpen={isDialogOpen}
          onIsDialogOpenChange={setIsDialogOpen}
        />
      )}

      <DatePickerModal
        isDialogOpen={isDatePickerOpen}
        onIsDialogOpenChange={setIsDatePickerOpen}
        onConfirmarPedido={handleConfirmarPedido}
      />
    </>
  );
}
