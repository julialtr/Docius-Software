using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class ReceitaController : CrudControllerBase<ReceitaEntityService, Receita, int, ReceitaFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public ReceitaController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadReceitaDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateReceita([FromBody] CreateReceitaDto dadosDto)
    {
        var receitas = await EntityService.CriaReceitaAsync(Mapper.Map<Receita>(dadosDto));

        return Ok(Mapper.Map<List<ReadReceitaDto>>(receitas));
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(ReadReceitaDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateReceita(int id, [FromBody] UpdateReceitaDto dadosDto)
    {
        var dados = new Receita();
        Mapper.Map(dadosDto, dados);
        dados.Id = id;

        return Ok(Mapper.Map<ReadReceitaDto>(await EntityService.AtualizaReceitaAsync(dados)));
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteReceita(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadReceitaDto[]), StatusCodes.Status200OK)]
    public IActionResult FindReceitas([FromQuery] ReceitaFiltroDto filtroDto)
    {
        var Receitas = EntityService.LeReceitas(Mapper.Map<ReceitaFiltro>(filtroDto));

        return Ok(Mapper.Map<List<ReadReceitaDto>>(Receitas));
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Receita;
    }
}
