"use client";

import { createThread, deleteThread } from "@/services/chatbot";
import { createContext, useContext, useEffect, useState } from "react";

interface DadosChatbotContextProps {
  threadId: string | null;
  criaThread: () => Promise<void>;
  deletaThread: () => Promise<void>;
}

const DadosChatbotContext = createContext<DadosChatbotContextProps | undefined>(
  undefined
);

export const DadosChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("threadId");

    if (stored) setThreadId(stored);
  }, []);

  const criaThread = async () => {
    try {
      if (!threadId) {
        const id = await createThread();

        localStorage.setItem("threadId", id);

        setThreadId(id);
      }
    } catch (error) {
      console.error("Erro ao criar thread", error);
    }
  };

  const deletaThread = async () => {
    try {
      if (threadId) {
        await deleteThread(threadId);
        setThreadId(null);
        localStorage.removeItem("threadId");
      }
    } catch (error) {
      console.error("Erro ao excluir thread", error);
    }
  };

  return (
    <DadosChatbotContext.Provider
      value={{ threadId, criaThread, deletaThread }}
    >
      {children}
    </DadosChatbotContext.Provider>
  );
};

export const useDadosChatbot = () => {
  const context = useContext(DadosChatbotContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
