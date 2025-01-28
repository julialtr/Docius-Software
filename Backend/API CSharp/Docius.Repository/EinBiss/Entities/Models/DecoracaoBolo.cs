using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("decoracoes_bolos")]
public class DecoracaoBolo : EntityBase<int>
{
    [Column("foto")]
    [Required]
    public List<byte> Foto { get; set; }

    [Column("flores_naturais")]
    public bool FloresNaturais { get; set; }

    [Column("collor_cake")]
    public bool CollorCake { get; set; }

    [Column("metalizado")]
    public bool Metalizado { get; set; }

    [Column("glow_cake")]
    public bool GlowCake { get; set; }

    [Column("naked_cake")]
    public bool NakedCake { get; set; }
}
