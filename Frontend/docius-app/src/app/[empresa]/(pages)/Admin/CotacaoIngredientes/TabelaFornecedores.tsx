"use client";

import type React from "react";
import { ExternalLink, MapPin, Globe } from "lucide-react";
import Link from "next/link";

import { ReadFornecedor } from "../Cadastros/Fornecedores/interfaces";

import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function TabelaFornecedores({
  idsMercados,
  fornecedores,
  onIdsMercadosChange,
}: {
  idsMercados: number[];
  fornecedores: ReadFornecedor[];
  onIdsMercadosChange: (novosDados: number[]) => void;
}) {
  const toggleFornecedor = (id: number) => {
    onIdsMercadosChange(
      idsMercados.includes(id)
        ? idsMercados.filter((f) => f !== id)
        : [...idsMercados, id]
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fornecedores</CardTitle>
        <CardDescription>
          Selecione os fornecedores para incluir na busca de cotações
          automáticas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fornecedores
            .filter((fornecedor) => fornecedor.id === 1 || fornecedor.id === 2)
            .map((fornecedor) => (
              <div
                key={fornecedor.id}
                className="flex items-start space-x-3 p-3 rounded-md border hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  id={`fornecedor-${fornecedor.id}`}
                  checked={idsMercados.includes(fornecedor.id)}
                  onCheckedChange={() => toggleFornecedor(fornecedor.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={`fornecedor-${fornecedor.id}`}
                      className="text-base font-medium cursor-pointer"
                    >
                      {fornecedor.nome}
                    </Label>
                  </div>
                  {fornecedor.endereco && (
                    <div className="mt-1 text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {fornecedor.endereco}
                    </div>
                  )}
                  {fornecedor.site && (
                    <div className="mt-1 text-sm">
                      <Link
                        href={fornecedor.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-amber-700 hover:text-amber-900"
                      >
                        <Globe className="h-3.5 w-3.5 mr-1" />
                        {fornecedor.site}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
