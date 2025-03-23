import { ReadReceita } from "../Receitas/interfaces";

export interface CreateProduto {
  nome: string;
  receitaId: number;
}

export interface UpdateProduto {
  nome: string;
  receitaId: number;
  categoriaProdutoId?: number;
}

export interface ReadProduto {
  id: number;
  nome: string;
  preco: number;
  qtdPedidos: number;
  categoriaProdutoId?: number;
  receita: ReadReceita;
}

export function updateConvert(ingrediente: ReadProduto): UpdateProduto {
  return {
    nome: ingrediente.nome,
    receitaId: ingrediente.receita.id
  };
}

export function createConvert(ingrediente: ReadProduto): CreateProduto {
  return {
    nome: ingrediente.nome,
    receitaId: ingrediente.receita.id
  };
}
