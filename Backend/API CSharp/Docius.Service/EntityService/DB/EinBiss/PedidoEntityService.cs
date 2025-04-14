using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PedidoEntityService : EntityServiceBase<EinBissEntityService, Pedido, int, PedidoFiltro>
{
    private readonly IWebHostEnvironment _env;

    public PedidoEntityService(EinBissEntityService service, EinBissContext context, IWebHostEnvironment env) : base(service, context)
    {
        _env = env;
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

    public async Task CriaPedidoAsync(CreatePedidoDetalhado dados, List<IFormFile> imagens)
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
                            var chaveImagem = personalizacaoFotoPedidoProduto.CaminhoFoto;

                            var imagem = imagens.FirstOrDefault(f => f.FileName == chaveImagem);
                            if (imagem == null)
                                continue;

                            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                            if (!Directory.Exists(uploadsFolder))
                                Directory.CreateDirectory(uploadsFolder);
                            
                            var nomeImagem = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                            var caminhoImagem = Path.Combine(uploadsFolder, nomeImagem);
                            
                            using (var stream = new FileStream(caminhoImagem, FileMode.Create))
                            {
                                await imagem.CopyToAsync(stream);
                            }
                            
                            var caminhoRelativoImagem = $"/uploads/{nomeImagem}";
                            
                            PersonalizacaoFoto personalizacaoFoto = new PersonalizacaoFoto
                            {
                                CaminhoFoto = caminhoRelativoImagem,
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

    public List<ReadPedidoDetalhado> LePedidos()
    {
        var pedidos = EntityService.Pedido.Entity
            .Include(p => p.PedidoProduto)
                .ThenInclude(pp => pp.Personalizacao)
                    .ThenInclude(pz => pz.PersonalizacaoFoto)
            .Include(p => p.PedidoProduto)
                .ThenInclude(pp => pp.Produto)
            .Include(p => p.Usuario)
            .ToList();

        if (!pedidos.Any())
        {
            return new List<ReadPedidoDetalhado>();
        }

        var pedidosDetalhados = pedidos.Select(pedido => new ReadPedidoDetalhado
        {
            Id = pedido.Id,
            Identificador = pedido.Identificador,
            DataHoraEntrega = pedido.DataHoraEntrega,
            Usuario = pedido.Usuario,
            StatusPedidoId = pedido.StatusPedidoId,
            PedidoProduto = pedido.PedidoProduto?
                .Select(pedidoProduto => new ReadPedidoProdutoDetalhado
                {
                    Id = pedidoProduto.Id,
                    Quantidade = pedidoProduto.Quantidade,
                    StatusPedidoProdutoId = pedidoProduto.StatusPedidoProdutoId,
                    Produto = pedidoProduto.Produto,
                    Personalizacao = pedidoProduto.Personalizacao != null ? new PersonalizacaoDetalhado
                    {
                        Descricao = pedidoProduto.Personalizacao.Descricao,
                        PersonalizacaoFoto = pedidoProduto.Personalizacao.PersonalizacaoFoto?
                            .Select(personalizacaoFoto => new PersonalizacaoFoto
                            {
                                Id = personalizacaoFoto.Id,
                                CaminhoFoto = personalizacaoFoto.CaminhoFoto
                            }).ToList() ?? new List<PersonalizacaoFoto>(),
                    } : null,
                }).ToList() ?? new List<ReadPedidoProdutoDetalhado>(),
        });

        return pedidosDetalhados.ToList();
    }
}
