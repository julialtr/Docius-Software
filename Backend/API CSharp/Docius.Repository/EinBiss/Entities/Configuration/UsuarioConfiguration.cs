using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.Email).IsRequired();
        builder.Property(entity => entity.Senha).IsRequired();

        builder.HasIndex(entity => entity.Email).IsUnique();

        builder.Property(entity => entity.TipoUsuarioId).HasDefaultValue(ETipoUsuario.Cliente);

        builder.HasOne(entity => entity.TipoUsuario)
            .WithMany()
            .HasForeignKey(entity => entity.TipoUsuarioId);
    }
}
