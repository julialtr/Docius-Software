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
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (string.IsNullOrEmpty(entity.Marca))
            throw new WarningException("Marca deve ser informada.");

        if (entity.Preco == 0)
            throw new WarningException("Preço deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("Preço deve ser positivo.");

        if (entity.Quantidade < 0)
            throw new WarningException("Quantidade deve ser positiva.");

        if (entity.Medida == 0)
            throw new WarningException("Medida deve ser informada.");

        if (entity.Medida < 0)
            throw new WarningException("Medida deve ser positiva.");

        EntityService.UnidadeMedida.ValidateId(entity.UnidadeMedidaId, "Unidade de medida deve ser informada.", "Unidade de medida informada é inválida.");

        if (entity.FornecedorId.HasValue && entity.FornecedorId == 0)
            EntityService.Fornecedor.ValidateId(entity.FornecedorId.Value, "Fornecedor deve ser informado.", "Fornecedor informado é inválido.");

        EntityService.CategoriaIngrediente.ValidateId(entity.CategoriaIngredienteId, "Categoria de ingrediente deve ser informada.", "Categoria de ingrediente informada é inválida.");
    }

    public List<Ingrediente> LeIngredientes(IngredienteFiltro filtro)
    {
        var ingredientes = EntityService.Ingrediente.Entity
            .Where(e => filtro.CategoriaIngredienteId == 0 || e.CategoriaIngredienteId.Equals(filtro.CategoriaIngredienteId))
            .Where(e => !filtro.Ids.Any() || filtro.Ids.Contains(e.Id))
            .Select(ingrediente => new Ingrediente
            {
                Id = ingrediente.Id,
                Nome = ingrediente.Nome,
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
                    Site = ingrediente.Fornecedor.Site,
                } : null,
                CategoriaIngrediente = ingrediente.CategoriaIngrediente != null ? new CategoriaIngrediente
                {
                    Id = ingrediente.CategoriaIngrediente.Id,
                    Nome = ingrediente.CategoriaIngrediente.Nome,
                } : null,
            });

        return ingredientes.ToList();
    }
}
