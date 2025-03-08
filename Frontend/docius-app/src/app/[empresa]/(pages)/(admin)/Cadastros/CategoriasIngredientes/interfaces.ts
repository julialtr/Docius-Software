import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";

export interface ReadCategoriaIngrediente {
  id: number;
  nome: string;
  qtdIngredientes: number;
}

export interface CreateCategoriaIngrediente {
  id: number;
  nome: string;
}

export interface UpdateCategoriaIngrediente {
  id: number;
  nome: string;
}

export interface ReadReceitaCategoriaIngredienteProduto {
  id: number;
  medida: number;
  categoriaIngrediente: ReadCategoriaIngrediente;
  unidadeMedida: ReadUnidadeMedida;
}
