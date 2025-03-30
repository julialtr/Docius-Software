import {
  UpdatePrecificacao,
} from "@/app/[empresa]/(pages)/Admin/Precificacao/interfaces";
import { LINK_API } from "@/utils/constants";

export const findPrecificacoes = async () => {
  try {
    const response = await fetch(`${LINK_API}/precificacao`, {
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

export const updatePrecificacao = async (id: number, precificacao: UpdatePrecificacao) => {
  try {
    const response = await fetch(`${LINK_API}/precificacao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(precificacao),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
