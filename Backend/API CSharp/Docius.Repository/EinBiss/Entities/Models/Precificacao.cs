using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class PrecificacaoFiltro : FiltroBase<int>
{
}

[Table("precificacoes")]
public class Precificacao : EntityBase<int>
{
    [Column("qtd_horas_mensais")]
    public int QtdHorasMensais { get; set; }

    [Column("porcentagem_lucro_estimada")]
    public decimal PorcentagemLucroEstimada { get; set; }

    [Column("valor_insumos")]
    public decimal ValorInsumos { get; set; }

    [Column("valor_gastos_fixos")]
    public decimal ValorGastosFixos { get; set; }

    [Column("valor_sugerido")]
    public decimal ValorSugerido { get; set; }

    [Column("valor_adotado")]
    public decimal ValorAdotado{ get; set; }

    [Column("receita_id")]
    [Required]
    public int ReceitaId { get; set; }

    public virtual Receita Receita { get; set; }

    public virtual List<PrecificacaoIngrediente> PrecificacaoIngrediente { get; set; }
}
