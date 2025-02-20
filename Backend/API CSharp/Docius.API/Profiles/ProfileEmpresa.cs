using Docius.Repository.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileEmpresa: ProfileBase
{
    public ProfileEmpresa()
    {
        CreateMap<EmpresaFiltroDto, EmpresaFiltro>();
        CreateMap<Empresa, ReadEmpresaDto>();
    }
}
