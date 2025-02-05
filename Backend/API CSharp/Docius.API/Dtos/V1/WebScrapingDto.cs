using System.Text.Json.Serialization;

namespace Docius.Repository.ServicosTerceiros.Dados;

public class WebScrapingFilterDto
{
    [JsonPropertyName("ids_mercados")]
    public int[] IdsMercados { get; set; }

    [JsonPropertyName("texto_pesquisa")]
    public string TextoPesquisa { get; set; }
}

public class WebScrapingResponseDto
{
    public WebScrapingDataDto[] Dados { get; set; }
}

public class WebScrapingDataDto
{
    public int IdMercado { get; set; }

    public string Nome { get; set; }

    public decimal Preco { get; set; }
}
