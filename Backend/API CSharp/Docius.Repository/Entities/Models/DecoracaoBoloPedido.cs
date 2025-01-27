using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

[Table("decoracoes_bolos_pedidos")]
public class DecoracaoBoloPedido : EntityBase<int>
{
    [Column("foto")]
    [Required]
    public List<byte> Foto { get; set; }

    public virtual List<DecoracaoBoloPedidoPersonalizacao> DecoracaoBoloPedidoPersonalizacao { get; set; }
}
