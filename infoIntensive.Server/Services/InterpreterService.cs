using infoIntensive.Server.Db;
using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;
using infoIntensive.Server.Utils;
using Interpreter_lib.Evaluator;
using Interpreter_lib.Parser;
using Interpreter_lib.Tokenizer;
using Interpreter_lib.Utils;

namespace infoIntensive.Server.Services;

public class InterpreterService(AppDbContext dbContext)
{
    public InterpretResponseModel Interpret(string code, string language, int userId)
    {
        DateTime startTime = DateTime.Now;
        
        try
        {
            Tokenizer tokenizer = new(code, language == "Romanian" ? Languages.romanian : Languages.english);

            Parser parser = new(tokenizer.Tokens);
            parser.Parse();

            Evaluator.Variables.Clear();
            Evaluator.Output = string.Empty;

            Evaluator evaluator = new();
            evaluator.Evaluate(parser.GetTree());

            if(Evaluator.Output.Length > 0 && Evaluator.Output[0] == '\n')
            {
                Evaluator.Output = Evaluator.Output.Remove(0, 1);
            }

            return new() {
                ExecutionTime = DateTime.Now - startTime,
                Success = true,
                Result = Evaluator.Variables,
                Message = "Code interpreted successfully.",
                Output = Evaluator.Output
            };
        }
        catch (ParserException ex)
        {
            return new()
            {
                Success = false,
                Message = ex.Message,
                ExecutionTime = DateTime.Now - startTime
            };
        }
        catch (EvaluatorException ex)
        {
            return new()
            {
                Success = false,
                Message = ex.Message,
                ExecutionTime = DateTime.Now - startTime
            };
        }
        catch (Exception ex)
        {
            dbContext.Add(new tblError
            {
                InsertDate = DateTime.UtcNow,
                Message = ex.Message,
                StackTrace = (ex?.StackTrace ?? string.Empty),
                idUser = userId, 
                Extra1 = code.RemoveNulls(),
                Extra2 = language
            });

            dbContext.SaveChanges();

            throw;
        }
    }

}
