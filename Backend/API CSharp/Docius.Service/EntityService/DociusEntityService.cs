using Docius.Repository.Docius;
using Docius.Service.EntityService.DB.Docius;

namespace Docius.Service.EntityService;

public sealed class DociusEntityService
{
    private readonly Lazy<EmpresaEntityService> _entityServiceEmpresa;

    public EmpresaEntityService Empresa => _entityServiceEmpresa.Value;

    public DociusEntityService(DociusEntityService service, DociusContext context)
    {
        _entityServiceEmpresa = new(() => new EmpresaEntityService(service, context));
    }
}
