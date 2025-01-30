using Docius.Repository.Core;
using Microsoft.EntityFrameworkCore;

namespace Docius.Service.EntityService.Core;

public abstract class EntityServiceBase<TEntityService, TEntity, TEntityTypeId, TFilter> : EntityOperations<TEntity, TEntityTypeId, TFilter>
    where TEntity : EntityBase<TEntityTypeId>, new()
    where TFilter : FiltroBase<TEntityTypeId>, new()
{
    protected TEntityService EntityService { get; private set; }

    protected EntityServiceBase(TEntityService entityService, DbContext dbContext) : base(dbContext)
    {
        EntityService = entityService;
    }
}
