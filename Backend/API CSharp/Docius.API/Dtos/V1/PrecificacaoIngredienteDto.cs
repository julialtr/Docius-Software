using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class UpdatePrecificacaoIngredienteDto : CreateDtoBase
{
    [Required]
    public int PrecificacaoId { get; set; }

    [Required]
    public int IngredienteId { get; set; }
}

public class ReadPrecificacaoIngredienteDto : ReadDtoBase<int>
{
    public int PrecificacaoId { get; set; }

    public int IngredienteId { get; set; }
}
