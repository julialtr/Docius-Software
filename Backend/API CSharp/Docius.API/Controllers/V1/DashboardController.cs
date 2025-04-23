using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Service.EntityService;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class DashboardController : ControllerBase
{
    private readonly DashboardEntityService _dashboardEntityService;

    public DashboardController(IMapper mapper, DashboardEntityService dashboardEntityService) : base(mapper)
    {
        _dashboardEntityService = dashboardEntityService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadDashboardDto), StatusCodes.Status200OK)]
    public IActionResult FindDashboard([FromQuery] DashboardFiltroDto filtroDto)
    {
        var dashboard = _dashboardEntityService.LeDashboard(Mapper.Map<DashboardFiltro>(filtroDto));
        return Ok(Mapper.Map<ReadDashboardDto>(dashboard));
    }
}
