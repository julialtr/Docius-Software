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
            throw new WarningException("O campo Nome deve ser informado.");
    }

    public List<CategoriaIngredienteIngredientes> LeCategoriaIngredienteIngredientes()
    {
        var categoriasIngredientes = EntityService.CategoriaIngrediente.Entity
            .Select(categoriaIngrediente => new CategoriaIngredienteIngredientes
            {
                Id = categoriaIngrediente.Id,
                Nome = categoriaIngrediente.Nome,
                QtdIngredientes = categoriaIngrediente.Ingrediente.Count(),
                Ingrediente = categoriaIngrediente.Ingrediente
                    .Select(ingrediente => new Ingrediente
                    {
                        Id = ingrediente.Id,
                        Marca = ingrediente.Marca,
                        Preco = ingrediente.Preco,
                        Quantidade = ingrediente.Quantidade,
                        Medida = ingrediente.Medida,
                        UnidadeMedida = ingrediente.UnidadeMedida != null ? new UnidadeMedida
                        {
                            Id = ingrediente.UnidadeMedida.Id,
                            Sigla = ingrediente.UnidadeMedida.Sigla
                        } : null,
                        Fornecedor = ingrediente.Fornecedor != null ? new Fornecedor
                        {
                            Id = ingrediente.Fornecedor.Id,
                            Nome = ingrediente.Fornecedor.Nome,
                            Site = ingrediente.Fornecedor.Site
                        } : null,
                    }).ToArray()
            });

        return categoriasIngredientes.ToList();
    }
}
