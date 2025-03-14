using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class ReceitaCategoriaIngredienteDetalhada
{
    public int Id { get; set; }

    public decimal Medida { get; set; }

    public int ReceitaId {  get; set; }

    public virtual CategoriaIngrediente CategoriaIngrediente { get; set; }

    public virtual UnidadeMedida UnidadeMedida { get; set; }
}
