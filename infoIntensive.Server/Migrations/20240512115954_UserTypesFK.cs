using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    /// <inheritdoc />
    public partial class UserTypesFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_idUserType",
                table: "Users",
                column: "idUserType");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserTypes_idUserType",
                table: "Users",
                column: "idUserType",
                principalTable: "UserTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserTypes_idUserType",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_idUserType",
                table: "Users");
        }
    }
}
