"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { MessageItem, MessageType } from "./message-item";
import { MessageInput } from "./message-input";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

// Dados de exemplo para mensagens - mesmos do componente flutuante
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
  {
    id: "4",
    content: "Como faço para adicionar uma imagem ao produto?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: "5",
    content:
      "No formulário de cadastro de produto, você encontrará um botão 'Adicionar imagem'. Clique nele e selecione a imagem do seu computador. Formatos suportados: JPG, PNG e GIF.",
    sender: "bot",
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
  },
  {
    id: "6",
    content: "Obrigado pela ajuda!",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 30),
  },
  {
    id: "7",
    content:
      "Por nada! Estou sempre à disposição para ajudar. Tem mais alguma dúvida?",
    sender: "bot",
    timestamp: new Date(Date.now()),
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center gap-2 border-b bg-white p-4">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <Bot className="h-6 w-6 text-amber-600" />
        <h1 className="text-xl font-semibold">Assistente Virtual</h1>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="mx-auto max-w-4xl">
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

        <div className="border-t bg-white p-4">
          <div className="mx-auto max-w-4xl">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
