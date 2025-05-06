import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { cn } from "@/lib/utils";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  read?: boolean;
};

interface MessageItemProps {
  message: MessageType;
  isLast?: boolean;
}

export function MessageItem({ message, isLast }: MessageItemProps) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex w-full gap-2 p-2",
        isBot ? "justify-start" : "justify-end",
        isLast && "mb-4"
      )}
      key={message.id}
    >
      {isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/bot-avatar.png" alt="Chatbot" />
          <AvatarFallback className="bg-amber-100 text-amber-800">
            DC
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          isBot
            ? "bg-muted text-muted-foreground"
            : "bg-amber-500 text-amber-50 dark:bg-amber-600"
        )}
      >
        <p>{message.content}</p>
        <div
          className={cn(
            "mt-1 flex justify-end text-xs opacity-70",
            !isBot && "text-amber-50/70"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/user-avatar.png" alt="Usuário" />
          <AvatarFallback className="bg-amber-500 text-amber-50">
            EU
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
