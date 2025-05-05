using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Docius.API.Dtos;

public abstract class CreateDtoBase
{
}

public abstract class ReadDtoBase<TEntityTypeId>
{
    [JsonPropertyOrder(int.MinValue)]
    public TEntityTypeId Id { get; set; }
}

public abstract class UpdateDtoBase
{
}

public abstract class FilterDtoBase<TEntityTypeId>
{
    public TEntityTypeId[] Ids { get; set; }
}

public class ClassWithFilesDto
{
    [Required]
    public string json { get; set; }

    public List<IFormFile> imagens { get; set; }
}
