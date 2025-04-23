namespace Docius.API.Dtos.V1;

public class DashboardFiltroDto
{
    public DateOnly DataInicial { get; set; }

    public DateOnly DataFinal { get; set; }
}

public class ReadDashboardPedidosMesDto
{
    public string Mes { get; set; }

    public int QuantidadePedidos { get; set; }
}

public class ReadDashboardPedidosStatusDto
{
    public string Status { get; set; }

    public int QuantidadePedidos { get; set; }
}

public class ReadDashboardProdutosMaisVendidosDto
{
    public string Nome { get; set; }

    public int QuantidadePedidos { get; set; }
}

public class ReadDashboardDto
{
    public decimal ValorFaturamentoBruto { get; set; }

    public decimal VariacaoFaturamentoBruto { get; set; }

    public decimal ValorMedioPedido { get; set; }

    public int QuantidadePedidos { get; set; }

    public decimal ValorFaturamentoBrutoProximoMes { get; set; }

    public virtual List<DashboardPedidosMes> PedidosMes { get; set; }

    public virtual List<DashboardPedidosStatus> PedidosStatus { get; set; }

    public virtual List<DashboardProdutosMaisVendidos> ProdutosMaisVendidos { get; set; }
}
