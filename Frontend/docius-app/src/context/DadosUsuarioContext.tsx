"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface DadosUsuarioContextProps {
  id: number;
  setId: (novoId: number) => void;
}

const DadosUsuarioContext = createContext<DadosUsuarioContextProps | undefined>(
  undefined
);

export const DadosUsuarioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setId(parseInt(stored));
  }, []);

  return (
    <DadosUsuarioContext.Provider value={{ id, setId }}>
      {children}
    </DadosUsuarioContext.Provider>
  );
};

export const useDadosUsuario = () => {
  const context = useContext(DadosUsuarioContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
