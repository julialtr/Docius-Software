import { Usuario } from "@/pages/[empresa]/login/interfaces";
import { LINK_API } from "@/utils/constants";
import { Warning } from "@/hooks/warning";

export const login = async (usuario: Usuario) => {
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
