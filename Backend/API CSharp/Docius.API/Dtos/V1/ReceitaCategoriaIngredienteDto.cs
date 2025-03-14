using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CreateReceitaCategoriaIngredienteDto : CreateDtoBase
{
    [Required]
    public decimal Medida { get; set; }

    [Required]
    public int ReceitaId { get; set; }

    [Required]
    public int CategoriaIngredienteId { get; set; }

    [Required]
    public int UnidadeMedidaId { get; set; }
}

public class UpdateReceitaCategoriaIngredienteDto : UpdateDtoBase
{
    [Required]
    public decimal Medida { get; set; }

    [Required]
    public int ReceitaId { get; set; }

    [Required]
    public int CategoriaIngredienteId { get; set; }

    [Required]
    public int UnidadeMedidaId { get; set; }
}

public class ReadReceitaCategoriaIngredienteDto : ReadDtoBase<int>
{
    public decimal Medida { get; set; }

    public int ReceitaId { get; set; }

    public virtual ReadCategoriaIngredienteDto CategoriaIngrediente { get; set; }

    public virtual ReadUnidadeMedidaDto UnidadeMedida { get; set; }
}
