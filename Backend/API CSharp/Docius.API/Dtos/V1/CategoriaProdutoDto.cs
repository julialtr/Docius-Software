using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class UpdateCategoriaProdutoDto : CreateDtoBase
{
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Required]
    public int CardapioId { get; set; }

    public virtual List<UpdateCategoriaProdutoDto> CategoriaProdutoInferior { get; set; }

    public int CategoriaProdutoSuperiorId { get; set; }

    public virtual List<UpdateProdutoCardapioDto> Produto { get; set; }
}

public class ReadCategoriaProdutoDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public int? CardapioId { get; set; }

    public virtual List<ReadCategoriaProdutoDto> CategoriaProdutoInferior { get; set; }

    public int? CategoriaProdutoSuperiorId { get; set; }

    public virtual List<ReadProdutoDto> Produto { get; set; }
}
