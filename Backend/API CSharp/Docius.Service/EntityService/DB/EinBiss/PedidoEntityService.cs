using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PedidoEntityService : EntityServiceBase<EinBissEntityService, Pedido, int, PedidoFiltro>
{
    public PedidoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Pedido> query, PedidoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Pedido entity)
    {
        if (DateTime.MinValue == entity.DataHoraEntrega)
            throw new WarningException("Data/Hora de entrega deve ser informada.");

        if (string.IsNullOrEmpty(entity.Identificador))
            throw new WarningException("Identificador deve ser informado.");

        EntityService.Usuario.ValidateId(entity.UsuarioId, "Usuário deve ser informado.", "Usuário informado é inválido.");

        if (entity.StatusPedidoId != 0)
            EntityService.StatusPedido.ValidateId(entity.StatusPedidoId, "Status do pedido deve ser informado.", "Status do pedido informado é inválido.");
    }

    public async Task CriaPedidoAsync(PedidoDetalhado dados)
    {
        await ExecuteTransactionAsync(async () =>
        {
            foreach (var pedidoProduto in dados.PedidoProduto)
            {
                if (pedidoProduto.Personalizacao != null)
                {
                    Personalizacao personalizacao = new Personalizacao
                    {
                        Descricao = pedidoProduto.Personalizacao.Descricao,
                    };

                    var createdEntityPersonalizacao = await EntityService.Personalizacao.CreateAsync(personalizacao);

                    pedidoProduto.PersonalizacaoId = createdEntityPersonalizacao.Id;

                    if (pedidoProduto.Personalizacao.PersonalizacaoFoto.Count != 0)
                    {
                        foreach (var personalizacaoFotoPedidoProduto in pedidoProduto.Personalizacao.PersonalizacaoFoto)
                        {
                            PersonalizacaoFoto personalizacaoFoto = new PersonalizacaoFoto
                            {
                                CaminhoFoto = personalizacaoFotoPedidoProduto.CaminhoFoto,
                                PersonalizacaoId = createdEntityPersonalizacao.Id,
                            };

                            await EntityService.PersonalizacaoFoto.CreateAsync(personalizacaoFoto);
                        }
                    }
                }
            }

            Pedido pedido = new Pedido()
            {
                DataHoraEntrega = dados.DataHoraEntrega,
                Identificador = dados.Identificador,
                StatusPedidoId = 1,
                UsuarioId = dados.UsuarioId,
            };

            var createdEntity = await EntityService.Pedido.CreateAsync(pedido);

            foreach (var pedidoProduto in dados.PedidoProduto)
            {
                PedidoProduto novoPedidoProduto = new PedidoProduto()
                {
                    PedidoId = createdEntity.Id,
                    PersonalizacaoId = pedidoProduto.PersonalizacaoId != 0 ? pedidoProduto.PersonalizacaoId : null,
                    ProdutoId = pedidoProduto.ProdutoId,
                    Quantidade = pedidoProduto.Quantidade,
                    StatusPedidoProdutoId = 2,
                };

                await EntityService.PedidoProduto.CreateAsync(novoPedidoProduto);
            }
        });
    }
}
