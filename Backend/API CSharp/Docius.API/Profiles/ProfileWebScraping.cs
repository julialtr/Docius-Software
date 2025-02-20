using Docius.Repository.ServicosTerceiros.Dados;

namespace Docius.API.Profiles;

public class ProfileWebScraping: ProfileBase
{
    public ProfileWebScraping()
    {
        CreateMap<WebScrapingRetorno, ReadWebScrapingRetornoDto>();
        CreateMap<WebScrapingDados, ReadWebScrapingDadosDto>();
        CreateMap<WebScrapingFiltroDto, WebScrapingFiltro>();
    }
}
