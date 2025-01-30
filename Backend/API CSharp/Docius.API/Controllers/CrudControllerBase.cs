using AutoMapper;
using Docius.Repository.Core;
using Docius.Service.EntityService.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Docius.API.Controllers;

public abstract class CrudControllerBase<TEntityService, TEntity, TEntityTypeId, TFilter> : ControllerBase
    where TEntity : EntityBase<TEntityTypeId>
    where TEntityService : IEntityOperations<TEntity, TEntityTypeId, TFilter>
{
    protected TEntityService EntityService { get; set; }

    public CrudControllerBase(IMapper mapper) : base(mapper)
    {
    }

    protected async Task<IActionResult> Create<TCreateDto, TReadDto>(TCreateDto[] vecDataDto)
    {
        var vecData = Mapper.Map<TEntity[]>(vecDataDto);
        var createdEntities = await EntityService.CreateRangeAsync(vecData);
        var vecReadDto = Mapper.Map<TReadDto[]>(createdEntities);

        return StatusCode(StatusCodes.Status201Created, vecReadDto);
    }

    protected async Task<IActionResult> Read<TDataDto>(TEntityTypeId id)
    {
        TEntity data = await EntityService.ReadAsync(id);
        if (data == null)
            return NotFound();

        var dataDto = Mapper.Map<TDataDto>(data);
        return Ok(dataDto);
    }

    protected async Task<IActionResult> Update<TDataDto>(TEntityTypeId id, TDataDto dataDto)
    {
        TEntity data = await EntityService.ReadAsync(id);
        if (data == null)
            return NotFound();

        Mapper.Map(dataDto, data);
        await EntityService.UpdateAsync(data);

        return NoContent();
    }

    protected async Task<IActionResult> Delete(TEntityTypeId id)
    {
        TEntity data = await EntityService.ReadAsync(id);
        if (data == null)
            return NotFound();

        await EntityService.DeleteAsync(data);
        return NoContent();
    }

    protected IActionResult Find<TFilterDto>(TFilterDto filterDto)
    {
        TFilter filter = Mapper.Map<TFilter>(filterDto);

        var findResult = EntityService.Find(filter);

        if (findResult == null || !findResult.Any())
            return NoContent();

        return Ok(findResult);
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        OnSetEntityService();
    }

    protected abstract void OnSetEntityService();
}
