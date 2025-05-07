
public class CreateMensagem
{
    public string Mensagem { get; set; }

    public string ThreadId { get; set; }
}

public class ReadMensagem
{
    public int Id { get; set; }

    public string Mensagem { get; set; }

    public string TipoAutor { get; set; }

    public DateTime DataHora { get; set; }
}
