import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateReceita,
  UpdateReceita,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Receitas/interfaces";

export const findReceitas = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/receita`, {
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

export const updateReceita = async (id: number, receita: UpdateReceita) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/receita/${id}`, {
      method: "PUT",
      body: JSON.stringify(receita),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createReceita = async (receita: CreateReceita) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/receita`, {
      method: "POST",
      body: JSON.stringify(receita),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteReceita = async (id: number) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/receita/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
