using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class TipoUsuarioFiltro : FiltroBase<int>
{
}

[Table("tipos_usuarios")]
public class TipoUsuario : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(30)]
    [Required]
    public string Nome { get; set; }

    public virtual Usuario[] Usuarios { get; set; }
}
