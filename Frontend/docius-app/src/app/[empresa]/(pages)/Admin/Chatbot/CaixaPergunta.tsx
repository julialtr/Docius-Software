"use client";

import type React from "react";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

import AlertaExclusao from "./AlertaExclusao";
import { ReadMensagem } from "./interfaces";

import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";

export function CaixaPergunta({
  floatingChat = false,
  aguardeResposta = false,
  onEnviarMensagem,
  onDadosChange,
}: {
  floatingChat: boolean;
  aguardeResposta: boolean;
  onEnviarMensagem: (mensagem: string) => void;
  onDadosChange: (novosDados: ReadMensagem[]) => void;
}) {
  const [mensagem, setMensagem] = useState<string>("");

  const handleEnviarMensagem = () => {
    if (mensagem.trim() && !aguardeResposta) {
      onEnviarMensagem(mensagem);
      setMensagem("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !aguardeResposta) {
      e.preventDefault();
      handleEnviarMensagem();
    }
  };

  return (
    <div className="flex w-full items-end gap-3 bg-muted p-3">
      <Textarea
        placeholder={
          aguardeResposta ? "Aguarde a resposta..." : "Digite sua mensagem..."
        }
        className="min-h-10 resize-none"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={aguardeResposta}
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!mensagem.trim() || aguardeResposta}
        onClick={handleEnviarMensagem}
        className="h-10 w-10 shrink-0"
      >
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Enviar mensagem</span>
      </Button>
      <AlertaExclusao
        onDadosChange={onDadosChange}
        floatingChat={floatingChat}
        desabilitado={aguardeResposta}
      />
    </div>
  );
}
