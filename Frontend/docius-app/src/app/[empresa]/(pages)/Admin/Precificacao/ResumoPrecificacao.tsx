"use client";

import { useState, useEffect } from "react";
import { DollarSign, Edit, Package, Save, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import { ReadPrecificacao } from "./interfaces";
import { findGastosFixos } from "@/services/gastoFixo";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Separator } from "@/app/_components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

import { formatMoney, timeToDecimal } from "@/utils/format";
import {
  calculaLucro,
  calculaValorSugerido,
} from "@/utils/precificacao";

export default function ResumoPrecificacao({
  precificacao,
  onPrecificacaoChange,
}: {
  precificacao: ReadPrecificacao | null;
  onPrecificacaoChange: (precificacao: ReadPrecificacao | null) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [valorLucro, setValorLucro] = useState<number>(0);
  const [totalGastosFixos, setTotalGastosFixos] = useState<number>(0);

  useEffect(() => {
    if (!precificacao) return;

    const novoValorLucro = calculaLucro(
      precificacao.porcentagemLucroEstimada,
      precificacao.valorInsumos,
      precificacao.valorGastosFixos
    );

    setValorLucro(novoValorLucro);

    const novoValorSugerido = calculaValorSugerido(
      precificacao.valorInsumos,
      precificacao.valorGastosFixos,
      novoValorLucro
    );

    onPrecificacaoChange({
      ...precificacao,
      valorSugerido: novoValorSugerido,
    });
  }, [
    precificacao?.porcentagemLucroEstimada,
    precificacao?.valorInsumos,
    precificacao?.valorGastosFixos,
  ]);

  useEffect(() => {
    if (!precificacao) return;

    setValorLucro(
      calculaLucro(
        precificacao.porcentagemLucroEstimada,
        precificacao.valorInsumos,
        precificacao.valorGastosFixos
      )
    );
  }, [precificacao]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!precificacao) return;

        const response = await findGastosFixos();

        if (!response.length) return;

        const valorGastosFixos = response.reduce(
          (total: number, gasto: { valor: number }) => total + gasto.valor,
          0
        );

        setTotalGastosFixos(valorGastosFixos);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler gastos fixos",
            description: error.message,
          });
        }
      }
    };

    loadData();
  }, []);

  return (
    precificacao && (
      <div className="bg-gray-50 p-4 rounded-md border">
        <h3 className="font-medium mb-3 flex items-center gap-1">
          Resumo da precificação:
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-gray-500" />
              <span>Valor dos ingredientes:</span>
            </div>
            <span className="font-medium">
              {formatMoney(precificacao?.valorInsumos)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Valor dos gastos fixos:</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Calculado como: (Gastos fixos × Tempo da receita) ÷ Horas
                    mensais
                  </p>
                  <p className="text-xs mt-1">
                    ({formatMoney(totalGastosFixos)} ×{" "}
                    {timeToDecimal(precificacao.receita.tempo)}h) ÷{" "}
                    {precificacao.qtdHorasMensais}h
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-medium">
              {formatMoney(precificacao.valorGastosFixos)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span>
                    Valor do lucro ({precificacao.porcentagemLucroEstimada}%):
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Calculado como: (Insumos + Gastos fixos) × Percentual de
                    lucro
                  </p>
                  <p className="text-xs mt-1">
                    (
                    {formatMoney(
                      precificacao.valorInsumos + precificacao.valorGastosFixos
                    )}
                    ) × {precificacao.porcentagemLucroEstimada}%
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="font-medium">{formatMoney(valorLucro)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-medium">Valor sugerido:</span>
            <span className="font-bold text-lg text-green-700">
              {formatMoney(precificacao.valorSugerido)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Valor adotado:</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={precificacao.valorAdotado}
                  onChange={(e) => {
                    const novoValor = e.target.value === "" ? 0 : Number(e.target.value);

                    onPrecificacaoChange({
                      ...precificacao,
                      valorAdotado: novoValor,
                    });
                  }}
                  className="w-24 text-right"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-amber-700">
                  {precificacao.valorAdotado > 0
                    ? formatMoney(precificacao.valorAdotado)
                    : formatMoney(precificacao.valorSugerido)}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
