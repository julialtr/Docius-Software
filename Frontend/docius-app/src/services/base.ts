import { LINK_API_VERSIONADA } from "@/utils/constants";

export async function secureFetch(
  input: RequestInfo,
  init?: RequestInit,
  isRetry: boolean = false
): Promise<Response> {
  const baseInit: RequestInit = {
    ...init,
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      ...(init?.headers || {}),
    },
  };

  let response = await fetch(input, baseInit);

  if (response.status === 401 && !isRetry) {
    const refreshResponse = await fetch(
      `${LINK_API_VERSIONADA}/autenticacao/refresh-token`,
      {
        method: "POST",
        credentials: "include" as RequestCredentials,
      }
    );

    if (!refreshResponse.ok)
      throw new Error("Sessão expirada. Faça login novamente.");

    response = await secureFetch(input, baseInit, true);
  }

  return response;
}

export async function secureFetchForm(
  input: RequestInfo,
  init?: RequestInit,
  isRetry: boolean = false
): Promise<Response> {
  const baseInit: RequestInit = {
    ...init,
    credentials: "include" as RequestCredentials,
    headers: {
      ...(init?.headers || {}),
    },
  };

  let response = await fetch(input, baseInit);

  if (response.status === 401 && !isRetry) {
    const refreshResponse = await fetch(
      `${LINK_API_VERSIONADA}/autenticacao/refresh-token`,
      {
        method: "POST",
        credentials: "include" as RequestCredentials,
      }
    );

    if (!refreshResponse.ok)
      throw new Error("Sessão expirada. Faça login novamente.");

    response = await secureFetch(input, baseInit, true);
  }

  return response;
}
