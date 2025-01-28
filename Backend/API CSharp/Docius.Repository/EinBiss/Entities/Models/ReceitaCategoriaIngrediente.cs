using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("receitas_categorias_ingredientes")]
public class ReceitaCategoriaIngrediente : EntityBase<int>
{
    [Column("medida")]
    [Required]
    public decimal Medida { get; set; }

    [Column("receita_id")]
    [Required]
    public int ReceitaId { get; set; }

    public Receita Receita { get; set; }

    [Column("categoria_ingrediente_id")]
    [Required]
    public int CategoriaIngredienteId { get; set; }

    public CategoriaIngrediente CategoriaIngrediente { get; set; }

    [Column("unidade_medida_id")]
    [Required]
    public int UnidadeMedidaId { get; set; }

    public virtual UnidadeMedida UnidadeMedida { get; set; }
}
