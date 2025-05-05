using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.Data;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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
    [Consumes("multipart/form-data")]
    [DisableRequestSizeLimit]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> CreatePedido([FromForm] ClassWithFilesDto responseDto)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
        };

        var dadosDto = JsonSerializer.Deserialize<CreatePedidoDto>(responseDto.json, options);

        await EntityService.CriaPedidoAsync(Mapper.Map<CreatePedidoDetalhado>(dadosDto), responseDto.imagens);

        return Ok();
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadPedidoDto[]), StatusCodes.Status200OK)]
    public IActionResult FindPedidos([FromQuery] PedidoFiltroDto filtroDto)
    {
        var pedidos = EntityService.LePedidos(Mapper.Map<PedidoFiltro>(filtroDto));
        return Ok(Mapper.Map<List<ReadPedidoDto>>(pedidos));
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdatePedido(int id, [FromBody] int idStatusPedido)
    {
        Pedido data = await EntityService.ReadAsync(id);

        if (data == null)
            return NotFound();

        data.StatusPedidoId = idStatusPedido;

        await EntityService.UpdateAsync(data);

        return Ok();
    }

    [HttpPatch("itemPedido/{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateItemPedido(int id, [FromBody] int idStatusItemPedido)
    {
        await EntityService.UpdateItemPedidoAsync(id, idStatusItemPedido);
        return Ok();
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Pedido;
    }
}
