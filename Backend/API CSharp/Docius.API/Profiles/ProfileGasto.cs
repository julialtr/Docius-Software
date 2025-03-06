using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileGasto: ProfileBase
{
    public ProfileGasto()
    {
        CreateMap<GastoFiltroDto, GastoFiltro>();
        CreateMap<CreateGastoDto, Gasto>();
        CreateMap<UpdateGastoDto, Gasto>();
        CreateMap<Gasto, ReadGastoDto>();
    }
}
