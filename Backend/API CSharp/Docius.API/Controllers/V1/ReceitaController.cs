using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class ReceitaController : CrudControllerBase<ReceitaEntityService, Receita, int, ReceitaFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public ReceitaController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadReceitaDto[]), StatusCodes.Status200OK)]
    public IActionResult FindsReceitas([FromQuery] ReceitaFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Receita;
    }
}
