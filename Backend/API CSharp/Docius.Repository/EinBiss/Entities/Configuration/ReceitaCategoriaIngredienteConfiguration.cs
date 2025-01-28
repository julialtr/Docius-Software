using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class ReceitaCategoriaIngredienteConfiguration : IEntityTypeConfiguration<ReceitaCategoriaIngrediente>
{
    public void Configure(EntityTypeBuilder<ReceitaCategoriaIngrediente> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Medida).IsRequired();
        builder.Property(entity => entity.ReceitaId).IsRequired();
        builder.Property(entity => entity.CategoriaIngredienteId).IsRequired();

        builder.HasOne(entity => entity.UnidadeMedida)
            .WithMany()
            .HasForeignKey(entity => entity.UnidadeMedidaId)
            .IsRequired();
    }
}
