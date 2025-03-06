using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class StatusPedidoEntityService : EntityServiceBase<EinBissEntityService, StatusPedido, int, StatusPedidoFiltro>
{
    public StatusPedidoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<StatusPedido> query, StatusPedidoFiltro filter)
    {
    }

    protected override void OnValidateEntity(StatusPedido entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");
    }
}
