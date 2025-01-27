using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class IngredienteConfiguration : IEntityTypeConfiguration<Ingrediente>
{
    public void Configure(EntityTypeBuilder<Ingrediente> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Marca).IsRequired();
        builder.Property(entity => entity.Preco).IsRequired();
        builder.Property(entity => entity.Quantidade).IsRequired();
        builder.Property(entity => entity.Medida).IsRequired();
        builder.Property(entity => entity.UnidadeMedidaId).IsRequired();
        builder.Property(entity => entity.CategoriaIngredienteId).IsRequired();

        builder.HasOne(entity => entity.UnidadeMedida)
            .WithMany()
            .HasForeignKey(entity => entity.UnidadeMedidaId);

        builder.HasOne(entity => entity.Fornecedor)
            .WithMany()
            .HasForeignKey(entity => entity.FornecedorId);

        builder.HasOne(entity => entity.CategoriaIngrediente)
            .WithMany()
            .HasForeignKey(entity => entity.CategoriaIngredienteId);
    }
}
