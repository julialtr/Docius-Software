using Docius.Repository.EinBiss.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class ReceitaFiltroDto
{
    public int Id { get; set; }
}

public class CreateReceitaDto : CreateDtoBase
{
    [Required]
    [MaxLength(100)]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    [Required]
    public int QtdPorcoes { get; set; }

    [Required]
    public TimeOnly Tempo { get; set; }

    [Required]
    public virtual List<CreateReceitaCategoriaIngredienteDto> ReceitaCategoriaIngrediente { get; set; }
}

public class UpdateReceitaDto : UpdateDtoBase
{
    [Required]
    [MaxLength(100)]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    [Required]
    public int QtdPorcoes { get; set; }

    [Required]
    public TimeOnly Tempo { get; set; }

    [Required]
    public virtual List<UpdateReceitaCategoriaIngredienteDto> ReceitaCategoriaIngrediente { get; set; }
}

public class ReadReceitaDto : ReadDtoBase<int>
{
    [MaxLength(100)]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    public TimeOnly Tempo { get; set; }

    public virtual List<ReadReceitaCategoriaIngredienteDto> ReceitaCategoriaIngrediente { get; set; }
}
