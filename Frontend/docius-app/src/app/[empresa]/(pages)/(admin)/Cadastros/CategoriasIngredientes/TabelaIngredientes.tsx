import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ReadCategoriaIngrediente } from "./interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

export function TabelaIngredientes({
  categoria,
}: {
  categoria: ReadCategoriaIngrediente;
}) {
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-amber-700 hover:text-amber-900"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[640px]">
        <SheetHeader>
          <SheetTitle>Ingredientes</SheetTitle>
          <SheetDescription>
            Lista de todos os ingredientes da categoria
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {categoria?.qtdIngredientes === 0 ? (
            <SheetDescription className="text-amber-700">
              Nenhum ingrediente cadastrado nesta categoria
            </SheetDescription>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Fornecedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoria.ingredientes?.map((ingrediente) => (
                  <TableRow key={ingrediente.id}>
                    <TableCell className="font-medium">
                      {ingrediente.nome}
                    </TableCell>
                    <TableCell>{ingrediente.marca}</TableCell>
                    <TableCell>{formatMoney(ingrediente.preco)}</TableCell>
                    <TableCell>
                      {ingrediente.quantidade} {ingrediente.unidadeMedida.nome}
                    </TableCell>
                    <TableCell>
                      {ingrediente.fornecedor.site ? (
                        <Link
                          href={ingrediente.fornecedor.site}
                          target="_blank"
                          className="flex items-center gap-1 text-amber-700 hover:text-amber-900"
                        >
                          {ingrediente.fornecedor.nome}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      ) : (
                        ingrediente.fornecedor.nome
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
