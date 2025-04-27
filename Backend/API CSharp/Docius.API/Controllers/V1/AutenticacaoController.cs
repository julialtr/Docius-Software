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
public class AutenticacaoController : CrudControllerBase<UsuarioEntityService, Usuario, int, UsuarioFiltro>
{
    private readonly EinBissEntityService _einBissEntityService;
    private readonly AutenticacaoEntityService _autenticacaoEntityService;

    public AutenticacaoController(IMapper mapper, EinBissEntityService einBissEntityService, AutenticacaoEntityService autenticacaoEntityService) : base(mapper)
    {
        _einBissEntityService = einBissEntityService;
        _autenticacaoEntityService = autenticacaoEntityService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login([FromBody] UsuarioFiltroDto filtroDto)
    {
        IActionResult status = Find(filtroDto);

        if (status is not NoContentResult && status is OkObjectResult okResult && okResult.Value is IEnumerable<Usuario> usuarios)
        {
            var usuario = usuarios.FirstOrDefault();
            if (usuario != null)
            {
                _autenticacaoEntityService.GenerateAccessToken(usuario.Email, usuario.TipoUsuarioId, usuario.Id);
                return Ok();
            }
        }

        return Unauthorized("As credenciais fornecidas estão inválidas.");
    }

    [AllowAnonymous]
    [HttpPost("esqueceu-senha")]
    public async Task<IActionResult> SendEsqueceuSenhaAsync([FromBody] EsqueceuSenhaDto dadosDto)
    {
        await _autenticacaoEntityService.SendEsqueceuSenhaAsync(dadosDto.Email);
    
        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("verificacao-codigo")]
    public async Task<IActionResult> SendVerificacaoCodigoAsync([FromBody] VerificacaoCodigoDto dadosDto)
    {
        await _autenticacaoEntityService.SendVerificacaoCodigoAsync(dadosDto.Codigo);

        return Ok();
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Usuario;
    }
}
