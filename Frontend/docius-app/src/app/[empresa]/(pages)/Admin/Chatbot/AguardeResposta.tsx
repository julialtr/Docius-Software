"use client";

import { cn } from "@/lib/utils";

export function AguardeResposta({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 px-2 py-1", className)}>
      <div className="flex space-x-1">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-600"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-600"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-amber-600"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-xs text-muted-foreground">
        Assistente está digitando...
      </span>
    </div>
  );
}
