import { ReadUnidadeMedida } from "../../(UnidadeMedida)/interfaces";
import { ReadCategoriaIngrediente } from "../../CategoriasIngredientes/interfaces";

export interface ReadReceitaCategoriaIngrediente {
    id: number;
    medida: number;
    categoriaIngrediente: ReadCategoriaIngrediente;
    unidadeMedida: ReadUnidadeMedida;
  }

  export interface CreateReceitaCategoriaIngrediente {
    id: number;
    medida: number;
    categoriaIngredienteId: number;
    unidadeMedidaId: number;
  }
  
  export interface UpdateReceitaCategoriaIngrediente {
    id: number;
    medida: number;
    categoriaIngredienteId: number;
    unidadeMedidaId: number;
  }
  