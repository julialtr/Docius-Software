using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class IngredienteEntityService : EntityServiceBase<EinBissEntityService, Ingrediente, int, IngredienteFiltro>
{
    public IngredienteEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Ingrediente> query, IngredienteFiltro filter)
    {
    }

    protected override void OnValidateEntity(Ingrediente entity)
    {
        if (string.IsNullOrEmpty(entity.Marca))
            throw new WarningException("O campo Marca deve ser informado.");

        if (entity.Preco == 0)
            throw new WarningException("O campo Preco deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("O campo Preco deve ser positivo.");

        if (entity.Quantidade == 0)
            throw new WarningException("O campo Quantidade deve ser informado.");

        if (entity.Quantidade < 0)
            throw new WarningException("O campo Quantidade deve ser positivo.");

        if (entity.Medida == 0)
            throw new WarningException("O campo Medida deve ser informado.");

        if (entity.Medida < 0)
            throw new WarningException("O campo Medida deve ser positivo.");

        ValidateId(entity.UnidadeMedidaId, "O campo UnidadeMedidaId deve ser informado.", "O campo UnidadeMedidaId informado é inválido.");

        if (entity.FornecedorId != 0)
            ValidateId(entity.FornecedorId, "O campo FornecedorId deve ser informado.", "O campo FornecedorId informado é inválido.");

        ValidateId(entity.CategoriaIngredienteId, "O campo CategoriaIngredienteId deve ser informado.", "O campo CategoriaIngredienteId informado é inválido.");
    }
}
