using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
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

        EntityService.Precificacao.ValidateId(entity.PrecificacaoId, "Precificação deve ser informada.", "Precificação informada é inválida.");
    }
}
