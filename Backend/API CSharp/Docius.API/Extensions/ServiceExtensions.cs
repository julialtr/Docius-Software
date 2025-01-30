using Asp.Versioning;
using Docius.Repository.Docius;
using Docius.Repository.EinBiss;
using Docius.Service.EntityService;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Docius.API.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureVersioning(this IServiceCollection services)
    {
        services.AddApiVersioning(x =>
        {
            x.DefaultApiVersion = new ApiVersion(1, 0);
            x.AssumeDefaultVersionWhenUnspecified = true;
            x.ReportApiVersions = true;
        })
        .AddApiExplorer(p =>
        {
            p.GroupNameFormat = "'v'VVV";
            p.SubstituteApiVersionInUrl = true;
        });
    }
    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.CustomSchemaIds(type => type.ToString());
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Docius.API", Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                      Type = ReferenceType.SecurityScheme,
                      Id = "Bearer"
                    },
                    Scheme = "Bearer",
                    Name = "Bearer",
                    In = ParameterLocation.Header,
               },
               new List<string>()
            }
        });
        });
    }
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        });
    }

    public static void ConfigureDataBase(this IServiceCollection services, IConfiguration configuration)
    {
        string connStringDocius = configuration.GetConnectionString("Docius");

        services.AddDbContext<DociusContext>(options =>
        {
            options.UseNpgsql(connStringDocius, x =>
            {
                x.EnableRetryOnFailure(10);
                x.MigrationsAssembly("Docius.API");
            });
        });

        string connStringEinBiss = configuration.GetConnectionString("EinBiss");

        services.AddDbContext<EinBissContext>(options =>
        {
            options.UseNpgsql(connStringEinBiss, x =>
            {
                x.EnableRetryOnFailure(10);
                x.MigrationsAssembly("Docius.API");
            });
        });

        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<DociusEntityService>();
        services.AddScoped<EinBissEntityService>();
    }
}
