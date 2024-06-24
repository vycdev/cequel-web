using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models;

public class tblExercise_User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? CompletedDate { get; set; }
    public string Code { get; set; }
    public string ExecutionTime { get; set; }
    public int idExercise { get; set; }
    public int idUser { get; set; }

    [ForeignKey(nameof(idExercise))]
    public tblExercise tblExercise { get; set; }
    
    [ForeignKey(nameof(idUser))]
    public tblUser tblUser { get; set; }
}
