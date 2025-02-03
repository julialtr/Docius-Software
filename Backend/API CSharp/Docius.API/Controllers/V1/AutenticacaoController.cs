using Asp.Versioning;
using AutoMapper;
using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

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
    public IActionResult Login([FromBody] UsuarioFiltroDto usuarioDto)
    {
        IActionResult status = Find(usuarioDto);

        if (status is not NoContentResult)
        {
            var token = _autenticacaoEntityService.GenerateAccessToken(usuarioDto.Login);
            return Ok(new { AccessToken = new JwtSecurityTokenHandler().WriteToken(token) });
        }

        return Unauthorized("As credenciais fornecidas estão inválidas.");
    }

    protected override void OnSetEntityService()
    {
        EntityService = _einBissEntityService.Usuario;
    }
}
