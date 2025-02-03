using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class UsuarioFiltroDto
{
    [MaxLength(50)]
    [Required]
    public string Login { get; set; }

    [MaxLength(50)]
    [Required]
    public string Senha { get; set; }
}
