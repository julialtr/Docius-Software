import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import { FilterDashboard } from "@/app/[empresa]/(pages)/Admin/Dashboard/interfaces";

export const findDashboard = async (filtro: FilterDashboard) => {
  try {
  const queryParams = new URLSearchParams(filtro as any).toString();

  const response = await secureFetch(
    `${LINK_API_VERSIONADA}/dashboard?${queryParams}`,
    {
      method: "GET",
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
