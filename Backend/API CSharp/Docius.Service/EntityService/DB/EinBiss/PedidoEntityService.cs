using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PedidoEntityService : EntityServiceBase<EinBissEntityService, Pedido, int, PedidoFiltro>
{
    public PedidoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Pedido> query, PedidoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Pedido entity)
    {
        if (DateTime.MinValue == entity.DataHoraEntrega)
            throw new WarningException("O campo DataHoraEntrega deve ser informado.");

        EntityService.Usuario.ValidateId(entity.UsuarioId, "O campo UsuarioId deve ser informado.", "O campo UsuarioId informado é inválido.");

        if (entity.StatusPedidoId != 0)
            EntityService.StatusPedido.ValidateId(entity.StatusPedidoId, "O campo StatusPedidoId deve ser informado.", "O campo StatusPedidoId informado é inválido.");
    }
}
