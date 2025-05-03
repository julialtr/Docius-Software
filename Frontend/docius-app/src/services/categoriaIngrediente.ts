import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateCategoriaIngrediente,
  UpdateCategoriaIngrediente,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/CategoriasIngredientes/interfaces";

export const findCategoriasIngredientes = async () => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/categoria-ingrediente`,
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

export const updateCategoriaIngrediente = async (
  id: number,
  categoriaIngrediente: UpdateCategoriaIngrediente
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/categoria-ingrediente/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(categoriaIngrediente),
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

export const createCategoriaIngrediente = async (
  categoriaIngrediente: CreateCategoriaIngrediente
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/categoria-ingrediente`,
      {
        method: "POST",
        body: JSON.stringify([categoriaIngrediente]),
      }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteCategoriaIngrediente = async (id: number) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/categoria-ingrediente/${id}`,
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
