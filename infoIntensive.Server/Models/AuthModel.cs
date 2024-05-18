using System.ComponentModel.DataAnnotations;

namespace infoIntensive.Server.Models
{
    public class AuthModel
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
