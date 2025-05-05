using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tokens_usuarios_usuario_id",
                table: "tokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tokens",
                table: "tokens");

            migrationBuilder.RenameTable(
                name: "tokens",
                newName: "tokens");

            migrationBuilder.RenameIndex(
                name: "IX_tokens_usuario_id",
                table: "tokens",
                newName: "IX_tokens_usuario_id");

            migrationBuilder.AddColumn<string>(
                name: "caminho_foto",
                table: "produtos",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tokens",
                table: "tokens",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_tokens_usuarios_usuario_id",
                table: "tokens",
                column: "usuario_id",
                principalTable: "usuarios",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tokens_usuarios_usuario_id",
                table: "tokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tokens",
                table: "tokens");

            migrationBuilder.DropColumn(
                name: "caminho_foto",
                table: "produtos");

            migrationBuilder.RenameTable(
                name: "tokens",
                newName: "tokens");

            migrationBuilder.RenameIndex(
                name: "IX_tokens_usuario_id",
                table: "tokens",
                newName: "IX_tokens_usuario_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tokens",
                table: "tokens",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_tokens_usuarios_usuario_id",
                table: "tokens",
                column: "usuario_id",
                principalTable: "usuarios",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
