import {
  CreateReceita,
  UpdateReceita,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Receitas/interfaces";
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

export const updateReceita = async (id: number, receita: UpdateReceita) => {
  try {
    const response = await fetch(`${LINK_API}/receita/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(receita),
      credentials: "include",
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
    const response = await fetch(`${LINK_API}/receita`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(receita),
      credentials: "include",
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
    const response = await fetch(`${LINK_API}/receita/${id}`, {
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
