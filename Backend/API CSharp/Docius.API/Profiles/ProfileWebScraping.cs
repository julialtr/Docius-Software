using Docius.Repository.ServicosTerceiros.Dados;

namespace Docius.API.Profiles;

public class ProfileWebScraping: ProfileBase
{
    public ProfileWebScraping()
    {
        CreateMap<WebScrapingResponse, WebScrapingResponseDto>();
        CreateMap<WebScrapingData, WebScrapingDataDto>();
        CreateMap<WebScrapingFilterDto, WebScrapingFilter>();
    }
}
