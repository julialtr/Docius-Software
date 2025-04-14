namespace Docius.API.Dtos.V1;

public class CreatePersonalizacaoDto : CreateDtoBase
{
    public string Descricao { get; set; }

    public virtual List<CreatePersonalizacaoFotoDto> PersonalizacaoFoto { get; set; }
}

public class ReadPersonalizacaoDto : ReadDtoBase<int>
{
    public string Descricao { get; set; }

    public virtual List<ReadPersonalizacaoFotoDto> PersonalizacaoFoto { get; set; }
}
