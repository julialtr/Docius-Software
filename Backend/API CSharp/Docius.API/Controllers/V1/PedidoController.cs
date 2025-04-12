using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Repository.ServicosTerceiros.Dados;
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
    public async Task<IActionResult> CreatePedido([FromForm] ResponsePedidoDto responseDto)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
        };

        var dadosDto = JsonSerializer.Deserialize<CreatePedidoDto>(responseDto.json, options);

        await EntityService.CriaPedidoAsync(Mapper.Map<PedidoDetalhado>(dadosDto), responseDto.imagens);

        return Ok();
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Pedido;
    }
}
