using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class PersonalizacaoFotoFiltro : FiltroBase<int>
{
}

[Table("personalizacoes_fotos")]
public class PersonalizacaoFoto : EntityBase<int>
{
    [Column("foto")]
    [Required]
    public Byte[] Foto { get; set; }

    [Column("personalizacao_id")]
    [Required]
    public int PersonalizacaoId { get; set; }

    public Personalizacao Personalizacao { get; set; }
}
