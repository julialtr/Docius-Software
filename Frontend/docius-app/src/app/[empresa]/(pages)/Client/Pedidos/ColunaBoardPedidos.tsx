"use client";

import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

import { CardPedido } from "./CardPedido";
import { ReadPedido, StatusPedidoColuna } from "../../Admin/Pedidos/interfaces";

export function ColunaBoardPedidos({
  column,
  pedidos,
}: {
  column: StatusPedidoColuna;
  pedidos: ReadPedido[];
}) {
  return (
    <div className="flex flex-col overflow-y-auto w-80 bg-slate-50 rounded-md">
      <div className="p-3 font-medium border-b bg-slate-100 rounded-t-md">
        <h3>{column.titulo}</h3>
        <div className="text-xs text-muted-foreground mt-1">
          {pedidos.length} {pedidos.length === 1 ? "pedido" : "pedidos"}
        </div>
      </div>

      <Droppable droppableId={column.id.toString()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 p-2 overflow-y-auto min-h-0",
              snapshot.isDraggingOver && "bg-amber-50"
            )}
          >
            {pedidos.map((pedido, index) => (
              <CardPedido key={pedido.id} pedido={pedido} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
