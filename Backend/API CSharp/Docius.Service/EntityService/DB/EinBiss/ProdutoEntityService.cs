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
            throw new WarningException("O campo Nome deve ser informado.");

        if (entity.Preco == 0)
            throw new WarningException("O campo Preco deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("O campo Preco deve ser positivo.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "O campo ReceitaId deve ser informado.", "O campo ReceitaId informado é inválido.");
        EntityService.CategoriaProduto.ValidateId(entity.CategoriaProdutoId, "O campo CategoriaProdutoId deve ser informado.", "O campo ReceitaId informado é inválido.");
    }
}
