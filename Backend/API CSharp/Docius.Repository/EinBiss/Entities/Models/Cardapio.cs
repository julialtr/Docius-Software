using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("cardapios")]
public class Cardapio : EntityBase<int>
{
    public virtual List<CategoriaProduto> CategoriaProduto { get; set; }
}
