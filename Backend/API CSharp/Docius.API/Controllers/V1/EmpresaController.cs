using Asp.Versioning;
using AutoMapper;
using Docius.Repository.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.Docius;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class EmpresaController : CrudControllerBase<EmpresaEntityService, Empresa, int, EmpresaFiltro>
{
    private readonly DociusEntityService _dociusEntityService;

    public EmpresaController(IMapper mapper, DociusEntityService dociusEntityService) : base(mapper)
    {
        _dociusEntityService = dociusEntityService;
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(ReadEmpresaDto[]), StatusCodes.Status200OK)]
    public IActionResult FindEmpresas([FromQuery] EmpresaFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _dociusEntityService.Empresa;
    }
}
