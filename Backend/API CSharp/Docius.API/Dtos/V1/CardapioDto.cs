using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CardapioFiltroDto
{
}

public class UpdateCardapioDto : UpdateDtoBase
{
    public virtual List<UpdateCategoriaProdutoDto> CategoriaProduto { get; set; }
}

public class ReadCardapioDto : ReadDtoBase<int>
{
    public virtual List<ReadCategoriaProdutoDto> CategoriaProduto { get; set; }
}
