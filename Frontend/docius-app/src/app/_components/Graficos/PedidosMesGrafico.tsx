"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { ReadDashboardPedidosMes } from "@/app/[empresa]/(pages)/Admin/Dashboard/interfaces";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PedidosMesGrafico({
  pedidosMes,
}: {
  pedidosMes: ReadDashboardPedidosMes[];
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Pedidos por mês</CardTitle>
        <CardDescription>
          Quantidade de pedidos realizados nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pedidosMes}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} pedidos`]} />
            <Legend />
            <Bar dataKey="quantidadePedidos" name="Quantidade de pedidos" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
