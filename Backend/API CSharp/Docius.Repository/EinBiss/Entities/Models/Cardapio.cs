using Docius.Repository.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.EinBiss.Entities.Models;

public class CardapioFiltro : FiltroBase<int>
{
}

[Table("cardapios")]
public class Cardapio : EntityBase<int>
{
    public virtual CategoriaProduto[] CategoriaProduto { get; set; }
}
