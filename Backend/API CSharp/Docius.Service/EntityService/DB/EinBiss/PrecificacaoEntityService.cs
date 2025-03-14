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
}
