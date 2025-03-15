import { CreateReceitaCategoriaIngrediente, ReadReceitaCategoriaIngrediente, UpdateReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";

export interface CreateReceita {
  nome: string;
  descricao: string;
  tempo: string;
  qtdPorcoes: number;
  receitaCategoriaIngrediente: CreateReceitaCategoriaIngrediente[];
}

export interface UpdateReceita {
  nome: string;
  descricao: string;
  tempo: string;
  qtdPorcoes: number;
  receitaCategoriaIngrediente: UpdateReceitaCategoriaIngrediente[];
}

export interface ReadReceita {
  id: number;
  nome: string;
  descricao: string;
  tempo: string;
  qtdPorcoes: number;
  qtdProdutos: number;
  receitaCategoriaIngrediente: ReadReceitaCategoriaIngrediente[];
}

export function updateConvert(receita: ReadReceita): UpdateReceita {
  return {
    nome: receita.nome,
    descricao: receita.descricao,
    tempo: receita.tempo,
    qtdPorcoes: receita.qtdPorcoes,
    receitaCategoriaIngrediente: receita.receitaCategoriaIngrediente.map((ingrediente) => ({
      id: ingrediente.id,
      medida: ingrediente.medida,
      receitaId: ingrediente.receitaId,
      categoriaIngredienteId: ingrediente.categoriaIngrediente.id,
      unidadeMedidaId: ingrediente.unidadeMedida.id
    }))
  };
}

export function createConvert(receita: ReadReceita): CreateReceita {
  return {
    nome: receita.nome,
    descricao: receita.descricao,
    tempo: receita.tempo,
    qtdPorcoes: receita.qtdPorcoes,
    receitaCategoriaIngrediente: receita.receitaCategoriaIngrediente.map((ingrediente) => ({
      id: ingrediente.id,
      medida: ingrediente.medida,
      receitaId: ingrediente.receitaId,
      categoriaIngredienteId: ingrediente.categoriaIngrediente.id,
      unidadeMedidaId: ingrediente.unidadeMedida.id
    }))
  };
}
