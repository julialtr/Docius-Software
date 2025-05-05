import { ReadReceita } from "../Receitas/interfaces";

export interface CreateProduto {
  nome: string;
  receitaId: number;
  caminhoFoto: string;
}

export interface UpdateProduto {
  nome: string;
  receitaId: number;
  caminhoFoto: string;
  categoriaProdutoId?: number;
}

export interface UpdateProdutoCardapio {
  id: number;
  nome: string;
  preco: number;
  caminhoFoto: string;
  qtdPedidos: number;
  categoriaProdutoId?: number;
  receitaId: number;
}

export interface ReadProduto {
  id: number;
  nome: string;
  preco: number;
  caminhoFoto: string;
  qtdPedidos: number;
  categoriaProdutoId?: number;
  receita: ReadReceita;
}

export function updateConvert(produto: ReadProduto): UpdateProduto {
  return {
    nome: produto.nome,
    receitaId: produto.receita.id,
    caminhoFoto: produto.caminhoFoto
  };
}

export function createConvert(produto: ReadProduto): CreateProduto {
  return {
    nome: produto.nome,
    receitaId: produto.receita.id,
    caminhoFoto: produto.caminhoFoto
  };
}
