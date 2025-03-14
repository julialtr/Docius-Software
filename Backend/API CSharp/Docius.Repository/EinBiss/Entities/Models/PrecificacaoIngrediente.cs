using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class PrecificacaoIngredienteFiltro : FiltroBase<int>
{
}

[Table("precificacoes_ingredientes")]
public class PrecificacaoIngrediente : EntityBase<int>
{
    [Column("precificacao_id")]
    [Required]
    public int PrecificacaoId { get; set; }

    public virtual Precificacao Precificacao { get; set; }

    [Column("ingrediente_id")]
    [Required]
    public int IngredienteId { get; set; }

    public virtual Ingrediente Ingrediente { get; set; }
}
