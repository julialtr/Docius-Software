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
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      qtdPedidos: produto.qtdPedidos,
      receitaId: produto.receita?.id,
      categoriaProdutoId: produto.categoriaProdutoId,
      caminhoFoto: produto.caminhoFoto,
    })),
    categoriaProdutoInferior: mapearCategorias(
      categoriaProduto.categoriaProdutoInferior ?? []
    ),
  }));
}
