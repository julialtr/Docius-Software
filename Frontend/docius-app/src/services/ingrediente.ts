import {
  CreateIngrediente,
  FilterIngrediente,
  UpdateIngrediente,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Ingredientes/interfaces";
import { LINK_API_VERSIONADA } from "@/utils/constants";

export const findIngredientes = async (filtro: FilterIngrediente) => {
  try {
    const queryParams = new URLSearchParams(filtro as any).toString();

    const response = await fetch(`${LINK_API_VERSIONADA}/ingrediente?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
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

export const updateIngrediente = async (
  id: number,
  ingrediente: UpdateIngrediente
) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/ingrediente/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(ingrediente),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createIngrediente = async (ingrediente: CreateIngrediente) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/ingrediente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([ingrediente]),
      credentials: "include",
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
    const response = await fetch(`${LINK_API_VERSIONADA}/ingrediente/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
