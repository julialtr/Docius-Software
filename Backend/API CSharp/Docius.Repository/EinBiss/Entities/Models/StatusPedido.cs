using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("status_pedidos")]
public class StatusPedido : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(30)]
    [Required]
    public string Nome { get; set; }

    public virtual List<Pedido> Pedido { get; set; }
}
