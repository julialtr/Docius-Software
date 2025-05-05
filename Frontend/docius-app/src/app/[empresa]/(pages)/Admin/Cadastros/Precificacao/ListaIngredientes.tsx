"use client";

import { useState, useEffect } from "react";
import { Package } from "lucide-react";

import { ReadPrecificacao } from "./interfaces";
import { ReadIngrediente } from "../Ingredientes/interfaces";
import { findIngredientes } from "@/services/ingrediente";
import { ReadPrecificacaoIngrediente } from "./(PrecificacoesIngredientes)/interfaces";

import { Checkbox } from "@/app/_components/ui/checkbox";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";

import { formatMoney } from "@/utils/format";
import { calculaValorIngredienteReceita } from "@/utils/precificacao";

export default function ListaIngredientes({
  precificacao,
  onPrecificacaoChange,
}: {
  precificacao: ReadPrecificacao | null;
  onPrecificacaoChange: (precificacao: ReadPrecificacao | null) => void;
}) {
  const [ingredientesPorCategoria, setIngredientesPorCategoria] = useState<{
    [key: number]: { ingrediente: ReadIngrediente; checked: boolean }[];
  }>({});

  useEffect(() => {
    if (!precificacao) return;

    precificacao.receita.receitaCategoriaIngrediente.forEach(
      async (categoria) => {
        const ingredientes = await findIngredientes({
          categoriaIngredienteId: categoria?.categoriaIngrediente?.id,
        });

        setIngredientesPorCategoria((prev) => ({
          ...prev,
          [categoria?.categoriaIngrediente?.id]: ingredientes.map(
            (ing: ReadIngrediente) => ({
              ingrediente: ing,
              checked: precificacao.precificacaoIngrediente.some(
                (ingPre) => ingPre.ingredienteId == ing.id
              ),
            })
          ),
        }));
      }
    );
  }, [precificacao?.receita.receitaCategoriaIngrediente]);

  useEffect(() => {
    if (!precificacao) return;

    const soma = Object.keys(ingredientesPorCategoria).reduce(
      (total, categoriaId) => {
        return total + calcularValorMedioPorCategoria(Number(categoriaId));
      },
      0
    );

    const precificacaoIngredientes: ReadPrecificacaoIngrediente[] =
      Object.values(ingredientesPorCategoria).flatMap((itens) =>
        itens
          .filter((item) => item.checked)
          .map((item) => ({
            id: 0,
            precificacaoId: precificacao.id,
            ingredienteId: item.ingrediente.id,
          }))
      );

    onPrecificacaoChange({
      ...precificacao,
      valorInsumos: soma,
      precificacaoIngrediente: precificacaoIngredientes,
    });
  }, [ingredientesPorCategoria]);

  const calcularValorMedioPorCategoria = (categoriaIngredienteId: number) => {
    const ingredientesChecked = ingredientesPorCategoria[
      categoriaIngredienteId
    ]?.filter((ingrediente) => ingrediente.checked);

    if (!ingredientesChecked || ingredientesChecked.length === 0) return 0;

    const somaPrecos = ingredientesChecked.reduce((total, { ingrediente }) => {
      const ingredienteReceita =
        precificacao?.receita.receitaCategoriaIngrediente.find(
          (iu) => iu.categoriaIngrediente?.id === categoriaIngredienteId
        );

      return (
        total + calculaValorIngredienteReceita(ingrediente, ingredienteReceita)
      );
    }, 0);

    return somaPrecos / ingredientesChecked.length;
  };

  const toggleIngrediente = (
    categoriaIngredienteId: number,
    ingredienteId: number
  ) => {
    setIngredientesPorCategoria((prev) => ({
      ...prev,
      [categoriaIngredienteId]: prev[categoriaIngredienteId].map((item) =>
        item.ingrediente.id === ingredienteId
          ? { ...item, checked: !item.checked }
          : item
      ),
    }));
  };

  const toggleTodosIngredientes = (
    categoriaIngredienteId: number,
    checked: boolean
  ) => {
    setIngredientesPorCategoria((prev) => ({
      ...prev,
      [categoriaIngredienteId]: prev[categoriaIngredienteId].map((item) => ({
        ...item,
        checked: checked,
      })),
    }));
  };

  const todosSelecionados = (categoriaIngredienteId: number) => {
    return ingredientesPorCategoria[categoriaIngredienteId]?.every(
      (ingrediente) => {
        return ingrediente?.checked === true;
      }
    );
  };

  return (
    precificacao && (
      <div>
        <h3 className="font-medium mb-3 flex items-center gap-1">
          <Package className="h-4 w-4 text-amber-600" />
          Ingredientes para cálculo de média
        </h3>
        <Accordion type="multiple" className="border rounded-md">
          {precificacao.receita.receitaCategoriaIngrediente.map((categoria) => (
            <AccordionItem
              value={`categoria-${categoria?.id}`}
              key={categoria?.id}
            >
              <div className="flex items-center px-4">
                <Checkbox
                  id={`categoria-${categoria?.id}`}
                  checked={todosSelecionados(
                    categoria?.categoriaIngrediente.id
                  )}
                  onCheckedChange={(checked) => {
                    toggleTodosIngredientes(
                      categoria?.categoriaIngrediente.id,
                      !!checked
                    );
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                <AccordionTrigger className="flex-1 hover:bg-transparent ml-1">
                  <span className="mr-1">
                    {categoria?.categoriaIngrediente?.nome}
                  </span>
                </AccordionTrigger>
              </div>
              <AccordionContent className="px-4 pt-2 pb-3">
                <div className="space-y-2">
                  {(
                    ingredientesPorCategoria[
                      categoria?.categoriaIngrediente?.id
                    ] || []
                  ).map((item) => {
                    const ingredienteReceita =
                      precificacao.receita.receitaCategoriaIngrediente.find(
                        (iu) =>
                          iu.categoriaIngrediente?.id ===
                          item.ingrediente.categoriaIngrediente?.id
                      );

                    return (
                      <div
                        key={item.ingrediente.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`ingrediente-${item.ingrediente.id}`}
                            checked={item.checked}
                            onCheckedChange={() =>
                              toggleIngrediente(
                                categoria?.categoriaIngrediente?.id,
                                item.ingrediente.id
                              )
                            }
                          />
                          <Label
                            htmlFor={`ingrediente-${item.ingrediente.id}`}
                            className="cursor-pointer"
                          >
                            {item.ingrediente.nome} ({item.ingrediente.marca})
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          {ingredienteReceita && (
                            <span className="text-xs text-gray-500">
                              {ingredienteReceita.medida}
                              {ingredienteReceita.unidadeMedida.sigla}
                            </span>
                          )}
                          <span className="font-medium text-green-600">
                            {formatMoney(
                              calculaValorIngredienteReceita(
                                item.ingrediente,
                                ingredienteReceita
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {/* Valor médio da categoria */}
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm font-medium">Valor Médio:</span>
                    <span className="font-medium text-green-700">
                      {formatMoney(
                        calcularValorMedioPorCategoria(
                          categoria.categoriaIngrediente.id
                        )
                      )}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  );
}
