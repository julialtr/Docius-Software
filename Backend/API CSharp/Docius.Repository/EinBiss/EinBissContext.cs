using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Docius.Repository.EinBiss;

public class EinBissContext : DbContext
{
    public EinBissContext(DbContextOptions<EinBissContext> opts) : base(opts)
    {
    }

    public virtual DbSet<Cardapio> Cardapios { get; set; }
    public virtual DbSet<CategoriaIngrediente> CategoriasIngredientes { get; set; }
    public virtual DbSet<CategoriaProduto> CategoriasProdutos { get; set; }
    public virtual DbSet<DecoracaoBolo> DecoracoesBolos { get; set; }
    public virtual DbSet<DecoracaoBoloPedido> DecoracoesBolosPedidos { get; set; }
    public virtual DbSet<DecoracaoBoloPedidoPersonalizacao> DecoracoesBolosPedidosPersonalizacoes { get; set; }
    public virtual DbSet<Fornecedor> Fornecedores { get; set; }
    public virtual DbSet<Gasto> Gastos { get; set; }
    public virtual DbSet<Ingrediente> Ingredientes { get; set; }
    public virtual DbSet<Pedido> Pedidos { get; set; }
    public virtual DbSet<PedidoProduto> PedidosProdutos { get; set; }
    public virtual DbSet<Personalizacao> Personalizacoes { get; set; }
    public virtual DbSet<Precificacao> Precificacoes { get; set; }
    public virtual DbSet<Produto> Produtos { get; set; }
    public virtual DbSet<Receita> Receitas { get; set; }
    public virtual DbSet<ReceitaCategoriaIngrediente> ReceitasCategoriasIngredientes { get; set; }
    public virtual DbSet<StatusPedido> StatusPedidos { get; set; }
    public virtual DbSet<StatusPedidoProduto> StatusPedidosProdutos { get; set; }
    public virtual DbSet<TipoUsuario> TiposUsuarios { get; set; }
    public virtual DbSet<UnidadeMedida> UnidadesMedidas { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }
}
