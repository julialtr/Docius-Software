using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.EinBiss.Entities.Models;

[Table("receitas")]
public class Receita : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("descricao")]
    [MaxLength(5000)]
    public string Descricao { get; set; }

    [Column("qtd_porcoes")]
    public int QtdPorcoes { get; set; }

    [Column("tempo")]
    [Required]
    public TimeOnly Tempo { get; set; }

    [Column("precificacao_id")]
    [Required]
    public int PrecificacaoId { get; set; }

    public virtual Precificacao Precificacao { get; set; }

    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }

    public virtual List<Produto> Produto { get; set; }
}
