using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class CategoriaIngredienteEntityService : EntityServiceBase<EinBissEntityService, CategoriaIngrediente, int, CategoriaIngredienteFiltro>
{
    public CategoriaIngredienteEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<CategoriaIngrediente> query, CategoriaIngredienteFiltro filter)
    {
    }

    protected override void OnValidateEntity(CategoriaIngrediente entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");
    }

    public List<CategoriaIngredienteIngredientes> LeCategoriaIngredienteIngredientes()
    {
        var categoriasIngredientes = EntityService.CategoriaIngrediente.Entity
            .Select(categoriaIngrediente => new CategoriaIngredienteIngredientes
            {
                Id = categoriaIngrediente.Id,
                Nome = categoriaIngrediente.Nome,
                QtdIngredientes = categoriaIngrediente.Ingrediente.Count(),
            });

        return categoriasIngredientes.ToList();
    }
}
