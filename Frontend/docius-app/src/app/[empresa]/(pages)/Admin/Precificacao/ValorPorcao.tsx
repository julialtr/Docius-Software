"use client";

import { ReadPrecificacao } from "./interfaces";

import { formatMoney } from "@/utils/format";

export default function ValorPorcao({
  precificacao,
}: {
  precificacao: ReadPrecificacao | null;
}) {
  return (
    precificacao && (
      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
        <h3 className="font-medium mb-3 flex items-center gap-1">
          Valor por porção
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Valor sugerido por porção:</p>
            <p className="font-bold text-lg text-green-700">
              {formatMoney(
                precificacao?.valorSugerido / precificacao?.receita.qtdPorcoes
              )}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Valor adotado por porção:</p>
            <p className="font-bold text-lg text-amber-700">
              {formatMoney(
                precificacao?.valorAdotado / precificacao?.receita.qtdPorcoes
              )}
            </p>
          </div>
        </div>
      </div>
    )
  );
}
