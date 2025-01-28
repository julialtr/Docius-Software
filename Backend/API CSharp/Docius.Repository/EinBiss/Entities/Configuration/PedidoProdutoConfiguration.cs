using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PedidoProdutoConfiguration : IEntityTypeConfiguration<PedidoProduto>
{
    public void Configure(EntityTypeBuilder<PedidoProduto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Quantidade).IsRequired();
        builder.Property(entity => entity.PedidoId).IsRequired();
        builder.Property(entity => entity.ProdutoId).IsRequired();

        builder.Property(entity => entity.StatusPedidoProdutoId).HasDefaultValue(1);

        builder.HasOne(entity => entity.StatusPedidoProduto)
            .WithMany()
            .HasForeignKey(entity => entity.StatusPedidoProdutoId);

        builder.HasOne(entity => entity.Personalizacao)
            .WithOne()
            .HasForeignKey<PedidoProduto>(entity => entity.PersonalizacaoId);
    }
}
