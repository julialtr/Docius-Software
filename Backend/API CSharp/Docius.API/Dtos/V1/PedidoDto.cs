using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CreatePedidoDto : CreateDtoBase
{
    [Required]
    public string Identificador { get; set; }

    [Required]
    public DateTime DataHoraEntrega { get; set; }

    [Required]
    public int UsuarioId { get; set; }

    [Required]
    public virtual List<CreatePedidoProdutoDto> PedidoProduto { get; set; }
}
