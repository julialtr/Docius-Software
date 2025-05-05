"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle, Upload, X } from "lucide-react";

import { createConvert, ReadProduto, updateConvert } from "./interfaces";
import { createProduto, updateProduto } from "@/services/produto";

import { ReadReceita } from "../Receitas/interfaces";
import { findReceitas } from "@/services/receita";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { ImageViewer } from "@/app/_components/ImageViewer";

import { useToast } from "@/hooks/use-toast";
import { LINK_API } from "@/utils/constants";

export default function FormularioProdutos({
  dados,
  isDialogOpen,
  produto,
  onDadosChange,
  onIsDialogOpenChange,
  onProdutoChange,
}: {
  dados: ReadProduto[];
  isDialogOpen: boolean;
  produto: ReadProduto | null;
  onDadosChange: (novosDados: ReadProduto[]) => void;
  onIsDialogOpenChange: (isDialogOpen: boolean) => void;
  onProdutoChange: (produto: ReadProduto | null) => void;
}) {
  const { toast } = useToast();

  const [dadosProduto, setDadosProduto] = useState<ReadProduto>({
    id: 0,
    nome: "",
    preco: 0,
    caminhoFoto: "",
    qtdPedidos: 0,
    receita: {
      id: 0,
      nome: "",
      descricao: "",
      tempo: "",
      qtdPorcoes: 0,
      receitaCategoriaIngrediente: [],
      qtdProdutos: 0,
    },
  });

  const [dadosReceitas, setDadosReceitas] = useState<ReadReceita[]>([]);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  const [lerFotoServidor, setLerFotoServidor] = useState<boolean>(false);

  useEffect(() => {
    if (produto) {
      setLerFotoServidor(produto.caminhoFoto != "");

      setDadosProduto(produto);
    }
  }, [produto]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDadosReceitas(await findReceitas());
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler receitas",
            description: error.message,
          });
        }
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosProduto((prev) => {
      if (!prev) return prev;

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setDadosProduto((prev) => updateNestedValue(prev, name, Number(value)));
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

    if (!dadosProduto) return;

    try {
      if (dadosProduto.id) {
        const novoDado = await updateProduto(
          dadosProduto.id,
          updateConvert(dadosProduto)
        );

        onDadosChange(
          dados.map((f) => (f.id === dadosProduto.id ? novoDado : f))
        );
      } else {
        const novoDado = await createProduto(createConvert(dadosProduto));
        onDadosChange([...dados, novoDado]);
      }

      toast({
        title: dadosProduto.id ? "Produto atualizado" : "Produto criado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });

      handleCloseDialog();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o produto",
          description: error.message,
        });
      }
    }
  };

  const handleCloseDialog = () => {
    onIsDialogOpenChange(false);
    onProdutoChange(null);
    setDadosProduto({
      id: 0,
      nome: "",
      preco: 0,
      qtdPedidos: 0,
      caminhoFoto: "",
      receita: {
        id: 0,
        nome: "",
        descricao: "",
        tempo: "",
        qtdPorcoes: 0,
        receitaCategoriaIngrediente: [],
        qtdProdutos: 0,
      },
    });
  };

  const handleImagemUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setDadosProduto({
          ...dadosProduto,
          caminhoFoto: base64String,
        });

        setLerFotoServidor(false);
      };

      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "Erro ao ler imagem",
          description: "Não foi possível ler o arquivo da imagem",
        });
      };

      reader.readAsDataURL(file);
    }
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
            {produto ? "Editar produto" : "Novo produto"}
          </DialogTitle>
          <DialogDescription>
            {produto
              ? "Edite as informações do produto no formulário abaixo"
              : "Preencha as informações do novo produto no formulário abaixo"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={dadosProduto?.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receita.id">Receita</Label>
            <div className="flex gap-2">
              <Select
                value={dadosProduto.receita?.id.toString()}
                onValueChange={(value) =>
                  handleSelectChange("receita.id", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma receita" />
                </SelectTrigger>
                <SelectContent>
                  {dadosReceitas.map((receita) => (
                    <SelectItem
                      key={receita?.id}
                      value={receita?.id.toString()}
                    >
                      {receita?.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caminhoFoto">
              Imagem ilustrativa{" "}
              <span className="text-xs text-muted-foreground">(opcional)</span>
            </Label>

            <div className="grid grid-cols-3 gap-2">
              {dadosProduto?.caminhoFoto ? (
                <div
                  className="relative h-30 w-30 rounded-md overflow-hidden cursor-pointer border border-gray-200"
                  onClick={() =>
                    setImagemSelecionada(
                      lerFotoServidor == true
                        ? `${LINK_API}${dadosProduto.caminhoFoto}`
                        : dadosProduto.caminhoFoto || null
                    )
                  }
                >
                  <img
                    src={
                      lerFotoServidor == true
                        ? `${LINK_API}${dadosProduto.caminhoFoto}`
                        : dadosProduto.caminhoFoto || "/placeholder.svg"
                    }
                    alt="Imagem ilustrativa"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute right-1 top-1 h-6 w-6 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDadosProduto({ ...dadosProduto, caminhoFoto: "" });
                      setLerFotoServidor(false);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex h-20 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
                  <Label
                    htmlFor="imagem-upload"
                    className="flex cursor-pointer flex-col items-center justify-center text-xs text-gray-500"
                  >
                    <Upload className="mb-1 h-4 w-4" />
                    <span>Upload</span>
                    <Input
                      id="imagem-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImagemUpload}
                    />
                  </Label>
                </div>
              )}
            </div>
          </div>
          {imagemSelecionada && (
            <ImageViewer
              imagens={[imagemSelecionada]}
              isOpen={!!imagemSelecionada}
              onClose={() => setImagemSelecionada(null)}
            />
          )}

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
