"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { ReadGastoFixo } from "./interfaces";
import AlertaExclusao from "./AlertaExclusao";

import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import SortIcon from "@/app/_components/Sort";
import { Badge } from "@/app/_components/ui/badge";

import { requestSort, SortConfig, sortData } from "@/utils/sort";
import { formatMoney } from "@/utils/format";

export default function TabelaGastosFixos({
  dados,
  searchTerm,
  onDadosChange,
  onIsDialogOpenChange,
  onGastoFixoChange,
}: {
  dados: ReadGastoFixo[];
  searchTerm: string;
  onDadosChange: (novosDados: ReadGastoFixo[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onGastoFixoChange: (gastoFixo: ReadGastoFixo) => void;
}) {
  const [sortConfig, setSortConfig] = useState<SortConfig<ReadGastoFixo>>(null);
  const [totalGastos, setTotalGastos] = useState<number>(0);

  const dadosFiltrados = sortData(
    dados?.filter((item) =>
      item?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    sortConfig
  );

  useEffect(() => {
    setTotalGastos(
      dadosFiltrados.reduce((total, gasto) => total + Number(gasto.valor), 0)
    );
  }, [dados, dadosFiltrados]);

  const handleEdit = (gastoFixo: ReadGastoFixo) => {
    onGastoFixoChange(gastoFixo);
    onIsDialogOpenChange(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => setSortConfig(requestSort("nome", sortConfig))}
                  className="hover:bg-transparent p-0 font-semibold flex items-center"
                >
                  Nome
                  <SortIcon<ReadGastoFixo>
                    columnKey="nome"
                    sortConfig={sortConfig}
                  />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setSortConfig(requestSort("valor", sortConfig))
                  }
                  className="hover:bg-transparent p-0 font-semibold flex items-center"
                >
                  Valor
                  <SortIcon<ReadGastoFixo>
                    columnKey="valor"
                    sortConfig={sortConfig}
                  />
                </Button>
              </TableHead>
              <TableHead className="w-[100px] hover:bg-transparent p-0 font-semibold flex items-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosFiltrados?.map((gastoFixo) => (
              <TableRow key={gastoFixo.id}>
                <TableCell className="font-medium">{gastoFixo.nome}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {formatMoney(gastoFixo.valor)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-amber-700 hover:text-amber-900"
                      onClick={() => handleEdit(gastoFixo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertaExclusao
                      dados={dados}
                      gastoFixo={gastoFixo}
                      onDadosChange={onDadosChange}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Total Summary */}
      {dadosFiltrados.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">
              Total de Gastos Fixos Mensais
            </h3>
            <Badge
              variant="outline"
              className="text-lg font-semibold text-red-600 px-4 py-1.5 border-red-200"
            >
              {formatMoney(totalGastos)}
            </Badge>
          </div>
        </div>
      )}
    </>
  );
}
