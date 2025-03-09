using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class PersonalizacaoFiltro : FiltroBase<int>
{
}

[Table("personalizacoes")]
public class Personalizacao : EntityBase<int>
{
    [Column("descricao")]
    [MaxLength(5000)]
    public string Descricao { get; set; }

    public virtual List<DecoracaoBoloPedidoPersonalizacao> DecoracaoBoloPedidoPersonalizacao { get; set; }

    public virtual PedidoProduto PedidoProduto { get; set; }
}
