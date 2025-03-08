using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_produtos_categorias_produtos_categoria_produto_id",
                table: "produtos");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                table: "produtos",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "categoria_produto_id",
                table: "produtos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_produtos_categorias_produtos_categoria_produto_id",
                table: "produtos",
                column: "categoria_produto_id",
                principalTable: "categorias_produtos",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_produtos_categorias_produtos_categoria_produto_id",
                table: "produtos");

            migrationBuilder.AlterColumn<string>(
                name: "nome",
                table: "produtos",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "categoria_produto_id",
                table: "produtos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_produtos_categorias_produtos_categoria_produto_id",
                table: "produtos",
                column: "categoria_produto_id",
                principalTable: "categorias_produtos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
