using infoIntensive.Server.Models;
using infoIntensive.Server.Services;
using Interpreter_lib.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace infoIntensive.Server.Controllers;

public class InterpretModel
{
    public string Code { get; set; }
    public string Language { get; set; }
}

[ApiController]
[Route("api/[controller]/[action]")]
public class InterpreterController(InterpreterService iService) : ControllerBase
{
    [HttpPost]
    public InterpretResponseModel InterpretDemo(InterpretModel model)
    {
        try
        {
            return iService.Interpret(model.Code, model.Language);
        }
        catch (Exception)
        {
            if(Debugger.IsAttached)
            {
                throw;
            }

            return new InterpretResponseModel
            {
                Success = false,
                Message = "An unexpected error occurred. Please try again later."
            };
        }
    }

    // TODO add interpret non demo with autorization with less limits
}
