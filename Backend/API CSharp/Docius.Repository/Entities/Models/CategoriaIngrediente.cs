using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

[Table("categorias_ingredientes")]
public class CategoriaIngrediente : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    public virtual List<Ingrediente> Ingrediente { get; set; }
    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }
}
