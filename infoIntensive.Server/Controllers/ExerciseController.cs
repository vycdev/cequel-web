using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;
using infoIntensive.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace infoIntensive.Server.Controllers;

public class EvaluateExerciseModel
{
    public string Code { get; set; }
    public string Language { get; set; }
    public int ExerciseId { get; set; }
}

[ApiController]
[Route("api/[controller]/[action]")]
public class ExerciseController(ExerciseService eService) : ControllerBase
{
    private int UserId
    {
        get
        {
            _ = int.TryParse(User.FindFirstValue("Id"), out int userId);

            return userId;
        }
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetExercise(int id)
    {
        return Ok(eService.GetExercise(id));
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetExercises()
    {
        return Ok(eService.GetExercises(UserId));
    }

    [Authorize]
    [HttpPost]
    public ExerciseResultModel Evaluate(EvaluateExerciseModel model)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(model.Code) || string.IsNullOrWhiteSpace(model.Language))
            {

                return new ExerciseResultModel
                {
                    Success = false,
                    Message = "Code and language are required.",
                    Result = new InterpretResponseModel
                    {
                        Success = false,
                        Message = "Code and language are required."
                    }
                };
            }

            if (model.Code.Length > 2000)
            {
                return new ExerciseResultModel
                {
                    Success = false,
                    Message = "Code is too long. Maximum 2000 characters.",
                    Result = new InterpretResponseModel
                    {
                        Success = false,
                        Message = "Code is too long. Maximum 2000 characters."
                    },
                };
            }

            return eService.EvaluateExercise(UserId, model.ExerciseId, model.Code, model.Language);
        }
        catch (Exception)
        {
            return new ExerciseResultModel
            {
                Success = false,
                Message = "An unexpected error occurred. Please try again later.", 
                Result = new InterpretResponseModel
                {
                    Success = false,
                    Message = "An unexpected error occurred. Please try again later."
                }
            };
        }
    }
}
