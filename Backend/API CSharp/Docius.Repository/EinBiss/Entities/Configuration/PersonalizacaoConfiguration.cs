using Docius.Repository.EinBiss.Entities.Models;
using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PersonalizacaoConfiguration : IEntityTypeConfiguration<Personalizacao>
{
    public void Configure(EntityTypeBuilder<Personalizacao> builder)
    {
        builder.HasKey(entity => entity.Id);
    }
}
