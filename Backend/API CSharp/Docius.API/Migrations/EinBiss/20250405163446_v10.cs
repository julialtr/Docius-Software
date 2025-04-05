using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_categorias_produtos_cardapios_cardapio_id",
                table: "categorias_produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_categorias_produtos_categorias_produtos_categoria_produto_s~",
                table: "categorias_produtos");

            migrationBuilder.DropTable(
                name: "decoracoes_bolos_pedidos_personalizacoes");

            migrationBuilder.DropTable(
                name: "decoracoes_bolos_pedidos");

            migrationBuilder.AlterColumn<int>(
                name: "categoria_produto_superior_id",
                table: "categorias_produtos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "cardapio_id",
                table: "categorias_produtos",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "personalizacoes_fotos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    foto = table.Column<byte[]>(type: "bytea", nullable: false),
                    personalizacao_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_personalizacoes_fotos", x => x.id);
                    table.ForeignKey(
                        name: "FK_personalizacoes_fotos_personalizacoes_personalizacao_id",
                        column: x => x.personalizacao_id,
                        principalTable: "personalizacoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_personalizacoes_fotos_personalizacao_id",
                table: "personalizacoes_fotos",
                column: "personalizacao_id");

            migrationBuilder.AddForeignKey(
                name: "FK_categorias_produtos_cardapios_cardapio_id",
                table: "categorias_produtos",
                column: "cardapio_id",
                principalTable: "cardapios",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_categorias_produtos_categorias_produtos_categoria_produto_s~",
                table: "categorias_produtos",
                column: "categoria_produto_superior_id",
                principalTable: "categorias_produtos",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_categorias_produtos_cardapios_cardapio_id",
                table: "categorias_produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_categorias_produtos_categorias_produtos_categoria_produto_s~",
                table: "categorias_produtos");

            migrationBuilder.DropTable(
                name: "personalizacoes_fotos");

            migrationBuilder.AlterColumn<int>(
                name: "categoria_produto_superior_id",
                table: "categorias_produtos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "cardapio_id",
                table: "categorias_produtos",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "decoracoes_bolos_pedidos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    foto = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_decoracoes_bolos_pedidos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "decoracoes_bolos_pedidos_personalizacoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    decoracao_bolo_pedido_id = table.Column<int>(type: "integer", nullable: false),
                    personalizacao_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_decoracoes_bolos_pedidos_personalizacoes", x => x.id);
                    table.ForeignKey(
                        name: "FK_decoracoes_bolos_pedidos_personalizacoes_decoracoes_bolos_p~",
                        column: x => x.decoracao_bolo_pedido_id,
                        principalTable: "decoracoes_bolos_pedidos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_decoracoes_bolos_pedidos_personalizacoes_personalizacoes_pe~",
                        column: x => x.personalizacao_id,
                        principalTable: "personalizacoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_decoracoes_bolos_pedidos_personalizacoes_decoracao_bolo_ped~",
                table: "decoracoes_bolos_pedidos_personalizacoes",
                column: "decoracao_bolo_pedido_id");

            migrationBuilder.CreateIndex(
                name: "IX_decoracoes_bolos_pedidos_personalizacoes_personalizacao_id",
                table: "decoracoes_bolos_pedidos_personalizacoes",
                column: "personalizacao_id");

            migrationBuilder.AddForeignKey(
                name: "FK_categorias_produtos_cardapios_cardapio_id",
                table: "categorias_produtos",
                column: "cardapio_id",
                principalTable: "cardapios",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_categorias_produtos_categorias_produtos_categoria_produto_s~",
                table: "categorias_produtos",
                column: "categoria_produto_superior_id",
                principalTable: "categorias_produtos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
