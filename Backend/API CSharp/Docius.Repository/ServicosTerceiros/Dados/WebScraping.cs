using System.Text.Json.Serialization;

namespace Docius.Repository.ServicosTerceiros.Dados;

public class WebScrapingFilter
{
    [JsonPropertyName("ids_mercados")]
    public int[] IdsMercados {  get; set; }

    [JsonPropertyName("texto_pesquisa")]
    public string TextoPesquisa { get; set; }
}

public class WebScrapingResponse
{
    [JsonPropertyName("mensagem")]
    public string Mensagem { get; set; }

    [JsonPropertyName("dados")]
    public WebScrapingData[] Dados { get; set; }
}

public class WebScrapingData
{
    [JsonPropertyName("id_mercado")]
    public int IdMercado { get; set; }

    [JsonPropertyName("nome")]
    public string Nome { get; set; }

    [JsonPropertyName("preco")]
    public decimal Preco { get; set; }
}
