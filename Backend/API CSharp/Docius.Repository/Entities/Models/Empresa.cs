using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.Entities.Models;

[Table("empresas")]
public class Empresa : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("logo")]
    public List<byte> Logo { get; set; }

    [Column("dominio")]
    [MaxLength(100)]
    [Required]
    public string Dominio { get; set; }
}
