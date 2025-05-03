import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import {
  CreateUsuario,
  FilterUsuario,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Clientes/interfaces";

export const createUsuario = async (usuario: CreateUsuario) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/usuario`, {
      method: "POST",
      body: JSON.stringify([usuario]),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};

export const findUsuarios = async () => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/usuario/pedidos`,
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

export const findUsuario = async (filtro: FilterUsuario) => {
  try {
    const queryParams = new URLSearchParams(filtro as any).toString();

    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/usuario?${queryParams}`,
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
