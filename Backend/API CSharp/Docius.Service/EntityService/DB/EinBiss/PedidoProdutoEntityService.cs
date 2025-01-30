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
            throw new WarningException("O campo Quantidade deve ser informado.");

        ValidateId(entity.PedidoId, "O campo PedidoId deve ser informado.", "O campo PedidoId informado é inválido.");
        ValidateId(entity.ProdutoId, "O campo ProdutoId deve ser informado.", "O campo ProdutoId informado é inválido.");

        if (entity.StatusPedidoProdutoId != 0)
            ValidateId(entity.StatusPedidoProdutoId, "O campo StatusPedidoProdutoId deve ser informado.", "O campo StatusPedidoProdutoId informado é inválido.");

        if (entity.PersonalizacaoId != 0)
            ValidateId(entity.PersonalizacaoId, "O campo PersonalizacaoId deve ser informado.", "O campo PersonalizacaoId informado é inválido.");
    }
}
