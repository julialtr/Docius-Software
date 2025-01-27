using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Login).IsRequired();
        builder.Property(entity => entity.Senha).IsRequired();
        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.Email).IsRequired();

        builder.HasIndex(entity => entity.Login).IsUnique();
        builder.HasIndex(entity => entity.Email).IsUnique();

        builder.Property(entity => entity.TipoUsuarioId).HasDefaultValue(1);

        builder.HasOne(entity => entity.TipoUsuario)
            .WithMany()
            .HasForeignKey(entity => entity.TipoUsuarioId);
    }
}
