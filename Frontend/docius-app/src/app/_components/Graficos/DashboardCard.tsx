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
  variacao,
  ehDecimal = false,
}: {
  titulo: string;
  valor: number;
  descricao: string;
  variacao?: number;
  ehDecimal?: boolean;
}) {
  const valorFormatado = ehDecimal
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor)
    : valor.toLocaleString("pt-BR");

  const isVariacaoPositiva = variacao && variacao > 0;
  const variacaoDisplay = variacao ? Math.abs(variacao).toFixed(1) + "%" : null;

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
        {variacao !== undefined && (
          <div
            className={`flex items-center mt-2 text-xs ${
              isVariacaoPositiva ? "text-green-500" : "text-red-500"
            }`}
          >
            {isVariacaoPositiva ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{variacaoDisplay} em relação ao período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
