using Docius.Repository.ServicosTerceiros.Dados;

namespace Docius.API.Profiles;

public class ProfileWebScraping: ProfileBase
{
    public ProfileWebScraping()
    {
        CreateMap<WebScrapingRetorno, WebScrapingRetornoDto>();
        CreateMap<WebScrapingDados, WebScrapingDadosDto>();
        CreateMap<WebScrapingFiltroDto, WebScrapingFiltro>();
    }
}
