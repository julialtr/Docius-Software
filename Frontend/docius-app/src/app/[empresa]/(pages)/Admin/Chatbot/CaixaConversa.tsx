import ReactMarkdown from "react-markdown";

import { ReadMensagem } from "./interfaces";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import { cn } from "@/lib/utils";

export function CaixaConversa({
  mensagem,
  ehUltimaMensagem,
  floatingChat,
}: {
  mensagem: ReadMensagem;
  ehUltimaMensagem: boolean;
  floatingChat: boolean;
}) {
  const ehAssistente = mensagem.tipoAutor === "assistant";

  return (
    <div
      className={cn(
        "flex w-full gap-2 p-2",
        ehAssistente ? "justify-start" : "justify-end",
        ehUltimaMensagem && "mb-4"
      )}
      key={mensagem.id}
    >
      {ehAssistente && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/bot-avatar.png" alt="Chatbot" />
          <AvatarFallback className="bg-amber-100 text-amber-800 text-sm">
            AV
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          ehAssistente
            ? floatingChat
              ? "bg-muted text-muted-foreground"
              : "bg-white text-muted-foreground"
            : "bg-amber-500 text-amber-50 dark:bg-amber-600"
        )}
      >
        <ReactMarkdown
          components={{
            ol: ({ ...props }) => (
              <ol
                style={{ listStyle: "decimal", paddingLeft: "2rem" }}
                {...props}
              />
            ),
            ul: ({ ...props }) => (
              <ul
                style={{ listStyle: "disc", paddingLeft: "2rem" }}
                {...props}
              />
            ),
          }}
        >
          {mensagem.mensagem}
        </ReactMarkdown>
        <div
          className={cn(
            "mt-1 flex justify-end text-xs opacity-70",
            !ehAssistente && "text-amber-50/70"
          )}
        >
          {new Date(mensagem.dataHora).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {!ehAssistente && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar.png" alt="Usuário" />
          <AvatarFallback className="bg-amber-500 text-amber-50 text-sm">
            EU
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
