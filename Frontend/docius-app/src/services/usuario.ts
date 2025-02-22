import { LINK_API } from "@/utils/constants";
import { Warning } from "@/hooks/warning";
import { UsuarioFiltro } from "@/app/[empresa]/(pages)/Login/interfaces";
import { Usuario } from "@/app/[empresa]/(pages)/Cadastro/interfaces";

export const login = async (usuario: UsuarioFiltro) => {
  try {
    const response = await fetch(`${LINK_API}/autenticacao/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(usuario),
    });

    if (response.status == 401) throw new Warning("Email ou senha inválidos.");
    else if (!response.ok) throw new Error("Erro de conexão com a API.");

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createUsuario = async (usuario: Usuario) => {
  try {
    const response = await fetch(`${LINK_API}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
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
