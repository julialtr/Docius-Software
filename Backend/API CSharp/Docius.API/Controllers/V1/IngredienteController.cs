using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class IngredienteController : CrudControllerBase<IngredienteEntityService, Ingrediente, int, IngredienteFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public IngredienteController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadIngredienteDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateIngrediente([FromBody] CreateIngredienteDto[] dadosDto)
    {
        var vecData = Mapper.Map<Ingrediente[]>(dadosDto);
        var createdEntities = await EntityService.CreateRangeAsync(vecData);

        var ingredientes = EntityService.LeIngredientes(new IngredienteFiltro { Ids = createdEntities.Select(x => x.Id).ToArray() });

        return Ok(Mapper.Map<List<ReadIngredienteDto>>(ingredientes));
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(typeof(ReadIngredienteDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateIngrediente(int id, [FromBody] UpdateIngredienteDto dadosDto)
    {
        Ingrediente data = await EntityService.ReadAsync(id);

        if (data == null)
            return NotFound();

        Mapper.Map(dadosDto, data);
        await EntityService.UpdateAsync(data);

        var ingredientes = EntityService.LeIngredientes(new IngredienteFiltro { Ids = [id] });

        return Ok(Mapper.Map<ReadIngredienteDto>(ingredientes[0]));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteIngrediente(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadIngredienteDto[]), StatusCodes.Status200OK)]
    public IActionResult FindsIngredientes([FromQuery] IngredienteFiltroDto filtroDto)
    {
        var ingredientes = EntityService.LeIngredientes(Mapper.Map<IngredienteFiltro>(filtroDto));

        return Ok(Mapper.Map<List<ReadIngredienteDto>>(ingredientes));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Ingrediente;
    }
}
