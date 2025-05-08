"use client";

import { useEffect, useRef, useState } from "react";

import { getMessages, sendMessage } from "@/services/chatbot";
import { ReadMensagem } from "./interfaces";

import { CaixaConversa } from "./CaixaConversa";
import { CaixaPergunta } from "./CaixaPergunta";
import { AguardeResposta } from "./AguardeResposta";

import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Menu from "@/app/_components/Menu";

import { useDadosChatbot } from "@/context/DadosChatbotContext";

export default function Chatbot() {
  const [mensagens, setMensagens] = useState<ReadMensagem[]>([]);
  const mensagensEndRef = useRef<HTMLDivElement>(null);

  const { threadId, criaThread } = useDadosChatbot();

  const [aguardeResposta, setAguardeResposta] = useState(false);

  const handleEnviarMensagem = async (conteudo: string) => {
    if (!threadId) return;

    setMensagens([
      ...mensagens,
      {
        id: 99,
        mensagem: conteudo,
        tipoAutor: "user",
        dataHora: new Date(),
      },
    ]);

    setAguardeResposta(true);

    const response = await sendMessage({
      mensagem: conteudo,
      threadId: threadId,
    });

    setMensagens(response);
    setAguardeResposta(false);
  };

  useEffect(() => {
    const cria = async () => {
      if (threadId) {
        const mensagensObtidas = await getMessages(threadId);
        setMensagens(mensagensObtidas);
      } else criaThread();
    };

    cria();
  }, []);

  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex h-[calc(100vh-4rem)] flex-col">
            <div className="flex items-center gap-2 border-b">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Assistente Virtual
                </h1>
                <p className="text-gray-600">
                  Converse com o assistente virtual para obter informações e
                  suporte.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <div className="mx-auto max-w-4xl">
                  {mensagens.map((mensagem, index) => (
                    <CaixaConversa
                      key={mensagem.id}
                      mensagem={mensagem}
                      ehUltimaMensagem={index === mensagens.length - 1}
                      floatingChat={false}
                    />
                  ))}
                  {aguardeResposta && (
                    <div className="ml-2 mt-2 self-start">
                      <AguardeResposta />
                    </div>
                  )}
                  <div ref={mensagensEndRef} />
                </div>
              </ScrollArea>

              <div className="bg-muted p-4">
                <div className="mx-auto max-w-4xl">
                  <CaixaPergunta
                    floatingChat={false}
                    aguardeResposta={aguardeResposta}
                    onEnviarMensagem={handleEnviarMensagem}
                    onDadosChange={setMensagens}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
