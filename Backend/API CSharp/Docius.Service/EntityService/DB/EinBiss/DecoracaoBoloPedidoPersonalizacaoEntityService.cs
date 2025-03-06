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
            EntityService.DecoracaoBoloPedido.ValidateId(entity.DecoracaoBoloPedidoId, "Decoração do bolo do pedido deve ser informada", "Decoração do bolo do pedido informada é inválida.");

        if (entity.PersonalizacaoId != 0)
            EntityService.Personalizacao.ValidateId(entity.PersonalizacaoId, "Personalização deve ser informada.", "Personalização informada é inválida.");
    }
}
