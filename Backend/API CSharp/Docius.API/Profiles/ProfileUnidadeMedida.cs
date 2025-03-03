using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileUnidadeMedida: ProfileBase
{
    public ProfileUnidadeMedida()
    {
        CreateMap<UnidadeMedida, ReadUnidadeMedidaDto>();
    }
}
