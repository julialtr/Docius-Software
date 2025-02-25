using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class UsuarioFiltroDto
{
    [Required]
    public string Email { get; set; }

    [Required]
    public string Senha { get; set; }
}

public class CreateUsuarioDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Senha { get; set; }

    [Required]
    public int TipoUsuarioId { get; set; }
}

public class ReadUsuarioDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public string Email { get; set; }

    public string Senha { get; set; }

    public int TipoUsuarioId { get; set; }
}

public class ReadUsuarioPedidosDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public string Email { get; set; }

    public int QtdPedidos { get; set; }
}
