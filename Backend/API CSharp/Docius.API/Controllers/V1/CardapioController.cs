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
public class CardapioController : CrudControllerBase<CardapioEntityService, Cardapio, int, CardapioFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public CardapioController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(typeof(ReadCardapioDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateCardapio(int id, [FromBody] UpdateCardapioDto dadosDto)
    {
        var dados = Mapper.Map<Cardapio>(dadosDto);
        dados.Id = id;

        await EntityService.AtualizaCardapioAsync(dados);

        var cardapio = await EntityService.LeCardapio();
        return Ok(Mapper.Map<ReadCardapioDto>(cardapio));
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(ReadCardapioDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> FindCardapio([FromQuery] CardapioFiltroDto filtroDto)
    {
        var cardapio = await EntityService.LeCardapio();
        return Ok(Mapper.Map<ReadCardapioDto>(cardapio));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Cardapio;
    }
}
