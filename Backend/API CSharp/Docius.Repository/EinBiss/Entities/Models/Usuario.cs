using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public enum ETipoUsuario
{
    Cliente = 1,
    Administrador = 2
}

public class UsuarioFiltro : FiltroBase<int>
{
    [MaxLength(100)]
    public string Email { get; set; }

    [MaxLength(50)]
    public string Senha { get; set; }
}

[Table("usuarios")]
public class Usuario : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    public string Nome { get; set; }

    [Column("email")]
    [MaxLength(100)]
    public string Email { get; set; }

    [Column("senha")]
    [MaxLength(50)]
    public string Senha { get; set; }

    [Column("tipo_usuario_id")]
    public int TipoUsuarioId { get; set; }

    public virtual TipoUsuario TipoUsuario { get; set; }
    public virtual Pedido[] Pedido { get; set; }
}
