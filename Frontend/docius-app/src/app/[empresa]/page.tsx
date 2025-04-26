"use client";

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

import NotFound from "@/app/not-found";
import Cardapio from "./(pages)/Client/Cardapio/page";

export default function Main() {
  const { dadosEmpresa } = useDadosEmpresa();

  return dadosEmpresa ? (
    <Cardapio />
  ) : (
    <NotFound />
  );
}
