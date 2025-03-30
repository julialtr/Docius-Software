import {
  CreateFornecedor,
  UpdateFornecedor,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Fornecedores/interfaces";
import { LINK_API } from "@/utils/constants";

export const findFornecedores = async () => {
  try {
    const response = await fetch(`${LINK_API}/fornecedor`, {
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

export const updateFornecedor = async (
  id: number,
  fornecedor: UpdateFornecedor
) => {
  try {
    const response = await fetch(`${LINK_API}/fornecedor/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(fornecedor),
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

export const createFornecedor = async (fornecedor: CreateFornecedor) => {
  try {
    const response = await fetch(`${LINK_API}/fornecedor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([fornecedor]),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteFornecedor = async (id: number) => {
  try {
    const response = await fetch(`${LINK_API}/fornecedor/${id}`, {
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
