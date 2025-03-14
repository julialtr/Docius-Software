using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "porcentagem_lucro_obtida",
                table: "precificacoes");

            migrationBuilder.DropColumn(
                name: "qtd_meses_considerar_gastos",
                table: "precificacoes");

            migrationBuilder.RenameColumn(
                name: "valor_salario",
                table: "precificacoes",
                newName: "valor_sugerido");

            migrationBuilder.RenameColumn(
                name: "valor_liquido",
                table: "precificacoes",
                newName: "valor_gastos_fixos");

            migrationBuilder.RenameColumn(
                name: "valor_bruto",
                table: "precificacoes",
                newName: "valor_adotado");

            migrationBuilder.CreateTable(
                name: "precificacoes_ingredientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    precificacao_id = table.Column<int>(type: "integer", nullable: false),
                    ingrediente_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_precificacoes_ingredientes", x => x.id);
                    table.ForeignKey(
                        name: "FK_precificacoes_ingredientes_ingredientes_ingrediente_id",
                        column: x => x.ingrediente_id,
                        principalTable: "ingredientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_precificacoes_ingredientes_precificacoes_precificacao_id",
                        column: x => x.precificacao_id,
                        principalTable: "precificacoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_precificacoes_ingredientes_ingrediente_id",
                table: "precificacoes_ingredientes",
                column: "ingrediente_id");

            migrationBuilder.CreateIndex(
                name: "IX_precificacoes_ingredientes_precificacao_id",
                table: "precificacoes_ingredientes",
                column: "precificacao_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "precificacoes_ingredientes");

            migrationBuilder.RenameColumn(
                name: "valor_sugerido",
                table: "precificacoes",
                newName: "valor_salario");

            migrationBuilder.RenameColumn(
                name: "valor_gastos_fixos",
                table: "precificacoes",
                newName: "valor_liquido");

            migrationBuilder.RenameColumn(
                name: "valor_adotado",
                table: "precificacoes",
                newName: "valor_bruto");

            migrationBuilder.AddColumn<decimal>(
                name: "porcentagem_lucro_obtida",
                table: "precificacoes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "qtd_meses_considerar_gastos",
                table: "precificacoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
