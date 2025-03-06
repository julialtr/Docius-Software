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
            throw new WarningException("Data/Hora de entrega deve ser informada.");

        EntityService.Usuario.ValidateId(entity.UsuarioId, "Usuário deve ser informado.", "Usuário informado é inválido.");

        if (entity.StatusPedidoId != 0)
            EntityService.StatusPedido.ValidateId(entity.StatusPedidoId, "Status do pedido deve ser informado.", "Status do pedido informado é inválido.");
    }
}
