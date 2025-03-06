using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class IngredienteFiltroDto
{
    public int CategoriaIngredienteId { get; set; }
}

public class CreateIngredienteDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public string Marca { get; set; }

    [Required]
    public decimal Preco { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public decimal Medida { get; set; }

    [Required]
    public int UnidadeMedidaId { get; set; }

    public int? FornecedorId { get; set; }

    [Required]
    public int CategoriaIngredienteId { get; set; }
}

public class UpdateIngredienteDto : UpdateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public string Marca { get; set; }

    [Required]
    public decimal Preco { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public decimal Medida { get; set; }

    [Required]
    public int UnidadeMedidaId { get; set; }

    public int FornecedorId { get; set; }

    [Required]
    public int CategoriaIngredienteId { get; set; }
}

public class ReadIngredienteDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public string Marca { get; set; }

    public decimal Preco { get; set; }

    public int Quantidade { get; set; }

    public decimal Medida { get; set; }

    public ReadUnidadeMedidaDto UnidadeMedida { get; set; }

    public ReadFornecedorDto Fornecedor { get; set; }

    public ReadCategoriaIngredienteDto CategoriaIngrediente { get; set; }
}
