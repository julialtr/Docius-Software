using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class DecoracaoBoloEntityService : EntityServiceBase<EinBissEntityService, DecoracaoBolo, int, DecoracaoBoloFiltro>
{
    public DecoracaoBoloEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<DecoracaoBolo> query, DecoracaoBoloFiltro filter)
    {
    }

    protected override void OnValidateEntity(DecoracaoBolo entity)
    {
        if (entity.Foto == null || entity.Foto.Length == 0)
            throw new WarningException("O campo Foto deve ser informado.");
    }
}
