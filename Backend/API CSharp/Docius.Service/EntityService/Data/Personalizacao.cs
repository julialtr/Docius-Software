using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class PersonalizacaoDetalhado
{
    public string Descricao { get; set; }

    public virtual List<PersonalizacaoFoto> PersonalizacaoFoto { get; set; }
}
