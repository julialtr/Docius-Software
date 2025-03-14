export interface ReadCategoriaIngrediente {
  id: number;
  nome: string;
  qtdIngredientes: number;
  qtdReceitas: number;
}

export interface CreateCategoriaIngrediente {
  id: number;
  nome: string;
}

export interface UpdateCategoriaIngrediente {
  id: number;
  nome: string;
}
