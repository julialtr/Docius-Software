using Docius.Repository.EinBiss.Entities.Models;
using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class DecoracaoBoloPedidoConfiguration : IEntityTypeConfiguration<DecoracaoBoloPedido>
{
    public void Configure(EntityTypeBuilder<DecoracaoBoloPedido> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Foto).IsRequired();
    }
}
