using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class UnidadeMedidaEntityService : EntityServiceBase<EinBissEntityService, UnidadeMedida, int, UnidadeMedidaFiltro>
{
    public UnidadeMedidaEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<UnidadeMedida> query, UnidadeMedidaFiltro filter)
    {
    }

    protected override void OnValidateEntity(UnidadeMedida entity)
    {
        if (string.IsNullOrEmpty(entity.Sigla))
            throw new WarningException("Sigla deve ser informada.");
    }
}
