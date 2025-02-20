using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class EmpresaConfiguration : IEntityTypeConfiguration<Empresa>
{
    public void Configure(EntityTypeBuilder<Empresa> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.CaminhoLogo).IsRequired();
        builder.Property(entity => entity.CaminhoImagem1).IsRequired();
        builder.Property(entity => entity.CaminhoImagem2).IsRequired();
        builder.Property(entity => entity.Dominio).IsRequired();
    }
}
