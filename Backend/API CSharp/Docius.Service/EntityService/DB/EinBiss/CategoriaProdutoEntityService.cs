using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class CategoriaProdutoEntityService : EntityServiceBase<EinBissEntityService, CategoriaProduto, int, CategoriaProdutoFiltro>
{
    public CategoriaProdutoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<CategoriaProduto> query, CategoriaProdutoFiltro filter)
    {
    }

    protected override void OnValidateEntity(CategoriaProduto entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("O campo Nome deve ser informado.");

        EntityService.Cardapio.ValidateId(entity.CardapioId, "O campo CardapioId deve ser informado.", "O campo CardapioId informado é inválido.");

        if (entity.CategoriaProdutoSuperiorId != 0)
            EntityService.CategoriaProduto.ValidateId(entity.CardapioId, "O campo CategoriaProdutoSuperiorId deve ser informado.", "O campo CategoriaProdutoSuperiorId informado é inválido.");
    }
}
