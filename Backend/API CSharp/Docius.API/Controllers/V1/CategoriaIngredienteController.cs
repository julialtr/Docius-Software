using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class CategoriaIngredienteController : CrudControllerBase<CategoriaIngredienteEntityService, CategoriaIngrediente, int, CategoriaIngredienteFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public CategoriaIngredienteController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadCategoriaIngredienteDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateCategoriaIngrediente([FromBody] CreateCategoriaIngredienteDto[] dadosDto)
    {
        return await Create<CreateCategoriaIngredienteDto, ReadCategoriaIngredienteDto>(dadosDto);
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateCategoriaIngrediente(int id, [FromBody] UpdateCategoriaIngredienteDto dadosDto)
    {
        return await Update(id, dadosDto);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteCategoriaIngrediente(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadCategoriaIngredienteDto[]), StatusCodes.Status200OK)]
    public IActionResult FindCategoriasIngredientes([FromQuery] CategoriaIngredienteFiltroDto filtroDto)
    {
        var categoriasIngredientes = EntityService.LeCategoriaIngredienteIngredientes();

        return Ok(Mapper.Map<List<ReadCategoriaIngredienteDto>>(categoriasIngredientes));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.CategoriaIngrediente;
    }
}
