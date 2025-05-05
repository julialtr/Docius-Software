"use client";

import { createContext, useContext, useState } from "react";

interface DadosMenuContextProps {
  isCadastroMenuOpen: boolean;
  setIsCadastroMenuOpen: (novoEstado: boolean) => void;
}

const DadosMenuContext = createContext<DadosMenuContextProps | undefined>(
  undefined
);

export const DadosMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCadastroMenuOpen, setIsCadastroMenuOpen] = useState<boolean>(true);

  return (
    <DadosMenuContext.Provider
      value={{ isCadastroMenuOpen, setIsCadastroMenuOpen }}
    >
      {children}
    </DadosMenuContext.Provider>
  );
};

export const useDadosMenu = () => {
  const context = useContext(DadosMenuContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
