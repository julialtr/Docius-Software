using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class ProdutoEntityService : EntityServiceBase<EinBissEntityService, Produto, int, ProdutoFiltro>
{
    public ProdutoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Produto> query, ProdutoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Produto entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("Preço deve ser positivo.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "Receita deve ser informada.", "Receita informada é inválida.");
    }

    public List<ProdutoDetalhado> LeProdutos(ProdutoFiltro filtro)
    {
        var produtos = EntityService.Produto.Entity
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.CategoriaIngrediente)
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.UnidadeMedida)
            .Include(e => e.PedidoProduto)
            .Where(e => filtro.Ids != null && filtro.Ids.Any() ? filtro.Ids.Contains(e.Id) : true)
            .ToList();

        if (!produtos.Any())
        {
            return new List<ProdutoDetalhado>();
        }

        var produtosDetalhados = produtos.Select(produto => new ProdutoDetalhado
        {
            Id = produto.Id,
            Nome = produto.Nome,
            Preco = produto.Preco,
            QtdPedidos = produto.PedidoProduto?.Count() ?? 0,
            CategoriaProdutoId = produto.CategoriaProdutoId,
            Receita = produto.Receita != null ? new ReceitaDetalhada
            {
                Id = produto.Receita.Id,
                Nome = produto.Receita.Nome,
                Descricao = produto.Receita.Descricao,
                Tempo = produto.Receita.Tempo,
                QtdPorcoes = produto.Receita.QtdPorcoes,
                ReceitaCategoriaIngrediente = produto.Receita.ReceitaCategoriaIngrediente?
                    .Select(receitaIngrediente => new ReceitaCategoriaIngredienteDetalhada
                    {
                        Id = receitaIngrediente.Id,
                        Medida = receitaIngrediente.Medida,
                        ReceitaId = receitaIngrediente.ReceitaId,
                        CategoriaIngrediente = receitaIngrediente.CategoriaIngrediente != null ? new CategoriaIngrediente
                        {
                            Id = receitaIngrediente.CategoriaIngrediente.Id,
                            Nome = receitaIngrediente.CategoriaIngrediente.Nome
                        } : null,
                        UnidadeMedida = receitaIngrediente.UnidadeMedida != null ? new UnidadeMedida
                        {
                            Id = receitaIngrediente.UnidadeMedida.Id,
                            Sigla = receitaIngrediente.UnidadeMedida.Sigla
                        } : null
                    }).ToList() ?? new List<ReceitaCategoriaIngredienteDetalhada>()
            } : null
        }).ToList();

        return produtosDetalhados;
    }
}
