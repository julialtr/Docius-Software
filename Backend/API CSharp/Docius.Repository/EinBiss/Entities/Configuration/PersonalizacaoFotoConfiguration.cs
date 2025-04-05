using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PersonalizacaoFotoConfiguration : IEntityTypeConfiguration<PersonalizacaoFoto>
{
    public void Configure(EntityTypeBuilder<PersonalizacaoFoto> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Foto).IsRequired();
        builder.Property(entity => entity.PersonalizacaoId).IsRequired();
    }
}
