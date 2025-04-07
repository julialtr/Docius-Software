using Docius.Repository.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.Entities.Models;

public class EmpresaFiltro : FiltroBase<int>
{
    [MaxLength(100)]
    public string Dominio { get; set; }
}

[Table("empresas")]
public class Empresa : EntityBase<int>
{
    [Column("nome")]
    [MaxLength(100)]
    [Required]
    public string Nome { get; set; }

    [Column("chave_pix")]
    [MaxLength(100)]
    [Required]
    public string ChavePix { get; set; }

    [Column("cidade")]
    [MaxLength(100)]
    [Required]
    public string Cidade { get; set; }

    [Column("caminho_logo")]
    [Required]
    public string CaminhoLogo { get; set; }

    [Column("caminho_imagem_1")]
    [Required]
    public string CaminhoImagem1 { get; set; }

    [Column("caminho_imagem_2")]
    [Required]
    public string CaminhoImagem2 { get; set; }

    [Column("dominio")]
    [MaxLength(100)]
    [Required]
    public string Dominio { get; set; }
}
