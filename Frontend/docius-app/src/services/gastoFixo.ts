import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateGastoFixo,
  UpdateGastoFixo,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/GastosFixos/interfaces";

export const findGastosFixos = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/gasto`, {
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

export const updateGastoFixo = async (
  id: number,
  gastoFixo: UpdateGastoFixo
) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/gasto/${id}`, {
      method: "PATCH",
      body: JSON.stringify(gastoFixo),
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};

export const createGastoFixo = async (gastoFixo: CreateGastoFixo) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/gasto`, {
      method: "POST",
      body: JSON.stringify([gastoFixo]),
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteGastoFixo = async (id: number) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/gasto/${id}`, {
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
