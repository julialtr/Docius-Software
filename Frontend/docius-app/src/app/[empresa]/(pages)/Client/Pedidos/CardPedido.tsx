"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Calendar } from "lucide-react";

import { CardDetalhadoPedido } from "./CardDetalhadoPedido";
import { ReadPedido } from "../../Admin/Pedidos/interfaces";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";

import { formatDateTime } from "@/utils/format";

export function CardPedido({
  pedido,
  index,
}: {
  pedido: ReadPedido;
  index: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        />
      </>
    )
  );
}
