"use client";

import type React from "react";
import { useState } from "react";
import { Search, PlusCircle, AlertTriangle } from "lucide-react";

import { ReadWebScrapingDados } from "./interfaces";
import ListaResultados from "./TabelaResultados";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Alert,
  AlertDescription,
} from "@/app/_components/ui/alert";
import { TabsContent } from "@/app/_components/ui/tabs";

export default function TabResultados({
  dados,
  onDadosChange,
  onCotacaoChange,
  onIsDialogOpenChange,
}: {
  dados: ReadWebScrapingDados[];
  onDadosChange: (novosDados: ReadWebScrapingDados[]) => void;
  onCotacaoChange: (novosDados: ReadWebScrapingDados | null) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = () => {
    onCotacaoChange(null);
    onIsDialogOpenChange(true);
  };

  return (
    <TabsContent value="resultados" className="space-y-6">
      {/* Alerta sobre dados temporários */}
      <Alert
        variant="warning"
        className="bg-amber-50 border-amber-200 text-amber-800"
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          As cotações são temporárias e não serão salvas no banco de dados. Os
          preços refletem o momento atual da consulta.
        </AlertDescription>
      </Alert>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Filtrar resultados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 sm:w-auto"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar cotação manual
        </Button>
      </div>

      {/* Tabela de resultados */}
      <ListaResultados
        dados={dados}
        searchTerm={searchTerm}
        onDadosChange={onDadosChange}
        onCotacaoChange={onCotacaoChange}
        onIsDialogOpenChange={onIsDialogOpenChange}
      />
    </TabsContent>
  );
}
