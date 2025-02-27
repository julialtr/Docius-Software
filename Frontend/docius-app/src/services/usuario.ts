import { LINK_API } from "@/utils/constants";
import { Warning } from "@/hooks/warning";
import {
  CreateUsuario,
  FilterUsuario,
} from "@/app/[empresa]/(pages)/(admin)/Cadastros/Clientes/interfaces";

export const login = async (usuario: FilterUsuario) => {
  try {
    const response = await fetch(`${LINK_API}/autenticacao/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(usuario),
      credentials: "include",
    });

    if (response.status == 401) throw new Warning("Email ou senha inválidos.");
    else if (!response.ok) throw new Error("Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createUsuario = async (usuario: CreateUsuario) => {
  try {
    const response = await fetch(`${LINK_API}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
        body: JSON.stringify([usuario]),
        credentials: "include",
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
    const response = await fetch(`${LINK_API}/usuario`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};
