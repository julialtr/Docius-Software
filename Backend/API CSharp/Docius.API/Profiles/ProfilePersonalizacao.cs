using Docius.API.Dtos.V1;
using Docius.Service.EntityService.Data;

namespace Docius.API.Profiles;

public class ProfilePersonalizacao : ProfileBase
{
    public ProfilePersonalizacao()
    {
        CreateMap<CreatePersonalizacaoDto, PersonalizacaoDetalhado>();
        CreateMap<PersonalizacaoDetalhado, ReadPersonalizacaoDto>();
    }
}
