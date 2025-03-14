using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfileReceitaCategoriaIngrediente : ProfileBase
{
    public ProfileReceitaCategoriaIngrediente()
    {
        CreateMap<CreateReceitaCategoriaIngredienteDto, ReceitaCategoriaIngrediente>();
        CreateMap<UpdateReceitaCategoriaIngredienteDto, ReceitaCategoriaIngrediente>();

        CreateMap<ReadReceitaCategoriaIngredienteDto, ReceitaCategoriaIngredienteDetalhada>();
        CreateMap<ReceitaCategoriaIngredienteDetalhada, ReadReceitaCategoriaIngredienteDto>();
    }
}
