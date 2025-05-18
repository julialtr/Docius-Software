import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = [] } = req.query;
  const targetUrl = `https://docius-api-csharp.fly.dev/api/${
    Array.isArray(path) ? path.join("/") : path
  }`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, value as string);
  }
  headers.delete("host");

  const proxyRes = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method || "") ? undefined : req.body,
  });

  res.status(proxyRes.status);
  proxyRes.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "content-encoding") {
      res.setHeader(key, value);
    }
  });

  const buffer = await proxyRes.arrayBuffer();
  res.send(Buffer.from(buffer));
}
