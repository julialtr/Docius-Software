import { ReadIngrediente } from "@/app/[empresa]/(pages)/Admin/Cadastros/Ingredientes/interfaces";
import { getMultiplicadorUnidadeMedida } from "./constants";
import { ReadReceitaCategoriaIngrediente } from "@/app/[empresa]/(pages)/Admin/Cadastros/Receitas/(CategoriasIngredientes)/interfaces";

export const calculaGastosFixos = (
  gastosFixos: number,
  tempoReceita: number,
  qtdHorasMensais: number
) => {
  if (!qtdHorasMensais) return 0;

  return (gastosFixos * tempoReceita) / qtdHorasMensais;
};

export const calculaLucro = (
  porcentagemLucro: number,
  valorInsumos: number,
  valorGastosFixos: number
) => {
  return (valorInsumos + valorGastosFixos) * (porcentagemLucro / 100);
};

export const calculaValorSugerido = (
  valorInsumos: number,
  valorGastosFixos: number,
  valorLucro: number
) => {
  return valorInsumos + valorGastosFixos + valorLucro;
};

export const calculaValorIngredienteReceita = (
  ingrediente: ReadIngrediente,
  ingredienteReceita: ReadReceitaCategoriaIngrediente | undefined
) => {
  if (!ingrediente || !ingredienteReceita) return 0;

  const precoUnitario =
    ingrediente.preco /
    (ingrediente.medida *
      getMultiplicadorUnidadeMedida(ingrediente.unidadeMedida.sigla));

  const quantidade =
    ingredienteReceita.medida *
    getMultiplicadorUnidadeMedida(ingredienteReceita.unidadeMedida.sigla);

  return precoUnitario * quantidade;
};
