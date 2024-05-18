using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    /// <inheritdoc />
    public partial class IpAddressLogging : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Details",
                table: "tblLoginLogs",
                newName: "UserAgent");

            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "tblLoginLogs",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "tblLoginLogs");

            migrationBuilder.RenameColumn(
                name: "UserAgent",
                table: "tblLoginLogs",
                newName: "Details");
        }
    }
}
