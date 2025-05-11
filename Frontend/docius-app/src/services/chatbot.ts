import { LINK_API_VERSIONADA } from "@/utils/constants";
import { secureFetch } from "./base";

import { CreateMensagem } from "@/app/[empresa]/(pages)/Admin/Chatbot/interfaces";

export const createThread = async () => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/chatbot/thread`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) return data.response;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const validateThread = async (id: string) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/chatbot/thread/validacao/${id}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) return data.response;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (mensagem: CreateMensagem) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/chatbot`, {
      method: "POST",
      body: JSON.stringify(mensagem),
    });

    const data = await response.json();

    if (response.ok) return data.response;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (id: string) => {
  try {
    const response = await secureFetch(`${LINK_API_VERSIONADA}/chatbot/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) return data.response;

    throw new Error(data.Message || "Erro de conexão com a API.");
  } catch (error) {
    throw error;
  }
};

export const deleteThread = async (id: string) => {
  try {
    const response = await secureFetch(
      `${LINK_API_VERSIONADA}/chatbot/thread/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.Message || "Erro de conexão com a API.");
    }
  } catch (error) {
    throw error;
  }
};
