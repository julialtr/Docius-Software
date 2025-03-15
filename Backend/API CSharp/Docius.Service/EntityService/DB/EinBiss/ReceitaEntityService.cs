using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class ReceitaEntityService : EntityServiceBase<EinBissEntityService, Receita, int, ReceitaFiltro>
{
    public ReceitaEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Receita> query, ReceitaFiltro filter)
    {
    }

    protected override void OnValidateEntity(Receita entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (entity.QtdPorcoes < 0)
            throw new WarningException("Quantidade de porções deve ser positiva.");

        if (TimeOnly.MinValue == entity.Tempo)
            throw new WarningException("Tempo deve ser informado.");
    }

    public List<ReceitaDetalhada> LeReceitas(ReceitaFiltro filtro)
    {
        var receitas = EntityService.Receita.Entity
            .Include(r => r.ReceitaCategoriaIngrediente)
                .ThenInclude(ri => ri.CategoriaIngrediente)
            .Include(r => r.ReceitaCategoriaIngrediente)
                .ThenInclude(ri => ri.UnidadeMedida)
            .Where(e => filtro.Ids != null && filtro.Ids.Any() ? filtro.Ids.Contains(e.Id) : true)
            .ToList();

        if (!receitas.Any())
        {
            return new List<ReceitaDetalhada>();
        }

        var receitasDetalhadas = receitas.Select(receita => new ReceitaDetalhada
        {
            Id = receita.Id,
            Nome = receita.Nome,
            Descricao = receita.Descricao,
            Tempo = receita.Tempo,
            QtdPorcoes = receita.QtdPorcoes,
            ReceitaCategoriaIngrediente = receita.ReceitaCategoriaIngrediente?
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
        }).ToList();

        return receitasDetalhadas;
    }

    public async Task<List<ReceitaDetalhada>> CriaReceitaAsync(Receita receita)
    {
        return await ExecuteTransactionAsync(async () => {

            var createdEntity = await EntityService.Receita.CreateAsync(receita);

            var receitaId = createdEntity.Id;

            Precificacao precificacao = new Precificacao
            {
                ReceitaId = receitaId,
            };

            await EntityService.Precificacao.CreateAsync(precificacao);

            var receitas = LeReceitas(new ReceitaFiltro { Ids = [receitaId] });

            return receitas;
        });
    }

    public async Task<ReceitaDetalhada> AtualizaReceitaAsync(Receita dados)
    {
        return await ExecuteTransactionAsync(async () => {
            var listaIdsIngredientes = new List<int>();

            foreach (var ingrediente in dados.ReceitaCategoriaIngrediente)
            {
                listaIdsIngredientes.Add(ingrediente.Id);
            }

            var listDelete = EntityService.ReceitaCategoriaIngrediente.Entity
                .Where(entity => !listaIdsIngredientes
                .Contains(entity.Id) && entity.ReceitaId == dados.Id);

            await EntityService.ReceitaCategoriaIngrediente.DeleteRangeAsync(listDelete);

            await EntityService.Receita.UpdateAsync(dados);

            return LeReceitas(new ReceitaFiltro { Ids = [dados.Id] }).First();
        });
    }
}
