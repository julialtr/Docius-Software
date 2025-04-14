using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CreatePersonalizacaoFotoDto : CreateDtoBase
{
    [Required]
    public string CaminhoFoto { get; set; }
}

public class ReadPersonalizacaoFotoDto : ReadDtoBase<int>
{
    [Required]
    public string CaminhoFoto { get; set; }
}
