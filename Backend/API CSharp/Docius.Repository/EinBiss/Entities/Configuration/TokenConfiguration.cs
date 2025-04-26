using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class TokenConfiguration : IEntityTypeConfiguration<Token>
{
    public void Configure(EntityTypeBuilder<Token> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Codigo).IsRequired();
        builder.Property(entity => entity.DataHoraExpiracao).IsRequired();
        builder.Property(entity => entity.UsuarioId).IsRequired();

        builder.HasOne(entity => entity.Usuario)
            .WithMany()
            .HasForeignKey(entity => entity.UsuarioId)
            .IsRequired();
    }
}
