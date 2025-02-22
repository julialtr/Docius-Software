export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container flex min-h-screen flex-col items-center justify-center gap-6">
        {/* Animação Principal */}
        <div className="relative h-24 w-24">
          {/* Prato girando */}
          <div className="absolute inset-0 animate-spin">
            <div className="h-24 w-24 rounded-full border-4 border-amber-200 border-t-amber-600" />
          </div>

          {/* Decorações do Bolo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1">
            {/* Camadas do bolo */}
            <div className="h-2 w-8 animate-pulse rounded-full bg-amber-300 delay-100" />
            <div className="h-2 w-12 animate-pulse rounded-full bg-red-300 delay-200" />
            <div className="h-2 w-16 animate-pulse rounded-full bg-amber-400 delay-300" />
          </div>
        </div>

        {/* Texto de Carregamento */}
        <div className="text-center">
          <p className="text-lg font-medium text-amber-800">
            Preparando algo especial...
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-amber-600 delay-100" />
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-amber-600 delay-200" />
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-amber-600 delay-300" />
          </div>
        </div>

        {/* Elementos Decorativos */}
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div
            className="absolute left-1/4 top-1/3 h-4 w-4 animate-ping rounded-full bg-amber-200 delay-100"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute right-1/3 bottom-1/4 h-3 w-3 animate-ping rounded-full bg-red-200 delay-300"
            style={{ animationDuration: "2.5s" }}
          />
          <div
            className="absolute right-1/4 top-1/2 h-5 w-5 animate-ping rounded-full bg-amber-200 delay-500"
            style={{ animationDuration: "3.5s" }}
          />
        </div>
      </div>
    </div>
  );
}
