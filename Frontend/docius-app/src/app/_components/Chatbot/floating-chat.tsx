"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Maximize2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { MessageInput } from "../../[empresa]/(pages)/Admin/Chatbot/message-input";
import {
  MessageItem,
  type MessageType,
} from "../../[empresa]/(pages)/Admin/Chatbot/message-item";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

// Dados de exemplo para mensagens
const initialMessages: MessageType[] = [
  {
    id: "1",
    content: "Olá! Como posso ajudar você hoje?",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    content: "Preciso de ajuda com o cadastro de um novo produto.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    content:
      "Claro! Para cadastrar um novo produto, vá até o menu 'Produtos' e clique no botão '+' no canto superior direito da tela.",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ehAdmin, setEhAdmin] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { dadosEmpresa } = useDadosEmpresa();

  const handleSendMessage = (content: string) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simular resposta do bot após 1 segundo
    setTimeout(() => {
      const botResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        content:
          "Obrigado pela sua mensagem! Um atendente irá analisar sua solicitação em breve.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleExpandFullScreen = () => {
    router.push(`/${dadosEmpresa?.dominio}/Admin/Chatbot`);
  };

  // Rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Abrir chat</span>
      </Button>
    );
  }

  //useEffect(() => {
  //  setEhAdmin(localStorage.getItem("userType") == "2");
//
  //  console.log(localStorage.getItem("userType") == "2");
  //}, [localStorage.getItem("userType")]);

  return (
    //ehAdmin && (
      <Card
        className={cn(
          "fixed right-4 z-50 flex flex-col shadow-lg transition-all duration-200",
          isExpanded
            ? "bottom-4 left-4 top-4"
            : "bottom-4 h-96 w-80 max-w-[calc(100vw-2rem)]"
        )}
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
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col p-3">
              {messages.map((message, index) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-0">
          <MessageInput onSendMessage={handleSendMessage} />
        </CardFooter>
      </Card>
    )
 // );
}

// Helper function para combinar classes condicionalmente
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
