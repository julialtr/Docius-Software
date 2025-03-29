import {
  UpdateCardapio,
} from "@/app/[empresa]/(pages)/(admin)/Cardapio/interfaces";
import { LINK_API } from "@/utils/constants";

export const findCardapios = async () => {
  try {
    const response = await fetch(`${LINK_API}/cardapio`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 204) return [];

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const updateCardapio = async (id: number, cardapio: UpdateCardapio) => {
  try {
    const response = await fetch(`${LINK_API}/cardapio/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(cardapio),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
