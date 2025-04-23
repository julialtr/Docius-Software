"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";

import { FilterDashboard, ReadDashboard } from "./interfaces";
import { findDashboard } from "@/services/dashboard";

import { Periodo } from "@/app/_components/Graficos/Periodo";
import { PedidosMesGrafico } from "@/app/_components/Graficos/PedidosMesGrafico";
import { PedidosStatusGrafico } from "@/app/_components/Graficos/PedidosStatusGrafico";
import { DashboardCard } from "@/app/_components/Graficos/DashboardCard";
import { ProdutosMaisVendidosTabela } from "@/app/_components/Graficos/ProdutosMaisVendidosTabela";
import Menu from "@/app/_components/Menu";

import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [filtro, setFiltro] = useState<FilterDashboard>({
    dataInicial: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    dataFinal: new Date().toISOString().split("T")[0],
  });
  
  const [dashboard, setDashboard] = useState<ReadDashboard>();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const data = await findDashboard(filtro);
        setDashboard(data);
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
  }, [filtro]);

  return isLoading ? (
    <Loading />
  ) : (
    dashboard && (
      <div className="flex h-screen bg-gray-100">
        <Menu />
        <main className="flex-1 overflow-auto">
          <div className="p-8 h-full flex flex-col space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <Periodo onFiltroChange={setFiltro} filtro={filtro} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard
                titulo="Faturamento bruto"
                valor={dashboard.valorFaturamentoBruto}
                descricao="Total no período selecionado"
                ehDecimal={true}
              />
              <DashboardCard
                titulo="Ticket médio"
                valor={dashboard.valorMedioPedido}
                descricao="Valor médio por pedido no período selecionado"
                ehDecimal={true}
              />
              <DashboardCard
                titulo="Total de pedidos"
                valor={dashboard.quantidadePedidos}
                descricao="Pedidos no período selecionado"
              />
              <DashboardCard
                titulo="Previsão de faturamento"
                valor={dashboard.valorFaturamentoBrutoProximoMes}
                descricao="Estimativa para o próximo mês com base nas encomendas
                    recebidas"
                ehDecimal={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PedidosMesGrafico pedidosMes={dashboard.pedidosMes} />
              <PedidosStatusGrafico pedidosStatus={dashboard.pedidosStatus} />
              <ProdutosMaisVendidosTabela
                produtosMaisVendidos={dashboard.produtosMaisVendidos}
              />
            </div>
          </div>
        </main>
      </div>
    )
  );
}
