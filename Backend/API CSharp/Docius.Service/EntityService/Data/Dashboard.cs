public class DashboardFiltro
{
    public DateOnly DataInicial { get; set; }

    public DateOnly DataFinal { get; set; }
}

public class DashboardPedidosMes
{
    public string Mes { get; set; }
 
    public int QuantidadePedidos { get; set; }
}

public class DashboardPedidosStatus
{
    public string Status { get; set; }

    public int QuantidadePedidos { get; set; }
}

public class DashboardProdutosMaisVendidos
{
    public string Nome { get; set; }

    public int QuantidadePedidos { get; set; }
}

public class Dashboard
{
    public decimal ValorFaturamentoBruto { get; set; }

    public decimal ValorMedioPedido { get; set; }

    public int QuantidadePedidos { get; set; }

    public decimal ValorFaturamentoBrutoProximoMes {  get; set; }

    public virtual List<DashboardPedidosMes> PedidosMes { get; set; }

    public virtual List<DashboardPedidosStatus> PedidosStatus { get; set; }
    
    public virtual List<DashboardProdutosMaisVendidos> ProdutosMaisVendidos { get; set; }
}
