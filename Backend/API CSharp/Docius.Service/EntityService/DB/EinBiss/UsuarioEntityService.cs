using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class UsuarioEntityService : EntityServiceBase<EinBissEntityService, Usuario, int, UsuarioFiltro>
{
    public UsuarioEntityService(EinBissEntityService service, EinBissContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Usuario> query, UsuarioFiltro filter)
    {
        if (!string.IsNullOrEmpty(filter.Email))
            query = query.Where(q => q.Email == filter.Email);

        if (!string.IsNullOrEmpty(filter.Senha))
            query = query.Where(q => q.Senha == filter.Senha);
    }

    protected override void OnValidateEntity(Usuario entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (string.IsNullOrEmpty(entity.Email))
            throw new WarningException("Email deve ser informado.");
        
        if (string.IsNullOrEmpty(entity.Senha))
            throw new WarningException("Senha deve ser informada.");

        if (entity.TipoUsuarioId == 0)
            EntityService.TipoUsuario.ValidateId(entity.TipoUsuarioId, "Tipo de usuário deve ser informado.", "Tipo de usuário informado é inválido.");

        if (Where(e => (e.Id != entity.Id && e.Email == entity.Email)).Any())
            throw new WarningException("Usuário já cadastrado. Faça o login para acessar o sistema.");
    }

    public List<UsuarioPedidos> LePedidosUsuarios()
    {
        var usuarios = EntityService.Usuario.Entity
            .Where(usuario => usuario.TipoUsuarioId == (int)ETipoUsuario.Cliente)
            .Select(usuario => new UsuarioPedidos
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                QtdPedidos = usuario.Pedido.Count()
            });

        return usuarios.ToList();
    }
}
