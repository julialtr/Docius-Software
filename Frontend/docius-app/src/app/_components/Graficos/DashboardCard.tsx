import { TrendingUp, TrendingDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export function DashboardCard({
  titulo,
  valor,
  descricao,
  ehDecimal = false,
}: {
  titulo: string;
  valor: number;
  descricao: string;
  ehDecimal?: boolean;
}) {
  const valorFormatado = ehDecimal
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor)
    : valor.toLocaleString("pt-BR");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valorFormatado}</div>
        <p className="text-xs text-muted-foreground mt-1">{descricao}</p>
      </CardContent>
    </Card>
  );
}
