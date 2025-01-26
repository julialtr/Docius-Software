using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Docius.Repository;

public class DociusContext : DbContext
{
    public DociusContext(DbContextOptions<DociusContext> opts) : base(opts)
    {
    }

    public virtual DbSet<Empresa> Empresas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
