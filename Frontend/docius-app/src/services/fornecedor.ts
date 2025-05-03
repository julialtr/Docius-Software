import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateFornecedor,
  UpdateFornecedor,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Fornecedores/interfaces";

export const findFornecedores = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/fornecedor`, {
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

export const updateFornecedor = async (
  id: number,
  fornecedor: UpdateFornecedor
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/fornecedor/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(fornecedor),
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

export const createFornecedor = async (fornecedor: CreateFornecedor) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/fornecedor`, {
      method: "POST",
      body: JSON.stringify([fornecedor]),
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
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/fornecedor/${id}`,
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
