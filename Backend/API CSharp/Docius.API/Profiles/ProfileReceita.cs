using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfileReceita: ProfileBase
{
    public ProfileReceita()
    {
        CreateMap<ReceitaFiltroDto, ReceitaFiltro>();
        CreateMap<Receita, ReadReceitaDto>();

        CreateMap<ReceitaProduto, ReadReceitaProdutoDto>();
    }
}
