using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PedidoProdutoEntityService : EntityServiceBase<EinBissEntityService, PedidoProduto, int, PedidoProdutoFiltro>
{
    public PedidoProdutoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<PedidoProduto> query, PedidoProdutoFiltro filter)
    {
    }

    protected override void OnValidateEntity(PedidoProduto entity)
    {
        if (entity.Quantidade == 0)
            throw new WarningException("Quantidade deve ser informada.");

        EntityService.Pedido.ValidateId(entity.PedidoId, "Pedido deve ser informado.", "Pedido informado é inválido.");
        EntityService.Produto.ValidateId(entity.ProdutoId, "Produto deve ser informado.", "Produto informado é inválido.");

        if (entity.StatusPedidoProdutoId != 0)
            EntityService.StatusPedidoProduto.ValidateId(entity.StatusPedidoProdutoId, "Status do pedido do produto deve ser informado.", "Status do pedido do produto informado é inválido.");

        if (entity.PersonalizacaoId != 0)
            EntityService.Personalizacao.ValidateId(entity.PersonalizacaoId, "Personalização deve ser informada.", "Personalização informada é inválida.");
    }
}
