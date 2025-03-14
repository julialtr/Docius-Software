using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class CategoriaIngredienteFiltroDto
{
}

public class CreateCategoriaIngredienteDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }
}

public class UpdateCategoriaIngredienteDto : UpdateDtoBase
{
    [Required]
    public string Nome { get; set; }
}

public class ReadCategoriaIngredienteDto : ReadDtoBase<int>
{
    public string Nome { get; set; }
    
    public int QtdIngredientes { get; set; }

    public int QtdReceitas { get; set; }
}
