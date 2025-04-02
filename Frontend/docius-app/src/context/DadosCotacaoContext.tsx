"use client";

import { createContext, useContext, useState } from "react";

interface DadosCotacaoContextProps {
  id: number;
  incrementaId: () => number;
}

const DadosCotacaoContext = createContext<DadosCotacaoContextProps | undefined>(
  undefined
);

export const DadosCotacaoProvider = ({
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
    <DadosCotacaoContext.Provider value={{ id, incrementaId }}>
      {children}
    </DadosCotacaoContext.Provider>
  );
};

export const useDadosCotacao = () => {
  const context = useContext(DadosCotacaoContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
