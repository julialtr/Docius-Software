"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import { ReadDashboardPedidosStatus } from "@/app/[empresa]/(pages)/Admin/Dashboard/interfaces";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const cores = [
  "#F59E0B", // amber-500
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
];

export function PedidosStatusGrafico({
  pedidosStatus,
}: {
  pedidosStatus: ReadDashboardPedidosStatus[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos por status</CardTitle>
        <CardDescription>
          Distribuição de pedidos por situação no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pedidosStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="quantidadePedidos"
              nameKey="status"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pedidosStatus.map((_, index) => (
                <Cell key={`cell-${index}`} fill={cores[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} pedidos`]} />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
