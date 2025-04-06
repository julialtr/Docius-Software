"use client";

import { createContext, useContext, useState } from "react";

interface DadosPersonalizacaoFotoContextProps {
  id: number;
  incrementaId: () => number;
}

const DadosPersonalizacaoFotoContext = createContext<
  DadosPersonalizacaoFotoContextProps | undefined
>(undefined);

export const DadosPersonalizacaoFotoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<number>(0);
  let idAtual = id;

  const incrementaId = () => {
    idAtual += 1;
    setId(idAtual);
    return idAtual;
  };

  return (
    <DadosPersonalizacaoFotoContext.Provider value={{ id, incrementaId }}>
      {children}
    </DadosPersonalizacaoFotoContext.Provider>
  );
};

export const useDadosPersonalizacaoFoto = () => {
  const context = useContext(DadosPersonalizacaoFotoContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
