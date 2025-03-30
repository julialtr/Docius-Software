"use client";

import { Book, Timer } from "lucide-react";

import { ReadPrecificacao } from "./interfaces";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { formatTime } from "@/utils/format";

export default function PainelReceitas({
  dados,
  precificacao,
  onPrecificacaoChange,
}: {
  dados: ReadPrecificacao[];
  precificacao: ReadPrecificacao | null;
  onPrecificacaoChange: (precificacao: ReadPrecificacao | null) => void;
}) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-amber-600" />
          Receitas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {dados.map((dadosPrecificacao) => {
            return (
              <div
                key={dadosPrecificacao.id}
                className={`p-4 mb-3 border rounded-md cursor-pointer transition-colors ${
                  precificacao?.id === dadosPrecificacao.id
                    ? "bg-amber-50 border-amber-300"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onPrecificacaoChange(dadosPrecificacao)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">
                    {dadosPrecificacao.receita.nome}
                  </h3>
                  {dadosPrecificacao.valorAdotado !== 0 && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Precificada
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    {formatTime(dadosPrecificacao.receita.tempo)}
                  </div>
                  <div className="flex items-center gap-1">
                    {dadosPrecificacao.receita.qtdPorcoes}{" "}
                    {dadosPrecificacao.receita.qtdPorcoes > 1
                      ? "porções"
                      : dadosPrecificacao.receita.qtdPorcoes == 0
                      ? ""
                      : "porção"}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
