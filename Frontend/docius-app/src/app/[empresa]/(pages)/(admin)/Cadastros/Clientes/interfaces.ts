export interface FilterUsuario {
  email: string;
  senha: string;
}

export interface CreateUsuario {
  nome: string;
  email: string;
  senha: string;
  tipoUsuarioId: number;
}

export interface ReadUsuarioPedidos {
  id: number;
  nome: string;
  email: string;
  qtdPedidos: number;
}
