using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

[Table("usuarios")]
public class Usuario : EntityBase<int>
{
    [Column("login")]
    [MaxLength(50)]
    [Required]
    public string Login { get; set; }

    [Column("senha")]
    [MaxLength(50)]
    [Required]
    public string Senha { get; set; }

    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("email")]
    [MaxLength(100)]
    [Required]
    public string Email { get; set; }

    [Column("tipo_usuario_id")]
    public int TipoUsuarioId { get; set; }

    public virtual TipoUsuario TipoUsuario { get; set; }
    public virtual List<Pedido> Pedido { get; set; }
}
