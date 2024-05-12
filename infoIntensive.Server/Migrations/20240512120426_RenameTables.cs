using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_UserTypes_idUserType",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTypes",
                table: "UserTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "UserTypes",
                newName: "tblUserTypes");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "tblUsers");

            migrationBuilder.RenameIndex(
                name: "IX_Users_idUserType",
                table: "tblUsers",
                newName: "IX_tblUsers_idUserType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblUserTypes",
                table: "tblUserTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblUsers",
                table: "tblUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblUsers_tblUserTypes_idUserType",
                table: "tblUsers",
                column: "idUserType",
                principalTable: "tblUserTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblUsers_tblUserTypes_idUserType",
                table: "tblUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblUserTypes",
                table: "tblUserTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblUsers",
                table: "tblUsers");

            migrationBuilder.RenameTable(
                name: "tblUserTypes",
                newName: "UserTypes");

            migrationBuilder.RenameTable(
                name: "tblUsers",
                newName: "Users");

            migrationBuilder.RenameIndex(
                name: "IX_tblUsers_idUserType",
                table: "Users",
                newName: "IX_Users_idUserType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTypes",
                table: "UserTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_UserTypes_idUserType",
                table: "Users",
                column: "idUserType",
                principalTable: "UserTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
