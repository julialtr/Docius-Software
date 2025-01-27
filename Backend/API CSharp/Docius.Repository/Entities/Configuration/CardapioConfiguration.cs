using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class CardapioConfiguration : IEntityTypeConfiguration<Cardapio>
{
    public void Configure(EntityTypeBuilder<Cardapio> builder)
    {
        builder.HasKey(entity => entity.Id);
    }
}
