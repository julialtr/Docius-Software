import { ReadReceitaCategoriaIngredienteProduto } from "../CategoriasIngredientes/interfaces";

export interface ReadReceitaProduto {
  id: number;
  nome: string;
  descricao: string;
  tempo: Date;
  qtdPorcoes: number;
  ingredientes: ReadReceitaCategoriaIngredienteProduto[];
}
