using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Docius.Repository.Docius;

public class DociusContext : DbContext
{
    public DociusContext(DbContextOptions<DociusContext> opts) : base(opts)
    {
    }

    public virtual DbSet<Empresa> Empresas { get; set; }
}
