using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class DecoracaoBoloPedidoPersonalizacaoEntityService : EntityServiceBase<EinBissEntityService, DecoracaoBoloPedidoPersonalizacao, int, DecoracaoBoloPedidoPersonalizacaoFiltro>
{
    public DecoracaoBoloPedidoPersonalizacaoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<DecoracaoBoloPedidoPersonalizacao> query, DecoracaoBoloPedidoPersonalizacaoFiltro filter)
    {
    }

    protected override void OnValidateEntity(DecoracaoBoloPedidoPersonalizacao entity)
    {
        if (entity.DecoracaoBoloPedidoId != 0)
            ValidateId(entity.DecoracaoBoloPedidoId, "O campo DecoracaoBoloPedidoId deve ser informado.", "O campo DecoracaoBoloPedidoId informado é inválido.");

        if (entity.PersonalizacaoId != 0)
            ValidateId(entity.PersonalizacaoId, "O campo PersonalizacaoId deve ser informado.", "O campo PersonalizacaoId informado é inválido.");
    }
}
