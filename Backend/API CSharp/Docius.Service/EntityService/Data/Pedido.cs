namespace Docius.Service.EntityService.Data;

public class PedidoDetalhado
{
    public string Identificador { get; set; }

    public DateTime DataHoraEntrega { get; set; }

    public int UsuarioId { get; set; }

    public virtual List<PedidoProdutoDetalhado> PedidoProduto { get; set; }
}
