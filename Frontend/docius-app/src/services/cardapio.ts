import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import { UpdateCardapio } from "@/app/[empresa]/(pages)/Admin/Cadastros/Cardapio/interfaces";

export const findCardapio = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/cardapio`, {
      method: "GET",
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
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/cardapio/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(cardapio),
      }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
