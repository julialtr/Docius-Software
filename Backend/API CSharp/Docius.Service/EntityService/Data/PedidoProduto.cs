using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class CreatePedidoProdutoDetalhado
{
    public int Quantidade { get; set; }

    public int PedidoId { get; set; }

    public int ProdutoId { get; set; }

    public int PersonalizacaoId { get; set; }

    public PersonalizacaoDetalhado Personalizacao { get; set; }
}

public class ReadPedidoProdutoDetalhado
{
    public int Id { get; set; }

    public int Quantidade { get; set; }

    public int StatusPedidoProdutoId { get; set; }

    public virtual Produto Produto { get; set; }

    public PersonalizacaoDetalhado Personalizacao { get; set; }
}
