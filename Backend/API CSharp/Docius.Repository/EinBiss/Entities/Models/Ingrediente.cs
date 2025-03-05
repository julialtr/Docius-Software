using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class IngredienteFiltro : FiltroBase<int>
{
    public int CategoriaIngredienteId { get; set; }
}

[Table("ingredientes")]
public class Ingrediente : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(50)]
    public string Nome { get; set; }

    [Column("marca")]
    [MaxLength(50)]
    public string Marca { get; set; }

    [Column("preco")]
    public decimal Preco { get; set; }

    [Column("quantidade")]
    public int Quantidade { get; set; }

    [Column("medida")]
    public decimal Medida { get; set; }

    [Column("unidade_medida_id")]
    public int UnidadeMedidaId { get; set; }

    public virtual UnidadeMedida UnidadeMedida { get; set; }

    [Column("fornecedor_id")]
    public int FornecedorId { get; set; }

    public virtual Fornecedor Fornecedor { get; set; }

    [Column("categoria_ingrediente_id")]
    public int CategoriaIngredienteId { get; set; }

    public virtual CategoriaIngrediente CategoriaIngrediente { get; set; }
}
