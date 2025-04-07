using Docius.Repository.Docius;
using Docius.Repository.Entities.Models;
using Docius.Service.EntityService.Core;
using System.ComponentModel;

namespace Docius.Service.EntityService.DB.Docius;

public sealed class EmpresaEntityService : EntityServiceBase<DociusEntityService, Empresa, int, EmpresaFiltro>
{
    public EmpresaEntityService(DociusEntityService service, DociusContext context) : base(service, context)
    {
    }

    protected override void OnCreateQuery(ref IQueryable<Empresa> query, EmpresaFiltro filter)
    {
        if (!string.IsNullOrEmpty(filter.Dominio))
            query = query.Where(q => q.Dominio == filter.Dominio);
    }

    protected override void OnValidateEntity(Empresa entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (string.IsNullOrEmpty(entity.ChavePix))
            throw new WarningException("Chave Pix deve ser informada.");

        if (string.IsNullOrEmpty(entity.Cidade))
            throw new WarningException("Cidade deve ser informada.");

        if (string.IsNullOrEmpty(entity.CaminhoLogo))
            throw new WarningException("Caminho da logo deve ser informada.");

        if (string.IsNullOrEmpty(entity.CaminhoImagem1))
            throw new WarningException("Caminho da primeira imagem deve ser informado.");

        if (string.IsNullOrEmpty(entity.CaminhoImagem2))
            throw new WarningException("Caminho da segunda imagem deve ser informado.");

        if (string.IsNullOrEmpty(entity.Dominio))
            throw new WarningException("Domínio deve ser informado.");
    }
}
