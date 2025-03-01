export interface ReadFornecedores {
  id: number;
  nome: string;
  endereco: string;
  site: string;
}

export interface CreateFornecedor {
  nome: string;
  endereco: string;
  site: string;
}

export interface UpdateFornecedor {
  nome: string;
  endereco: string;
  site: string;
}
