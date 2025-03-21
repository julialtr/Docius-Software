using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class PrecificacaoFiltroDto
{
}

public class UpdatePrecificacaoDto : UpdateDtoBase
{
    public int QtdHorasMensais { get; set; }

    public decimal PorcentagemLucroEstimada { get; set; }

    public decimal ValorInsumos { get; set; }

    public decimal ValorGastosFixos { get; set; }

    public decimal ValorSugerido { get; set; }

    public decimal ValorAdotado { get; set; }

    [Required]
    public int ReceitaId { get; set; }

    public virtual List<UpdatePrecificacaoIngredienteDto> PrecificacaoIngrediente { get; set; }
}

public class ReadPrecificacaoDto : ReadDtoBase<int>
{
    public int QtdHorasMensais { get; set; }

    public decimal PorcentagemLucroEstimada { get; set; }

    public decimal ValorInsumos { get; set; }

    public decimal ValorGastosFixos { get; set; }

    public decimal ValorSugerido { get; set; }

    public decimal ValorAdotado { get; set; }

    public virtual ReadReceitaDto Receita { get; set; }

    public virtual List<ReadPrecificacaoIngredienteDto> PrecificacaoIngrediente { get; set; }
}
