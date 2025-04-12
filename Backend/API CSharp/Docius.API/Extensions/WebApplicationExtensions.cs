using Swashbuckle.AspNetCore.SwaggerUI;

namespace Docius.API.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication Configure(this WebApplication app)
    {
        app.ConfigureExceptionHandling();
        app.UseCors("CorsPolicy");
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.ConfigureSwagger();
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        return app;
    }
    public static WebApplication ConfigureSwagger(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment())
            return app;

        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            foreach (var description in app.DescribeApiVersions())
                options.SwaggerEndpoint($"{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());

            options.DocExpansion(DocExpansion.List);
            options.ConfigObject.AdditionalItems.Add("syntaxHighlight", false);
            options.ConfigObject.DefaultModelsExpandDepth = -1;
            options.ConfigObject.PersistAuthorization = true;
            options.ConfigObject.DisplayRequestDuration = true;
        });

        return app;
    }
}
