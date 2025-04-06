using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;

namespace Docius.Service.EntityService;

public sealed class AutenticacaoEntityService
{
    private readonly IConfiguration _configuration;
    private readonly HttpContext _httpContext;

    public AutenticacaoEntityService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _configuration = configuration;
        _httpContext = httpContextAccessor.HttpContext;
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
                IsEssential = true,
                Secure = true,
                SameSite = SameSiteMode.None,
            });
    }
}
