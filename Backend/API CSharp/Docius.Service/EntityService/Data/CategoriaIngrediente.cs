using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class CategoriaIngredienteIngredientes
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public int QtdIngredientes { get; set; }

    public Ingrediente[] Ingrediente { get; set; }
}
