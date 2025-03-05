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
            throw new WarningException("O campo Nome deve ser informado.");

        if (entity.QtdPorcoes < 0)
            throw new WarningException("O campo QtdPorcoes deve ser positivo.");

        if (TimeOnly.MinValue == entity.Tempo)
            throw new WarningException("O campo Tempo deve ser informado.");

        EntityService.Precificacao.ValidateId(entity.PrecificacaoId, "O campo PrecificacaoId deve ser informado.", "O campo PrecificacaoId informado é inválido.");
    }
}
