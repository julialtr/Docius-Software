using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfileUsuario: ProfileBase
{
    public ProfileUsuario()
    {
        CreateMap<UsuarioFiltroDto, UsuarioFiltro>();
        CreateMap<CreateUsuarioDto, Usuario>();
        CreateMap<Usuario, ReadUsuarioDto>();

        CreateMap<UsuarioPedidos, ReadUsuarioPedidosDto>();
    }
}
