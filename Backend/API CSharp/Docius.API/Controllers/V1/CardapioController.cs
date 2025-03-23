using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
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

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ReadCardapioDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateCardapio(int id, [FromBody] UpdateCardapioDto dadosDto)
    {
        var dados = new Cardapio();
        Mapper.Map(dadosDto, dados);
        dados.Id = id;

        return Ok(Mapper.Map<ReadCardapioDto>(await EntityService.AtualizaCardapioAsync(dados)));
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadCardapioDto[]), StatusCodes.Status200OK)]
    public IActionResult FindCardapios([FromQuery] CardapioFiltroDto filtroDto)
    {
        var cardapios = EntityService.LeCardapios();

        return Ok(Mapper.Map<List<ReadCardapioDto>>(cardapios));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Cardapio;
    }
}
