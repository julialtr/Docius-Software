using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class DecoracaoBoloPedidoPersonalizacaoConfiguration : IEntityTypeConfiguration<DecoracaoBoloPedidoPersonalizacao>
{
    public void Configure(EntityTypeBuilder<DecoracaoBoloPedidoPersonalizacao> builder)
    {
        builder.HasKey(entity => entity.Id);
    }
}
