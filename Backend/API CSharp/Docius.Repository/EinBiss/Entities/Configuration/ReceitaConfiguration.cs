using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class ReceitaConfiguration : IEntityTypeConfiguration<Receita>
{
    public void Configure(EntityTypeBuilder<Receita> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.Nome).IsRequired();
        builder.Property(entity => entity.Tempo).IsRequired();

        builder.Property(entity => entity.QtdPorcoes).HasDefaultValue(1);

        builder.HasOne(entity => entity.Precificacao)
            .WithOne(entity => entity.Receita)
            .HasForeignKey<Receita>(entity => entity.PrecificacaoId)
            .IsRequired();
    }
}
