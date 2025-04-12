using Docius.Repository.EinBiss;
using Docius.Service.EntityService.DB.EinBiss;
using Microsoft.AspNetCore.Hosting;

namespace Docius.Service.EntityService;

public sealed class EinBissEntityService
{
    private readonly Lazy<CardapioEntityService> _entityServiceCardapio;
    private readonly Lazy<CategoriaIngredienteEntityService> _entityServiceCategoriaIngrediente;
    private readonly Lazy<CategoriaProdutoEntityService> _entityServiceCategoriaProduto;
    private readonly Lazy<DecoracaoBoloEntityService> _entityServiceDecoracaoBolo;
    private readonly Lazy<PersonalizacaoFotoEntityService> _entityServicePersonalizacaoFoto;
    private readonly Lazy<FornecedorEntityService> _entityServiceFornecedor;
    private readonly Lazy<GastoEntityService> _entityServiceGasto;
    private readonly Lazy<IngredienteEntityService> _entityServiceIngrediente;
    private readonly Lazy<PedidoEntityService> _entityServicePedido;
    private readonly Lazy<PedidoProdutoEntityService> _entityServicePedidoProduto;
    private readonly Lazy<PersonalizacaoEntityService> _entityServicePersonalizacao;
    private readonly Lazy<PrecificacaoEntityService> _entityServicePrecificacao;
    private readonly Lazy<ProdutoEntityService> _entityServiceProduto;
    private readonly Lazy<ReceitaEntityService> _entityServiceReceita;
    private readonly Lazy<ReceitaCategoriaIngredienteEntityService> _entityServiceReceitaCategoriaIngrediente;
    private readonly Lazy<StatusPedidoEntityService> _entityServiceStatusPedido;
    private readonly Lazy<StatusPedidoProdutoEntityService> _entityServiceStatusPedidoProduto;
    private readonly Lazy<TipoUsuarioEntityService> _entityServiceTipoUsuario;
    private readonly Lazy<UnidadeMedidaEntityService> _entityServiceUnidadeMedida;
    private readonly Lazy<UsuarioEntityService> _entityServiceUsuario;
    private readonly Lazy<PrecificacaoIngredienteEntityService> _entityServicePrecificacaoIngrediente;

    public CardapioEntityService Cardapio => _entityServiceCardapio.Value;
    public CategoriaIngredienteEntityService CategoriaIngrediente => _entityServiceCategoriaIngrediente.Value;
    public CategoriaProdutoEntityService CategoriaProduto => _entityServiceCategoriaProduto.Value;
    public DecoracaoBoloEntityService DecoracaoBolo => _entityServiceDecoracaoBolo.Value;
    public PersonalizacaoFotoEntityService PersonalizacaoFoto => _entityServicePersonalizacaoFoto.Value;
    public FornecedorEntityService Fornecedor => _entityServiceFornecedor.Value;
    public GastoEntityService Gasto => _entityServiceGasto.Value;
    public IngredienteEntityService Ingrediente => _entityServiceIngrediente.Value;
    public PedidoEntityService Pedido => _entityServicePedido.Value;
    public PedidoProdutoEntityService PedidoProduto => _entityServicePedidoProduto.Value;
    public PersonalizacaoEntityService Personalizacao => _entityServicePersonalizacao.Value;
    public PrecificacaoEntityService Precificacao => _entityServicePrecificacao.Value;
    public ProdutoEntityService Produto => _entityServiceProduto.Value;
    public ReceitaEntityService Receita => _entityServiceReceita.Value;
    public ReceitaCategoriaIngredienteEntityService ReceitaCategoriaIngrediente => _entityServiceReceitaCategoriaIngrediente.Value;
    public StatusPedidoEntityService StatusPedido => _entityServiceStatusPedido.Value;
    public StatusPedidoProdutoEntityService StatusPedidoProduto => _entityServiceStatusPedidoProduto.Value;
    public TipoUsuarioEntityService TipoUsuario => _entityServiceTipoUsuario.Value;
    public UnidadeMedidaEntityService UnidadeMedida => _entityServiceUnidadeMedida.Value;
    public UsuarioEntityService Usuario => _entityServiceUsuario.Value;
    public PrecificacaoIngredienteEntityService PrecificacaoIngrediente => _entityServicePrecificacaoIngrediente.Value;

    public EinBissEntityService(EinBissContext context, IWebHostEnvironment env)
    {
        _entityServiceCardapio = new(() => new CardapioEntityService(this, context));
        _entityServiceCategoriaIngrediente = new(() => new CategoriaIngredienteEntityService(this, context));
        _entityServiceCategoriaProduto = new(() => new CategoriaProdutoEntityService(this, context));
        _entityServiceDecoracaoBolo = new(() => new DecoracaoBoloEntityService(this, context));
        _entityServicePersonalizacaoFoto = new(() => new PersonalizacaoFotoEntityService(this, context));
        _entityServiceFornecedor = new(() => new FornecedorEntityService(this, context));
        _entityServiceGasto = new(() => new GastoEntityService(this, context));
        _entityServiceIngrediente = new(() => new IngredienteEntityService(this, context));
        _entityServicePedido = new(() => new PedidoEntityService(this, context, env));
        _entityServicePedidoProduto = new(() => new PedidoProdutoEntityService(this, context));
        _entityServicePersonalizacao = new(() => new PersonalizacaoEntityService(this, context));
        _entityServicePrecificacao = new(() => new PrecificacaoEntityService(this, context));
        _entityServiceProduto = new(() => new ProdutoEntityService(this, context));
        _entityServiceReceita = new(() => new ReceitaEntityService(this, context));
        _entityServiceReceitaCategoriaIngrediente = new(() => new ReceitaCategoriaIngredienteEntityService(this, context));
        _entityServiceStatusPedido = new(() => new StatusPedidoEntityService(this, context));
        _entityServiceStatusPedidoProduto = new(() => new StatusPedidoProdutoEntityService(this, context));
        _entityServiceTipoUsuario = new(() => new TipoUsuarioEntityService(this, context));
        _entityServiceUnidadeMedida = new(() => new UnidadeMedidaEntityService(this, context));
        _entityServiceUsuario = new(() => new UsuarioEntityService(this, context));
        _entityServicePrecificacaoIngrediente = new(() => new PrecificacaoIngredienteEntityService(this, context));
    }
}
