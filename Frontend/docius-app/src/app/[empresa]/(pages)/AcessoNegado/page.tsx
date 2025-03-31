import { ShieldAlert } from "lucide-react";

export default function AcessoNegado() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        {/* Ícone e Título */}
        <div className="space-y-4">
          <div className="relative flex justify-center">
            <div className="absolute -left-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-red-200" />
            <div className="absolute -right-4 -top-2 h-16 w-16 animate-pulse rounded-full bg-amber-200 delay-150" />
            <ShieldAlert className="h-24 w-24 text-amber-700" />
          </div>
          <h1 className="text-4xl font-bold text-amber-900 sm:text-6xl">
            Acesso Negado
          </h1>
        </div>

        {/* Mensagem de Erro */}
        <div className="space-y-3 max-w-lg">
          <p className="text-amber-700 mx-auto">
            Parece que você não tem as permissões necessárias para visualizar
            este conteúdo. Entre em contato com o administrador se acredita que
            isso é um erro.
          </p>
        </div>

        {/* Elementos Decorativos */}
        <div
          className="absolute left-1/4 top-1/3 h-8 w-8 animate-bounce rounded-full bg-red-200 delay-300"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-6 w-6 animate-bounce rounded-full bg-amber-200 delay-500"
          style={{ animationDuration: "2.5s" }}
        />
        <div
          className="absolute right-1/3 top-1/4 h-4 w-4 animate-ping rounded-full bg-red-100 delay-700"
          style={{ animationDuration: "3s" }}
        />
      </div>
    </div>
  );
}
