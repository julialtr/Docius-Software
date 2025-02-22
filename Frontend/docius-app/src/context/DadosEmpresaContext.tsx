"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { Empresa } from "@/app/[empresa]/interfaces";
import { findEmpresas } from "@/services/empresa";

interface DadosEmpresaContextProps {
  dadosEmpresa: Empresa | null;
  carregarDados: () => Promise<void>;
}

const DadosEmpresaContext = createContext<DadosEmpresaContextProps | undefined>(
  undefined
);

export const DadosEmpresaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dadosEmpresa, setDadosEmpresa] = useState<Empresa | null>(null);

  const carregarDados = async () => {
    try {
      const dominio = window.location.pathname.split("/")[1];

      const data = await findEmpresas(dominio);
      setDadosEmpresa(data[0]);
    } catch (error) {
      console.error("Erro ao buscar dados da empresa", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <DadosEmpresaContext.Provider value={{ dadosEmpresa, carregarDados }}>
      {children}
    </DadosEmpresaContext.Provider>
  );
};

export const useDadosEmpresa = () => {
  const context = useContext(DadosEmpresaContext);
  if (!context) {
    throw new Error(
      "Falha ao usar o contexto."
    );
  }
  return context;
};
