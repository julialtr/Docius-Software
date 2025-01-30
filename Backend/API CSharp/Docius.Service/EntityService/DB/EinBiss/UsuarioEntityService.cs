using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class UsuarioEntityService : EntityServiceBase<EinBissEntityService, Usuario, int, UsuarioFiltro>
{
    public UsuarioEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Usuario> query, UsuarioFiltro filter)
    {
    }

    protected override void OnValidateEntity(Usuario entity)
    {
        if (string.IsNullOrEmpty(entity.Login))
            throw new WarningException("O campo Login deve ser informado.");

        if (string.IsNullOrEmpty(entity.Senha))
            throw new WarningException("O campo Senha deve ser informado.");

        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("O campo Nome deve ser informado.");

        if (string.IsNullOrEmpty(entity.Email))
            throw new WarningException("O campo Email deve ser informado.");

        if (entity.TipoUsuarioId != 0)
            ValidateId(entity.TipoUsuarioId, "O campo TipoUsuarioId deve ser informado.", "O campo TipoUsuarioId informado é inválido.");

        if (Where(e => (e.Id != entity.Id && (e.Login == entity.Login || e.Email == entity.Email))).Any())
            throw new WarningException("Usuário já cadastrado. Faça o login para acessar o sistema.");
    }
}
