using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfilePrecificacaoIngrediente: ProfileBase
{
    public ProfilePrecificacaoIngrediente()
    {
        CreateMap<UpdatePrecificacaoIngredienteDto, PrecificacaoIngrediente>();
        CreateMap<PrecificacaoIngrediente, ReadPrecificacaoIngredienteDto>();
    }
}
