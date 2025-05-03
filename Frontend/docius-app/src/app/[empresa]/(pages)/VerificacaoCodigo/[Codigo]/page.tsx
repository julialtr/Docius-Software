"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VerificacaoCodigo from "../VerificacaoCodigo";

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

export default function Login() {
  const params = useParams();
  const { carregarDados } = useDadosEmpresa();

  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {   
    if (params?.Codigo && typeof params.Codigo === "string") {
      setCodigo(params.Codigo.split("").slice(0, 6));
    }

    carregarDados();
  }, []);

  return <VerificacaoCodigo codigoEmail={codigo.join("")} />;
}
