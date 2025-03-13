using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PrecificacaoConfiguration : IEntityTypeConfiguration<Precificacao>
{
    public void Configure(EntityTypeBuilder<Precificacao> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.ValorInsumos).IsRequired();
        builder.Property(entity => entity.ValorSalario).IsRequired();
        builder.Property(entity => entity.QtdHorasMensais).IsRequired();

        builder.Property(entity => entity.QtdMesesConsiderarGastos).HasDefaultValue(6);

        builder.HasOne(entity => entity.Receita)
            .WithOne(entity => entity.Precificacao)
            .HasForeignKey<Precificacao>(entity => entity.ReceitaId)
            .IsRequired();
    }
}
