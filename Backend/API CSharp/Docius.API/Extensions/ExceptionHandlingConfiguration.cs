using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.ComponentModel;

namespace Docius.API.Extensions;

public static class ExceptionHandlingConfiguration
{
    public static IApplicationBuilder ConfigureExceptionHandling(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                await HandleError(context);
            });
        });

        return app;
    }

    private static async Task HandleError(HttpContext context)
    {
        var contextFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (contextFeature == null)
            return;

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var jsonOptions = new JsonSerializerOptions();
        jsonOptions.Converters.Add(new JsonStringEnumConverter());

        switch (contextFeature.Error)
        {
            case WarningException exception:
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(new { exception.Message }, jsonOptions);
                    break;
                }

            case Exception exception:
                {
                    await context.Response.WriteAsJsonAsync(new { exception.Message }, jsonOptions);
                    break;
                }

            default:
                {
                    await context.Response.WriteAsJsonAsync(new { Message = "Ocorreu um erro inesperado durante a requisição." }, jsonOptions);
                }
                break;
        }
    }
}
