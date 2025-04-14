import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";

export interface CreatePedidoProduto {
  id: number;
  quantidade: number;
  pedidoId: number;
  produtoId: number;
  personalizacao?: CreatePersonalizacao;
}

export interface ReadPedidoProduto {
  id: number;
  quantidade: number;
  statusPedidoProdutoId: number;
  produto: ReadProduto;
  personalizacao?: ReadPersonalizacao;
}

export interface CreatePersonalizacao {
  descricao: string;
  personalizacaoFoto: CreatePersonalizacaoFoto[];
}

export interface ReadPersonalizacao {
  descricao: string;
  personalizacaoFoto: ReadPersonalizacaoFoto[];
}

export interface CreatePersonalizacaoFoto {
  id: number;
  caminhoFoto: string;
}

export interface ReadPersonalizacaoFoto {
  id: number;
  caminhoFoto: string;
}
