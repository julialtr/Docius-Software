import { ReadUnidadeMedida } from "../(UnidadeMedida)/interfaces";
import { ReadFornecedorIngredientes } from "../Fornecedores/interfaces";

export interface ReadIngredienteCategoriaIngrediente {
  id: number;
  nome: string;
  marca: string;
  preco: number;
  quantidade: number;
  medida: number;
  unidadeMedida: ReadUnidadeMedida;
  fornecedor: ReadFornecedorIngredientes;
}
