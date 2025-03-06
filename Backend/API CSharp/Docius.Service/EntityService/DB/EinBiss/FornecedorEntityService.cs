using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class FornecedorEntityService : EntityServiceBase<EinBissEntityService, Fornecedor, int, FornecedorFiltro>
{
    public FornecedorEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Fornecedor> query, FornecedorFiltro filter)
    {
    }

    protected override void OnValidateEntity(Fornecedor entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");
    }

    public List<FornecedorIngredientes> LeFornecedorIngredientes()
    {
        var fornecedores = EntityService.Fornecedor.Entity
            .Select(fornecedor => new FornecedorIngredientes
            {
                Id = fornecedor.Id,
                Nome = fornecedor.Nome,
                Endereco = fornecedor.Endereco,
                Site = fornecedor.Site,
                QtdIngredientes = fornecedor.Ingrediente.Count(),
            });

        return fornecedores.ToList();
    }
}
