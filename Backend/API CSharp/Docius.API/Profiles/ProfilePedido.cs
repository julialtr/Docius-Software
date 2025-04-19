using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfilePedido: ProfileBase
{
    public ProfilePedido()
    {
        CreateMap<CreatePedidoDto, CreatePedidoDetalhado>();
        CreateMap<PedidoFiltroDto, PedidoFiltro>();
        CreateMap<ReadPedidoDetalhado, ReadPedidoDto>();
    }
}
