using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class GastoFiltro : FiltroBase<int>
{
}

[Table("gastos")]
public class Gasto : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("valor")]
    [Required]
    public decimal Valor { get; set; }

    [Column("data")]
    [Required]
    public DateOnly Data { get; set; }
}
