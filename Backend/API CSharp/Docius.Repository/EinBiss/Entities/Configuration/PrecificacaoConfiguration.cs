using Docius.Repository.EinBiss.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Docius.Repository.EinBiss.Entities.Configuration;

public class PrecificacaoConfiguration : IEntityTypeConfiguration<Precificacao>
{
    public void Configure(EntityTypeBuilder<Precificacao> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.HasOne(entity => entity.Receita)
            .WithOne(entity => entity.Precificacao)
            .HasForeignKey<Precificacao>(entity => entity.ReceitaId)
            .IsRequired();
    }
}
