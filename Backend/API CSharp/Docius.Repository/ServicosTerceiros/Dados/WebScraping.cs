using System.Text.Json.Serialization;

namespace Docius.Repository.ServicosTerceiros.Dados;

public class WebScrapingFiltro
{
    [JsonPropertyName("ids_mercados")]
    public List<int> IdsMercados {  get; set; }

    [JsonPropertyName("texto_pesquisa")]
    public string TextoPesquisa { get; set; }
}

public class WebScrapingRetorno
{
    [JsonPropertyName("mensagem")]
    public string Mensagem { get; set; }

    [JsonPropertyName("dados")]
    public List<WebScrapingDados> Dados { get; set; }
}

public class WebScrapingDados
{
    [JsonPropertyName("id_mercado")]
    public int IdMercado { get; set; }

    [JsonPropertyName("nome")]
    public string Nome { get; set; }

    [JsonPropertyName("preco")]
    public decimal Preco { get; set; }
}
