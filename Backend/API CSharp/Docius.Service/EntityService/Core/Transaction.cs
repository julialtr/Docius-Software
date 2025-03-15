using Microsoft.EntityFrameworkCore;

namespace Docius.Service.EntityService.Core;

public class Transaction
{
    public static T ExecuteTransaction<T>(DbContext dbContext, Func<T> func)
    {
        var executionStrategy = dbContext.Database.CreateExecutionStrategy();

        return executionStrategy.Execute(() =>
        {
            using (var transaction = dbContext.Database.BeginTransaction(System.Data.IsolationLevel.Serializable))
            {
                try
                {
                    T response = func();
                    transaction.Commit();

                    return response;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw new Exception("Erro ao executar transaction.");
                }
            }
        });
    }

    public static async Task<T> ExecuteTransactionAsync<T>(DbContext dbContext, Func<Task<T>> func)
    {
        var executionStrategy = dbContext.Database.CreateExecutionStrategy();

        return await executionStrategy.ExecuteAsync(async () =>
        {
            using (var transaction = dbContext.Database.BeginTransaction(System.Data.IsolationLevel.Serializable))
            {
                try
                {
                    T response = await func();
                    await transaction.CommitAsync();

                    return response;
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw new Exception("Erro ao executar transaction.");
                }
            }
        });
    }

    public static async Task ExecuteTransactionAsync(DbContext dbContext, Func<Task> func)
    {
        Func<Func<Task>, Func<Task<bool>>> convertToFuncTask = originalFunc => async () =>
        {
            await originalFunc();
            return true;
        };

        await ExecuteTransactionAsync(dbContext, convertToFuncTask(func));
    }
}
