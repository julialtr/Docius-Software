using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class TipoUsuarioEntityService : EntityServiceBase<EinBissEntityService, TipoUsuario, int, TipoUsuarioFiltro>
{
    public TipoUsuarioEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<TipoUsuario> query, TipoUsuarioFiltro filter)
    {
    }

    protected override void OnValidateEntity(TipoUsuario entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("O campo Nome deve ser informado.");
    }
}
