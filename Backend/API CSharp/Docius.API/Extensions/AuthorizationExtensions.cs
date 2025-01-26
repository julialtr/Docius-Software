using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Docius.API.Extensions;

public static class AuthorizationExtensions
{
    public static void ConfigureAuthorization(this IServiceCollection services, WebApplicationBuilder builder)
    {
        var configuration = builder.Configuration;
        var environment = builder.Environment;

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, j =>
       {
           j.Authority = configuration.GetConnectionString("Authority");
           j.RequireHttpsMetadata = false;
           j.TokenValidationParameters = new()
           {
               ValidateAudience = false,
               ValidateIssuer = false,
               ValidateIssuerSigningKey = true
           };
       });

        services.AddAuthorization();
    }
}
