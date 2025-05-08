export interface ReadMensagem {
  id: number;
  mensagem: string;
  tipoAutor: string;
  dataHora: Date;
}

export interface CreateMensagem {
  mensagem: string;
  threadId: string;
}
