import { CreatePedidoProduto } from "../Cardapio/interfaces";

export interface DetalhesPedido {
  pedidoProdutos: CreatePedidoProduto[];
  precoTotal: number;
  dataEntrega: string;
  horaEntrega: string;
  numeroPedido: string;
}
