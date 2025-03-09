using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class UnidadeMedidaFiltro : FiltroBase<int>
{
}

[Table("unidades_medidas")]
public class UnidadeMedida : EntityBase<int>
{
    [Column("sigla")]
    [MaxLength(5)]
    [Required]
    public string Sigla { get; set; }

    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }
    public virtual List<Ingrediente> Ingrediente { get; set; }
}
