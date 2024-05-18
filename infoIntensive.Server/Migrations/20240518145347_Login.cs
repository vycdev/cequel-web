using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    /// <inheritdoc />
    public partial class Login : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "tblUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "FailedLoginCount",
                table: "tblUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastFailedLoginTime",
                table: "tblUsers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LockEndTime",
                table: "tblUsers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblLoginLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Details = table.Column<string>(type: "text", nullable: false),
                    Success = table.Column<bool>(type: "boolean", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    idUser = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblLoginLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblLoginLogs_tblUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "tblUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblTokenTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTokenTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    idTokenType = table.Column<int>(type: "integer", nullable: false),
                    idUser = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblTokens_tblTokenTypes_idTokenType",
                        column: x => x.idTokenType,
                        principalTable: "tblTokenTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTokens_tblUsers_idUser",
                        column: x => x.idUser,
                        principalTable: "tblUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblLoginLogs_idUser",
                table: "tblLoginLogs",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_tblTokens_idTokenType",
                table: "tblTokens",
                column: "idTokenType");

            migrationBuilder.CreateIndex(
                name: "IX_tblTokens_idUser",
                table: "tblTokens",
                column: "idUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblLoginLogs");

            migrationBuilder.DropTable(
                name: "tblTokens");

            migrationBuilder.DropTable(
                name: "tblTokenTypes");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "FailedLoginCount",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "LastFailedLoginTime",
                table: "tblUsers");

            migrationBuilder.DropColumn(
                name: "LockEndTime",
                table: "tblUsers");
        }
    }
}
