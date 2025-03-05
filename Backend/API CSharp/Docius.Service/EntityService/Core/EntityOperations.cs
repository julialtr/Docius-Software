using Docius.Repository.Core;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Linq.Expressions;

namespace Docius.Service.EntityService.Core;

public abstract class EntityOperations<TEntity, TEntityTypeId, TFilter> : IEntityOperations<TEntity, TEntityTypeId, TFilter> where TFilter : FiltroBase<TEntityTypeId> where TEntity : EntityBase<TEntityTypeId>, new()
{
    protected DbContext DbContext { get; }
    public DbSet<TEntity> Entity => DbContext.Set<TEntity>();

    protected EntityOperations(DbContext dbContext)
    {
        DbContext = dbContext;
    }

    public async Task<TEntity> CreateAsync(TEntity entity)
    {
        ValidateEntity(entity);

        try
        {
            await Entity.AddAsync(entity);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao gravar a entidade {Entity.GetType().Name}.");
        }

        return entity;
    }

    public async Task<IEnumerable<TEntity>> CreateRangeAsync(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
            ValidateEntity(entity);

        try
        {
            await Entity.AddRangeAsync(entities);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao gravar a entidade {Entity.GetType().Name}.");
        }

        return entities;
    }

    public TEntity Read(TEntityTypeId id)
    {
        return Entity.Find(id);
    }

    public async Task<TEntity> ReadAsync(TEntityTypeId id)
    {
        return await Entity.FindAsync(id);
    }

    public async Task UpdateAsync(TEntity entity)
    {
        ValidateEntity(entity);

        try
        {
            Entity.Update(entity);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao atualizar a entidade {Entity.GetType().Name}.");
        }
    }

    public async Task UpdateRangeAsync(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
            ValidateEntity(entity);

        try
        {
            Entity.UpdateRange(entities);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao atualizar a entidade {Entity.GetType().Name}.");
        }
    }

    public async Task DeleteAsync(TEntity entity)
    {
        try
        {
            Entity.Remove(entity);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao remover um registro da entidade {Entity.GetType().Name}.");
        }
    }

    public async Task DeleteAsync(TEntityTypeId id)
    {
        await DeleteAsync(new TEntity { Id = id });
    }

    public async Task DeleteRangeAsync(IEnumerable<TEntity> entities)
    {
        try
        {
            Entity.RemoveRange(entities);
            await DbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new Exception($"Erro ao remover um registro da entidade {Entity.GetType().Name}.");
        }
    }

    public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> expression, bool withAsNoTracking = true)
    {
        if (withAsNoTracking)
            return Entity.AsNoTracking().Where(expression);

        return Entity.Where(expression);
    }

    public IQueryable<TEntity> Find(TFilter filter)
    {
        if (filter is null)
            return Entity;

        var query = Entity.AsQueryable();

        if (filter.Ids is not null && filter.Ids.Any())
            query = query.Where(q => filter.Ids.Contains(q.Id));
        else
            OnCreateQuery(ref query, filter);

        return query;
    }

    public void ValidateId(TEntityTypeId id, string emptyIdMessage = "", string invalidIdMessage = "")
    {
        bool isEmpty = false;

        if (id is Guid idGuid)
        {
            if (idGuid == Guid.Empty)
                isEmpty = true;
        }
        else if (id is int idInt)
        {
            if (idInt == 0)
                isEmpty = true;
        }
        else
        {
            throw new Exception($"Não foi possível identificar o tipo do ID de {typeof(TEntity).Name}.");
        }

        if (isEmpty)
            throw new WarningException(string.IsNullOrEmpty(emptyIdMessage) ? $"O ID de {typeof(TEntity).Name} não foi informado." : emptyIdMessage);
        
        var invalid = Entity.Where(e => e.Id.Equals(id)).Any() == false;

        if (invalid)
            throw new WarningException(string.IsNullOrEmpty(invalidIdMessage) ? $"O ID de {typeof(TEntity).Name} informado é inválido." : invalidIdMessage);
    }

    private void ValidateEntity(TEntity entity)
    {
        if (entity == null)
            throw new WarningException("A entidade está nula.");

        OnValidateEntity(entity);
    }

    protected abstract void OnValidateEntity(TEntity entity);

    protected abstract void OnCreateQuery(ref IQueryable<TEntity> query, TFilter filter);
}
