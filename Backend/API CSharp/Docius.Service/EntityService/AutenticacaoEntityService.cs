using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace Docius.Service.EntityService;

public sealed class AutenticacaoEntityService
{
    private readonly IConfiguration _configuration;

    public AutenticacaoEntityService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public JwtSecurityToken GenerateAccessToken(string email)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, email),
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Audience"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])),
                SecurityAlgorithms.HmacSha256)
        );

        return token;
    }
}
