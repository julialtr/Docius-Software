using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_receitas_precificacoes_precificacao_id",
                table: "receitas");

            migrationBuilder.DropIndex(
                name: "IX_receitas_precificacao_id",
                table: "receitas");

            migrationBuilder.DropColumn(
                name: "precificacao_id",
                table: "receitas");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                table: "receitas",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "receita_id",
                table: "precificacoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_precificacoes_receita_id",
                table: "precificacoes",
                column: "receita_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_precificacoes_receitas_receita_id",
                table: "precificacoes",
                column: "receita_id",
                principalTable: "receitas",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_precificacoes_receitas_receita_id",
                table: "precificacoes");

            migrationBuilder.DropIndex(
                name: "IX_precificacoes_receita_id",
                table: "precificacoes");

            migrationBuilder.DropColumn(
                name: "receita_id",
                table: "precificacoes");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                table: "receitas",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "precificacao_id",
                table: "receitas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_receitas_precificacao_id",
                table: "receitas",
                column: "precificacao_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_receitas_precificacoes_precificacao_id",
                table: "receitas",
                column: "precificacao_id",
                principalTable: "precificacoes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
