using Microsoft.Extensions.Configuration;
using System.Text.Json;
using Docius.Repository.ServicosTerceiros.Dados;
using Microsoft.AspNetCore.WebUtilities;

namespace Docius.Service.EntityService;

public sealed class ProxyEntityService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ProxyEntityService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<WebScrapingResponse> GetProdutosAsync(WebScrapingFilter webScrapingFilter)
    {
        var queryParams = new Dictionary<string, string>();

        if (webScrapingFilter.IdsMercados != null && webScrapingFilter.IdsMercados.Any())
            queryParams.Add("ids_mercados", string.Join(",", webScrapingFilter.IdsMercados));

        if (!string.IsNullOrWhiteSpace(webScrapingFilter.TextoPesquisa))
            queryParams.Add("texto_pesquisa", webScrapingFilter.TextoPesquisa);

        string url = QueryHelpers.AddQueryString(_configuration["Urls:WebScrapingAPI"] + "get-produtos", queryParams);

        var response = await _httpClient.GetAsync(url);
        string responseContent = await response.Content.ReadAsStringAsync();

        WebScrapingResponse webScrapingResponse = JsonSerializer.Deserialize<WebScrapingResponse>(responseContent);

        if (!response.IsSuccessStatusCode || webScrapingResponse == null || !string.IsNullOrEmpty(webScrapingResponse.Mensagem))
            throw new Exception($"Erro ao buscar produtos. Detalhes: {webScrapingResponse?.Mensagem ?? "Ocorreu um erro inesperado."}");

        return webScrapingResponse;
    }
}
