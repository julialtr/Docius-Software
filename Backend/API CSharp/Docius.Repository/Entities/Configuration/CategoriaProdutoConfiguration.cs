using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class CategoriaProdutoConfiguration : IEntityTypeConfiguration<CategoriaProduto>
{
    public void Configure(EntityTypeBuilder<CategoriaProduto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.CardapioId).IsRequired();

        builder.HasOne(entity => entity.Cardapio)
            .WithMany()
            .HasForeignKey(entity => entity.CardapioId);

        builder.HasOne(entity => entity.CategoriaProdutoSuperior)
            .WithMany()
            .HasForeignKey(entity => entity.CategoriaProdutoSuperiorId);
    }
}
