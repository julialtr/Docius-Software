using Docius.API.Dtos.V1;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfilePrecificacao: ProfileBase
{
    public ProfilePrecificacao()
    {
        CreateMap<PrecificacaoFiltroDto, PrecificacaoFiltro>();
        CreateMap<UpdatePrecificacaoDto, Precificacao>();

        CreateMap<PrecificacaoDetalhada, ReadPrecificacaoDto>();
    }
}
