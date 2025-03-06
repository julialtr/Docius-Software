using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class GastoController : CrudControllerBase<GastoEntityService, Gasto, int, GastoFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public GastoController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadGastoDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateGasto([FromBody] CreateGastoDto[] dadosDto)
    {
        return await Create<CreateGastoDto, ReadGastoDto>(dadosDto);
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateGasto(int id, [FromBody] UpdateGastoDto dadosDto)
    {
        return await Update(id, dadosDto);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteGasto(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadGastoDto[]), StatusCodes.Status200OK)]
    public IActionResult FindsGastos([FromQuery] GastoFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Gasto;
    }
}
