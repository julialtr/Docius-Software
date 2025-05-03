import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateIngrediente,
  FilterIngrediente,
  UpdateIngrediente,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Ingredientes/interfaces";

export const findIngredientes = async (filtro: FilterIngrediente) => {
  try {
    const queryParams = new URLSearchParams(filtro as any).toString();

    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/ingrediente?${queryParams}`,
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

export const updateIngrediente = async (
  id: number,
  ingrediente: UpdateIngrediente
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/ingrediente/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(ingrediente),
      }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createIngrediente = async (ingrediente: CreateIngrediente) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/ingrediente`, {
      method: "POST",
      body: JSON.stringify([ingrediente]),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteIngrediente = async (id: number) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/ingrediente/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
