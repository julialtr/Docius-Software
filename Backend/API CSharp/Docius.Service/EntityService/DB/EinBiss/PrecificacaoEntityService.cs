using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PrecificacaoEntityService : EntityServiceBase<EinBissEntityService, Precificacao, int, PrecificacaoFiltro>
{
    public PrecificacaoEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Precificacao> query, PrecificacaoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Precificacao entity)
    {
        if (entity.QtdHorasMensais < 0)
            throw new WarningException("Quantidade de horas semanais deve ser positiva.");

        if (entity.PorcentagemLucroEstimada < 0)
            throw new WarningException("Porcentagem de lucro estimada deve ser positiva.");

        if (entity.ValorInsumos < 0)
            throw new WarningException("Valor dos insumos deve ser positivo.");

        if (entity.ValorGastosFixos < 0)
            throw new WarningException("Valor dos gastos fixos deve ser positivo.");

        if (entity.ValorSugerido < 0)
            throw new WarningException("Valor sugerido deve ser positivo.");

        if (entity.ValorAdotado < 0)
            throw new WarningException("Valor adotado deve ser positivo.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "Receita deve ser informada.", "Receita informada é inválida.");
    }

    public List<PrecificacaoDetalhada> LePrecificacoes(PrecificacaoFiltro filtro)
    {
        var precificacoes = EntityService.Precificacao.Entity
            .Include(r => r.Receita)
                .ThenInclude(ri => ri.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.CategoriaIngrediente)
                .ThenInclude(ri => ri.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.UnidadeMedida)
            .Include(r => r.PrecificacaoIngrediente)
            .Where(e => filtro.Ids != null && filtro.Ids.Any() ? filtro.Ids.Contains(e.Id) : true)
            .ToList();

        if (!precificacoes.Any())
        {
            return new List<PrecificacaoDetalhada>();
        }

        var precificacoesDetalhadas = precificacoes.Select(precificacao => new PrecificacaoDetalhada
        {
            Id = precificacao.Id,
            QtdHorasMensais = precificacao.QtdHorasMensais,
            PorcentagemLucroEstimada = precificacao.PorcentagemLucroEstimada,
            ValorInsumos = precificacao.ValorInsumos,
            ValorGastosFixos = precificacao.ValorGastosFixos,
            ValorSugerido = precificacao.ValorSugerido,
            ValorAdotado = precificacao.ValorAdotado,
            PrecificacaoIngrediente = precificacao.PrecificacaoIngrediente?
                .Select(precificacaoIngrediente => new PrecificacaoIngrediente
                {
                    Id = precificacaoIngrediente.Id,
                    PrecificacaoId = precificacaoIngrediente.PrecificacaoId,
                    IngredienteId = precificacaoIngrediente.IngredienteId,
                }).ToList() ?? new List<PrecificacaoIngrediente>(),
            Receita = precificacao.Receita != null ? new ReceitaDetalhada
            {
                Id = precificacao.Receita.Id,
                Nome = precificacao.Receita.Nome,
                Descricao = precificacao.Receita.Descricao,
                Tempo = precificacao.Receita.Tempo,
                QtdPorcoes = precificacao.Receita.QtdPorcoes,
                ReceitaCategoriaIngrediente = precificacao.Receita.ReceitaCategoriaIngrediente?
                    .Select(receitaIngrediente => new ReceitaCategoriaIngredienteDetalhada
                    {
                        Id = receitaIngrediente.Id,
                        Medida = receitaIngrediente.Medida,
                        ReceitaId = receitaIngrediente.ReceitaId,
                        CategoriaIngrediente = receitaIngrediente.CategoriaIngrediente != null ? new CategoriaIngrediente
                        {
                            Id = receitaIngrediente.CategoriaIngrediente.Id,
                            Nome = receitaIngrediente.CategoriaIngrediente.Nome
                        } : null,
                        UnidadeMedida = receitaIngrediente.UnidadeMedida != null ? new UnidadeMedida
                        {
                            Id = receitaIngrediente.UnidadeMedida.Id,
                            Sigla = receitaIngrediente.UnidadeMedida.Sigla
                        } : null
                    }).ToList() ?? new List<ReceitaCategoriaIngredienteDetalhada>()
            } : null
        }).ToList();

        return precificacoesDetalhadas;
    }

    public async Task<PrecificacaoDetalhada> AtualizaPrecificacaoAsync(Precificacao dados)
    {
        return await ExecuteTransactionAsync(async () => {
            var listaIdsIngredientes = new List<int>();

            foreach (var ingrediente in dados.PrecificacaoIngrediente)
            {
                listaIdsIngredientes.Add(ingrediente.Id);
            }

            var listDelete = EntityService.PrecificacaoIngrediente.Entity
                .Where(entity => !listaIdsIngredientes
                .Contains(entity.Id) && entity.PrecificacaoId == dados.Id);

            await EntityService.PrecificacaoIngrediente.DeleteRangeAsync(listDelete);

            var listaProdutos = EntityService.Produto.Entity
                .Include(p => p.Receita)
                .Where(entity => entity.ReceitaId == dados.ReceitaId);

            foreach (var produto in listaProdutos)
            {
                produto.Preco = Math.Round(dados.ValorAdotado / produto.Receita.QtdPorcoes, 2);
            }

            await EntityService.Produto.UpdateRangeAsync(listaProdutos);

            await EntityService.Precificacao.UpdateAsync(dados);

            return LePrecificacoes(new PrecificacaoFiltro { Ids = [dados.Id] }).First();
        });
    }
}
