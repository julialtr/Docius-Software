using Docius.API.Dtos.V1;

namespace Docius.API.Profiles;

public class ProfileDashboard: ProfileBase
{
    public ProfileDashboard()
    {
        CreateMap<DashboardFiltroDto, DashboardFiltro>();
        CreateMap<Dashboard, ReadDashboardDto>();
        CreateMap<DashboardPedidosMes, ReadDashboardPedidosMesDto>();
        CreateMap<DashboardPedidosStatus, ReadDashboardPedidosStatusDto>();
        CreateMap<DashboardProdutosMaisVendidos, ReadDashboardProdutosMaisVendidosDto>();
    }
}
