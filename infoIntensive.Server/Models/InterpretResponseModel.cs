﻿using Interpreter_lib.Evaluator;

namespace infoIntensive.Server.Models;

public class InterpretResponseModel
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Output { get; set; } = string.Empty;
    public Dictionary<string, Atom> Result { get; set; } = [];
    public TimeSpan ExecutionTime { get; set; }
}
