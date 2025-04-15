"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export function ImageViewer({
  imagens,
  indiceInicial = 0,
  isOpen,
  onClose,
}: {
  imagens: string[];
  indiceInicial?: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [indiceAtual, setIndiceAtual] = useState(indiceInicial);

  const handlePrevious = () => {
    setIndiceAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndiceAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const handleClose = () => {
    onClose();
  };

  if (!imagens || imagens.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-black/90 border-gray-800">
        <DialogTitle className="sr-only">
          Visualizador de Imagens - Imagem {indiceAtual + 1} de {imagens.length}
        </DialogTitle>
        <div className="relative w-full h-full flex flex-col">
          {/* Header with controls */}
          <div className="flex items-center justify-between p-2 bg-black/50 text-white">
            <div className="text-sm">
              Imagem {indiceAtual + 1} de {imagens.length}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Image container */}
          <div className="flex-1 overflow-auto relative">
            <div className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-in-out">
              <img
                src={imagens[indiceAtual] || "/placeholder.svg"}
                alt={`Imagem de inspiração ${indiceAtual + 1}`}
                className="max-h-full object-contain transition-transform duration-200"
              />
            </div>
          </div>

          {/* Navigation buttons */}
          {imagens.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
