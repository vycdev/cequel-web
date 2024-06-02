namespace infoIntensive.Server.Models;

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
}
