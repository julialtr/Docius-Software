import { LINK_API_VERSIONADA } from "@/utils/constants";
import { Warning } from "@/hooks/warning";

export const findEmpresas = async (dominio: string) => {
  try {
    if (!dominio || dominio.length == 0)
      throw new Warning("É necessário informar uma URL válida.");

    const response = await fetch(`${LINK_API_VERSIONADA}/empresa?Dominio=${dominio}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
  });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Erro de conexão com a API.");
    }

    if (response.status == 204)
      throw new Warning("É necessário informar uma URL válida.");

    return await response.json();
  } catch (error) {
    throw error;
  }
};
