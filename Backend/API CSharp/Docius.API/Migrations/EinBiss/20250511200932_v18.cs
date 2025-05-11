using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v18 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "decoracoes_bolos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "decoracoes_bolos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    collor_cake = table.Column<bool>(type: "boolean", nullable: false),
                    flores_naturais = table.Column<bool>(type: "boolean", nullable: false),
                    foto = table.Column<byte[]>(type: "bytea", nullable: false),
                    glow_cake = table.Column<bool>(type: "boolean", nullable: false),
                    metalizado = table.Column<bool>(type: "boolean", nullable: false),
                    naked_cake = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_decoracoes_bolos", x => x.id);
                });
        }
    }
}
