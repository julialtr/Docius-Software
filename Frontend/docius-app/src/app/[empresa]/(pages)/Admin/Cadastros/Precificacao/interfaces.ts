import { ReadReceita } from "../Receitas/interfaces";
import { ReadPrecificacaoIngrediente, UpdatePrecificacaoIngrediente } from "./(PrecificacoesIngredientes)/interfaces";

export interface UpdatePrecificacao {
  qtdHorasMensais: number;
  porcentagemLucroEstimada: number;
  valorInsumos: number;
  valorGastosFixos: number;
  valorSugerido: number;
  valorAdotado: number;
  receitaId: number;
  precificacaoIngrediente: UpdatePrecificacaoIngrediente[];
}

export interface ReadPrecificacao {
  id: number;
  qtdHorasMensais: number;
  porcentagemLucroEstimada: number;
  valorInsumos: number;
  valorGastosFixos: number;
  valorSugerido: number;
  valorAdotado: number;
  receita: ReadReceita;
  precificacaoIngrediente: ReadPrecificacaoIngrediente[];
}

export function updateConvert(precificacao: ReadPrecificacao): UpdatePrecificacao {
  return {
    qtdHorasMensais: Number(precificacao.qtdHorasMensais),
    porcentagemLucroEstimada: Number(precificacao.porcentagemLucroEstimada),
    valorInsumos: precificacao.valorInsumos,
    valorGastosFixos: precificacao.valorGastosFixos,
    valorSugerido: precificacao.valorSugerido,
    valorAdotado: precificacao.valorAdotado,
    receitaId: precificacao.receita.id,
    precificacaoIngrediente: precificacao.precificacaoIngrediente.map(
      (precificacaoIngrediente) => ({
        id: precificacaoIngrediente.id,
        precificacaoId: precificacaoIngrediente.precificacaoId,
        ingredienteId: precificacaoIngrediente.ingredienteId,
      })
    ),
  };
}
