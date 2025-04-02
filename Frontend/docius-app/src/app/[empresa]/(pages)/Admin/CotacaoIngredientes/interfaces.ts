import { ReadFornecedor } from "../Cadastros/Fornecedores/interfaces";

export interface FilterWebScraping {
  idsMercados: number[];
  textoPesquisa: string;
}

export interface ReadWebScrapingDados {
  id: number;
  idMercado: number;
  nome: string;
  preco: number;
  fornecedor: ReadFornecedor;
  automatica: boolean;
}

export interface ReadWebScrapingRetorno {
  mensagem: string;
  dados: ReadWebScrapingDados[];
}
