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
    [Column("valor_insumos")]
    [Required]
    public decimal ValorInsumos { get; set; }

    [Column("valor_salario")]
    [Required]
    public decimal ValorSalario { get; set; }

    [Column("qtd_horas_mensais")]
    [Required]
    public int QtdHorasMensais { get; set; }

    [Column("qtd_meses_considerar_gastos")]
    public int QtdMesesConsiderarGastos { get; set; }

    [Column("porcentagem_lucro_estimada")]
    public decimal PorcentagemLucroEstimada { get; set; }

    [Column("porcentagem_lucro_obtida")]
    public decimal PorcentagemLucroObtida { get; set; }

    [Column("valor_bruto")]
    public decimal ValorBruto { get; set; }

    [Column("valor_liquido")]
    public decimal ValorLiquido { get; set; }

    public virtual Receita Receita { get; set; }
}
