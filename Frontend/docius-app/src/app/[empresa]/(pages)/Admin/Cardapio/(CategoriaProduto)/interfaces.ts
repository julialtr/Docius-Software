import {
  ReadProduto,
  UpdateProdutoCardapio,
} from "../../Cadastros/Produtos/interfaces";

export interface UpdateCategoriaProduto {
  nome: string;
  cardapioId: number;
  categoriaProdutoInferior: UpdateCategoriaProduto[];
  categoriaProdutoSuperiorId?: number;
  produto: UpdateProdutoCardapio[];
}

export interface ReadCategoriaProduto {
  id: number;
  nome: string;
  cardapioId: number;
  categoriaProdutoInferior: ReadCategoriaProduto[];
  categoriaProdutoSuperiorId?: number;
  produto: ReadProduto[];
  isOpen: boolean;
}
