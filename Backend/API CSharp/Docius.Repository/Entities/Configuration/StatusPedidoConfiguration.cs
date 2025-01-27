using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class StatusPedidoConfiguration : IEntityTypeConfiguration<StatusPedido>
{
    public void Configure(EntityTypeBuilder<StatusPedido> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
    }
}
