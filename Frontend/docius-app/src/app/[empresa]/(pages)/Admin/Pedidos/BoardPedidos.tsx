"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

import { ColunaBoardPedidos } from "./ColunaBoardPedidos";
import { ReadPedido, StatusPedidoColuna } from "./interfaces";
import { updateItemPedido, updatePedido } from "@/services/pedido";

import { StatusPedido, StatusPedidoProduto } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";

const columns: StatusPedidoColuna[] = [
  { id: StatusPedido.PagamentoPendente, titulo: "Pagamento pendente" },
  { id: StatusPedido.Confirmado, titulo: "Confirmado" },
  { id: StatusPedido.EmProducao, titulo: "Em produção" },
  { id: StatusPedido.Concluido, titulo: "Concluído" },
];

export function BoardPedidos({
  pedidos,
  handlePedidosChange,
}: {
  pedidos: ReadPedido[];
  handlePedidosChange: (pedidos: ReadPedido[]) => void;
}) {
  const { toast } = useToast();

  const updateStatusItemPedido = (
    pedidoId: number,
    itemId: number,
    completed: boolean
  ) => {
    const pedidosAtualizados = pedidos.map((pedido) => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          pedidoProduto: pedido.pedidoProduto.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  statusPedidoProdutoId: completed
                    ? StatusPedidoProduto.Concluido
                    : StatusPedidoProduto.NaoConcluido,
                }
              : item
          ),
        };
      }
      return pedido;
    });
    handlePedidosChange(pedidosAtualizados);

    const updatePedido = async () => {
      try {
        await updateItemPedido(
          itemId,
          completed
            ? StatusPedidoProduto.Concluido
            : StatusPedidoProduto.NaoConcluido
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao atualizar status do item do pedido",
            description: error.message,
          });
        }
      }
    };

    updatePedido();
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (Number(destination.droppableId) < Number(source.droppableId)) return;

    const pedidosAtualizados = pedidos.map((pedido: ReadPedido) => {
      if (pedido.id.toString() === draggableId) {
        return {
          ...pedido,
          statusPedidoId: Number(destination.droppableId),
        };
      }
      return pedido;
    });
    handlePedidosChange(pedidosAtualizados);

    const updatePedidoStatus = async () => {
      try {
        await updatePedido(
          Number(draggableId),
          Number(destination.droppableId)
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao atualizar status do pedido",
            description: error.message,
          });
        }
      }
    };

    updatePedidoStatus();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {columns.map((column) => (
          <ColunaBoardPedidos
            key={column.id}
            column={column}
            pedidos={pedidos.filter(
              (pedido) => pedido.statusPedidoId == column.id
            )}
            updateStatusItemPedido={updateStatusItemPedido}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
