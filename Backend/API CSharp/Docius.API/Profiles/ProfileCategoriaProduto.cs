using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileCategoriaProduto : ProfileBase
{
    public ProfileCategoriaProduto()
    {
        CreateMap<UpdateCategoriaProdutoDto, CategoriaProduto>();
        CreateMap<CategoriaProduto, ReadCategoriaProdutoDto>();
    }
}
