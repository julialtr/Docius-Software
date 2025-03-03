import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "./_components/ui/toaster";

import { DadosEmpresaProvider } from "@/context/DadosEmpresaContext";

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
      <html lang="pt-BR">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </DadosEmpresaProvider>
  );
}
