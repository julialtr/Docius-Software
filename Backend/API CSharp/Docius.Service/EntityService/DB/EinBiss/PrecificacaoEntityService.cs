using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
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
        if (entity.ValorInsumos == 0)
            throw new WarningException("O campo ValorInsumos deve ser informado.");

        if (entity.ValorInsumos < 0)
            throw new WarningException("O campo ValorInsumos deve ser positivo.");

        if (entity.ValorSalario == 0)
            throw new WarningException("O campo ValorSalario deve ser informado.");

        if (entity.ValorSalario < 0)
            throw new WarningException("O campo ValorSalario deve ser positivo.");

        if (entity.QtdHorasMensais == 0)
            throw new WarningException("O campo QtdHorasMensais deve ser informado.");

        if (entity.QtdHorasMensais < 0)
            throw new WarningException("O campo QtdHorasMensais deve ser positivo.");

        if (entity.QtdMesesConsiderarGastos < 0)
            throw new WarningException("O campo QtdMesesConsiderarGastos deve ser positivo.");
    }
}
