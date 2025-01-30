using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class FornecedorEntityService : EntityServiceBase<EinBissEntityService, Fornecedor, int, FornecedorFiltro>
{
    public FornecedorEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Fornecedor> query, FornecedorFiltro filter)
    {
    }

    protected override void OnValidateEntity(Fornecedor entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("O campo Nome deve ser informado.");
    }
}
