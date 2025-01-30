using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class CardapioEntityService : EntityServiceBase<EinBissEntityService, Cardapio, int, CardapioFiltro>
{
    public CardapioEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Cardapio> query, CardapioFiltro filter)
    {
    }

    protected override void OnValidateEntity(Cardapio entity)
    {
    }
}
