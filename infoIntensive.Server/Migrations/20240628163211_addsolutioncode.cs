using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    /// <inheritdoc />
    public partial class addsolutioncode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SolvedCode",
                table: "tblExercises",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SolvedCode",
                table: "tblExercises");
        }
    }
}
