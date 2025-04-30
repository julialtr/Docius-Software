import { LINK_API_VERSIONADA } from "@/utils/constants";
import { Warning } from "@/hooks/warning";

import {
  CreateUsuario,
  FilterUsuario,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Clientes/interfaces";
import { EsqueceuSenha } from "@/app/[empresa]/(pages)/EsqueceuSenha/interfaces";
import { VerificacaoCodigo } from "@/app/[empresa]/(pages)/VerificacaoCodigo/interfaces";

export const login = async (usuario: FilterUsuario) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/autenticacao/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(usuario),
    });

    if (response.status == 401) throw new Warning("Email ou senha inválidos.");
    else if (!response.ok) throw new Error("Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/autenticacao/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
    });

    if (!response.ok) throw new Error("Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const esqueceuSenha = async (dados: EsqueceuSenha) => {
  try {
    const response = await fetch(
      `${LINK_API_VERSIONADA}/autenticacao/esqueceu-senha`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(dados)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status == 400)
        throw new Warning(errorData.Message || "Email inválido");
      else throw new Error(errorData.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};

export const verificacaoCodigo = async (dados: VerificacaoCodigo) => {
  try {
    const response = await fetch(
      `${LINK_API_VERSIONADA}/autenticacao/verificacao-codigo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(dados)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status == 400)
        throw new Warning(errorData.Message || "Código inválido");
      else throw new Error(errorData.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};

export const createUsuario = async (usuario: CreateUsuario) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify([usuario])
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
    const response = await fetch(`${LINK_API_VERSIONADA}/usuario/pedidos`, {
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

export const findUsuario = async (filtro: FilterUsuario) => { 
  try {
    const queryParams = new URLSearchParams(filtro as any).toString();

    const response = await fetch(
      `${LINK_API_VERSIONADA}/usuario?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        }
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
