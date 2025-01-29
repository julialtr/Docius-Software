using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("decoracoes_bolos_pedidos")]
public class DecoracaoBoloPedido : EntityBase<int>
{
    [Column("foto")]
    [Required]
    public Byte[] Foto { get; set; }

    public virtual List<DecoracaoBoloPedidoPersonalizacao> DecoracaoBoloPedidoPersonalizacao { get; set; }
}
