using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace infoIntensive.Server.Db.Models
{
    public class tblLoginLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserAgent { get; set; }
        public string IpAddress { get; set; }
        public bool Success { get; set; }
        public DateTime Date { get; set; }
        public int idUser { get; set; }

        [ForeignKey(nameof(idUser))]
        public tblUser tblUser { get; set; }
    }
}
