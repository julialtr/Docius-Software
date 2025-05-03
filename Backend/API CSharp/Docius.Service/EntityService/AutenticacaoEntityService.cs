using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Docius.Service.EntityService;

public sealed class AutenticacaoEntityService
{
    private readonly IConfiguration _configuration;
    private readonly HttpContext _httpContext;

    private readonly EinBissEntityService _einBissEntityService;
    private readonly EmailEntityService _emailEntityService;

    public AutenticacaoEntityService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, EinBissEntityService einBissEntityService, EmailEntityService emailEntityService)
    {
        _configuration = configuration;
        _httpContext = httpContextAccessor.HttpContext;

        _einBissEntityService = einBissEntityService;
        _emailEntityService = emailEntityService;
    }

    public void GenerateAccessToken(string email, int tipoUsuario, int id)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, email),
            new Claim(ClaimTypes.Role, tipoUsuario.ToString()),
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Audience"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])),
                SecurityAlgorithms.HmacSha256)
        );

        string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        _httpContext.Response.Cookies.Append("accessToken", tokenString,
            new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(7),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
    }

    public void Logout()
    {
        _httpContext.Response.Cookies.Delete("accessToken");
    }

    private string GerarCodigo()
    {
        Random random = new Random();
        int numero = random.Next(0, 1000000);
        return numero.ToString("D6");
    }

    public async Task SendEsqueceuSenhaAsync(string email)
    {
        var usuario = _einBissEntityService.Usuario.Entity
            .Where(u => u.Email == email)
            .FirstOrDefault();

        if (usuario == null)
            throw new WarningException("O email informado é inválido.");

        Token token = new Token()
        {
            Codigo = GerarCodigo(),
            DataHoraExpiracao = DateTime.Now.AddMinutes(15),
            Valido = true,
            UsuarioId = usuario.Id
        };

        await _einBissEntityService.Token.CreateAsync(token);

        await _emailEntityService.SendMailAsync(email, "ein-biss", token.Codigo);
    }

    public async Task SendVerificacaoCodigoAsync(string codigo)
    {
        var usuario = _einBissEntityService.Usuario.Entity
            .Include(u => u.Token)
            .Where(u => u.Token.Any(t => t.Codigo.Equals(codigo)))
            .FirstOrDefault();

        if (usuario == null)
            throw new WarningException("O código informado é inválido.");

        var token = usuario.Token
            .Where(t => t.Codigo.Equals(codigo))
            .FirstOrDefault();

        if (token.DataHoraExpiracao < DateTime.Now)
            throw new WarningException("O código informado está expirado.");

        if (token.Valido == false)
            throw new WarningException("O código informado não é mais válido.");

        token.Valido = false;

        await _einBissEntityService.Token.UpdateAsync(token);

        GenerateAccessToken(usuario.Email, usuario.TipoUsuarioId, usuario.Id);
    }
}
