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
            throw new WarningException("O campo Medida deve ser informado.");

        if (entity.Medida < 0)
            throw new WarningException("O campo Medida deve ser positivo.");

        ValidateId(entity.ReceitaId, "O campo ReceitaId deve ser informado.", "O campo ReceitaId informado é inválido.");
        ValidateId(entity.CategoriaIngredienteId, "O campo CategoriaIngredienteId deve ser informado.", "O campo CategoriaIngredienteId informado é inválido.");
        ValidateId(entity.UnidadeMedidaId, "O campo UnidadeMedidaId deve ser informado.", "O campo UnidadeMedidaId informado é inválido.");
    }
}
