using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class UsuarioController : CrudControllerBase<UsuarioEntityService, Usuario, int, UsuarioFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public UsuarioController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ReadUsuarioDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateUser([FromBody] CreateUsuarioDto[] dadosDto)
    {
        return await Create<CreateUsuarioDto, ReadUsuarioDto>(dadosDto);
    }

    [HttpGet("pedidos")]
    [ProducesResponseType(typeof(ReadUsuarioPedidosDto[]), StatusCodes.Status200OK)]
    public IActionResult FindUsers()
    {
        var usuarioPedidos = EntityService.LePedidosUsuarios();

        return Ok(Mapper.Map<List<ReadUsuarioPedidosDto>>(usuarioPedidos));
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadUsuarioPedidosDto), StatusCodes.Status200OK)]
    public IActionResult FindUser([FromQuery] UsuarioFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Usuario;
    }
}
