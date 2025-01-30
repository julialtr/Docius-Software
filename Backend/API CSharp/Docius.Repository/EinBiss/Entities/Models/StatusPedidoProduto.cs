using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class StatusPedidoProdutoFiltro : FiltroBase<int>
{
}

[Table("status_pedidos_produtos")]
public class StatusPedidoProduto : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(30)]
    [Required]
    public string Nome { get; set; }

    public virtual PedidoProduto[] PedidoProduto { get; set; }
}
