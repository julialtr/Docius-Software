using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileUsuario: ProfileBase
{
    public ProfileUsuario()
    {
        CreateMap<UsuarioFiltroDto, UsuarioFiltro>();
    }
}
