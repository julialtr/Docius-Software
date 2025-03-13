"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle, X } from "lucide-react";

import { createConvert, ReadIngrediente, updateConvert } from "./interfaces";
import { createIngrediente, updateIngrediente } from "@/services/ingrediente";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
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
import { findCategoriasIngredientes } from "@/services/categoriaIngrediente";
import { ReadCategoriaIngrediente } from "../CategoriasIngredientes/interfaces";
import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";
import { ReadFornecedor } from "../Fornecedores/interfaces";
import { findFornecedores } from "@/services/fornecedor";
import { findUnidadesMedidas } from "@/services/unidadeMedida";

export default function FormularioIngredientes({
  dados,
  isDialogOpen,
  ingrediente,
  onDadosChange,
  onIsDialogOpenChange,
  onIngredienteChange,
}: {
  dados: ReadIngrediente[];
  isDialogOpen: boolean;
  ingrediente: ReadIngrediente | null;
  onDadosChange: (novosDados: ReadIngrediente[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onIngredienteChange: (ingrediente: ReadIngrediente | null) => void;
}) {
  const { toast } = useToast();

  const [dadosIngrediente, setDadosIngrediente] = useState<ReadIngrediente>({
    id: 0,
    nome: "",
    marca: "",
    preco: 0,
    quantidade: 0,
    medida: 0,
    unidadeMedida: {
      id: 0,
      sigla: "",
    },
    fornecedor: {
      id: 0,
      nome: "",
      site: "",
    },
    categoriaIngrediente: {
      id: 0,
      nome: "",
      qtdIngredientes: 0,
    },
  });
  const [dadosCategorias, setDadosCategorias] = useState<
    ReadCategoriaIngrediente[]
  >([]);
  const [dadosUnidadesMedidas, setDadosUnidadesMedidas] = useState<
    ReadUnidadeMedida[]
  >([]);
  const [dadosFornecedores, setDadosFornecedores] = useState<ReadFornecedor[]>(
    []
  );

  useEffect(() => {
    if (ingrediente) {
      setDadosIngrediente(ingrediente);
    }
  }, [ingrediente]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDadosCategorias(await findCategoriasIngredientes());
        setDadosUnidadesMedidas(await findUnidadesMedidas());
        setDadosFornecedores(await findFornecedores());
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler categorias",
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

  const handleSelectChange = (name: string, value: string) => {
    setDadosIngrediente((prev) => updateNestedValue(prev, name, Number(value)));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dadosIngrediente) return;

    try {
      if (dadosIngrediente.id) {
        const novoDado = await updateIngrediente(
          dadosIngrediente.id,
          updateConvert(dadosIngrediente)
        );

        onDadosChange(
          dados.map((f) => (f.id === dadosIngrediente.id ? novoDado : f))
        );
      } else {
        const novoDado = await createIngrediente(
          createConvert(dadosIngrediente)
        );
        onDadosChange([...dados, novoDado[0]]);
      }

      toast({
        title: dadosIngrediente.id
          ? "Ingrediente atualizado"
          : "Ingrediente criado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o ingrediente",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onIngredienteChange(null);
    setDadosIngrediente({
      id: 0,
      nome: "",
      marca: "",
      preco: 0,
      quantidade: 0,
      medida: 0,
      unidadeMedida: {
        id: 0,
        sigla: "",
      },
      fornecedor: {
        id: 0,
        nome: "",
        site: "",
      },
      categoriaIngrediente: {
        id: 0,
        nome: "",
        qtdIngredientes: 0,
      },
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseDialog();
        } else {
          onIsDialogOpenChange(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {ingrediente ? "Editar ingrediente" : "Novo ingrediente"}
          </DialogTitle>
          <DialogDescription>
            {ingrediente
              ? "Edite as informações do ingrediente no formulário abaixo"
              : "Preencha as informações do novo ingrediente no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoriaIngrediente.id">Categoria</Label>
              <Select
                value={dadosIngrediente.categoriaIngrediente?.id.toString()}
                onValueChange={(value) =>
                  handleSelectChange("categoriaIngrediente.id", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {dadosCategorias.map((categoria) => (
                    <SelectItem
                      key={categoria.id}
                      value={categoria.id.toString()}
                    >
                      {categoria.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={dadosIngrediente?.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                name="marca"
                value={dadosIngrediente.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="medida">Medida</Label>
                <Input
                  id="medida"
                  name="medida"
                  type="number"
                  pattern="\d*"
                  step="1"
                  min="1"
                  value={dadosIngrediente.medida}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidadeMedida.id">Unidade medida</Label>
                <Select
                  value={dadosIngrediente.unidadeMedida?.id.toString()}
                  onValueChange={(value) =>
                    handleSelectChange("unidadeMedida.id", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {dadosUnidadesMedidas.map((unidade) => (
                      <SelectItem
                        key={unidade.id}
                        value={unidade.id.toString()}
                      >
                        {unidade.sigla}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                name="preco"
                type="number"
                step="0.01"
                min="0"
                value={dadosIngrediente.preco}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                pattern="\d*"
                step="1"
                min="0"
                value={dadosIngrediente.quantidade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    handleChange(e);
                  }
                }}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fornecedor.id">
              Fornecedor{" "}
              <span className="text-xs text-muted-foreground">(opcional)</span>
            </Label>
            <div className="flex gap-2">
              <Select
                value={dadosIngrediente.fornecedor?.id.toString()}
                onValueChange={(value) =>
                  handleSelectChange("fornecedor.id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum fornecedor</SelectItem>
                  {dadosFornecedores.map((fornecedor) => (
                    <SelectItem
                      key={fornecedor?.id}
                      value={fornecedor?.id.toString()}
                    >
                      {fornecedor?.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {dadosIngrediente.fornecedor?.id ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleSelectChange("fornecedor.id", "")}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
