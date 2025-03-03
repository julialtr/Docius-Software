using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileFornecedor: ProfileBase
{
    public ProfileFornecedor()
    {
        CreateMap<FornecedorFiltroDto, FornecedorFiltro>();
        CreateMap<CreateFornecedorDto, Fornecedor>();
        CreateMap<UpdateFornecedorDto, Fornecedor>();
        CreateMap<Fornecedor, ReadFornecedorDto>();
        
        CreateMap<FornecedorIngredientes, ReadFornecedorDto>();

        CreateMap<Fornecedor, ReadFornecedorIngredientesDto>();
    }
}
