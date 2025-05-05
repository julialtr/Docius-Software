import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import { UpdatePrecificacao } from "@/app/[empresa]/(pages)/Admin/Cadastros/Precificacao/interfaces";

export const findPrecificacoes = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/precificacao`, {
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

export const updatePrecificacao = async (
  id: number,
  precificacao: UpdatePrecificacao
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/precificacao/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(precificacao),
      }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
