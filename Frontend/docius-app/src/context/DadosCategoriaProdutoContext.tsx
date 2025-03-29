"use client";

import { createContext, useContext, useState } from "react";

interface DadosCategoriaProdutoContextProps {
  id: number;
  incrementaId: () => number;
}

const DadosCategoriaProdutoContext = createContext<
  DadosCategoriaProdutoContextProps | undefined
>(undefined);

export const DadosCategoriaProdutoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<number>(1);

  const incrementaId = () => {
    setId((prev) => prev + 1);
    return id;
  };

  return (
    <DadosCategoriaProdutoContext.Provider value={{ id, incrementaId }}>
      {children}
    </DadosCategoriaProdutoContext.Provider>
  );
};

export const useDadosCategoriaProduto = () => {
  const context = useContext(DadosCategoriaProdutoContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
