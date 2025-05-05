import { ReadDashboardProdutosMaisVendidos } from "@/app/[empresa]/(pages)/Admin/Dashboard/interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ProdutosMaisVendidosTabela({
  produtosMaisVendidos,
}: {
  produtosMaisVendidos: ReadDashboardProdutosMaisVendidos[];
}) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Produtos mais vendidos</CardTitle>
        <CardDescription>
          Os produtos mais populares no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        {produtosMaisVendidos.length == 0 ? (
          <span className="text-amber-700 text-sm">
            Lista sem dados para demonstração.
          </span>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosMaisVendidos.map((produto) => (
                <TableRow key={produto.nome}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell className="text-right">
                    {produto.quantidadePedidos}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
