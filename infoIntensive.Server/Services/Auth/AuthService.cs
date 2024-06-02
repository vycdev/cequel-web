using CryptoHelper;
using infoIntensive.Server.Db;
using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;
using infoIntensive.Server.Models.Enums;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace infoIntensive.Server.Services.Auth
{
    public class AuthService
    {
        AppDbContext db;
        AuthConfigModel authConfig;
        HttpContext httpContext;

        public AuthService(AppDbContext db, IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            this.db = db;
            this.httpContext = httpContextAccessor.HttpContext;

            authConfig = new()
            {
                AccessTokenSecret = config["Authentication:AccessTokenSecret"],
                AccessTokenExpirationMinutes = config["Authentication:AccessTokenExpirationMinutes"],
                RefreshTokenSecret = config["Authentication:RefreshTokenSecret"],
                RefreshTokenExpirationMinutes = config["Authentication:RefreshTokenExpirationMinutes"],
                Issuer = config["Authentication:Issuer"],
            };
        }

        public AuthResponseModel Login(AuthModel model)
        {
            try
            {
                var user = db.tblUsers.FirstOrDefault(u => (u.UserName.ToLower() == model.Username.ToLower() || u.Email.ToLower() == model.Username.ToLower()) && u.Active)
                    ?? throw new ValidationException("Invalid password or username.");

                if (user.LockEndTime != null && user.LockEndTime > DateTime.UtcNow)
                    throw new ValidationException("Too many attempts, please wait before trying again.");

                bool passwordResult = Crypto.VerifyHashedPassword(user.Password, model.Password);

                if (!passwordResult)
                {
                    if (user.LastFailedLoginTime != null)
                    {
                        if (((DateTime)user.LastFailedLoginTime).AddMinutes(5) > DateTime.UtcNow)
                            user.FailedLoginCount++;
                        else
                        {
                            user.FailedLoginCount = 1;
                            user.LastFailedLoginTime = DateTime.UtcNow;
                        }
                    }
                    else
                    {
                        user.FailedLoginCount = 1;
                        user.LastFailedLoginTime = DateTime.UtcNow;
                    }

                    if (user.FailedLoginCount >= 5)
                    {
                        user.LockEndTime = DateTime.UtcNow.AddMinutes(5);
                    }

                    db.Add(new tblLoginLog
                    {
                        idUser = user.Id,
                        Success = false,
                        Date = DateTime.UtcNow,
                        UserAgent = httpContext.Request.Headers["User-Agent"].ToString(),
                        IpAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
                    });

                    db.SaveChanges();

                    throw new ValidationException("Invalid password or username.");
                }

                db.Add(new tblLoginLog
                {
                    idUser = user.Id,
                    Success = true,
                    Date = DateTime.UtcNow,
                    UserAgent = httpContext.Request.Headers["User-Agent"].ToString(),
                    IpAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
                });

                db.SaveChanges();

                return Authenticate(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public AuthResponseModel? ValidateRefreshToken(string token)
        {
            try
            {
                if(!ValidateToken(token))
                    return null;

                var dbToken = db.tblTokens.FirstOrDefault(t => t.Token == token);
                if (dbToken == null)
                    return null;

                var user = db.tblUsers.Find(dbToken.idUser);
                if (user == null)
                    return null;

                return Authenticate(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void LogOut(int userId)
        {
            try
            {
                db.tblTokens.Where(t => t.idUser == userId && t.idTokenType == (int)TokenTypes.Refresh).ExecuteDelete();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public AuthResponseModel Register(AuthModel model)
        {
            try
            {
                var userName = db.tblUsers.FirstOrDefault(u => u.UserName.ToLower() == model.Username.ToLower());
                var userEmail = db.tblUsers.FirstOrDefault(u => u.Email.ToLower() == model.Email.ToLower());

                if (userName != null)
                    throw new ValidationException("Username is already used.");

                if (userEmail != null)
                    throw new ValidationException("Email is already used.");

                var user = new tblUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                    Password = Crypto.HashPassword(model.Password),
                    idUserType = (int)UserTypes.Student,
                    Active = true,
                    FailedLoginCount = 0,
                    LastFailedLoginTime = null,
                    LockEndTime = null,
                };

                db.Add(user);

                db.SaveChanges();

                db.Add(new tblLoginLog
                {
                    idUser = user.Id,
                    Success = true,
                    Date = DateTime.UtcNow,
                    UserAgent = httpContext.Request.Headers["User-Agent"].ToString(),
                    IpAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
                });

                db.SaveChanges();

                return Authenticate(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private AuthResponseModel Authenticate(tblUser user)
        {
            try
            {
                string accessToken = GenerateAccessToken(user);
                string refreshToken = GenerateRefreshToken();
                db.tblTokens.Where(t => t.idUser == user.Id && t.idTokenType == (int)TokenTypes.Refresh).ExecuteDelete();

                db.Add(new tblToken
                {
                    idTokenType = (int)TokenTypes.Refresh,
                    idUser = user.Id,
                    Token = refreshToken,
                });

                db.SaveChanges();
                
                return new AuthResponseModel
                {
                    Username = user.UserName,
                    Email = user.Email,
                    idUserType = user.idUserType,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                };

            }
            catch (Exception)
            {
                throw;
            }
        }

        private string GenerateAccessToken(tblUser user)
        {
            IEnumerable<Claim> claims = new Claim[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", "Admin"),
                new Claim("UserType", user.idUserType.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            return GenerateToken(authConfig.AccessTokenSecret, authConfig.AccessTokenExpirationMinutes, authConfig.Issuer, claims);
        }

        private string GenerateRefreshToken()
        {
            return GenerateToken(authConfig.RefreshTokenSecret, authConfig.RefreshTokenExpirationMinutes, authConfig.Issuer);
        }

        private string GenerateToken(string secretKey, string expirationMinutes, string issuer, IEnumerable<Claim>? claims = null)
        {
            double minutes = double.Parse(expirationMinutes);
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] tokenKey = Encoding.ASCII.GetBytes(secretKey);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(minutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature),
                Issuer = issuer,
            };
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private bool ValidateToken(string token)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authConfig.RefreshTokenSecret)),
                ValidateIssuer = true,
                ValidIssuer = authConfig.Issuer,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
            };
            try
            {
                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
