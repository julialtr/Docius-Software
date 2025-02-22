"use client";

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

import NotFound from "@/app/not-found";
import Login from "@/app/[empresa]/(pages)/Login/page";

export default function Main() {
  const { dadosEmpresa } = useDadosEmpresa();

  return dadosEmpresa ? (
    <Login />
  ) : (
    <NotFound />
  );
}
