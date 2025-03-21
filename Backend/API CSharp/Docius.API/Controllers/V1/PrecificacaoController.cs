using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class PrecificacaoController : CrudControllerBase<PrecificacaoEntityService, Precificacao, int, PrecificacaoFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public PrecificacaoController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ReadPrecificacaoDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdatePrecificacao(int id, [FromBody] UpdatePrecificacaoDto dadosDto)
    {
        var dados = new Precificacao();
        Mapper.Map(dadosDto, dados);
        dados.Id = id;

        return Ok(Mapper.Map<ReadPrecificacaoDto>(await EntityService.AtualizaPrecificacaoAsync(dados)));
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadPrecificacaoDto[]), StatusCodes.Status200OK)]
    public IActionResult FindPrecificacoes([FromQuery] PrecificacaoFiltroDto filtroDto)
    {
        var precificacaos = EntityService.LePrecificacoes(Mapper.Map<PrecificacaoFiltro>(filtroDto));

        return Ok(Mapper.Map<List<ReadPrecificacaoDto>>(precificacaos));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Precificacao;
    }
}
