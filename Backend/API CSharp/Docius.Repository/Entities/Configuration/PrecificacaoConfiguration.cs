using Docius.Repository.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.Entities.Configuration;

public class PrecificacaoConfiguration : IEntityTypeConfiguration<Precificacao>
{
    public void Configure(EntityTypeBuilder<Precificacao> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.ValorInsumos).IsRequired();
        builder.Property(entity => entity.ValorSalario).IsRequired();
        builder.Property(entity => entity.QtdHorasMensais).IsRequired();

        builder.Property(entity => entity.QtdMesesConsiderarGastos).HasDefaultValue(6);
    }
}
