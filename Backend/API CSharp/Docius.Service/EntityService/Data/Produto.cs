using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.Service.EntityService.Data;

public class ProdutoDetalhado
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public decimal Preco { get; set; }

    public int QtdPedidos { get; set; }

    public int? CategoriaProdutoId { get; set; }

    public virtual ReceitaProduto Receita { get; set; }
}
