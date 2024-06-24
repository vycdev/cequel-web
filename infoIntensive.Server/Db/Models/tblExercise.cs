using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models;

public class tblExercise
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; }
    public int Difficulty { get; set; }

    public string Description { get; set; }
    public string DefaultCode { get; set; }
}
