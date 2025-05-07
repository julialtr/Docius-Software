using Docius.Repository.ServicosTerceiros.Dados;

namespace Docius.API.Profiles;

public class ProfileChatbot: ProfileBase
{
    public ProfileChatbot()
    {
        CreateMap<CreateMensagemDto, CreateMensagem>();
        CreateMap<ReadMensagem, ReadMensagemDto>();
    }
}
