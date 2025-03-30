import {
  CreateCategoriaIngrediente,
  UpdateCategoriaIngrediente,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/CategoriasIngredientes/interfaces";
import { LINK_API } from "@/utils/constants";

export const findCategoriasIngredientes = async () => {
  try {
    const response = await fetch(`${LINK_API}/categoria-ingrediente`, {
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

export const updateCategoriaIngrediente = async (
  id: number,
  categoriaIngrediente: UpdateCategoriaIngrediente
) => {
  try {
    const response = await fetch(`${LINK_API}/categoria-ingrediente/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(categoriaIngrediente),
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

export const createCategoriaIngrediente = async (
  categoriaIngrediente: CreateCategoriaIngrediente
) => {
  try {
    const response = await fetch(`${LINK_API}/categoria-ingrediente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([categoriaIngrediente]),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteCategoriaIngrediente = async (id: number) => {
  try {
    const response = await fetch(`${LINK_API}/categoria-ingrediente/${id}`, {
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
