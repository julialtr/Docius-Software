import {
  CreateProduto,
  UpdateProduto,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Produtos/interfaces";
import { LINK_API } from "@/utils/constants";

export const findProdutos = async () => {
  try {
    const response = await fetch(`${LINK_API}/produto`, {
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

export const updateProduto = async (id: number, produto: UpdateProduto) => {
  try {
    const response = await fetch(`${LINK_API}/produto/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(produto),
      credentials: "include",
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
    const response = await fetch(`${LINK_API}/produto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([produto]),
      credentials: "include",
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
    const response = await fetch(`${LINK_API}/produto/${id}`, {
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
