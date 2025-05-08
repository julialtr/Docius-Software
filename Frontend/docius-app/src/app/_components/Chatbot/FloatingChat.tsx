"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Maximize2, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { ReadMensagem } from "@/app/[empresa]/(pages)/Admin/Chatbot/interfaces";
import { getMessages, sendMessage } from "@/services/chatbot";

import { CaixaPergunta } from "../../[empresa]/(pages)/Admin/Chatbot/CaixaPergunta";
import { CaixaConversa } from "../../[empresa]/(pages)/Admin/Chatbot/CaixaConversa";
import { AguardeResposta } from "@/app/[empresa]/(pages)/Admin/Chatbot/AguardeResposta";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

import { useDadosEmpresa } from "@/context/DadosEmpresaContext";
import { useDadosChatbot } from "@/context/DadosChatbotContext";

export function FloatingChat() {
  const router = useRouter();
  const pathname = usePathname();

  const { dadosEmpresa } = useDadosEmpresa();
  const { criaThread } = useDadosChatbot();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ehAdmin, setEhAdmin] = useState<boolean>(false);
  const [aguardeResposta, setAguardeResposta] = useState(false);

  const [mensagens, setMensagens] = useState<ReadMensagem[]>([]);
  const mensagensEndRef = useRef<HTMLDivElement>(null);

  const handleEnviarMensagem = async (conteudo: string) => {
    const threadId = localStorage.getItem("threadId");

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
      if (pathname.includes("/Admin/Chatbot")) return;

      const userType = localStorage.getItem("userType");
      setEhAdmin(userType == "2");

      if (userType != "2") return;

      const threadId = localStorage.getItem("threadId");

      if (threadId) {
        const mensagensObtidas = await getMessages(threadId);
        setMensagens(mensagensObtidas);
      } else criaThread();
    };

    cria();
  }, []);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setEhAdmin(userType == "2");
  });

  const handleExpandFullScreen = () => {
    router.push(`/${dadosEmpresa?.dominio}/Admin/Chatbot`);
    router.refresh();
  };

  useEffect(() => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  if (!isOpen) {
    return (
      ehAdmin &&
      !pathname.includes("/Admin/Chatbot") && (
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Abrir chat</span>
        </Button>
      )
    );
  }

  return (
    ehAdmin &&
    !pathname.includes("/Admin/Chatbot") && (
      <Card
        className={
          "fixed right-4 z-50 flex flex-col shadow-lg transition-all duration-200 bottom-4 h-96 w-80 max-w-[calc(100vw-2rem)]"
        }
      >
        <CardHeader className="border-b p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-amber-600" />
              <span className="font-medium">Assistente Virtual</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleExpandFullScreen}
              >
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Expandir</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col p-3">
              {mensagens.map((mensagem, index) => (
                <CaixaConversa
                  key={mensagem.id}
                  mensagem={mensagem}
                  ehUltimaMensagem={index === mensagens.length - 1}
                  floatingChat={true}
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
        </CardContent>
        <CardFooter className="border-t p-0">
          <CaixaPergunta
            onEnviarMensagem={handleEnviarMensagem}
            aguardeResposta={aguardeResposta}
            onDadosChange={setMensagens}
            floatingChat={true}
          />
        </CardFooter>
      </Card>
    )
  );
}
