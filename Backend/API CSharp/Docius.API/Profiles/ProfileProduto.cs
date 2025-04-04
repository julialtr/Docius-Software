using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfileProduto: ProfileBase
{
    public ProfileProduto()
    {
        CreateMap<ProdutoFiltroDto, ProdutoFiltro>();
        CreateMap<CreateProdutoDto, Produto>();
        CreateMap<UpdateProdutoDto, Produto>();
        CreateMap<UpdateProdutoCardapioDto, Produto>();

        CreateMap<ProdutoDetalhado, ReadProdutoDto>();
        CreateMap<Produto, ReadProdutoDto>();
    }
}
