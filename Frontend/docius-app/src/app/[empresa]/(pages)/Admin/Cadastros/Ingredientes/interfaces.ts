import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";
import { ReadCategoriaIngrediente } from "../CategoriasIngredientes/interfaces";
import { ReadFornecedorIngredientes } from "../Fornecedores/interfaces";

export interface FilterIngrediente {
  categoriaIngredienteId: number;
}

export interface CreateIngrediente {
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
  medida: number;
  unidadeMedidaId: number;
  fornecedorId?: number;
  categoriaIngredienteId: number;
}

export interface UpdateIngrediente {
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
  medida: number;
  unidadeMedidaId: number;
  fornecedorId?: number;
  categoriaIngredienteId: number;
}

export interface ReadIngrediente {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
  medida: number;
  unidadeMedida: ReadUnidadeMedida;
  fornecedor: ReadFornecedorIngredientes;
  categoriaIngrediente: ReadCategoriaIngrediente;
}

export function updateConvert(ingrediente: ReadIngrediente): UpdateIngrediente {
  return {
    nome: ingrediente.nome,
    marca: ingrediente.marca,
    preco: ingrediente.preco,
    quantidade: ingrediente.quantidade,
    medida: ingrediente.medida,
    unidadeMedidaId: ingrediente.unidadeMedida.id,
    ...(ingrediente.fornecedor?.id && { fornecedorId: ingrediente.fornecedor.id }),
    categoriaIngredienteId: ingrediente.categoriaIngrediente.id,
  };
}

export function createConvert(ingrediente: ReadIngrediente): CreateIngrediente {
  return {
    nome: ingrediente.nome,
    marca: ingrediente.marca,
    preco: ingrediente.preco,
    quantidade: ingrediente.quantidade,
    medida: ingrediente.medida,
    unidadeMedidaId: ingrediente.unidadeMedida.id,
    ...(ingrediente.fornecedor?.id && { fornecedorId: ingrediente.fornecedor.id }),
    categoriaIngredienteId: ingrediente.categoriaIngrediente.id,
  };
}
