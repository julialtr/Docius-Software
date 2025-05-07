namespace Docius.Repository.ServicosTerceiros.Dados;

public class CreateMensagemDto
{
    public string Mensagem { get; set; }

    public string ThreadId { get; set; }
}

public class ReadMensagemDto
{
    public int Id { get; set; }

    public string Mensagem { get; set; }

    public string TipoAutor { get; set; }

    public DateTime DataHora { get; set; }
}
