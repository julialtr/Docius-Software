import {
  ReadCategoriaProduto,
  UpdateCategoriaProduto,
} from "./(CategoriaProduto)/interfaces";

export interface UpdateCardapio {
  categoriaProduto: UpdateCategoriaProduto[];
}

export interface ReadCardapio {
  id: number;
  categoriaProduto: ReadCategoriaProduto[];
}

export function updateConvert(cardapio: ReadCardapio): UpdateCardapio {
  return {
    categoriaProduto: mapearCategorias(cardapio.categoriaProduto),
  };
}

function mapearCategorias(
  categorias: ReadCategoriaProduto[]
): UpdateCategoriaProduto[] {
  return categorias.map((categoriaProduto) => ({
    nome: categoriaProduto.nome,
    cardapioId: categoriaProduto.cardapioId,
    categoriaProdutoSuperiorId: categoriaProduto.categoriaProdutoSuperiorId,
    produto: categoriaProduto.produto.map((produto) => ({
      nome: produto.nome,
      receitaId: produto.receita.id,
      categoriaProdutoId: produto.categoriaProdutoId,
    })),
    categoriaProdutoInferior: mapearCategorias(
      categoriaProduto.categoriaProdutoInferior ?? []
    ),
  }));
}
