using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

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
    [ProducesResponseType(typeof(ReadProdutoDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateProduto([FromBody] CreateProdutoDto[] dadosDto)
    {
        var vecData = Mapper.Map<Produto[]>(dadosDto);
        var createdEntities = await EntityService.CreateRangeAsync(vecData);

        var Produtos = EntityService.LeProdutos(new ProdutoFiltro { Ids = createdEntities.Select(x => x.Id).ToArray() });

        return Ok(Mapper.Map<List<ReadProdutoDto>>(Produtos));
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(typeof(ReadProdutoDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateProduto(int id, [FromBody] UpdateProdutoDto dadosDto)
    {
        Produto data = await EntityService.ReadAsync(id);

        if (data == null)
            return NotFound();

        Mapper.Map(dadosDto, data);
        await EntityService.UpdateAsync(data);

        var Produtos = EntityService.LeProdutos(new ProdutoFiltro { Ids = [id] });

        return Ok(Mapper.Map<ReadProdutoDto>(Produtos[0]));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadProdutoDto[]), StatusCodes.Status200OK)]
    public IActionResult FindsProdutos([FromQuery] ProdutoFiltroDto filtroDto)
    {
        var Produtos = EntityService.LeProdutos(Mapper.Map<ProdutoFiltro>(filtroDto));

        return Ok(Mapper.Map<List<ReadProdutoDto>>(Produtos));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Produto;
    }
}
