using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Repository.EinBiss.Entities.Models;

public abstract class EntityBase<TEntityTypeId>
{
    [Key]
    [Column("id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public TEntityTypeId Id { get; set; }
}
