export interface FilterDashboard {
  dataInicial: string;
  dataFinal: string;
}

export interface ReadDashboardPedidosMes {
  mes: string;
  quantidadePedidos: number;
}

export interface ReadDashboardPedidosStatus {
  status: string;
  quantidadePedidos: number;
}

export interface ReadDashboardProdutosMaisVendidos {
  nome: string;
  quantidadePedidos: number;
}

export interface ReadDashboard {
  valorFaturamentoBruto: number;
  valorMedioPedido: number;
  quantidadePedidos: number;
  valorFaturamentoBrutoProximoMes: number;
  pedidosMes: ReadDashboardPedidosMes[];
  pedidosStatus: ReadDashboardPedidosStatus[];
  produtosMaisVendidos: ReadDashboardProdutosMaisVendidos[];
}
