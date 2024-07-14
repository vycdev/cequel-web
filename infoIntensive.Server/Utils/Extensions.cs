using System.Text;

namespace infoIntensive.Server.Utils;

public static class Extensions
{
    public static string ToUTF8String(this string value)
    {
        return Encoding.UTF8.GetString(Encoding.Default.GetBytes(value));
    }

    public static string RemoveNulls(this string value)
    {
        return value.Replace("\0", "");
    }

    public static T PickRandom<T>(this List<T> list)
    {
        return list[new Random().Next(0, list.Count)];
    }
}
