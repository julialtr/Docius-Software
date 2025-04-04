using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class ProdutoFiltroDto
{
}

public class CreateProdutoDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public int ReceitaId { get; set; }
}

public class UpdateProdutoDto : UpdateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public int ReceitaId { get; set; }

    public int? CategoriaProdutoId { get; set; }
}

public class UpdateProdutoCardapioDto : UpdateDtoBase
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; }

    [Required]
    public decimal Preco { get; set; }

    public int QtdPedidos { get; set; }

    [Required]
    public int ReceitaId { get; set; }

    public int? CategoriaProdutoId { get; set; }
}

public class ReadProdutoDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public decimal Preco { get; set; }

    public int QtdPedidos { get; set; }

    public int? CategoriaProdutoId { get; set; }

    public ReadReceitaDto Receita { get; set; }
}
