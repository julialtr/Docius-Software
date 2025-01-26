using System.Text.RegularExpressions;

namespace Docius.API.Helpers;
public partial class KebabCaseParameterTransformer : IOutboundParameterTransformer
{
    private static readonly Regex _pascalToKebabCaseRegex = new Regex("(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z0-9])", RegexOptions.Compiled);

    public string TransformOutbound(object input)
    {
        string value = input?.ToString();
        if (string.IsNullOrEmpty(value))
            return value;

        return _pascalToKebabCaseRegex.Replace(value, "-$1").Trim().ToLower();
    }
}
