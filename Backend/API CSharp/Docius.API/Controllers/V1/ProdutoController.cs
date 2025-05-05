using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class ProdutoController : CrudControllerBase<ProdutoEntityService, Produto, int, ProdutoFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public ProdutoController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    [DisableRequestSizeLimit]
    [ProducesResponseType(typeof(ReadProdutoDto), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateProduto([FromForm] ClassWithFilesDto responseDto)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
        };

        var dadosDto = JsonSerializer.Deserialize<CreateProdutoDto>(responseDto.json, options);

        var produto = await EntityService.CriaProdutoAsync(Mapper.Map<Produto>(dadosDto), responseDto.imagens);

        return Ok(Mapper.Map<ReadProdutoDto>(produto));
    }

    [HttpPatch("{id:int}")]
    [Consumes("multipart/form-data")]
    [DisableRequestSizeLimit]
    [ProducesResponseType(typeof(ReadProdutoDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateProduto(int id, [FromForm] ClassWithFilesDto responseDto)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
        };

        var dadosDto = JsonSerializer.Deserialize<UpdateProdutoDto>(responseDto.json, options);

        var produto = await EntityService.UpdateProdutoAsync(id, Mapper.Map<Produto>(dadosDto), responseDto.imagens);

        return Ok(Mapper.Map<ReadProdutoDto>(produto));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        await EntityService.DeletaProdutoAsync(id);

        return Ok();
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(ReadProdutoDto[]), StatusCodes.Status200OK)]
    public IActionResult FindProdutos([FromQuery] ProdutoFiltroDto filtroDto)
    {
        var Produtos = EntityService.LeProdutos(Mapper.Map<ProdutoFiltro>(filtroDto));

        return Ok(Mapper.Map<List<ReadProdutoDto>>(Produtos));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Produto;
    }
}
