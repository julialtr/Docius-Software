"use client";

import { useState, useEffect } from "react";
import { Calculator, Clock, Percent } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import { ReadPrecificacao } from "./interfaces";
import { findGastosFixos } from "@/services/gastoFixo";

import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";

import { calculaGastosFixos } from "@/utils/precificacao";
import { timeToDecimal } from "@/utils/format";

export default function ConfiguracoesEspecificas({
  precificacao,
  onPrecificacaoChange,
}: {
  precificacao: ReadPrecificacao | null;
  onPrecificacaoChange: (precificacao: ReadPrecificacao | null) => void;
}) {
  const [dadosPrecificacao, setDadosPrecificacao] = useState<ReadPrecificacao>({
    id: 0,
    qtdHorasMensais: 0,
    porcentagemLucroEstimada: 0,
    valorInsumos: 0,
    valorGastosFixos: 0,
    valorSugerido: 0,
    valorAdotado: 0,
    receita: {
      id: 0,
      nome: "",
      descricao: "",
      tempo: "",
      qtdPorcoes: 0,
      qtdProdutos: 0,
      receitaCategoriaIngrediente: [],
    },
    precificacaoIngrediente: [],
  });

  const [totalGastosFixos, setTotalGastosFixos] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
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

  useEffect(() => {
    if (precificacao) {
      setDadosPrecificacao(precificacao);
    }
  }, [precificacao]);

  useEffect(() => {
    if (dadosPrecificacao) {
      onPrecificacaoChange(dadosPrecificacao);
    }
  }, [
    dadosPrecificacao.porcentagemLucroEstimada,
    dadosPrecificacao.qtdHorasMensais,
    dadosPrecificacao.valorGastosFixos,
  ]);

  const recalcularGastosFixos = async () => {
    if (!precificacao) return;

    const novoValorGastosFixos = calculaGastosFixos(
      totalGastosFixos,
      timeToDecimal(precificacao.receita.tempo),
      precificacao.qtdHorasMensais
    );

    setDadosPrecificacao({
      ...precificacao,
      valorGastosFixos: novoValorGastosFixos,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosPrecificacao((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    precificacao && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="porcentagemLucroEstimada"
            className="flex items-center gap-1"
          >
            <Percent className="h-4 w-4 text-amber-600" />
            Percentual de lucro desejado
          </Label>
          <Input
            id="porcentagemLucroEstimada"
            name="porcentagemLucroEstimada"
            type="number"
            min="0"
            max="100"
            value={dadosPrecificacao?.porcentagemLucroEstimada}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="qtdHorasMensais"
            className="flex items-center gap-1 mb-2"
          >
            <Clock className="h-4 w-4 text-amber-600" />
            Horas mensais trabalhadas
          </Label>
          <Input
            id="qtdHorasMensais"
            name="qtdHorasMensais"
            type="number"
            step="1"
            min="1"
            value={dadosPrecificacao.qtdHorasMensais}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 ">
          <Label className="flex items-center gap-1 mb-2 invisible">
            Botão de recalcular gastos fixos
          </Label>
          <Button
            onClick={recalcularGastosFixos}
            variant="outline"
            className="w-full flex items-center gap-1 mb-1"
          >
            <Calculator className="h-4 w-4" />
            Recalcular
          </Button>
        </div>
      </div>
    )
  );
}
