export const LINK_API_VERSIONADA = "https://localhost:7295/api/v1";
export const LINK_API = "https://localhost:7295";

export const getMultiplicadorUnidadeMedida = (sigla: string) => {
  if (sigla === "ml") return 1;
  if (sigla === "g") return 1;
  if (sigla === "kg") return 1000;
  if (sigla === "l") return 1000;

  return 1;
};

export enum StatusPedidoProduto {
  Concluido = 1,
  NaoConcluido = 2,
}

export enum StatusPedido {
  PagamentoPendente = 1,
  Confirmado = 2,
  EmProducao = 3,
  Concluido = 4,
}
