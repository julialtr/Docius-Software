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

    public async Task<WebScrapingRetorno> GetProdutosAsync(WebScrapingFiltro filter)
    {
        var queryParams = new Dictionary<string, string>();

        if (filter.IdsMercados != null && filter.IdsMercados.Any())
            queryParams.Add("ids_mercados", string.Join(",", filter.IdsMercados));

        if (!string.IsNullOrWhiteSpace(filter.TextoPesquisa))
            queryParams.Add("texto_pesquisa", filter.TextoPesquisa);

        string url = QueryHelpers.AddQueryString(_configuration["Urls:WebScrapingAPI"] + "get-produtos", queryParams);

        var response = await _httpClient.GetAsync(url);
        string responseContent = await response.Content.ReadAsStringAsync();

        var data = JsonSerializer.Deserialize<WebScrapingRetorno>(responseContent);

        if (!response.IsSuccessStatusCode || data == null || !string.IsNullOrEmpty(data.Mensagem))
            throw new Exception($"Erro ao buscar produtos. Detalhes: {data?.Mensagem ?? "Ocorreu um erro inesperado."}");

        return data;
    }
}
