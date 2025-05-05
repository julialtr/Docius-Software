using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class PedidoFiltroDto
{
    public int UsuarioId { get; set; }
}

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
