using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Docius.Repository;

public class EinBissContext : DbContext
{
    public EinBissContext(DbContextOptions<EinBissContext> opts) : base(opts)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
