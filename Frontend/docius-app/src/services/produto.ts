import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch, secureFetchForm } from "./base";
import { base64ToFile } from "@/utils/convert";

import {
  CreateProduto,
  UpdateProduto,
} from "@/app/[empresa]/(pages)/Admin/Cadastros/Produtos/interfaces";

export const findProdutos = async () => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto`, {
      method: "GET",
    });

    if (response.status === 204) return [];

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const updateProduto = async (id: number, produto: UpdateProduto) => {
  const formData = new FormData();

  const produtoJson = structuredClone(produto);
  let idImagem = 0;

  if (produtoJson.caminhoFoto != "") {
    const base64Data = produtoJson.caminhoFoto;
    const extension = base64Data.split(";")[0].split("/")[1] || "png";
    const chaveImagem = `imagem_${idImagem++}`;

    const imagem = base64ToFile(
      produtoJson.caminhoFoto,
      chaveImagem,
      extension
    );

    formData.append("imagens", imagem);
    produtoJson.caminhoFoto = chaveImagem;
  }

  formData.append("json", JSON.stringify(produtoJson));

  try {
    const response = await secureFetchForm(
      `${LINK_API_VERSIONADA}/produto/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const createProduto = async (produto: CreateProduto) => {
  const formData = new FormData();

  const produtoJson = structuredClone(produto);
  let idImagem = 0;

  if (produtoJson.caminhoFoto != "") {
    const base64Data = produtoJson.caminhoFoto;
    const extension = base64Data.split(";")[0].split("/")[1] || "png";
    const chaveImagem = `imagem_${idImagem++}`;

    const imagem = base64ToFile(
      produtoJson.caminhoFoto,
      chaveImagem,
      extension
    );

    formData.append("imagens", imagem);
    produtoJson.caminhoFoto = chaveImagem;
  }

  formData.append("json", JSON.stringify(produtoJson));

  try {
    const response = await secureFetchForm(`${LINK_API_VERSIONADA}/produto`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) return data;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteProduto = async (id: number) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/produto/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
