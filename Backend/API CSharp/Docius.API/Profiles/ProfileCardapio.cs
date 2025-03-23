using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;

namespace Docius.API.Profiles;

public class ProfileCardapio: ProfileBase
{
    public ProfileCardapio()
    {
        CreateMap<CardapioFiltroDto, CardapioFiltro>();
        CreateMap<UpdateCardapioDto, Cardapio>();
        CreateMap<Cardapio, ReadCardapioDto>();
    }
}
