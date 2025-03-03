import { ReadIngredienteCategoriaIngrediente } from "../Ingredientes/interfaces";

export interface ReadCategoriaIngrediente {
  id: number;
  nome: string;
  qtdIngredientes: number;
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
