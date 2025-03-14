"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ReadReceita } from "./interfaces";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { ReadCategoriaIngrediente } from "../CategoriasIngredientes/interfaces";
import { findCategoriasIngredientes } from "@/services/categoriaIngrediente";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { findUnidadesMedidas } from "@/services/unidadeMedida";
import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";
import { ReadReceitaCategoriaIngrediente } from "./(CategoriasIngredientes)/interfaces";

export default function FormularioReceitaIngrediente({
  receita,
  ingrediente,
  onReceitaChange,
  onIngredienteChange,
}: {
  receita: ReadReceita | null;
  ingrediente: ReadReceitaCategoriaIngrediente | null;
  onReceitaChange: (receita: ReadReceita | null) => void;
  onIngredienteChange: (
    ingrediente: ReadReceitaCategoriaIngrediente | null
  ) => void;
}) {
  const { toast } = useToast();
  const [validaCampo, setValidaCampo] = useState<boolean>(false);

  const [dadosIngrediente, setDadosIngrediente] =
    useState<ReadReceitaCategoriaIngrediente>();

  const [dadosCategoriasIngredientes, setDadosCategoriasIngredientes] =
    useState<ReadCategoriaIngrediente[]>([]);

  const [dadosUnidadesMedidas, setDadosUnidadesMedidas] = useState<
    ReadUnidadeMedida[]
  >([]);

  useEffect(() => {
    if (ingrediente) {
      setDadosIngrediente(ingrediente);
    }
  }, [ingrediente]);

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
    setDadosIngrediente((prev) => {
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
    setDadosIngrediente((prev) => {
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

  const adicionarIngrediente = () => {
    if (!validarCampos()) {
      setValidaCampo(true);
      return;
    }

    if (!dadosIngrediente) return;

    if (!receita) {
      if (!dadosIngrediente.id || dadosIngrediente.id === 0) {
        const novoIngrediente = {
          ...dadosIngrediente,
          id: 1,
        };

        onReceitaChange({
          receitaCategoriaIngrediente: [novoIngrediente],
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

      if (!dadosIngrediente.id || dadosIngrediente.id === 0) {
        const novoIngrediente = {
          ...dadosIngrediente,
          id: maxId + 1,
        };

        const novaListaIngredientes = [
          ...receita.receitaCategoriaIngrediente,
          novoIngrediente,
        ];

        onReceitaChange({ ...receita, receitaCategoriaIngrediente: novaListaIngredientes });
      } else {
        const novaListaIngredientes = receita.receitaCategoriaIngrediente.map((ingrediente) =>
          ingrediente.id === dadosIngrediente.id
            ? dadosIngrediente
            : ingrediente
        );

        onReceitaChange({ ...receita, receitaCategoriaIngrediente: novaListaIngredientes });
      }
    }

    limparIngrediente();

    setValidaCampo(false);
  };

  const limparIngrediente = () => {
    setDadosIngrediente({
      id: 0,
      medida: 0,
      categoriaIngrediente: {
        id: 0,
        nome: "",
        qtdIngredientes: 0,
      },
      unidadeMedida: {
        id: 0,
        sigla: "",
      },
    });

    onIngredienteChange(null);
  };

  const validarCampos = () => {
    if (!dadosIngrediente) return false;

    return (
      dadosIngrediente.categoriaIngrediente.id > 0 &&
      dadosIngrediente.medida > 0 &&
      dadosIngrediente.unidadeMedida.id > 0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Adicionar ingrediente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoriaIngrediente.id">Ingrediente</Label>
            <Select
              value={dadosIngrediente?.categoriaIngrediente.id.toString()}
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
                  !dadosIngrediente?.categoriaIngrediente?.id && validaCampo
                    ? "border-red-500"
                    : ""
                }
              >
                <SelectValue placeholder="Selecione um ingrediente" />
              </SelectTrigger>
              <SelectContent>
                {dadosCategoriasIngredientes.map((categoria) => (
                  <SelectItem
                    key={categoria.id.toString()}
                    value={categoria.id.toString()}
                    disabled={receita?.receitaCategoriaIngrediente?.some(
                      (ingrediente) =>
                        ingrediente.categoriaIngrediente.id === categoria.id
                    )}
                  >
                    {categoria.nome}
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
              value={dadosIngrediente?.medida ?? 0}
              onChange={handleChange}
              className={
                !dadosIngrediente?.medida && validaCampo ? "border-red-500" : ""
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unidadeMedida.id">Unidade de Medida</Label>
            <Select
              value={dadosIngrediente?.unidadeMedida?.id.toString()}
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
                  !dadosIngrediente?.unidadeMedida?.id && validaCampo
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
            dadosIngrediente?.id && dadosIngrediente?.id > 0
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "grid-cols-1"
          }
        >
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={adicionarIngrediente}
          >
            <Plus className="h-4 w-4 mr-2" />
            {dadosIngrediente?.id
              ? "Editar ingrediente"
              : "Adicionar ingrediente"}
          </Button>
          {dadosIngrediente?.id && dadosIngrediente?.id > 0 ? (
            <Button
              type="button"
              variant="outline"
              className="mt-4 w-full"
              onClick={limparIngrediente}
            >
              Limpar
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
