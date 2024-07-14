using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;
using infoIntensive.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace infoIntensive.Server.Controllers;


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
}
