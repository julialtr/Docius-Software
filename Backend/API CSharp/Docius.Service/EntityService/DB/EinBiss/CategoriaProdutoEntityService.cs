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
            throw new WarningException("Nome deve ser informado.");

        EntityService.Cardapio.ValidateId(entity.CardapioId, "Cardápio deve ser informado.", "Cardápio informado é inválido.");

        if (entity.CategoriaProdutoSuperiorId != 0)
            EntityService.CategoriaProduto.ValidateId(entity.CardapioId, "Categoria superior do produto deve ser informada.", "Categoria superior do produto informada é inválida.");
    }
}
