using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class StatusPedidoProdutoEntityService : EntityServiceBase<EinBissEntityService, StatusPedidoProduto, int, StatusPedidoProdutoFiltro>
{
    public StatusPedidoProdutoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<StatusPedidoProduto> query, StatusPedidoProdutoFiltro filter)
    {
    }

    protected override void OnValidateEntity(StatusPedidoProduto entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");
    }
}
