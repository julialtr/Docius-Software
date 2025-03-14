using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class ReceitaCategoriaIngredienteFiltro : FiltroBase<int>
{
}

[Table("receitas_categorias_ingredientes")]
public class ReceitaCategoriaIngrediente : EntityBase<int>
{
    [Column("medida")]
    public decimal Medida { get; set; }

    [Column("receita_id")]
    public int ReceitaId { get; set; }

    public Receita Receita { get; set; }

    [Column("categoria_ingrediente_id")]
    public int CategoriaIngredienteId { get; set; }

    public CategoriaIngrediente CategoriaIngrediente { get; set; }

    [Column("unidade_medida_id")]
    public int UnidadeMedidaId { get; set; }

    public virtual UnidadeMedida UnidadeMedida { get; set; }
}
