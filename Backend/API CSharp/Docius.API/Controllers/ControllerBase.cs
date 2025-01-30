using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public abstract class ControllerBase : Controller
{
    protected IMapper Mapper { get; }

    public ControllerBase(IMapper mapper)
    {
        Mapper = mapper;
    }
}
