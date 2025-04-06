import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "./_components/ui/toaster";

import { DadosEmpresaProvider } from "@/context/DadosEmpresaContext";
import { DadosCategoriaProdutoProvider } from "@/context/DadosCategoriaProdutoContext";
import { DadosCotacaoProvider } from "@/context/DadosCotacaoContext";
import { DadosPersonalizacaoFotoProvider } from "@/context/DadosPersonalizacaoFotoContext";
import { DadosUsuarioProvider } from "@/context/DadosUsuarioContext";

export const metadata: Metadata = {
  title: "Docius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DadosEmpresaProvider>
      <DadosUsuarioProvider>
        <DadosCategoriaProdutoProvider>
          <DadosCotacaoProvider>
            <DadosPersonalizacaoFotoProvider>
              <html lang="pt-BR">
                <body>
                  {children}
                  <Toaster />
                </body>
              </html>
            </DadosPersonalizacaoFotoProvider>
          </DadosCotacaoProvider>
        </DadosCategoriaProdutoProvider>
      </DadosUsuarioProvider>
    </DadosEmpresaProvider>
  );
}
