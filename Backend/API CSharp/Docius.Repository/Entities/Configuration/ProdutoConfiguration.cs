using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
{
    public void Configure(EntityTypeBuilder<Produto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.Preco).IsRequired();
        builder.Property(entity => entity.ReceitaId).IsRequired();
        builder.Property(entity => entity.CategoriaProdutoId).IsRequired();

        builder.HasOne(entity => entity.Receita)
            .WithMany()
            .HasForeignKey(entity => entity.ReceitaId);

        builder.HasOne(entity => entity.CategoriaProduto)
            .WithMany()
            .HasForeignKey(entity => entity.CategoriaProdutoId);
    }
}
