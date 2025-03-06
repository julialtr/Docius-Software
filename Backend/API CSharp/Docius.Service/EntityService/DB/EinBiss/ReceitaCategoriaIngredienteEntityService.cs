using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class ReceitaCategoriaIngredienteEntityService : EntityServiceBase<EinBissEntityService, ReceitaCategoriaIngrediente, int, ReceitaCategoriaIngredienteFiltro>
{
    public ReceitaCategoriaIngredienteEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<ReceitaCategoriaIngrediente> query, ReceitaCategoriaIngredienteFiltro filter)
    {
    }

    protected override void OnValidateEntity(ReceitaCategoriaIngrediente entity)
    {
        if (entity.Medida == 0)
            throw new WarningException("Medida deve ser informada.");

        if (entity.Medida < 0)
            throw new WarningException("Medida deve ser positiva.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "Receita deve ser informada.", "Receita informada é inválida.");
        EntityService.CategoriaIngrediente.ValidateId(entity.CategoriaIngredienteId, "Categoria de ingrediente deve ser informada.", "Categoria de ingrediente informada é inválida.");
        EntityService.UnidadeMedida.ValidateId(entity.UnidadeMedidaId, "Unidade de medida deve ser informada.", "Unidade de medida informada é inválida.");
    }
}
