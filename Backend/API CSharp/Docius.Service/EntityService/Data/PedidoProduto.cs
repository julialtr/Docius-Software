namespace Docius.Service.EntityService.Data;

public class PedidoProdutoDetalhado
{
    public int Quantidade { get; set; }

    public int PedidoId { get; set; }

    public int ProdutoId { get; set; }

    public int PersonalizacaoId { get; set; }

    public PersonalizacaoDetalhado Personalizacao { get; set; }
}
