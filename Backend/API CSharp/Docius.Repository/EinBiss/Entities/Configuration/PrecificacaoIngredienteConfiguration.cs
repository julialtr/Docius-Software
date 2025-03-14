using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PrecificacaoIngredienteConfiguration : IEntityTypeConfiguration<PrecificacaoIngrediente>
{
    public void Configure(EntityTypeBuilder<PrecificacaoIngrediente> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.HasOne(entity => entity.Precificacao)
            .WithMany()
            .HasForeignKey(entity => entity.PrecificacaoId)
            .IsRequired();

        builder.HasOne(entity => entity.Ingrediente)
            .WithMany()
            .HasForeignKey(entity => entity.IngredienteId)
            .IsRequired();
    }
}
