using infoIntensive.Server.Db.Models;

namespace infoIntensive.Server.Models;

public class ExerciseViewModel
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Difficulty { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DefaultCode { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
    public DateTime? CompletionDate { get; set; }
}
