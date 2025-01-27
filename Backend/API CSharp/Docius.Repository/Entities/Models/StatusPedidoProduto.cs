using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

[Table("status_pedidos_produtos")]
public class StatusPedidoProduto : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(30)]
    [Required]
    public string Nome { get; set; }

    public virtual List<PedidoProduto> PedidoProduto { get; set; }
}
