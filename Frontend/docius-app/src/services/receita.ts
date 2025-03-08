import { LINK_API } from "@/utils/constants";

export const findReceitas = async () => {
  try {
    const response = await fetch(`${LINK_API}/receita`, {
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
