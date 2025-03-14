using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class PrecificacaoIngredienteEntityService : EntityServiceBase<EinBissEntityService, PrecificacaoIngrediente, int, PrecificacaoIngredienteFiltro>
{
    public PrecificacaoIngredienteEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<PrecificacaoIngrediente> query, PrecificacaoIngredienteFiltro filter)
    {
    }

    protected override void OnValidateEntity(PrecificacaoIngrediente entity)
    {
        EntityService.Ingrediente.ValidateId(entity.IngredienteId, "Ingrediente deve ser informado.", "Ingrediente informado é inválido.");
        EntityService.Precificacao.ValidateId(entity.PrecificacaoId, "Precificação deve ser informada.", "Precificação informada é inválida.");
    }
}
