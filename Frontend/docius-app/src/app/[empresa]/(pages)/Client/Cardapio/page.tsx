"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { CategoriaProduto } from "@/app/[empresa]/(pages)/Client/Cardapio/CategoriaProduto";
import { ReadCardapio } from "../../Admin/Cadastros/Cardapio/interfaces";
import { findCardapio, findUltimosProdutosPedidos } from "@/services/cardapio";
import { ReadProduto } from "../../Admin/Cadastros/Produtos/interfaces";
import { Produto } from "./Produto";

import { MenuCliente } from "@/app/_components/Menu/Cliente";

import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { DadosCarrinhoComprasProvider } from "@/context/DadosCarrinhoComprasContext";
import { useDadosEmpresa } from "@/context/DadosEmpresaContext";

export default function Cardapio() {
  const { toast } = useToast();
  const { dadosEmpresa } = useDadosEmpresa();

  const [isLoading, setIsLoading] = useState(false);

  const [cardapio, setCardapio] = useState<ReadCardapio>({
    id: 0,
    categoriaProduto: [],
  });

  const [ultimosProdutos, setUltimosProdutos] = useState<ReadProduto[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        var response = await findCardapio();
        setCardapio(response);

        const userType = localStorage.getItem("userType");
        const usuarioId = localStorage.getItem("userId");       

        if (userType == "1" && usuarioId) {
          response = await findUltimosProdutosPedidos(Number(usuarioId));
          
          setUltimosProdutos(response);
        }
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
    };

    loadData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <DadosCarrinhoComprasProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Menu do Cliente */}
        <MenuCliente />

        <main className="container mx-auto px-4 py-8">
          {/* Banner */}
          <div className="mb-8 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 p-8 text-white">
            <div>
              <h1 className="text-3xl font-bold">
                {`Cardápio ${dadosEmpresa?.nome}`}
              </h1>
              <p className="mt-2">
                Explore e experimente nossos deliciosos produtos, feitos com
                ingredientes selecionados e muito carinho.
              </p>
            </div>
          </div>

          {ultimosProdutos.length ? (
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-amber-900 border-l-4 border-amber-500 pl-3">
                Os seus queridinhos s2
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {ultimosProdutos.map((produto) => (
                  <div key={`featured-${produto.id}`}>
                    <Produto produto={produto} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Categorias */}
          {cardapio.categoriaProduto.length > 0 ? (
            cardapio.categoriaProduto.map((categoria) => (
              <CategoriaProduto
                key={categoria.id}
                categoria={categoria}
                nivel={0}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-amber-100 p-6">
                <Search className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Nenhum cardápio encontrado
              </h3>
            </div>
          )}
        </main>
      </div>
    </DadosCarrinhoComprasProvider>
  );
}
