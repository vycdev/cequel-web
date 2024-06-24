using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models;

public class tblExercise_Variable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Value { get; set; }
    public int idExercise { get; set; }

    [ForeignKey(nameof(idExercise))]
    public tblExercise tblExercise { get; set; }
}
