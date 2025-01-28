using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("pedidos_produtos")]
public class PedidoProduto : EntityBase<int>
{
    [Column("quantidade")]
    [Required]
    public int Quantidade { get; set; }

    [Column("pedido_id")]
    [Required]
    public int PedidoId { get; set; }

    public Pedido Pedido { get; set; }

    [Column("produto_id")]
    [Required]
    public int ProdutoId { get; set; }

    public Produto Produto { get; set; }

    [Column("status_pedido_produto_id")]
    public int StatusPedidoProdutoId { get; set; }

    public StatusPedidoProduto StatusPedidoProduto { get; set; }

    [Column("personalizacao_id")]
    public int PersonalizacaoId { get; set; }

    public Personalizacao Personalizacao { get; set; }
}
