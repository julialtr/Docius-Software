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

public class ReadPedidoDto : ReadDtoBase<int>
{
    public string Identificador { get; set; }

    public DateTime DataHoraEntrega { get; set; }

    public int StatusPedidoId { get; set; }

    public virtual ReadUsuarioDto Usuario { get; set; }

    public virtual List<ReadPedidoProdutoDto> PedidoProduto { get; set; }
}

public class ResponsePedidoDto
{
    [Required]
    public string json { get; set; }

    public List<IFormFile> imagens { get; set; }
}
