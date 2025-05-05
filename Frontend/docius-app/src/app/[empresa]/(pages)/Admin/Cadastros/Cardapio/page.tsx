"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PlusCircle, Save } from "lucide-react";

import Loading from "@/app/loading";
import Menu from "@/app/_components/Menu";
import ListaItens from "./ListaItens";
import FormularioProduto from "./(Produto)/FormularioProduto";
import FormularioCategoriaProduto from "./(CategoriaProduto)/FormularioCategoriaProduto";

import { ReadCardapio, updateConvert } from "./interfaces";
import { ReadProduto } from "../Produtos/interfaces";
import { ReadCategoriaProduto } from "./(CategoriaProduto)/interfaces";
import { findCardapio, updateCardapio } from "@/services/cardapio";
import { findProdutos } from "@/services/produto";

import { Button } from "@/app/_components/ui/button";

import { useToast } from "@/hooks/use-toast";

export default function Cardapio() {
  const { toast } = useToast();

  const [dados, setDados] = useState<ReadCardapio>({
    id: 0,
    categoriaProduto: [],
  });
  const [produtos, setProdutos] = useState<ReadProduto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ReadProduto[]>([]);
  const [produto, setProduto] = useState<ReadProduto | null>(null);
  const [categoria, setCategoria] = useState<ReadCategoriaProduto | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogProductOpen, setIsDialogProductOpen] = useState(false);
  const [categoriaSuperiorId, setCategoriaSuperiorId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      let produtosResponse: ReadProduto[] = [];

      try {
        produtosResponse = await findProdutos();
        setProdutos(produtosResponse);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler produtos",
            description: error.message,
          });
        }
      }

      let cardapioResponse: ReadCardapio;

      try {
        cardapioResponse = await findCardapio();
        setDados(cardapioResponse);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          toast({
            variant: "destructive",
            title: "Erro ao ler cardápio",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }

      setProdutosFiltrados(
        produtosResponse.filter(
          (produto) =>
            produto.preco !== 0 &&
            !cardapioResponse.categoriaProduto?.some((categoria) =>
              produtoEstaNoCardapio(categoria, produto.id)
            )
        )
      );
    };

    loadData();
  }, []);

  const produtoEstaNoCardapio = (
    categoria: ReadCategoriaProduto,
    produtoId: number
  ): boolean => {
    if (categoria?.produto?.some((p) => p.id === produtoId)) {
      return true;
    }

    return categoria?.categoriaProdutoInferior?.some((subCategoria) =>
      produtoEstaNoCardapio(subCategoria, produtoId)
    );
  };

  const handleDadosChange = (novosDados: ReadCardapio) => {
    setDados(novosDados);

    setProdutosFiltrados(
      produtos.filter(
        (produto) =>
          produto.preco !== 0 &&
          !novosDados.categoriaProduto?.some((categoria) =>
            produtoEstaNoCardapio(categoria, produto.id)
          )
      )
    );
  };

  const handleIsDialogOpenChange = (isDialogOpen: boolean) => {
    setIsDialogOpen(isDialogOpen);
  };

  const handleIsDialogProductOpen = (isDialogProductOpen: boolean) => {
    setIsDialogProductOpen(isDialogProductOpen);
  };

  const handleProdutoChange = (produto: ReadProduto | null) => {
    setProduto(produto);
  };

  const handleCategoriaChange = (categoria: ReadCategoriaProduto | null) => {
    setCategoria(categoria);
  };

  const handleCategoriaSuperiorIdChange = (
    categoriaSuperiorId: number | null
  ) => {
    setCategoriaSuperiorId(categoriaSuperiorId);
  };

  const handleOpenDialog = (isDialogProductOpen: boolean) => {
    setIsDialogProductOpen(isDialogProductOpen);
    setCategoriaSuperiorId(null);

    handleCategoriaChange(null);
    handleProdutoChange(null);

    setIsDialogOpen(true);
  };

  const salvarCardapio = async () => {
    if (!dados) return;

    try {
      const novoDado = await updateCardapio(dados.id, updateConvert(dados));

      handleDadosChange(novoDado);

      toast({
        title: "Cardápio atualizado",
        description: "As informações foram salvas com sucesso",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Erro ao salvar o cardápio",
          description: error.message,
        });
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex h-screen bg-gray-100">
      <Menu />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cardápio</h1>
            <p className="text-gray-600">
              Crie e gerencie o cardápio da sua confeitaria
            </p>
          </div>

          {/* Actions */}
          <div className="mb-6 flex justify-between">
            <Button
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
              onClick={() => handleOpenDialog(false)}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={salvarCardapio}
            >
              <Save className="h-4 w-4" />
              Salvar Cardápio
            </Button>
          </div>

          {/* Cardápio */}
          <ListaItens
            dados={dados}
            produtos={produtosFiltrados}
            onDadosChange={handleDadosChange}
            onCategoriaChange={handleCategoriaChange}
            onProdutoChange={handleProdutoChange}
            onIsDialogOpenChange={handleIsDialogOpenChange}
            onCategoriaSuperiorIdChange={handleCategoriaSuperiorIdChange}
            onIsDialogProductOpenChange={handleIsDialogProductOpen}
          />

          {isDialogProductOpen && (
            <FormularioProduto
              produto={produto}
              produtos={produtosFiltrados}
              onProdutoChange={handleProdutoChange}
              dados={dados}
              categoriaSuperiorId={categoriaSuperiorId}
              isDialogOpen={isDialogOpen}
              onIsDialogOpenChange={handleIsDialogOpenChange}
              onDadosChange={handleDadosChange}
            />
          )}

          {!isDialogProductOpen && (
            <FormularioCategoriaProduto
              categoria={categoria}
              onCategoriaChange={handleCategoriaChange}
              onDadosChange={handleDadosChange}
              dados={dados}
              categoriaSuperiorId={categoriaSuperiorId}
              isDialogOpen={isDialogOpen}
              onIsDialogOpenChange={handleIsDialogOpenChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
