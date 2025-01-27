using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

[Table("ingredientes")]
public class Ingrediente : EntityBase<int>
{
    [Column("marca")]
    [MaxLength(50)]
    [Required]
    public string Marca { get; set; }

    [Column("preco")]
    [Required]
    public decimal Preco { get; set; }

    [Column("quantidade")]
    [Required]
    public int Quantidade { get; set; }

    [Column("medida")]
    [Required]
    public decimal Medida { get; set; }

    [Column("unidade_medida_id")]
    [Required]
    public int UnidadeMedidaId { get; set; }

    public virtual UnidadeMedida UnidadeMedida { get; set; }

    [Column("fornecedor_id")]
    public int FornecedorId { get; set; }

    public virtual Fornecedor Fornecedor { get; set; }

    [Column("categoria_ingrediente_id")]
    [Required]
    public int CategoriaIngredienteId { get; set; }

    public virtual CategoriaIngrediente CategoriaIngrediente { get; set; }
}
