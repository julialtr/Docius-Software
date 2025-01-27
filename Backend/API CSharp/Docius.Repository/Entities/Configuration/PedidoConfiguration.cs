using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
{
    public void Configure(EntityTypeBuilder<Pedido> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.DataHoraEntrega).IsRequired();
        builder.Property(entity => entity.UsuarioId).IsRequired();

        builder.Property(entity => entity.StatusPedidoId).HasDefaultValue(1);

        builder.HasOne(entity => entity.Usuario)
            .WithMany()
            .HasForeignKey(entity => entity.UsuarioId);

        builder.HasOne(entity => entity.StatusPedido)
            .WithMany()
            .HasForeignKey(entity => entity.StatusPedidoId);
    }
}
