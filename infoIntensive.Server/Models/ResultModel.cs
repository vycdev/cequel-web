namespace infoIntensive.Server.Models
{
    public class ResultModel
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object Result { get; set; } = string.Empty;
    }
}
