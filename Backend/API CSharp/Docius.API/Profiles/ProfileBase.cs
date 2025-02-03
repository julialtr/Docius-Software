using AutoMapper;

namespace Docius.API.Profiles;

public abstract class ProfileBase : Profile
{
    public ProfileBase()
    {
        AllowNullCollections = true;

        CreateMap<int?, int>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<uint?, uint>().ConvertUsing((src, dest) => src ?? dest);

        CreateMap<long?, long>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<ulong?, ulong>().ConvertUsing((src, dest) => src ?? dest);

        CreateMap<short?, short>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<ushort?, ushort>().ConvertUsing((src, dest) => src ?? dest);

        CreateMap<float?, float>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<double?, double>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<decimal?, decimal>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<char?, char>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<byte?, byte>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<bool?, bool>().ConvertUsing((src, dest) => src ?? dest);

        CreateMap<DateTime?, DateTime>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<DateOnly?, DateOnly>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<TimeOnly?, TimeOnly>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<Guid?, Guid>().ConvertUsing((src, dest) => src ?? dest);
    }
}
