using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models
{
    public class tblUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public DateTime? LockEndTime { get; set; }
        public DateTime? LastFailedLoginTime { get; set; }
        public int FailedLoginCount { get; set; }
        public int idUserType { get; set; }
        

        [ForeignKey(nameof(idUserType))]
        public tblUserType tblUserType { get; set; }
    }
}
