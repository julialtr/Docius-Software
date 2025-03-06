using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class DecoracaoBoloPedidoEntityService : EntityServiceBase<EinBissEntityService, DecoracaoBoloPedido, int, DecoracaoBoloPedidoFiltro>
{
    public DecoracaoBoloPedidoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<DecoracaoBoloPedido> query, DecoracaoBoloPedidoFiltro filter)
    {
    }

    protected override void OnValidateEntity(DecoracaoBoloPedido entity)
    {
        if (entity.Foto == null || entity.Foto.Length == 0)
            throw new WarningException("Foto deve ser informada.");
    }
}
