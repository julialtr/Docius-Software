using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.Docius
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "logo",
                table: "empresas");

            migrationBuilder.AddColumn<string>(
                name: "caminho_imagem_extra",
                table: "empresas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "caminho_logo",
                table: "empresas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "slogan",
                table: "empresas",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "caminho_imagem_extra",
                table: "empresas");

            migrationBuilder.DropColumn(
                name: "caminho_logo",
                table: "empresas");

            migrationBuilder.DropColumn(
                name: "slogan",
                table: "empresas");

            migrationBuilder.AddColumn<byte[]>(
                name: "logo",
                table: "empresas",
                type: "bytea",
                nullable: true);
        }
    }
}
