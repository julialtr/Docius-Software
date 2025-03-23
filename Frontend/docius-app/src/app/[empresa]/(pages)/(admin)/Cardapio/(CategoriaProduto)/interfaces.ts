import {
  ReadProduto,
  UpdateProduto,
} from "../../Cadastros/Produtos/interfaces";

export interface UpdateCategoriaProduto {
  nome: string;
  cardapioId: number;
  categoriaProdutoInferior: UpdateCategoriaProduto[];
  categoriaProdutoSuperiorId: number;
  produto: UpdateProduto[];
}

export interface ReadCategoriaProduto {
  id: number;
  nome: string;
  cardapioId: number;
  categoriaProdutoInferior: ReadCategoriaProduto[];
  categoriaProdutoSuperiorId: number;
  produto: ReadProduto[];
  isOpen: boolean;
}
