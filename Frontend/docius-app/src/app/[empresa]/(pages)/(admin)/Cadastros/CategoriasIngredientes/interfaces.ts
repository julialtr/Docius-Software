import { ReadIngredienteCategoriaIngrediente } from "../Ingredientes/interfaces";

export interface ReadCategoriaIngrediente {
  id: number;
  nome: string;
  qtd_ingredientes: number;
  ingredientes: ReadIngredienteCategoriaIngrediente[];
}

export interface CreateCategoriaIngrediente {
  id: number;
  nome: string;
}

export interface UpdateCategoriaIngrediente {
  id: number;
  nome: string;
}
