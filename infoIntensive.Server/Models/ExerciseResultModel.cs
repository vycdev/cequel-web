namespace infoIntensive.Server.Models;

public class ExerciseResultModel
{
    public bool Success { get; set; }
    public bool Completed { get; set; }
    public string Message { get; set; } = string.Empty;
    public InterpretResponseModel? Result { get; set; }
}
