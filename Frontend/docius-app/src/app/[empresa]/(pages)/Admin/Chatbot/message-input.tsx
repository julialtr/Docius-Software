"use client";

import type React from "react";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full items-end gap-2 border-t bg-background p-3">
      <Textarea
        placeholder="Digite sua mensagem..."
        className="min-h-10 resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled}
        onClick={handleSendMessage}
        className="h-10 w-10 shrink-0"
      >
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Enviar mensagem</span>
      </Button>
    </div>
  );
}
