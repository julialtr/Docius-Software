import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateProduto,
  UpdateProduto,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Produtos/interfaces";

export const findProdutos = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto`, {
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

export const updateProduto = async (id: number, produto: UpdateProduto) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto/${id}`, {
      method: "PATCH",
      body: JSON.stringify(produto),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createProduto = async (produto: CreateProduto) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto`, {
      method: "POST",
      body: JSON.stringify([produto]),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteProduto = async (id: number) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto/${id}`, {
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
