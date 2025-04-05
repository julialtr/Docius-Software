using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PersonalizacaoFotoEntityService : EntityServiceBase<EinBissEntityService, PersonalizacaoFoto, int, PersonalizacaoFotoFiltro>
{
    public PersonalizacaoFotoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<PersonalizacaoFoto> query, PersonalizacaoFotoFiltro filter)
    {
    }

    protected override void OnValidateEntity(PersonalizacaoFoto entity)
    {
        if (entity.Foto == null || entity.Foto.Length == 0)
            throw new WarningException("Foto deve ser informada.");

        if (entity.PersonalizacaoId != 0)
            EntityService.Personalizacao.ValidateId(entity.PersonalizacaoId, "Personalização deve ser informada.", "Personalização informada é inválida.");
    }
}
