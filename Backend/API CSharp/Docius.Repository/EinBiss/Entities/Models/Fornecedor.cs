using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class FornecedorFiltro : FiltroBase<int>
{
}

[Table("fornecedores")]
public class Fornecedor : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("endereco")]
    [MaxLength(150)]
    public string Endereco { get; set; }

    [Column("site")]
    [MaxLength(100)]
    public string Site { get; set; }

    public virtual List<Ingrediente> Ingrediente { get; set; }
}
