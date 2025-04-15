"use client";

import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import Menu from "@/app/_components/Menu";
import { BoardPedidos } from "./BoardPedidos";
import { ReadPedido } from "./interfaces";
import { findPedidos } from "@/services/pedido";

import { useToast } from "@/hooks/use-toast";

export default function Pedidos() {
  const { toast } = useToast();
  const [pedidos, setPedidos] = useState<ReadPedido[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findPedidos();
        setPedidos(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler pedidos",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <main className="flex-1 overflow-auto">
        <div className="p-8 h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedidos</h1>
            <p className="text-gray-600">
              Gerencie os pedidos da sua confeitaria
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm flex-1 min-h-0">
            <BoardPedidos pedidos={pedidos} handlePedidosChange={setPedidos} />
          </div>
        </div>
      </main>
    </div>
  );
}
