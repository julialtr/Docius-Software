import { ReadReceitaProduto } from "../Receitas/interfaces";

export interface CreateProduto {
  nome: string;
  ReceitaId: number;
}

export interface UpdateProduto {
  nome: string;
  ReceitaId: number;
}

export interface ReadProduto {
  id: number;
  nome: string;
  preco: number;
  qtdPedidos: number;
  categoriaProdutoId?: number;
  receita: ReadReceitaProduto;
}

export function updateConvert(ingrediente: ReadProduto): UpdateProduto {
  return {
    nome: ingrediente.nome,
    ReceitaId: ingrediente.receita.id
  };
}

export function createConvert(ingrediente: ReadProduto): CreateProduto {
  return {
    nome: ingrediente.nome,
    ReceitaId: ingrediente.receita.id
  };
}
