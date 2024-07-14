using infoIntensive.Server.Db;
using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;
using infoIntensive.Server.Utils;
using Interpreter_lib.Evaluator;

namespace infoIntensive.Server.Services;

public class ExerciseService(AppDbContext dbContext, InterpreterService iService)
{
    public ExerciseViewModel? GetExercise(int id)
    {
        try
        {
            tblExercise? exercise = dbContext.tblExercises.Where(e => e.Id == id).FirstOrDefault();
            tblExercise_User? tblExercise_User = dbContext.tblExercise_Users.Where(ue => ue.idExercise == id).FirstOrDefault();

            if (exercise != null)
            {
                return new ExerciseViewModel
                {
                    Id = exercise.Id,
                    Title = exercise.Title,
                    Difficulty = exercise.Difficulty,
                    Description = exercise.Description,
                    DefaultCode = exercise.DefaultCode,
                    IsComplete = tblExercise_User?.IsCompleted ?? false,
                    CompletionDate = tblExercise_User?.CompletedDate,
                };
            }

            return null;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public List<ExerciseViewModel> GetExercises(int userId)
    {
        try
        {
            List<tblExercise> allExercises = [.. dbContext.tblExercises];
            List<tblExercise_User> userExercises = [.. dbContext.tblExercise_Users.Where(ue => ue.idUser == userId)];

            return [.. allExercises.Select(e => new ExerciseViewModel {
                Id = e.Id,
                Title = e.Title,
                Difficulty = e.Difficulty,
                IsComplete = userExercises.Where(ue => ue.idExercise == e.Id).FirstOrDefault()?.IsCompleted ?? false,
                CompletionDate = userExercises.Where(ue => ue.idExercise == e.Id).FirstOrDefault()?.CompletedDate,
            })];
        }
        catch (Exception)
        {
            throw;
        }
    }

    public ExerciseResultModel EvaluateExercise(int userId, int exerciseId, string code)
    {
        try
        {
            tblExercise? exercise = dbContext.tblExercises.Find(exerciseId);

            if (exercise == null)
                return new ExerciseResultModel
                {
                    Success = false,
                    Completed = false,
                    Message = "Exercise not found.",
                };

            List<tblExercise_Variable> allVariables = [.. dbContext.tblExercise_Variable.Where(v => v.idExercise == exerciseId)];
            List<string> variableNames = allVariables.Select(v => v.Name).Distinct().ToList();

            if (allVariables.Count == 0)
                return new ExerciseResultModel
                {
                    Success = false,
                    Completed = false,
                    Message = "Exercise variables not found.",
                };

            List<Dictionary<string, Atom>> variablesDictionaryList = [];

            // iterate 3 times 
            for (int i = 0; i < 3; i++)
            {
                Dictionary<string, Atom> variablesDictionary = [];

                foreach (string variableName in variableNames)
                {
                    tblExercise_Variable variable = allVariables.Where(v => v.Name == variableName).ToList().PickRandom();

                    variablesDictionary.Add(variable.Name, new Atom(variable.Type == "Number" ? AtomType.NUMBER : AtomType.STRING, variable.Value));
                }

                variablesDictionaryList.Add(variablesDictionary);
            }


            foreach (Dictionary<string, Atom> variablesDictionary in variablesDictionaryList)
            {
                InterpretResponseModel solutionResult = iService.Interpret(exercise.SolvedCode, "Romanian", userId, variablesDictionary);
                InterpretResponseModel codeResult = iService.Interpret(code, "Romanian", userId, variablesDictionary);


                if (!solutionResult.Success)
                    return new ExerciseResultModel
                    {
                        Success = false,
                        Completed = false,
                        Message = "Stored solution failed to evaluate. Please try again later."
                    };

                if (!codeResult.Success)
                    return new ExerciseResultModel
                    {
                        Success = false,
                        Completed = false,
                        Message = "Code failed to evaluate.",
                        Result = codeResult
                    };

                foreach (var variable in variablesDictionary)
                {
                    if (!solutionResult.Result.TryGetValue(variable.Key, out Atom? solutionVariableValue) || !codeResult.Result.TryGetValue(variable.Key, out Atom? codeVariableValue))
                        return new ExerciseResultModel
                        {
                            Success = true,
                            Completed = false,
                            Message = "You're a wizard Harry! Variables magically disapeared from the memory.",
                            Result = codeResult
                        };

                    if (solutionVariableValue.Type != codeVariableValue.Type)
                        return new ExerciseResultModel
                        {
                            Success = true,
                            Completed = false,
                            Message = "End result variable types don't match with solution.",
                            Result = codeResult
                        };

                    if (solutionVariableValue.Value != codeVariableValue.Value)
                        return new ExerciseResultModel
                        {
                            Success = true,
                            Completed = false,
                            Message = "End result variable values don't match with solution.",
                            Result = codeResult
                        };

                    return new ExerciseResultModel
                    {
                        Success = true,
                        Completed = true,
                        Message = "Congratulations! You've completed the exercise.",
                        Result = codeResult
                    };
                }

                return new ExerciseResultModel
                {
                    Success = false,
                    Completed = false,
                    Message = "Missing solution variables values in the database."
                };
            }

            return new ExerciseResultModel
            {
                Success = false,
                Completed = false,
                Message = "Missing solution variables values in the database."
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
                Extra2 = exerciseId.ToString(),
            });

            dbContext.SaveChanges();

            return new ExerciseResultModel
            {
                Success = false,
                Completed = false,
                Message = "An unexpected error occurred. Please try again later."
            };
        }

    }
}
