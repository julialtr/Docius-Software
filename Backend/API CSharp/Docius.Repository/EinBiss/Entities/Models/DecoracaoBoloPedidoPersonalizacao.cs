using Docius.Repository.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.EinBiss.Entities.Models;

public class DecoracaoBoloPedidoPersonalizacaoFiltro : FiltroBase<int>
{
}

[Table("decoracoes_bolos_pedidos_personalizacoes")]
public class DecoracaoBoloPedidoPersonalizacao : EntityBase<int>
{
    [Column("decoracao_bolo_pedido_id")]
    public int DecoracaoBoloPedidoId { get; set; }

    public DecoracaoBoloPedido DecoracaoBoloPedido { get; set; }

    [Column("personalizacao_id")]
    public int PersonalizacaoId { get; set; }

    public Personalizacao Personalizacao { get; set; }
}
