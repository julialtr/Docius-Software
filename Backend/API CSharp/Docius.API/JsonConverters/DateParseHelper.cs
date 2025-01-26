using System.Globalization;

namespace Docius.API.JsonConverters;

public static class DateParseHelper
{
    private static readonly string[] _invalidFormats = { "HH:mm:ss", "HH:mm" };

    public static DateTime ToDateTime(string dateTime)
    {
        DateTime result;

        if (DateTime.TryParseExact(dateTime, _invalidFormats, CultureInfo.InvariantCulture, DateTimeStyles.None, out result))
            throw new Exception($"A data/hora informada '{dateTime}' é inválida.");

        if (!DateTime.TryParse(dateTime, out result))
            throw new Exception($"A data/hora informada '{dateTime}' é inválida.");

        return result;
    }
}
