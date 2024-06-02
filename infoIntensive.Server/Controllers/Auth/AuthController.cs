using infoIntensive.Server.Models;
using infoIntensive.Server.Services.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace infoIntensive.Server.Controllers.Auth
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        AuthService AuthService;

        public AuthController(AuthService authService)
        {
            AuthService = authService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] AuthModel model)
        {
            try
            {
                if (model.Username.IsNullOrEmpty())
                    throw new ValidationException("Username is required");

                if (model.Password.IsNullOrEmpty())
                    throw new ValidationException("Password is required");

                AuthResponseModel result = AuthService.Login(model);
                JwtSecurityToken refreshToken = new(result.RefreshToken);

                Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = refreshToken.ValidTo,
                    HttpOnly = true,
                });

                result.RefreshToken = string.Empty;
                return Ok(new ResultModel { Success = true, Result = result });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ResultModel { Success = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                if (Debugger.IsAttached)
                    return BadRequest(new ResultModel { Success = false, Message = ex.Message });
                else
                    return BadRequest(new ResultModel { Success = false, Message = "Unhandled exception has occured."});
            }
        }

        [HttpPost]
        public IActionResult Refresh([FromBody] string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                    throw new Exception("No refresh token present.");

                AuthResponseModel? result = AuthService.ValidateRefreshToken(token) ?? throw new ValidationException("Invalid refresh token");
                JwtSecurityToken refreshToken = new(result.RefreshToken);

                Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = refreshToken.ValidTo,
                    HttpOnly = true,
                });

                result.RefreshToken = string.Empty;
                return Ok(new ResultModel { Success = true, Result = result });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ResultModel { Success = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                if (Debugger.IsAttached)
                    return BadRequest(new ResultModel { Success = false, Message = ex.Message });
                else
                    return BadRequest(new ResultModel { Success = false, Message = "Unhandled exception has occured." });
            }
        }

        [HttpPost]
        public IActionResult Register([FromBody] AuthModel model)
        {
            try
            {
                if (model.Username.IsNullOrEmpty())
                    throw new ValidationException("Username is required");

                if (model.Password.IsNullOrEmpty())
                    throw new ValidationException("Password is required");

                if (model.Email.IsNullOrEmpty())
                    throw new ValidationException("Email is required");

                AuthResponseModel result = AuthService.Register(model);
                JwtSecurityToken refreshToken = new(result.RefreshToken);

                Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = refreshToken.ValidTo,
                    HttpOnly = true,
                });

                result.RefreshToken = string.Empty;
                return Ok(new ResultModel { Success = true, Result = result });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ResultModel { Success = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                if (Debugger.IsAttached)
                    return BadRequest(new ResultModel { Success = false, Message = ex.Message });
                else
                    return BadRequest(new ResultModel { Success = false, Message = "Unhandled exception has occured."});
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Logout()
        {
            try
            {
                Claim? user = User.FindFirst("Id");
                if (user != null && int.TryParse(user.Value, out int id))
                {
                    AuthService.LogOut(id);

                    return NoContent();
                }

                return Unauthorized();
            }
            catch (ValidationException ex)
            {
                return BadRequest(new ResultModel { Success = false, Message = ex.Message });
            }
            catch (Exception ex)
            {
                if (Debugger.IsAttached)
                    return BadRequest(new ResultModel { Success = false, Message = ex.Message });
                else
                    return BadRequest(new ResultModel { Success = false, Message = "Unhandled exception has occured." });
            }
        }
    }
}
