"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { CategoriaProduto } from "@/app/[empresa]/(pages)/Client/Cardapio/CategoriaProduto";
import { ReadCardapio } from "../../Admin/Cadastros/Cardapio/interfaces";
import { findCardapio } from "@/services/cardapio";

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

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await findCardapio();
        setCardapio(response);
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
