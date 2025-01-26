using System.Text.Json.Serialization;
using System.Text.Json;

namespace Docius.API.JsonConverters;

public sealed class NullableDateTimeJsonConverter : JsonConverter<DateTime?>
{
    public override DateTime? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string date = reader.GetString();
        if (string.IsNullOrWhiteSpace(date))
            return null;

        return DateParseHelper.ToDateTime(date);
    }

    public override void Write(Utf8JsonWriter writer, DateTime? value, JsonSerializerOptions options)
    {
        if (!value.HasValue)
        {
            writer.WriteNullValue();
            return;
        }

        string date = null;
        if (value.Value != DateTime.MinValue)
            date = value.Value.ToString("s");

        writer.WriteStringValue(date);
    }
}
