"use client";

import { Calendar } from "lucide-react";

import { ReadPedido } from "./interfaces";
import { CardItemPedido } from "./CardItemPedido";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Separator } from "@/app/_components/ui/separator";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { formatDateTime, formatMoney } from "@/utils/format";
import { calculaTotal } from "@/utils/calculo";

export function CardDetalhadoPedido({
  pedido,
  isOpen,
  onClose,
  updateStatusItemPedido,
}: {
  pedido: ReadPedido;
  isOpen: boolean;
  onClose: () => void;
  updateStatusItemPedido: (
    orderId: number,
    itemId: number,
    completed: boolean
  ) => void;
}) {
  const handleStatusItemPedidoChange = (itemId: number, completed: boolean) => {
    updateStatusItemPedido(pedido.id, itemId, completed);
  };

  const precoTotal = pedido.pedidoProduto.reduce((total, item) => {
    const preco = item.produto.preco ?? 0;
    return total + calculaTotal(preco, item.quantidade);
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-8 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Detalhes do pedido</DialogTitle>
            <Badge variant="outline" className="font-mono">
              #PED-{pedido.identificador}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Data de Entrega:</span>
              <span className="text-sm">
                {formatDateTime(pedido.dataHoraEntrega)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cliente:</span>
              <span className="text-sm">{pedido.usuario?.nome}</span>
            </div>
          </div>

          <Separator />

          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="font-medium mb-2">Itens do pedido</h3>
            <ScrollArea className="flex-1">
              <div className="space-y-3 pr-4">
                {pedido.pedidoProduto.map((item) => (
                  <CardItemPedido
                    key={item.id}
                    itemPedido={item}
                    onStatusItemPedidoChange={(completed) =>
                      handleStatusItemPedidoChange(item.id, completed)
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold text-lg">{formatMoney(precoTotal)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
