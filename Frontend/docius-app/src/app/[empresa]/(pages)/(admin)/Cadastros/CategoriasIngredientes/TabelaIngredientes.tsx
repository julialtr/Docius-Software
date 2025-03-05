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
import { formatMoney } from "@/utils/format";
import { useEffect, useState } from "react";
import { findIngredientes } from "@/services/ingrediente";
import { ReadIngrediente } from "../Ingredientes/interfaces";
import { useToast } from "@/hooks/use-toast";

export function TabelaIngredientes({
  categoria,
}: {
  categoria: ReadCategoriaIngrediente;
}) {
  const { toast } = useToast();

  const [dados, setDados] = useState<ReadIngrediente[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await findIngredientes({
          categoriaIngredienteId: categoria.id,
        });
        setDados(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler ingredientes",
            description: error.message,
          });
        }
      }
    };

    loadData();
  }, []);

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
                {dados?.map((ingrediente) => (
                  <TableRow key={ingrediente.id}>
                    <TableCell className="font-medium">
                      {ingrediente.nome}
                    </TableCell>
                    <TableCell>{ingrediente.marca}</TableCell>
                    <TableCell>{formatMoney(ingrediente.preco)}</TableCell>
                    <TableCell>
                      {ingrediente.quantidade} {ingrediente.unidadeMedida.sigla}
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
