import { CreatePedidoProduto } from "../Cardapio/interfaces";

export interface DetalhesPedido {
  pedidoProduto: CreatePedidoProduto[];
  precoTotal: number;
  dataEntrega: string;
  horaEntrega: string;
  numeroPedido: string;
}

export interface CreatePedido {
  identificador: string;
  dataHoraEntrega: string;
  usuarioId: number;
  pedidoProduto: CreatePedidoProduto[];
} 
