using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ingredientes_fornecedores_fornecedor_id",
                table: "ingredientes");

            migrationBuilder.DropColumn(
                name: "data",
                table: "gastos");

            migrationBuilder.AlterColumn<int>(
                name: "fornecedor_id",
                table: "ingredientes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_ingredientes_fornecedores_fornecedor_id",
                table: "ingredientes",
                column: "fornecedor_id",
                principalTable: "fornecedores",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ingredientes_fornecedores_fornecedor_id",
                table: "ingredientes");

            migrationBuilder.AlterColumn<int>(
                name: "fornecedor_id",
                table: "ingredientes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "data",
                table: "gastos",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddForeignKey(
                name: "FK_ingredientes_fornecedores_fornecedor_id",
                table: "ingredientes",
                column: "fornecedor_id",
                principalTable: "fornecedores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
