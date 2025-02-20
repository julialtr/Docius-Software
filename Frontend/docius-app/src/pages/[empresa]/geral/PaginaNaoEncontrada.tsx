import { CakeIcon as CakeOff } from "lucide-react";

export default function NaoEncontrado() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        {/* Ícone e Título */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-red-200" />
            <div className="absolute -right-4 -top-2 h-16 w-16 animate-pulse rounded-full bg-amber-200 delay-150" />
            <div className="relative">
              <CakeOff className="h-32 w-32 text-amber-700" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-amber-900 sm:text-6xl">
            Oops!
          </h1>
        </div>

        {/* Mensagem de Erro */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-amber-800">
            Página não encontrada
          </h2>
          <p className="max-w-md text-amber-700">
            Parece que esta receita não está no nosso cardápio.
          </p>
        </div>

        {/* Elementos Decorativos */}
        <div
          className="absolute left-1/4 top-1/4 h-8 w-8 animate-bounce rounded-full bg-amber-200 delay-300"
          style={{ animationDuration: "2s" }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-6 w-6 animate-bounce rounded-full bg-red-200 delay-500"
          style={{ animationDuration: "2.5s" }}
        />
      </div>
    </div>
  );
}
