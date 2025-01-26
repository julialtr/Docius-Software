using AutoMapper;

namespace Docius.API.Extensions;

public static class AutoMapperExtensions
{
    public static void ConfigureAutoMapper(this IServiceCollection services)
    {
        var mapperConfig = new MapperConfiguration(mapperConfig =>
        {
            mapperConfig.RegisterProfiles();
        });

        services.AddSingleton(mapperConfig.CreateMapper());
        services.AddMvc();
    }

    public static void IgnoreNullsOnSource<T, U>(this IMappingExpression<T, U> expression)
    {
        expression.ForAllMembers(opts => opts.Condition((src, dest, srcMember, destMember) =>
        {
            if (srcMember is null)
                return false;

            if (destMember?.GetType().IsEnum == true)
                return src.GetType().GetProperty(opts.DestinationMember.Name)?.GetValue(src, null) != null;

            return true;
        }));
    }
}
