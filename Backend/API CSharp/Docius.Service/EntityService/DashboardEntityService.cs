using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Docius.Service.EntityService;

public sealed class DashboardEntityService
{
    private readonly EinBissEntityService _einBissEntityService;
    private List<Pedido> _pedidos;

    public DashboardEntityService(EinBissEntityService einBissEntityService)
    {
        _einBissEntityService = einBissEntityService;
    }

    private decimal GetValorFaturamentoBruto()
    {
        return _pedidos.Sum(p =>
            p.PedidoProduto.Sum(pp =>
                pp.Produto.Preco * pp.Quantidade
            )
        );
    }

    private decimal GetValorFaturamentoBrutoProximoMes(DashboardFiltro filtro)
    {
        var dataInicialProximo = new DateOnly(filtro.DataFinal.Year, filtro.DataFinal.Month, 1).AddMonths(1);
        var ultimoDiaDoMes = DateTime.DaysInMonth(dataInicialProximo.Year, dataInicialProximo.Month);
        var dataFinalProximo = new DateOnly(dataInicialProximo.Year, dataInicialProximo.Month, ultimoDiaDoMes);

        var pedidosProximoMes = _einBissEntityService.Pedido.Entity
            .Include(p => p.PedidoProduto)
                .ThenInclude(pp => pp.Produto)
            .Where(p => p.DataHoraEntrega.Date >= dataInicialProximo.ToDateTime(TimeOnly.MinValue).Date)
            .Where(p => p.DataHoraEntrega.Date <= dataFinalProximo.ToDateTime(TimeOnly.MaxValue).Date)
            .ToList();

        return pedidosProximoMes.Sum(p =>
            p.PedidoProduto.Sum(pp =>
                pp.Produto.Preco * pp.Quantidade
            )
        );
    }

    private List<DashboardPedidosMes> GetPedidosMes()
    {
        var hoje = DateOnly.FromDateTime(DateTime.Today);
        var primeirosDiasUltimos6Meses = Enumerable.Range(0, 6)
            .Select(i => new DateOnly(hoje.Year, hoje.Month, 1).AddMonths(-i))
            .OrderBy(d => d)
            .ToList();

        var dataMin = primeirosDiasUltimos6Meses.First().ToDateTime(TimeOnly.MinValue);

        var pedidos = _einBissEntityService.Pedido.Entity
            .Where(p => p.DataHoraEntrega >= dataMin)
            .ToList();

        return primeirosDiasUltimos6Meses
            .Select(data => new DashboardPedidosMes
            {
                Mes = data.ToString("MMMM", new CultureInfo("pt-BR")),
                QuantidadePedidos = pedidos
                    .Count(p => p.DataHoraEntrega.Year == data.Year && p.DataHoraEntrega.Month == data.Month)
            })
            .ToList();
    }

    private List<DashboardPedidosStatus> GetPedidosStatus()
    {
        return _pedidos
            .GroupBy(p => p.StatusPedidoId)
            .Select(g => new DashboardPedidosStatus
            {
                Status = g.First().StatusPedido.Nome,
                QuantidadePedidos = g.Count()
            })
            .ToList();
    }

    private List<DashboardProdutosMaisVendidos> GetProdutosMaisVendidos(DashboardFiltro filtro)
    {
        return _pedidos
            .SelectMany(p => p.PedidoProduto)
            .GroupBy(pp => pp.Produto.Nome)
            .Select(g => new DashboardProdutosMaisVendidos
            {
                Nome = g.Key,
                QuantidadePedidos = g.Sum(pp => pp.Quantidade)
            })
            .OrderByDescending(x => x.QuantidadePedidos)
            .ToList();
    }

    public Dashboard LeDashboard(DashboardFiltro filtro)
    {
        _pedidos = _einBissEntityService.Pedido.Entity
            .Include(p => p.StatusPedido)
            .Include(p => p.PedidoProduto)
                .ThenInclude(pp => pp.Produto)
            .Where(p => (p.DataHoraEntrega.Date >= filtro.DataInicial.ToDateTime(TimeOnly.MinValue).Date))
            .Where(p => (p.DataHoraEntrega.Date <= filtro.DataFinal.ToDateTime(TimeOnly.MaxValue).Date))
            .ToList();

        var valorFaturamentoBruto = GetValorFaturamentoBruto();

        return new Dashboard()
        {
            ValorFaturamentoBruto = valorFaturamentoBruto,
            ValorMedioPedido = _pedidos.Count > 0 ? (valorFaturamentoBruto / _pedidos.Count) : 0,
            QuantidadePedidos = _pedidos.Count,
            ValorFaturamentoBrutoProximoMes = GetValorFaturamentoBrutoProximoMes(filtro),
            PedidosMes = GetPedidosMes(),
            PedidosStatus = GetPedidosStatus(),
            ProdutosMaisVendidos = GetProdutosMaisVendidos(filtro),
        };
    }
}
