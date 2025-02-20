using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.Docius
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slogan",
                table: "empresas");

            migrationBuilder.RenameColumn(
                name: "caminho_imagem_extra",
                table: "empresas",
                newName: "caminho_imagem_2");

            migrationBuilder.AddColumn<string>(
                name: "caminho_imagem_1",
                table: "empresas",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "caminho_imagem_1",
                table: "empresas");

            migrationBuilder.RenameColumn(
                name: "caminho_imagem_2",
                table: "empresas",
                newName: "caminho_imagem_extra");

            migrationBuilder.AddColumn<string>(
                name: "slogan",
                table: "empresas",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
