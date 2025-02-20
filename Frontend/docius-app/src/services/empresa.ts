import { LINK_API } from "@/utils/constants";
import { Warning } from "@/hooks/warning";

export const findEmpresas = async (dominio: string) => {
  try {
    if (!dominio || dominio.length == 0)
      throw new Warning("É necessário informar uma URL válida.");

    const response = await fetch(`${LINK_API}/empresa?Dominio=${dominio}`);

    if (!response.ok) throw new Error("Erro de conexão com a API.");

    if (response.status == 204)
      throw new Warning("É necessário informar uma URL válida.");

    return await response.json();
  } catch (error) {
    throw error;
  }
};
