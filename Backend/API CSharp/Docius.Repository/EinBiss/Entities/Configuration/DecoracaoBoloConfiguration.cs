using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class DecoracaoBoloConfiguration : IEntityTypeConfiguration<DecoracaoBolo>
{
    public void Configure(EntityTypeBuilder<DecoracaoBolo> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Foto).IsRequired();
    }
}
