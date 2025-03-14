using System.ComponentModel.DataAnnotations;

namespace Docius.Service.EntityService.Data;

public class ReceitaDetalhada
{
    public int Id { get; set; }

    [MaxLength(100)]
    public string Nome { get; set; }

    [MaxLength(5000)]
    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    public TimeOnly Tempo { get; set; }

    public virtual List<ReceitaCategoriaIngredienteDetalhada> ReceitaCategoriaIngrediente { get; set; }
}
