"use client";

import Image from "next/image";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

export default function Logo() {
  const { dadosEmpresa } = useDadosEmpresa();

  return (dadosEmpresa &&
    <div className="text-center lg:w-1/3 space-y-4 order-1">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={`/assets/${dadosEmpresa?.caminhoLogo}?height=250&width=250`}
          alt="Logo"
          width={250}
          height={250}
          priority
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Image
          src={`/assets/${dadosEmpresa?.caminhoImagem1}?height=200&width=200`}
          alt="Doce 1"
          width={200}
          height={200}
          className="rounded-2xl object-cover shadow-xl"
        />
        <Image
          src={`/assets/${dadosEmpresa?.caminhoImagem2}?height=200&width=200`}
          alt="Doce 2"
          width={200}
          height={200}
          className="rounded-2xl object-cover mt-8 shadow-xl"
        />
      </div>
    </div>
  );
}
