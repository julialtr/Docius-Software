"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Calendar, CheckCircle, Circle } from "lucide-react";

import { CardDetalhadoPedido } from "./CardDetalhadoPedido";
import { ReadPedido } from "./interfaces";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";

import { formatDateTime } from "@/utils/format";
import { StatusPedidoProduto } from "@/utils/constants";

export function CardPedido({
  pedido,
  index,
  updateStatusItemPedido,
}: {
  pedido: ReadPedido;
  index: number;
  updateStatusItemPedido: (
    pedidoId: number,
    itemId: number,
    completed: boolean
  ) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itensConcluidos = pedido.pedidoProduto.filter(
    (item) => item.statusPedidoProdutoId == StatusPedidoProduto.Concluido
  ).length;

  const totalItens = pedido.pedidoProduto.length;

  const getCompletionIcon = () => {
    if (itensConcluidos === 0)
      return <Circle className="h-5 w-5 text-slate-400" />;

    if (itensConcluidos === totalItens)
      return <CheckCircle className="h-5 w-5 text-green-500" />;

    return <CheckCircle className="h-5 w-5 text-amber-500" />;
  };

  return (
    pedido && (
      <>
        <Draggable draggableId={pedido.id.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-3"
            >
              <Card
                className={cn(
                  "cursor-pointer hover:border-amber-300 transition-colors",
                  snapshot.isDragging && "border-amber-400 shadow-lg"
                )}
                onClick={() => setIsModalOpen(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-mono">
                      #PED-{pedido.identificador}
                    </Badge>
                    {getCompletionIcon()}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateTime(pedido.dataHoraEntrega)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {pedido.pedidoProduto.length}{" "}
                      {pedido.pedidoProduto.length === 1 ? "item" : "itens"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Draggable>

        <CardDetalhadoPedido
          pedido={pedido}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          updateStatusItemPedido={updateStatusItemPedido}
        />
      </>
    )
  );
}
