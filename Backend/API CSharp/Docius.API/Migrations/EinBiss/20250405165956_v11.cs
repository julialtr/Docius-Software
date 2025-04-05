using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "foto",
                table: "personalizacoes_fotos");

            migrationBuilder.AddColumn<string>(
                name: "caminho_foto",
                table: "personalizacoes_fotos",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "caminho_foto",
                table: "personalizacoes_fotos");

            migrationBuilder.AddColumn<byte[]>(
                name: "foto",
                table: "personalizacoes_fotos",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
