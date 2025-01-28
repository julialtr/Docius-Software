using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("categorias_produtos")]
public class CategoriaProduto : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("cardapio_id")]
    [Required]
    public int CardapioId { get; set; }

    public virtual Cardapio Cardapio { get; set; }

    public virtual List<CategoriaProduto> CategoriaProdutoInferior { get; set; }

    [Column("categoria_produto_superior_id")]
    public int CategoriaProdutoSuperiorId { get; set; }

    public virtual CategoriaProduto CategoriaProdutoSuperior { get; set; }

    public virtual List<Produto> Produto { get; set; }
}
