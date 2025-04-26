using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class TokenFiltro : FiltroBase<int>
{
}

[Table("tokens")]
public class Token : EntityBase<int>
{
    [Column("codigo")]
    [MaxLength(6)]
    [Required]
    public string Codigo { get; set; }

    [Column("data_hora_expiracao")]
    [Required]
    public DateTime DataHoraExpiracao { get; set; }

    [Column("valido")]
    public bool Valido { get; set; }


    [Column("usuario_id")]
    [Required]
    public int UsuarioId { get; set; }

    public virtual Usuario Usuario { get; set; }
}
