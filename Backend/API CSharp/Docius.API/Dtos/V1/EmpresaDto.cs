using Docius.API.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Docius.Repository.Entities.Models;

public class EmpresaFiltroDto
{
    [Required]
    public string Dominio { get; set; }
}

public class ReadEmpresaDto : ReadDtoBase<int>
{
    public string Nome { get; set; }
    public string ChavePix { get; set; }
    public string Cidade { get; set; }
    public string CaminhoLogo { get; set; }
    public string CaminhoImagem1{ get; set; }
    public string CaminhoImagem2 { get; set; }
    public string Dominio { get; set; }
}
