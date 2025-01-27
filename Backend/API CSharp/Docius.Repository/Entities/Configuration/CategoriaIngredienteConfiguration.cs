using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class CategoriaIngredienteConfiguration : IEntityTypeConfiguration<CategoriaIngrediente>
{
    public void Configure(EntityTypeBuilder<CategoriaIngrediente> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
    }
}
