using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class CreatePedidoDetalhado
{
    public string Identificador { get; set; }

    public DateTime DataHoraEntrega { get; set; }

    public int UsuarioId { get; set; }

    public virtual List<CreatePedidoProdutoDetalhado> PedidoProduto { get; set; }
}

public class ReadPedidoDetalhado
{
    public int Id { get; set; }

    public string Identificador { get; set; }

    public DateTime DataHoraEntrega { get; set; }

    public int StatusPedidoId { get; set; }

    public virtual Usuario Usuario { get; set; }

    public virtual List<ReadPedidoProdutoDetalhado> PedidoProduto { get; set; }
}
