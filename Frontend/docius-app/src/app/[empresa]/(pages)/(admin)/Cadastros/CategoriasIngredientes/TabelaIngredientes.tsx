import { ChevronRight, ExternalLink, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ReadCategoriaIngrediente } from "./interfaces";
import { findIngredientes } from "@/services/ingrediente";
import { ReadIngrediente } from "../Ingredientes/interfaces";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import SortIcon from "@/app/_components/Sort";

import { formatMoney } from "@/utils/format";
import { requestSort, SortConfig } from "@/utils/sort";

import { useToast } from "@/hooks/use-toast";

export function TabelaIngredientes({
  categoria,
}: {
  categoria: ReadCategoriaIngrediente;
}) {
  const { toast } = useToast();
  const [dados, setDados] = useState<ReadIngrediente[]>([]);

  const [sortConfig, setSortConfig] =
    useState<SortConfig<ReadIngrediente>>(null);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-amber-700 hover:text-amber-900"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Ingredientes</DialogTitle>
          <DialogDescription>
            Lista de todos os ingredientes da categoria
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          {categoria?.qtdIngredientes === 0 ? (
            <DialogDescription className="text-amber-700">
              Nenhum ingrediente cadastrado nesta categoria
            </DialogDescription>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("nome", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Nome
                      <SortIcon<ReadIngrediente>
                        columnKey="nome"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("marca", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Marca
                      <SortIcon<ReadIngrediente>
                        columnKey="marca"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("medida", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Medida
                      <SortIcon<ReadIngrediente>
                        columnKey="medida"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("preco", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Preço
                      <SortIcon<ReadIngrediente>
                        columnKey="preco"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("quantidade", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Quantidade
                      <SortIcon<ReadIngrediente>
                        columnKey="quantidade"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setSortConfig(requestSort("fornecedor", sortConfig))
                      }
                      className="hover:bg-transparent p-0 font-semibold flex items-center"
                    >
                      Fornecedor
                      <SortIcon<ReadIngrediente>
                        columnKey="fornecedor"
                        sortConfig={sortConfig}
                      />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados?.map((ingrediente) => (
                  <TableRow key={ingrediente.id}>
                    <TableCell className="font-medium">
                      {ingrediente.nome}
                    </TableCell>
                    <TableCell>{ingrediente.marca}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Scale className="h-4 w-4 text-gray-500" />
                        {ingrediente.medida} {ingrediente.unidadeMedida.sigla}
                      </div>
                    </TableCell>

                    <TableCell>{formatMoney(ingrediente.preco)}</TableCell>
                    <TableCell>{ingrediente.quantidade}</TableCell>
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
      </DialogContent>
    </Dialog>
  );
}
