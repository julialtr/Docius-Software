using Docius.API.Dtos.V1;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfilePedidoProduto : ProfileBase
{
    public ProfilePedidoProduto()
    {
        CreateMap<CreatePedidoProdutoDto, CreatePedidoProdutoDetalhado>();
        CreateMap<ReadPedidoProdutoDetalhado, ReadPedidoProdutoDto>();
    }
}
