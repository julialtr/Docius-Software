import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch, secureFetchForm } from "./base";

import {
  CreatePedido,
  FiltroPedido,
} from "@/app/[empresa]/(pages)/Admin/Pedidos/interfaces";

import { base64ToFile } from "@/utils/convert";

export const findPedidos = async (filtro: FiltroPedido) => {
  try {
    const queryParams = new URLSearchParams(filtro as any).toString();

    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/pedido?${queryParams}`,
      {
        method: "GET",
      }
    );

    if (response.status === 204) return [];

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createPedido = async (pedido: CreatePedido) => {
  const formData = new FormData();

  const pedidoJson = structuredClone(pedido);
  let idImagem = 0;

  pedidoJson.pedidoProduto.forEach((produto) => {
    if (produto.personalizacao) {
      produto.personalizacao.personalizacaoFoto.forEach((foto) => {
        const base64Data = foto.caminhoFoto;
        const extension = base64Data.split(";")[0].split("/")[1] || "png";
        const chaveImagem = `imagem_${idImagem++}`;

        const imagem = base64ToFile(foto.caminhoFoto, chaveImagem, extension);

        if (imagem != null) {
          formData.append("imagens", imagem);
          foto.caminhoFoto = chaveImagem;
        }
      });
    }
  });

  formData.append("json", JSON.stringify(pedidoJson));

  try {
    const response = await secureFetchForm(`${LINK_API_VERSIONADA}/pedido`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};

export const updatePedido = async (id: number, idStatusPedido: number) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/pedido/${id}`, {
      method: "PATCH",
      body: JSON.stringify(idStatusPedido),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.Message || "Erro ao atualizar o pedido.");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export const updateItemPedido = async (
  id: number,
  idStatusItemPedido: number
) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/pedido/itemPedido/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(idStatusItemPedido),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.Message || "Erro ao atualizar o item do pedido.");
    }

    return true;
  } catch (error) {
    throw error;
  }
};
