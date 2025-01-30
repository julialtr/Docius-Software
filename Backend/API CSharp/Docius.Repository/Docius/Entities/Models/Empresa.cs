using Docius.Repository.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.Entities.Models;

public class EmpresaFiltro : FiltroBase<int>
{
    [MaxLength(100)]
    public string Dominio { get; set; }
}

[Table("empresas")]
public class Empresa : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("logo")]
    public Byte[] Logo { get; set; }

    [Column("dominio")]
    [MaxLength(100)]
    [Required]
    public string Dominio { get; set; }
}
