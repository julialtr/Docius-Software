import { LINK_API_VERSIONADA } from "@/utils/constants";
import { CreatePedido } from "@/app/[empresa]/(pages)/Admin/Pedidos/interfaces";

import { base64ToFile } from "@/utils/convert";

export const findPedidos = async () => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/pedido`, {
      method: "GET",
      credentials: "include",
    });

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
        const extension = base64Data.split(';')[0].split('/')[1] || 'png';
        const chaveImagem = `imagem_${idImagem++}`;
        
        const imagem = base64ToFile(foto.caminhoFoto, chaveImagem, extension);

        formData.append("imagens", imagem);
        foto.caminhoFoto = chaveImagem;
      });
    }
  });

  formData.append("json", JSON.stringify(pedidoJson));

  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/pedido`, {
      method: "POST",
      body: formData,
      credentials: "include",
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
    const response = await fetch(`${LINK_API_VERSIONADA}/pedido/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idStatusPedido),
      credentials: "include",
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

export const updateItemPedido = async (id: number, idStatusItemPedido: number) => {
  try {
    const response = await fetch(`${LINK_API_VERSIONADA}/pedido/itemPedido/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idStatusItemPedido),
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.Message || "Erro ao atualizar o item do pedido.");
    }

    return true;
  } catch (error) {
    throw error;
  }
};
