using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace infoIntensive.Server.Db.Models
{
    public class tblToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Token { get; set; }
        public int idTokenType { get; set; }
        public int idUser { get; set; }
        

        [ForeignKey(nameof(idTokenType))]
        public tblTokenType tblTokenType { get; set; }
        [ForeignKey(nameof(idUser))]
        public tblUser tblUser { get; set; }

    }
}
