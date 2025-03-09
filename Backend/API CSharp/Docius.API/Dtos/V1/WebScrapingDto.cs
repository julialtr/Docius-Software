using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.ServicosTerceiros.Dados;

public class WebScrapingFiltroDto
{
    [Required]
    public List<int> IdsMercados { get; set; }

    [Required]
    public string TextoPesquisa { get; set; }
}

public class ReadWebScrapingRetornoDto
{
    public string Mensagem { get; set; }

    public List<ReadWebScrapingDadosDto> Dados { get; set; }
}

public class ReadWebScrapingDadosDto
{
    public int IdMercado { get; set; }

    public string Nome { get; set; }

    public decimal Preco { get; set; }
}
