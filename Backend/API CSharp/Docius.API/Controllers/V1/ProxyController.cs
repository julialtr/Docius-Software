using Asp.Versioning;
using AutoMapper;
using Docius.Repository.ServicosTerceiros.Dados;
using Docius.Service.EntityService;
using Microsoft.AspNetCore.Mvc;

namespace Docius.API.Controllers.V1;

[ApiVersion("1")]
public class ProxyController : ControllerBase
{
    private readonly ProxyEntityService _proxyEntityService;

    public ProxyController(IMapper mapper, ProxyEntityService proxyEntityService) : base(mapper)
    {
        _proxyEntityService = proxyEntityService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(WebScrapingRetornoDto[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProdutos([FromQuery] WebScrapingFiltroDto filterDto)
    {
        var response = await _proxyEntityService.GetProdutosAsync(Mapper.Map<WebScrapingFiltro>(filterDto));

        return Ok(Mapper.Map<WebScrapingRetornoDto>(response));
    }
}
