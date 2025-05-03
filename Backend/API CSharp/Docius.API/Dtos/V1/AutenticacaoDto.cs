using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class EsqueceuSenhaDto
{
    [Required]
    public string Email { get; set; }
}

public class VerificacaoCodigoDto
{
    [Required]
    public string Codigo { get; set; }
}

public class RedefinirSenhaDto
{
    [Required]
    public string Senha { get; set; }
}
