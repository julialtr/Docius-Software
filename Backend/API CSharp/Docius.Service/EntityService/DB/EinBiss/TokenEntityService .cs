using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class TokenEntityService : EntityServiceBase<EinBissEntityService, Token, int, TokenFiltro>
{
    public TokenEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Token> query, TokenFiltro filter)
    {
    }

    protected override void OnValidateEntity(Token entity)
    {
        if (DateTime.MinValue == entity.DataHoraExpiracao)
            throw new WarningException("Data/Hora de expiração deve ser informada.");

        if (entity.UsuarioId == 0)
            EntityService.Usuario.ValidateId(entity.UsuarioId, "Usuário deve ser informado.", "Usuário informado é inválido.");

        if (string.IsNullOrEmpty(entity.Codigo))
            throw new WarningException("Código deve ser informado.");
    }
}
