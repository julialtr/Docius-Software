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

public class ReadPedidoProdutoDto : ReadDtoBase<int>
{
    public int Quantidade { get; set; }

    public int StatusPedidoProdutoId { get; set; }

    public virtual ReadProdutoDto Produto { get; set; }

    public ReadPersonalizacaoDto Personalizacao { get; set; }
}
