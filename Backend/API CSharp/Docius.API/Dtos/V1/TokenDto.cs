using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class EsqueceuSenhaDto : CreateDtoBase
{
    [Required]
    public string Email { get; set; }
}
