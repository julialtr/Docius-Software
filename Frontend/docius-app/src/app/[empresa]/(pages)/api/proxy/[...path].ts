// pages/api/[...proxy].ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { proxy } = req.query;
  const path = Array.isArray(proxy) ? proxy.join("/") : proxy;
  const url = `https://docius-api-csharp.fly.dev/api/${path}`;

  // Converter os headers para um formato que o fetch aceita
  const headers: HeadersInit = {};
  for (const [key, value] of Object.entries(req.headers)) {
    // Ignora headers que não devem ser reenviados
    if (typeof value === "string") {
      headers[key] = value;
    }
  }

  const response = await fetch(url, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    credentials: "include",
  });

  // Copia os headers da resposta
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      res.setHeader(key, value);
    }
  });

  const data = await response.arrayBuffer();
  res.status(response.status).send(Buffer.from(data));
}
