export interface CreatePedidoProduto {
  id: number;
  quantidade: number;
  pedidoId: number;
  produtoId: number;
  personalizacao?: CreatePersonalizacao;
}

export interface CreatePersonalizacao {
  descricao: string;
  personalizacaoFoto: CreatePersonalizacaoFoto[];
}

export interface CreatePersonalizacaoFoto {
  id: number;
  caminhoFoto: string;
}
