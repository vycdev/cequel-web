﻿using infoIntensive.Server.Models;
using infoIntensive.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;

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
            if(string.IsNullOrWhiteSpace(model.Code) || string.IsNullOrWhiteSpace(model.Language))
            {
                return new InterpretResponseModel
                {
                    Success = false,
                    Message = "Code and language are required."
                };
            }

            if(model.Code.Length > 500)
            {
                return new InterpretResponseModel
                {
                    Success = false,
                    Message = "Code is too long. Maximum 500 characters."
                };
            }

            return iService.Interpret(model.Code, model.Language, 0);
        }
        catch (Exception)
        {
            return new InterpretResponseModel
            {
                Success = false,
                Message = "An unexpected error occurred. Please try again later."
            };            
        }
    }

    [Authorize]
    [HttpPost]
    public InterpretResponseModel Interpret(InterpretModel model)
    {
        try
        {
            _ = int.TryParse(User.FindFirstValue("Id"), out int userId);

            if(string.IsNullOrWhiteSpace(model.Code) || string.IsNullOrWhiteSpace(model.Language))
            {
                return new InterpretResponseModel
                {
                    Success = false,
                    Message = "Code and language are required."
                };
            }

            if(model.Code.Length > 2000)
            {
                return new InterpretResponseModel
                {
                    Success = false,
                    Message = "Code is too long. Maximum 2000 characters."
                };
            }

            return iService.Interpret(model.Code, model.Language, userId);
        }
        catch (Exception)
        {
            return new InterpretResponseModel
            {
                Success = false,
                Message = "An unexpected error occurred. Please try again later."
            };
        }
    }
}
