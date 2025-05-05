"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ReadReceita } from "./interfaces";
import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";
import { ReadCategoriaIngrediente } from "../CategoriasIngredientes/interfaces";
import { findUnidadesMedidas } from "@/services/unidadeMedida";
import { findCategoriasIngredientes } from "@/services/categoriaIngrediente";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import { useToast } from "@/hooks/use-toast";

export default function FormularioReceitaCategoriaIngrediente({
  receita,
  categoriaIngrediente,
  onReceitaChange,
  onCategoriaIngredienteChange,
}: {
  receita: ReadReceita | null;
  categoriaIngrediente: ReadReceitaCategoriaIngrediente | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
  onCategoriaIngredienteChange: (
    categoriaIngrediente: ReadReceitaCategoriaIngrediente | null
  ) => void;
}) {
  const { toast } = useToast();
  const [validaCampo, setValidaCampo] = useState<boolean>(false);

  const [dadosCategoriaIngrediente, setDadosCategoriaIngrediente] =
    useState<ReadReceitaCategoriaIngrediente>();

  const [dadosCategoriasIngredientes, setDadosCategoriasIngredientes] =
    useState<ReadCategoriaIngrediente[]>([]);

  const [dadosUnidadesMedidas, setDadosUnidadesMedidas] = useState<
    ReadUnidadeMedida[]
  >([]);

  useEffect(() => {
    if (categoriaIngrediente) {
      setDadosCategoriaIngrediente(categoriaIngrediente);
    }
  }, [categoriaIngrediente]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDadosCategoriasIngredientes(await findCategoriasIngredientes());
        setDadosUnidadesMedidas(await findUnidadesMedidas());
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler categorias de ingredientes",
            description: error.message,
          });
        }
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosCategoriaIngrediente((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectChange = (
    path: string,
    value: string,
    labelPath?: string,
    label?: string
  ) => {
    setDadosCategoriaIngrediente((prev) => {
      const updated = updateNestedValue(prev, path, Number(value));

      if (labelPath && label)
        return updateNestedValue(updated, labelPath, label);

      return updated;
    });
  };

  const updateNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const newObj = { ...obj };

    let current: any = newObj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) current[key] = {};
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;

    return newObj;
  };

  const adicionarCategoriaIngrediente = () => {
    if (!validarCampos()) {
      setValidaCampo(true);
      return;
    }

    if (!dadosCategoriaIngrediente) return;

    if (!receita) {
      if (!dadosCategoriaIngrediente.id || dadosCategoriaIngrediente.id === 0) {
        const novaCategoriaIngrediente = {
          ...dadosCategoriaIngrediente,
          id: 1,
        };

        onReceitaChange({
          receitaCategoriaIngrediente: [novaCategoriaIngrediente],
          id: 0,
          nome: "",
          descricao: "",
          tempo: "",
          qtdPorcoes: 0,
          qtdProdutos: 0,
        });
      }
    } else {
      const maxId =
        receita.receitaCategoriaIngrediente.length > 0
          ? Math.max(...receita.receitaCategoriaIngrediente.map((i) => i.id))
          : 0;

      if (!dadosCategoriaIngrediente.id || dadosCategoriaIngrediente.id === 0) {
        const novaCategoriaIngrediente = {
          ...dadosCategoriaIngrediente,
          id: maxId + 1,
        };

        const novaListaCategoriasIngredientes = [
          ...receita.receitaCategoriaIngrediente,
          novaCategoriaIngrediente,
        ];

        onReceitaChange({
          ...receita,
          receitaCategoriaIngrediente: novaListaCategoriasIngredientes,
        });
      } else {
        const novaListaCategoriasIngredientes = receita.receitaCategoriaIngrediente.map(
          (categoriaIngrediente) =>
            categoriaIngrediente.id === dadosCategoriaIngrediente.id
              ? dadosCategoriaIngrediente
              : categoriaIngrediente
        );

        onReceitaChange({
          ...receita,
          receitaCategoriaIngrediente: novaListaCategoriasIngredientes,
        });
      }
    }

    limparCategoriaIngrediente();

    setValidaCampo(false);
  };

  const limparCategoriaIngrediente = () => {
    setDadosCategoriaIngrediente({
      id: 0,
      medida: 0,
      receitaId: 0,
      categoriaIngrediente: {
        id: 0,
        nome: "",
        qtdIngredientes: 0,
        qtdReceitas: 0,
      },
      unidadeMedida: {
        id: 0,
        sigla: "",
      },
    });

    onCategoriaIngredienteChange(null);
  };

  const validarCampos = () => {
    if (!dadosCategoriaIngrediente) return false;

    return (
      dadosCategoriaIngrediente.categoriaIngrediente.id > 0 &&
      dadosCategoriaIngrediente.medida > 0 &&
      dadosCategoriaIngrediente.unidadeMedida.id > 0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Adicionar categoria de ingrediente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoriaIngrediente.id">Categoria de ingrediente</Label>
            <Select
              value={dadosCategoriaIngrediente?.categoriaIngrediente.id.toString()}
              onValueChange={(value) => {
                const categoria = dadosCategoriasIngredientes.find(
                  (c) => c.id.toString() === value
                );
                handleSelectChange(
                  "categoriaIngrediente.id",
                  value,
                  "categoriaIngrediente.nome",
                  categoria?.nome
                );
              }}
            >
              <SelectTrigger
                className={
                  !dadosCategoriaIngrediente?.categoriaIngrediente?.id && validaCampo
                    ? "border-red-500"
                    : ""
                }
              >
                <SelectValue placeholder="Selecione uma categoria de ingrediente" />
              </SelectTrigger>
              <SelectContent>
                {dadosCategoriasIngredientes.map((categoriaIngrediente) => (
                  <SelectItem
                    key={categoriaIngrediente.id.toString()}
                    value={categoriaIngrediente.id.toString()}
                    disabled={receita?.receitaCategoriaIngrediente?.some(
                      (receitaCategoriaIngrediente) =>
                        receitaCategoriaIngrediente.categoriaIngrediente.id === categoriaIngrediente.id
                    )}
                  >
                    {categoriaIngrediente.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="medida">Medida</Label>
            <Input
              id="medida"
              name="medida"
              type="number"
              step="1"
              min="0"
              value={dadosCategoriaIngrediente?.medida ?? 0}
              onChange={handleChange}
              className={
                !dadosCategoriaIngrediente?.medida && validaCampo ? "border-red-500" : ""
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unidadeMedida.id">Unidade de medida</Label>
            <Select
              value={dadosCategoriaIngrediente?.unidadeMedida?.id.toString()}
              onValueChange={(value) => {
                const unidade = dadosUnidadesMedidas.find(
                  (u) => u.id.toString() === value
                );
                handleSelectChange(
                  "unidadeMedida.id",
                  value,
                  "unidadeMedida.sigla",
                  unidade?.sigla
                );
              }}
            >
              <SelectTrigger
                className={
                  !dadosCategoriaIngrediente?.unidadeMedida?.id && validaCampo
                    ? "border-red-500"
                    : ""
                }
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {dadosUnidadesMedidas.map((unidade) => (
                  <SelectItem key={unidade.id} value={unidade.id.toString()}>
                    {unidade.sigla}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          className={
            dadosCategoriaIngrediente?.id && dadosCategoriaIngrediente?.id > 0
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "grid-cols-1"
          }
        >
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={adicionarCategoriaIngrediente}
          >
            <Plus className="h-4 w-4 mr-2" />
            {dadosCategoriaIngrediente?.id
              ? "Editar categoria de ingrediente"
              : "Adicionar categoria de ingrediente"}
          </Button>
          {dadosCategoriaIngrediente?.id && dadosCategoriaIngrediente?.id > 0 ? (
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
              onClick={limparCategoriaIngrediente}
            >
              Limpar
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
