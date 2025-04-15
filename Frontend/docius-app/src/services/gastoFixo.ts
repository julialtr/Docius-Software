import {
  CreateGastoFixo,
  UpdateGastoFixo,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/GastosFixos/interfaces";
import { LINK_API_VERSIONADA } from "@/utils/constants";

export const findGastosFixos = async () => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/gasto`, {
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

export const updateGastoFixo = async (
  id: number,
  gastoFixo: UpdateGastoFixo
) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/gasto/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(gastoFixo),
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

export const createGastoFixo = async (gastoFixo: CreateGastoFixo) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/gasto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([gastoFixo]),
      credentials: "include",
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
    const response = await fetch(`${LINK_API_VERSIONADA}/gasto/${id}`, {
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
