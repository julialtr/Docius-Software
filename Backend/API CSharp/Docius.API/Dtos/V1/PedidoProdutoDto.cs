using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CreatePedidoProdutoDto : CreateDtoBase
{
    [Required]
    public int Quantidade { get; set; }

    [Required]
    public int PedidoId { get; set; }

    [Required]
    public int ProdutoId { get; set; }

    public CreatePersonalizacaoDto Personalizacao { get; set; }
}
