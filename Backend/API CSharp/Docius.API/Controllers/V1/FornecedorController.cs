using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class FornecedorController : CrudControllerBase<FornecedorEntityService, Fornecedor, int, FornecedorFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;

    public FornecedorController(IMapper mapper, EinBissEntityService einBissEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ReadFornecedorDto[]), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateFornecedor([FromBody] CreateFornecedorDto[] dadosDto)
    {
        return await Create<CreateFornecedorDto, ReadFornecedorDto>(dadosDto);
    }

    [HttpPatch("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateFornecedor(int id, [FromBody] UpdateFornecedorDto dadosDto)
    {
        return await Update(id, dadosDto);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteFornecedor(int id)
    {
        return await Delete(id);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ReadFornecedorDto[]), StatusCodes.Status200OK)]
    public IActionResult FindFornecedores([FromQuery] FornecedorFiltroDto filtroDto)
    {
        return Find(filtroDto);
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Fornecedor;
    }
}
