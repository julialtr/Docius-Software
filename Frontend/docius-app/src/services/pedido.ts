import { LINK_API } from "@/utils/constants";
import { CreatePedido } from "@/app/[empresa]/(pages)/Client/(Pedido)/interfaces";

export const createPedido = async (pedido: CreatePedido) => {
  try {
    const response = await fetch(`${LINK_API}/pedido`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(pedido),
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
