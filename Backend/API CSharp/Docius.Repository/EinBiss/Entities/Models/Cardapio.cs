using Docius.Repository.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.EinBiss.Entities.Models;

public class CardapioFiltro : FiltroBase<int>
{
}

[Table("cardapios")]
public class Cardapio : EntityBase<int>
{
    public virtual List<CategoriaProduto> CategoriaProduto { get; set; }
}
