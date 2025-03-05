using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class UnidadeMedidaController : CrudControllerBase<UnidadeMedidaEntityService, UnidadeMedida, int, UnidadeMedidaFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public UnidadeMedidaController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadUnidadeMedidaDto[]), StatusCodes.Status200OK)]
    public IActionResult FindsUnidadeMedidas([FromQuery] UnidadeMedidaFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.UnidadeMedida;
    }
}
