using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
{
    public void Configure(EntityTypeBuilder<Produto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.Preco).IsRequired();

        builder.HasOne(entity => entity.Receita)
            .WithMany()
            .HasForeignKey(entity => entity.ReceitaId)
            .IsRequired();

        builder.HasOne(entity => entity.CategoriaProduto)
            .WithMany()
            .HasForeignKey(entity => entity.CategoriaProdutoId)
            .IsRequired();
    }
}
