using infoIntensive.Server.Db;
using infoIntensive.Server.Db.Models;
using infoIntensive.Server.Models;

namespace infoIntensive.Server.Services;

public class ExerciseService(AppDbContext dbContext)
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
}
