using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class GastoEntityService : EntityServiceBase<EinBissEntityService, Gasto, int, GastoFiltro>
{
    public GastoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Gasto> query, GastoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Gasto entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("O campo Nome deve ser informado.");

        if (entity.Valor == 0)
            throw new WarningException("O campo Valor deve ser informado.");

        if (entity.Valor < 0)
            throw new WarningException("O campo Valor deve ser positivo.");

        if (DateOnly.MinValue == entity.Data)
            throw new WarningException("O campo Data deve ser informado.");
    }
}
