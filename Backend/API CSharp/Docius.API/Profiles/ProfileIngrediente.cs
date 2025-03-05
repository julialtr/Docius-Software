using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileIngrediente: ProfileBase
{
    public ProfileIngrediente()
    {
        CreateMap<IngredienteFiltroDto, IngredienteFiltro>();
        CreateMap<CreateIngredienteDto, Ingrediente>();
        CreateMap<UpdateIngredienteDto, Ingrediente>();
        CreateMap<Ingrediente, ReadIngredienteDto>();
    }
}
