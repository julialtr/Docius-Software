using System.ComponentModel.DataAnnotations;

namespace Docius.API.Dtos.V1;

public class FornecedorFiltroDto
{
}

public class CreateFornecedorDto : CreateDtoBase
{
    [Required]
    public string Nome { get; set; }

    public string Endereco { get; set; }

    public string Site { get; set; }
}

public class UpdateFornecedorDto : UpdateDtoBase
{
    [Required]
    public string Nome { get; set; }

    public string Endereco { get; set; }

    public string Site { get; set; }
}

public class ReadFornecedorDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public string Endereco { get; set; }

    public string Site { get; set; }

    public int QtdIngredientes { get; set; }
}

public class ReadFornecedorIngredientesDto : ReadDtoBase<int>
{
    public string Nome { get; set; }

    public string Site { get; set; }
}