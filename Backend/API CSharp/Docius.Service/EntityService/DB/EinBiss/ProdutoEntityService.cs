using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
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

        if (entity.Preco == 0)
            throw new WarningException("Preço deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("Preço deve ser positivo.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "Receita deve ser informada.", "Receita informada é inválida.");
        EntityService.CategoriaProduto.ValidateId(entity.CategoriaProdutoId, "Categoria do produto deve ser informada.", "Categoria do produto informada é inválida.");
    }
}
