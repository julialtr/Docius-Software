import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const empresaAuxiliar = pathname.match(/^\/([^/]+)/);
  const empresa = empresaAuxiliar ? empresaAuxiliar[1] : "";

  let token = req.cookies.get("accessToken")?.value;

  console.log("token", token);

  const publicRoutes = [
    `/${empresa}/Login`,
    `/${empresa}/Cadastro`,
    `/${empresa}/AcessoNegado`,
    `/${empresa}/NaoEncontrado`,
    `/${empresa}/EsqueceuSenha`,
    `/${empresa}/VerificacaoCodigo`,
    `/${empresa}/RedefinirSenha`,
  ];

  if (
    publicRoutes.includes(pathname) ||
    pathname == `/${empresa}` ||
    pathname.startsWith(`/${empresa}/VerificacaoCodigo/`)
  )
    return NextResponse.next();

  const host = req.headers.get("host");
  const protocol = req.nextUrl.protocol;
  const baseUrl = `${protocol}//${host}`;

  if (!token) token = req.cookies.get("refreshAccessToken")?.value;
  console.log("refreshAccessToken", token);
  
  if (!token) {
    console.log("redirecionamento", "sim");
    const redirecionamentoLogin =
      baseUrl + (empresa != "" ? `/${empresa}/Login` : "/NaoEncontrado");
    return NextResponse.redirect(new URL(redirecionamentoLogin));
  }

  try {
    const resultado =
      baseUrl + (empresa != "" ? `/${empresa}/AcessoNegado` : "/NaoEncontrado");

    const { payload } = await jwtVerify(token!, secretKey);

    const userRole =
      payload["role"] ||
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const adminRoutes = ["/Admin/"];
    if (userRole != "2") {
      for (const adminRoute of adminRoutes) {
        if (pathname.includes(adminRoute))
          return NextResponse.redirect(new URL(resultado));
      }
    }

    const clientRoutes = ["/Client/"];
    if (userRole != "1") {
      for (const clientRoute of clientRoutes) {
        if (pathname.includes(clientRoute))
          return NextResponse.redirect(new URL(resultado));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao validar token no middleware:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};
