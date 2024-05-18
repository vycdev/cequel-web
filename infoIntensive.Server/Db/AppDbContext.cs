using infoIntensive.Server.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace infoIntensive.Server.Db
{
    public class AppDbContext : DbContext
    {
        // =============== Migrations instructions =============== 
        // ================== Create migrations ==================
        //
        // dotnet ef migrations add <name>
        //
        // =================== Update database ===================
        //
        // dotnet ef database update
        //
        // ============= If dotnet can't find ef =================
        // 
        // dotnet tool install --global dotnet-ef --version 8.*
        // 

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<tblUser> tblUsers { get; set; }
        public DbSet<tblUserType> tblUserTypes { get; set; }
        public DbSet<tblLoginLog> tblLoginLogs { get; set; }
        public DbSet<tblToken> tblTokens { get; set; }
        public DbSet<tblTokenType> tblTokenTypes { get; set; }
    }
}
