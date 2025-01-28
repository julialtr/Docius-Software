using Docius.Repository.EinBiss.Entities.Models;
using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class TipoUsuarioConfiguration : IEntityTypeConfiguration<TipoUsuario>
{
    public void Configure(EntityTypeBuilder<TipoUsuario> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
    }
}
