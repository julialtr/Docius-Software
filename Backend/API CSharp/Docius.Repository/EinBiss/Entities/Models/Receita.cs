using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class ReceitaFiltro : FiltroBase<int>
{
}

[Table("receitas")]
public class Receita : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    public string Nome { get; set; }

    [Column("descricao")]
    [MaxLength(5000)]
    public string Descricao { get; set; }

    [Column("qtd_porcoes")]
    public int QtdPorcoes { get; set; }

    [Column("tempo")]
    public TimeOnly Tempo { get; set; }

    public virtual Precificacao Precificacao { get; set; }

    public virtual List<ReceitaCategoriaIngrediente> ReceitaCategoriaIngrediente { get; set; }

    public virtual List<Produto> Produto { get; set; }
}
