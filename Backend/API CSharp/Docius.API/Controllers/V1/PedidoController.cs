using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.Data;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class PedidoController : CrudControllerBase<PedidoEntityService, Pedido, int, PedidoFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public PedidoController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> CreatePedido([FromBody] CreatePedidoDto dadosDto)
    {
        await EntityService.CriaPedidoAsync(Mapper.Map<PedidoDetalhado>(dadosDto));

        return Ok();
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Pedido;
    }
}
