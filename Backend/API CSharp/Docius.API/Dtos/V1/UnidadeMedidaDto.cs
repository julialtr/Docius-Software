namespace Docius.API.Dtos.V1;

public class UnidadeMedidaFiltroDto
{
}

public class ReadUnidadeMedidaDto : ReadDtoBase<int>
{
    public string Sigla { get; set; }
}
