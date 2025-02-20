using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Text.Json.Serialization;
using Docius.API.Helpers;

namespace Docius.API.Extensions;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        IServiceCollection services = builder.Services;

        services.ConfigureCors();
        services.ConfigureDataBase(builder.Configuration);

        services.RegisterServices();
        services.ConfigureAutoMapper();
        services.ConfigureAuthorization(builder);
        services.ConfigureVersioning();
        services.ConfigureSwagger();

        services.AddControllers(options =>
        {
            options.Filters.Add(new ProducesAttribute(MediaTypeNames.Application.Json));
            options.Filters.Add(new ConsumesAttribute(MediaTypeNames.Application.Json));

            options.RespectBrowserAcceptHeader = true;

            options.Conventions.Add(new RouteTokenTransformerConvention(new KebabCaseParameterTransformer()));
        })
        .AddJsonOptions(options => options.JsonSerializerOptions.ConfigureJson().DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull);

        services.AddEndpointsApiExplorer();

        return builder;
    }
}
