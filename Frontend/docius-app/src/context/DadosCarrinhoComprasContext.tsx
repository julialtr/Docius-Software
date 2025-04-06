"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

import { ReadProduto } from "@/app/[empresa]/(pages)/Admin/Cadastros/Produtos/interfaces";
import { CreatePedidoProduto } from "@/app/[empresa]/(pages)/Client/Cardapio/interfaces";
import { findProdutos } from "@/services/produto";

import { useDadosUsuario } from "@/context/DadosUsuarioContext";

interface DadosCarrinhoComprasContextProps {
  pedidoProdutos: CreatePedidoProduto[];
  getProduto: (id: number) => ReadProduto | undefined;
  adicionaItem: (novoPedidoProduto: CreatePedidoProduto) => void;
  alteraItem: (
    id: number,
    novoPedidoProduto: Partial<CreatePedidoProduto>
  ) => void;
  removeItem: (id: number) => void;
  limpaCarrinhoCompras: () => void;
  quantidadeItens: number;
  precoTotal: number;
}

const DadosCarrinhoComprasContext = createContext<
  DadosCarrinhoComprasContextProps | undefined
>(undefined);

export const DadosCarrinhoComprasProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useDadosUsuario();
  const [isCarregado, setIsCarregado] = useState(false);

  const [pedidoProdutos, setPedidoProdutos] = useState<CreatePedidoProduto[]>(
    []
  );
  const [produtos, setProdutos] = useState<ReadProduto[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await findProdutos();
        setProdutos(response);
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (id > 0) {    
      const response = localStorage.getItem(`carrinhoCompras-${id}`);
      
      if (response) {
        console.log(JSON.parse(response));
        try {
          setPedidoProdutos(JSON.parse(response));
        } catch (error) {
          if (error instanceof Error) console.error(error);
        }
      }

      setIsCarregado(true);
    }
  }, [id]);

  useEffect(() => {
    if (id > 0 && isCarregado) {
      localStorage.setItem(
        `carrinhoCompras-${id}`,
        JSON.stringify(pedidoProdutos)
      );
    }
  }, [pedidoProdutos, id, isCarregado]);

  const getProduto = (id: number) => {
    return produtos.find((produto) => produto.id === id);
  };

  const adicionaItem = (novoPedidoProduto: CreatePedidoProduto) => {
    setPedidoProdutos((pedidoProduto) => {
      const pedidoProdutoId = pedidoProduto.findIndex(
        (item) =>
          item.produtoId === novoPedidoProduto.produtoId &&
          !item.personalizacao &&
          !novoPedidoProduto.personalizacao
      );

      if (pedidoProdutoId >= 0 && !novoPedidoProduto.personalizacao) {
        const novosPedidoProdutos = [...pedidoProduto];
        novosPedidoProdutos[pedidoProdutoId].quantidade =
          novoPedidoProduto.quantidade;

        return novosPedidoProdutos;
      } else return [...pedidoProduto, novoPedidoProduto];
    });
  };

  const alteraItem = (
    id: number,
    novoPedidoProduto: Partial<CreatePedidoProduto>
  ) => {
    setPedidoProdutos((pedidoProduto) =>
      pedidoProduto.map((item) =>
        item.id === id ? { ...item, ...novoPedidoProduto } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setPedidoProdutos((pedidoProduto) => {
      const novosPedidoProdutos = pedidoProduto.filter(
        (item) => item.id !== id
      );

      if (novosPedidoProdutos.length === 0 && id > 0) {
        localStorage.removeItem(`carrinhoCompras-${id}`);
      }

      return novosPedidoProdutos;
    });
  };

  const limpaCarrinhoCompras = () => {
    setPedidoProdutos([]);
    if (id > 0) {
      localStorage.removeItem(`carrinhoCompras-${id}`);
    }
  };

  const quantidadeItens = pedidoProdutos.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const precoTotal = pedidoProdutos.reduce((total, item) => {
    const produto = getProduto(item.produtoId);
    const preco = produto?.preco ?? 0;
    return total + preco * item.quantidade;
  }, 0);

  return (
    <DadosCarrinhoComprasContext.Provider
      value={{
        pedidoProdutos,
        getProduto,
        adicionaItem,
        alteraItem,
        removeItem,
        limpaCarrinhoCompras,
        quantidadeItens,
        precoTotal,
      }}
    >
      {children}
    </DadosCarrinhoComprasContext.Provider>
  );
};

export const useDadosCarrinhoCompras = () => {
  const context = useContext(DadosCarrinhoComprasContext);
  if (!context) {
    throw new Error("Falha ao usar o contexto.");
  }
  return context;
};
