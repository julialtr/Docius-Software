"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

import { ReadPedido } from "../../Admin/Pedidos/interfaces";
import { findPedidos } from "@/services/pedido";
import { BoardPedidos } from "./BoardPedidos";

import { MenuCliente } from "@/app/_components/Menu/Cliente";

import { useDadosUsuario } from "@/context/DadosUsuarioContext";
import { DadosCarrinhoComprasProvider } from "@/context/DadosCarrinhoComprasContext";
import { useToast } from "@/hooks/use-toast";

export default function Pedidos() {
  const { toast } = useToast();
  const { id } = useDadosUsuario();

  const [pedidos, setPedidos] = useState<ReadPedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findPedidos({ usuarioId: id });
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
    <DadosCarrinhoComprasProvider>
      <div className="min-h-screen bg-gray-100">
        <MenuCliente />

        <main className="container mx-auto px-4">
          <div className="p-8 h-full flex flex-col">
            <div className="bg-white p-4 rounded-lg border shadow-sm flex-1 min-h-0">
              <BoardPedidos
                pedidos={pedidos}
                handlePedidosChange={setPedidos}
              />
            </div>
          </div>
        </main>
      </div>
    </DadosCarrinhoComprasProvider>
  );
}
