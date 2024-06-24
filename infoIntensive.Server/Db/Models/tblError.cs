using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models;

public class tblError
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Message { get; set; }
    public string StackTrace { get; set; }
    public DateTime InsertDate { get; set; }
    public int? idUser { get; set; }
    public string? Extra1 { get; set; } 
    public string? Extra2 { get; set; } 
    public string? Extra3 { get; set; }
}
