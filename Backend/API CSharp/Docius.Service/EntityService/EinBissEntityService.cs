using Docius.Repository.EinBiss;
using Docius.Service.EntityService.DB.EinBiss;

namespace Docius.Service.EntityService;

public sealed class EinBissEntityService
{
    private readonly Lazy<CardapioEntityService> _entityServiceCardapio;
    private readonly Lazy<CategoriaIngredienteEntityService> _entityServiceCategoriaIngrediente;
    private readonly Lazy<CategoriaProdutoEntityService> _entityServiceCategoriaProduto;
    private readonly Lazy<DecoracaoBoloEntityService> _entityServiceDecoracaoBolo;
    private readonly Lazy<DecoracaoBoloPedidoEntityService> _entityServiceDecoracaoBoloPedido;
    private readonly Lazy<DecoracaoBoloPedidoPersonalizacaoEntityService> _entityServiceDecoracaoBoloPedidoPersonalizacao;
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

    public CardapioEntityService Cardapio => _entityServiceCardapio.Value;
    public CategoriaIngredienteEntityService CategoriaIngrediente => _entityServiceCategoriaIngrediente.Value;
    public CategoriaProdutoEntityService CategoriaProduto => _entityServiceCategoriaProduto.Value;
    public DecoracaoBoloEntityService DecoracaoBolo => _entityServiceDecoracaoBolo.Value;
    public DecoracaoBoloPedidoEntityService DecoracaoBoloPedido => _entityServiceDecoracaoBoloPedido.Value;
    public DecoracaoBoloPedidoPersonalizacaoEntityService DecoracaoBoloPedidoPersonalizacao => _entityServiceDecoracaoBoloPedidoPersonalizacao.Value;
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

    public EinBissEntityService(EinBissEntityService service, EinBissContext context)
    {
        _entityServiceCardapio = new(() => new CardapioEntityService(service, context));
        _entityServiceCategoriaIngrediente = new(() => new CategoriaIngredienteEntityService(service, context));
        _entityServiceCategoriaProduto = new(() => new CategoriaProdutoEntityService(service, context));
        _entityServiceDecoracaoBolo = new(() => new DecoracaoBoloEntityService(service, context));
        _entityServiceDecoracaoBoloPedido = new(() => new DecoracaoBoloPedidoEntityService(service, context));
        _entityServiceDecoracaoBoloPedidoPersonalizacao = new(() => new DecoracaoBoloPedidoPersonalizacaoEntityService(service, context));
        _entityServiceFornecedor = new(() => new FornecedorEntityService(service, context));
        _entityServiceGasto = new(() => new GastoEntityService(service, context));
        _entityServiceIngrediente = new(() => new IngredienteEntityService(service, context));
        _entityServicePedido = new(() => new PedidoEntityService(service, context));
        _entityServicePedidoProduto = new(() => new PedidoProdutoEntityService(service, context));
        _entityServicePersonalizacao = new(() => new PersonalizacaoEntityService(service, context));
        _entityServicePrecificacao = new(() => new PrecificacaoEntityService(service, context));
        _entityServiceProduto = new(() => new ProdutoEntityService(service, context));
        _entityServiceReceita = new(() => new ReceitaEntityService(service, context));
        _entityServiceReceitaCategoriaIngrediente = new(() => new ReceitaCategoriaIngredienteEntityService(service, context));
        _entityServiceStatusPedido = new(() => new StatusPedidoEntityService(service, context));
        _entityServiceStatusPedidoProduto = new(() => new StatusPedidoProdutoEntityService(service, context));
        _entityServiceTipoUsuario = new(() => new TipoUsuarioEntityService(service, context));
        _entityServiceUnidadeMedida = new(() => new UnidadeMedidaEntityService(service, context));
        _entityServiceUsuario = new(() => new UsuarioEntityService(service, context));
    }
}
