using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class PrecificacaoDetalhada
{
    public int Id { get; set; }

    public int QtdHorasMensais { get; set; }

    public decimal PorcentagemLucroEstimada { get; set; }

    public decimal ValorInsumos { get; set; }

    public decimal ValorGastosFixos { get; set; }

    public decimal ValorSugerido { get; set; }

    public decimal ValorAdotado { get; set; }

    public virtual ReceitaDetalhada Receita { get; set; }

    public virtual List<PrecificacaoIngrediente> PrecificacaoIngrediente { get; set; }
}
