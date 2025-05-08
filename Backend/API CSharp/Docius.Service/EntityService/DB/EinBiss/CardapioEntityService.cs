using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Microsoft.EntityFrameworkCore;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class CardapioEntityService : EntityServiceBase<EinBissEntityService, Cardapio, int, CardapioFiltro>
{
    public CardapioEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Cardapio> query, CardapioFiltro filter)
    {
    }

    protected override void OnValidateEntity(Cardapio entity)
    {
    }

    public async Task<Cardapio> LeCardapio()
    {
        var cardapios = await EntityService.Cardapio.Entity
            .Include(c => c.CategoriaProduto)
            .ToListAsync();

        var categorias = await EntityService.CategoriaProduto.Entity
            .Include(c => c.Produto)
                .ThenInclude(p => p.Receita)
            .ToListAsync();

        return cardapios.First();
    }

    private async Task<List<CategoriaProduto>> GetCategoriasProdutos(CategoriaProduto categoriaProduto)
    {
        List<CategoriaProduto> categoriasProdutos = new();

        // Recursão para ler todas as categorias e subcategorias
        if (categoriaProduto.CategoriaProdutoInferior is not null && categoriaProduto.CategoriaProdutoInferior.Any())
        {
            foreach (var categoriaProdutoInferior in categoriaProduto.CategoriaProdutoInferior)
            {
                categoriasProdutos.AddRange(await GetCategoriasProdutos(categoriaProdutoInferior));
            }
        }

        // Remover os ids das categorias que serão removidas dos produtos
        var produtos = EntityService.Produto.Where(p => p.CategoriaProdutoId == categoriaProduto.Id);
        if (produtos is not null && produtos.Any())
        {
            var listaProdutos = produtos.ToList();

            foreach (var produto in listaProdutos)
            {
                produto.CategoriaProdutoId = null;
            }

            await EntityService.Produto.UpdateRangeAsync(listaProdutos);
        }

        categoriasProdutos.Add(categoriaProduto);

        return categoriasProdutos;
    }

    private async Task GravaCategoriaProduto(CategoriaProduto categoriaProduto)
    {
        if (categoriaProduto.CategoriaProdutoSuperiorId == 0)
            categoriaProduto.CategoriaProdutoSuperiorId = null;

        var produtos = new List<Produto>(categoriaProduto.Produto);
        var categoriasProdutoInferior = new List<CategoriaProduto>(categoriaProduto.CategoriaProdutoInferior);
        
        categoriaProduto.Produto = null;
        categoriaProduto.CategoriaProdutoInferior = null;

        // Criar nova categoria de produto
        categoriaProduto = await EntityService.CategoriaProduto.CreateAsync(categoriaProduto);

        // Atualizar produto
        foreach (var produto in produtos)
        {
            produto.CategoriaProdutoId = categoriaProduto.Id;

            var produtoAtual = EntityService.Produto.Entity.Local.FirstOrDefault(p => p.Id == produto.Id);
            if (produtoAtual != null)
            {
                EntityService.Produto.Entity.Entry(produtoAtual).CurrentValues.SetValues(produto);
            }
            else
            {
                await EntityService.Produto.UpdateAsync(produto);
            }
        }

        EntityService.Produto.SaveChanges();

        // Grava nova subcategoria de produto
        if (categoriasProdutoInferior.Any())
        {
            foreach (var categoriaProdutoInferior in categoriasProdutoInferior)
            {
                categoriaProdutoInferior.CategoriaProdutoSuperiorId = categoriaProduto.Id;
                categoriaProdutoInferior.CardapioId = null;

                await GravaCategoriaProduto(categoriaProdutoInferior);
            }
        }
    }

    public async Task<Cardapio> AtualizaCardapioAsync(Cardapio dados)
    {
        return await ExecuteTransactionAsync(async () => {
            var cardapioAtual = EntityService.Cardapio.Entity
            .Include(c => c.CategoriaProduto)
                .ThenInclude(cp => cp.CategoriaProdutoInferior)
            .FirstOrDefault();

            // Deletar todas as categorias vinculadas à receita
            if (cardapioAtual.CategoriaProduto is not null && cardapioAtual.CategoriaProduto.Any())
            {
                var listDelete = new List<CategoriaProduto>();
                foreach (var categoriaProduto in cardapioAtual.CategoriaProduto)
                    listDelete.AddRange(await GetCategoriasProdutos(categoriaProduto));

                await EntityService.CategoriaProduto.DeleteRangeAsync(listDelete);
            }

            if (dados.CategoriaProduto is null || !dados.CategoriaProduto.Any())
                return dados;

            // Gravar todas as categorias vinculadas à receita
            foreach (var categoriaProduto in dados.CategoriaProduto)
                await GravaCategoriaProduto(categoriaProduto);

            return await LeCardapio();
        });
    }

    public async Task<List<Produto>> LeUltimosProdutosPedidos(int idUsuario)
    {
        var pedidos = await EntityService.Pedido.Entity
            .Include(p => p.PedidoProduto)
                .ThenInclude(pp => pp.Produto)
            .Where(p => p.UsuarioId.Equals(idUsuario))
            .OrderByDescending(p => p.DataHoraEntrega)
            .ToListAsync();

        var produtos = pedidos
            .SelectMany(p => p.PedidoProduto)
            .Select(pp => pp.Produto)
            .Distinct()
            .Take(5)
            .Select(p => new Produto
            {
                Id = p.Id,
                Nome = p.Nome,
                Preco = p.Preco,
                CaminhoFoto = p.CaminhoFoto,
            })
            .ToList();

        return produtos;
    }
}
