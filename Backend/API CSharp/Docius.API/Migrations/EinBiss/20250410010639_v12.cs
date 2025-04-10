using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pedidos_produtos_personalizacoes_personalizacao_id",
                table: "pedidos_produtos");

            migrationBuilder.AlterColumn<int>(
                name: "personalizacao_id",
                table: "pedidos_produtos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "identificador",
                table: "pedidos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_pedidos_produtos_personalizacoes_personalizacao_id",
                table: "pedidos_produtos",
                column: "personalizacao_id",
                principalTable: "personalizacoes",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pedidos_produtos_personalizacoes_personalizacao_id",
                table: "pedidos_produtos");

            migrationBuilder.DropColumn(
                name: "identificador",
                table: "pedidos");

            migrationBuilder.AlterColumn<int>(
                name: "personalizacao_id",
                table: "pedidos_produtos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_pedidos_produtos_personalizacoes_personalizacao_id",
                table: "pedidos_produtos",
                column: "personalizacao_id",
                principalTable: "personalizacoes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
