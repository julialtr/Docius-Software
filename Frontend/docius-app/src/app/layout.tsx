import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "./_components/ui/toaster";
import { FloatingChat } from "@/app/_components/Chatbot/floating-chat";

import { DadosEmpresaProvider } from "@/context/DadosEmpresaContext";
import { DadosCategoriaProdutoProvider } from "@/context/DadosCategoriaProdutoContext";
import { DadosCotacaoProvider } from "@/context/DadosCotacaoContext";
import { DadosPersonalizacaoFotoProvider } from "@/context/DadosPersonalizacaoFotoContext";
import { DadosUsuarioProvider } from "@/context/DadosUsuarioContext";
import { DadosMenuProvider } from "@/context/DadosMenuContext";

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
            <DadosMenuProvider>
              <html lang="pt-BR">
                <body>
                  {children}
                  <Toaster />
                  <FloatingChat />
                </body>
              </html>
            </DadosMenuProvider>
            </DadosPersonalizacaoFotoProvider>
          </DadosCotacaoProvider>
        </DadosCategoriaProdutoProvider>
      </DadosUsuarioProvider>
    </DadosEmpresaProvider>
  );
}
