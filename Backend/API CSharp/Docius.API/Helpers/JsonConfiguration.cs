using System.Text.Json.Serialization;
using System.Text.Json;
using Docius.API.JsonConverters;

namespace Docius.API.Helpers;

public static class JsonConfiguration
{
    public static JsonSerializerOptions ConfigureJson(this JsonSerializerOptions options)
    {
        options.Converters.Add(new NullableDateTimeJsonConverter());
        options.Converters.Add(new JsonStringEnumConverter());

        return options;
    }
}
