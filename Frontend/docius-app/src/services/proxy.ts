import { LINK_API_VERSIONADA } from "@/utils/constants";
import { FilterWebScraping } from "@/app/[empresa]/(pages)/Admin/CotacaoIngredientes/interfaces";

export const findProdutos = async (filtro: FilterWebScraping) => {
  try {
    const queryParams = new URLSearchParams();

    filtro.idsMercados.forEach((id) =>
      queryParams.append("IdsMercados", id.toString())
    );

    queryParams.append("TextoPesquisa", filtro.textoPesquisa);

    const response = await fetch(
      `${LINK_API_VERSIONADA}/proxy?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        credentials: "include",
      }
    );

    if (response.status === 204) return [];

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
