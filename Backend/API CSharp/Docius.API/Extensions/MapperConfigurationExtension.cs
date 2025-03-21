using AutoMapper;
using Docius.API.Profiles;

namespace Docius.API.Extensions;

public static class MapperConfigurationExtension
{
    public static void RegisterProfiles(this IMapperConfigurationExpression configuration)
    {
        configuration.AddProfiles(GetProfiles());
    }
    private static Profile[] GetProfiles()
    {
        return new Profile[]
        {
                new ProfileUsuario(),
                new ProfileWebScraping(),
                new ProfileEmpresa(),
                new ProfileFornecedor(),
                new ProfileCategoriaIngrediente(),
                new ProfileIngrediente(),
                new ProfileUnidadeMedida(),
                new ProfileGasto(),
                new ProfileProduto(),
                new ProfileReceita(),
                new ProfileReceitaCategoriaIngrediente(),
                new ProfilePrecificacao(),
                new ProfilePrecificacaoIngrediente(),
        };
    }
}
