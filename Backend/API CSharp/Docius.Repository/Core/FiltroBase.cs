namespace Docius.Repository.Core;

public abstract class FiltroBase<TEntityTypeId>
{
    public TEntityTypeId[] Ids { get; set; }
}
