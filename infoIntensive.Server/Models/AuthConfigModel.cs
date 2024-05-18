namespace infoIntensive.Server.Models
{
    public class AuthConfigModel
    {
        public string AccessTokenSecret { get; set; } = string.Empty;
        public string AccessTokenExpirationMinutes { get; set; } = string.Empty;
        public string RefreshTokenSecret { get; set; } = string.Empty;
        public string RefreshTokenExpirationMinutes { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
    }
}
