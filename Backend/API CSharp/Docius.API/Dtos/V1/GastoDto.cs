using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class GastoFiltroDto
{
}

public class CreateGastoDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public decimal Valor { get; set; }
}

public class UpdateGastoDto : UpdateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public decimal Valor { get; set; }
}

public class ReadGastoDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public decimal Valor { get; set; }
}
