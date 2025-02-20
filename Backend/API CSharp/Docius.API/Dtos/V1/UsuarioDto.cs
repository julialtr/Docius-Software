using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class UsuarioFiltroDto
{
    [Required]
    public string Email { get; set; }

    [Required]
    public string Senha { get; set; }
}
