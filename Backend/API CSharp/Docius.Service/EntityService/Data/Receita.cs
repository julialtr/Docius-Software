namespace Docius.Service.EntityService.Data;

public class ReceitaDetalhada
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public string Descricao { get; set; }

    public int QtdPorcoes { get; set; }

    public TimeOnly Tempo { get; set; }

    public virtual List<ReceitaCategoriaIngredienteDetalhada> ReceitaCategoriaIngrediente { get; set; }
}
