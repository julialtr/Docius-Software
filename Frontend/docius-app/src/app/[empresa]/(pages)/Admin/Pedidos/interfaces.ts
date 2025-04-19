import { StatusPedido } from "@/utils/constants";
import {
  CreatePedidoProduto,
  ReadPedidoProduto,
} from "../../Client/Cardapio/interfaces";
import { ReadUsuario } from "../Cadastros/Clientes/interfaces";

export interface DetalhesPedido {
  pedidoProduto: CreatePedidoProduto[];
  precoTotal: number;
  dataEntrega: string;
  horaEntrega: string;
  numeroPedido: string;
}

export interface FiltroPedido {
  usuarioId: number;
}

export interface CreatePedido {
  identificador: string;
  dataHoraEntrega: string;
  usuarioId: number;
  pedidoProduto: CreatePedidoProduto[];
}

export interface ReadPedido {
  id: number;
  identificador: string;
  dataHoraEntrega: string;
  statusPedidoId: number;
  usuario: ReadUsuario;
  pedidoProduto: ReadPedidoProduto[];
}

export type StatusPedidoColuna = {
  id: StatusPedido;
  titulo: string;
};
