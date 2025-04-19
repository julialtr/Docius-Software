"use client";

import { useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

import { ColunaBoardPedidos } from "./ColunaBoardPedidos";
import { updatePedido } from "@/services/pedido";
import { ReadPedido, StatusPedidoColuna } from "../../Admin/Pedidos/interfaces";
import { AlertaCancelamento } from "./AlertaCancelamento";

import { StatusPedido } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";

const columns: StatusPedidoColuna[] = [
  { id: StatusPedido.PagamentoPendente, titulo: "Pendente" },
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pedidoCancelar, setPedidoCancelar] = useState<{
    pedidoId: number;
    sourceId: StatusPedido;
  } | null>(null);

  const confirmarCancelamentoPedido = () => {
    if (!pedidoCancelar) return;

    const pedidosAtualizados = pedidos.map((pedido: ReadPedido) => {
      if (pedido.id === pedidoCancelar.pedidoId) {
        return {
          ...pedido,
          statusPedidoId: StatusPedido.Concluido,
        };
      }
      return pedido;
    });

    handlePedidosChange(pedidosAtualizados);
    setIsDialogOpen(false);
    setPedidoCancelar(null);

    const updatePedidoStatus = async () => {
      try {
        await updatePedido(pedidoCancelar.pedidoId, StatusPedido.Concluido);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao atualizar status do pedido",
            description: error.message,
          });

          return;
        }
      }

      toast({
        variant: "success",
        title: "Pedido cancelado",
        description: "Seu pedido foi cancelado com sucesso.",
      });
    };

    updatePedidoStatus();
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

    if (
      destination.droppableId === StatusPedido.Concluido.toString() &&
      (source.droppableId === StatusPedido.PagamentoPendente.toString() ||
        source.droppableId === StatusPedido.Confirmado.toString())
    ) {
      setPedidoCancelar({
        pedidoId: Number(draggableId),
        sourceId: source.droppableId as unknown as StatusPedido,
      });
      setIsDialogOpen(true);
      return;
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 h-full">
          {columns.map((column) => (
            <ColunaBoardPedidos
              key={column.id}
              column={column}
              pedidos={pedidos.filter(
                (pedido) => pedido.statusPedidoId == column.id
              )}
            />
          ))}
        </div>
      </DragDropContext>
      <AlertaCancelamento
        isDialogOpen={isDialogOpen}
        onIsDialogOpenChange={setIsDialogOpen}
        onConfirmar={confirmarCancelamentoPedido}
      />
    </>
  );
}
