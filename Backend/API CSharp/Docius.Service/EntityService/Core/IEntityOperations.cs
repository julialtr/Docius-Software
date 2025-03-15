using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Docius.Service.EntityService.Core;

public interface IEntityOperations<TEntity, TEntityTypeId, TFilter> where TEntity : class
{
    public Task<TEntity> CreateAsync(TEntity entity);

    public Task<IEnumerable<TEntity>> CreateRangeAsync(IEnumerable<TEntity> entities);

    public TEntity Read(TEntityTypeId id);

    public Task<TEntity> ReadAsync(TEntityTypeId id);

    public Task UpdateAsync(TEntity entity);

    public Task UpdateRangeAsync(IEnumerable<TEntity> entities);

    public Task DeleteAsync(TEntity entity);

    public Task DeleteAsync(TEntityTypeId id);

    public Task DeleteRangeAsync(IEnumerable<TEntity> entities);

    public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> expression, bool withAsNoTracking = true);

    public IQueryable<TEntity> Find(TFilter filter);

    public void ValidateId(TEntityTypeId id, string emptyIdMessage = "", string invalidIdMessage = "");

    public T ExecuteTransaction<T>(Func<T> func);

    public Task<T> ExecuteTransactionAsync<T>(Func<Task<T>> func);

    public Task ExecuteTransactionAsync(Func<Task> func);
}
