"use client";

import { Calculator, Save, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import ValorPorcao from "./ValorPorcao";
import { ReadPrecificacao, updateConvert } from "./interfaces";
import ResumoPrecificacao from "./ResumoPrecificacao";
import ConfiguracoesEspecificas from "./ConfiguracoesEspecificas";
import ListaIngredientes from "./ListaIngredientes";
import { updatePrecificacao } from "@/services/precificacao";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function PainelPrecificacao({
  dados,
  precificacao,
  onPrecificacaoChange,
  onDadosChange,
}: {
  dados: ReadPrecificacao[];
  precificacao: ReadPrecificacao | null;
  onPrecificacaoChange: (precificacao: ReadPrecificacao | null) => void;
  onDadosChange: (novosDados: ReadPrecificacao[]) => void;
}) {
  const { toast } = useToast();

  const salvarPrecificacao = async () => {
    if (!precificacao) return;

    try {
      const novoDado = await updatePrecificacao(
        precificacao.id,
        updateConvert(precificacao)
      );

      onDadosChange(
        dados.map((f) => (f.id === precificacao.id ? novoDado : f))
      );

      toast({
        title: "Precificação atualizada",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar a precificação",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="lg:col-span-2 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-amber-600" />
          Precificação
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {!precificacao ? (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-500 text-center">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-300" />
            <p>
              Selecione uma receita ao lado para visualizar e editar sua
              precificação.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6">
            <ConfiguracoesEspecificas
              precificacao={precificacao}
              onPrecificacaoChange={onPrecificacaoChange}
            />

            <ListaIngredientes
              precificacao={precificacao}
              onPrecificacaoChange={onPrecificacaoChange}
            />

            <ResumoPrecificacao
              precificacao={precificacao}
              onPrecificacaoChange={onPrecificacaoChange}
            />

            <ValorPorcao precificacao={precificacao} />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
          disabled={!precificacao}
          onClick={salvarPrecificacao}
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}
