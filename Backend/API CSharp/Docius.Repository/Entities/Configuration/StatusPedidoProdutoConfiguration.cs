using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class StatusPedidoProdutoConfiguration : IEntityTypeConfiguration<StatusPedidoProduto>
{
    public void Configure(EntityTypeBuilder<StatusPedidoProduto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
    }
}
