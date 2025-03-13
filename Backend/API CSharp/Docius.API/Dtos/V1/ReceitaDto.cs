using Docius.Repository.EinBiss.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class ReceitaFiltroDto
{
}

public class CreateReceitaDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    [Required]
    public TimeOnly Tempo { get; set; }

    [Required]
    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }
}

public class UpdateReceitaDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    [Required]
    public TimeOnly Tempo { get; set; }

    [Required]
    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }
}

public class ReadReceitaDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    public TimeOnly Tempo { get; set; }

    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }
}
