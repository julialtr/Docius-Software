using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PersonalizacaoEntityService : EntityServiceBase<EinBissEntityService, Personalizacao, int, PersonalizacaoFiltro>
{
    public PersonalizacaoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Personalizacao> query, PersonalizacaoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Personalizacao entity)
    {
    }
}
