using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.ServicosTerceiros.Dados;

public class WebScrapingFiltroDto
{
    [Required]
    public int[] IdsMercados { get; set; }

    [Required]
    public string TextoPesquisa { get; set; }
}

public class WebScrapingRetornoDto
{
    public string Mensagem { get; set; }

    public WebScrapingDadosDto[] Dados { get; set; }
}

public class WebScrapingDadosDto
{
    public int IdMercado { get; set; }

    public string Nome { get; set; }

    public decimal Preco { get; set; }
}
