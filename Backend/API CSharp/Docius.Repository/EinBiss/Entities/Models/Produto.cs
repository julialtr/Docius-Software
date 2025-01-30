using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class ProdutoFiltro : FiltroBase<int>
{
}

[Table("produtos")]
public class Produto : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("preco")]
    [Required]
    public decimal Preco { get; set; }

    [Column("receita_id")]
    [Required]
    public int ReceitaId { get; set; }

    public virtual Receita Receita { get; set; }

    [Column("categoria_produto_id")]
    [Required]
    public int CategoriaProdutoId { get; set; }

    public virtual CategoriaProduto CategoriaProduto { get; set; }

    public virtual PedidoProduto[] PedidoProduto { get; set; }
}
