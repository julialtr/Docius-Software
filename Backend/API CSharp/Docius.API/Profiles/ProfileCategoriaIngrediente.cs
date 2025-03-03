using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfileCategoriaIngrediente: ProfileBase
{
    public ProfileCategoriaIngrediente()
    {
        CreateMap<CategoriaIngredienteFiltroDto, CategoriaIngredienteFiltro>();
        CreateMap<CreateCategoriaIngredienteDto, CategoriaIngrediente>();
        CreateMap<UpdateCategoriaIngredienteDto, CategoriaIngrediente>();

        CreateMap<CategoriaIngredienteIngredientes, ReadCategoriaIngredienteDto>();
    }
}
