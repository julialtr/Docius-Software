import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";
import { Warning } from "@/hooks/warning";

import { FilterUsuario } from "@/app/[empresa]/(pages)/Admin/Cadastros/Clientes/interfaces";
import { EsqueceuSenha } from "@/app/[empresa]/(pages)/EsqueceuSenha/interfaces";
import { VerificacaoCodigo } from "@/app/[empresa]/(pages)/VerificacaoCodigo/interfaces";
import { RedefinirSenha } from "@/app/[empresa]/(pages)/RedefinirSenha/interfaces";

export const login = async (usuario: FilterUsuario) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/autenticacao/login`,
      {
        method: "POST",
        body: JSON.stringify(usuario),
      }
    );

    if (response.status == 401) throw new Warning("Email ou senha inválidos.");
    else if (!response.ok) throw new Error("Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/autenticacao/logout`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const esqueceuSenha = async (dados: EsqueceuSenha) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/autenticacao/esqueceu-senha`,
      {
        method: "POST",
        body: JSON.stringify(dados),
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
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/autenticacao/verificacao-codigo`,
      {
        method: "POST",
        body: JSON.stringify(dados),
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

export const redefinirSenha = async (dados: RedefinirSenha) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/autenticacao/redefinir-senha`,
      {
        method: "POST",
        body: JSON.stringify(dados),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status == 400)
        throw new Warning(errorData.Message || "Erro de conexão com a API.");
      else throw new Error(errorData.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
