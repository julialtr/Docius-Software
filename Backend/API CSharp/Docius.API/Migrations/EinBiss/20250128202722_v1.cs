using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Docius.API.Migrations.EinBiss
{
    /// <inheritdoc />
    public partial class v1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cardapios",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cardapios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "categorias_ingredientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categorias_ingredientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "decoracoes_bolos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    foto = table.Column<byte[]>(type: "bytea", nullable: false),
                    flores_naturais = table.Column<bool>(type: "boolean", nullable: false),
                    collor_cake = table.Column<bool>(type: "boolean", nullable: false),
                    metalizado = table.Column<bool>(type: "boolean", nullable: false),
                    glow_cake = table.Column<bool>(type: "boolean", nullable: false),
                    naked_cake = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_decoracoes_bolos", x => x.id);
                });

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
                name: "fornecedores",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    endereco = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true),
                    site = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fornecedores", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "gastos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    valor = table.Column<decimal>(type: "numeric", nullable: false),
                    data = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gastos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "personalizacoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    descricao = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_personalizacoes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "precificacoes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    valor_insumos = table.Column<decimal>(type: "numeric", nullable: false),
                    valor_salario = table.Column<decimal>(type: "numeric", nullable: false),
                    qtd_horas_mensais = table.Column<int>(type: "integer", nullable: false),
                    qtd_meses_considerar_gastos = table.Column<int>(type: "integer", nullable: false),
                    porcentagem_lucro_estimada = table.Column<decimal>(type: "numeric", nullable: false),
                    porcentagem_lucro_obtida = table.Column<decimal>(type: "numeric", nullable: false),
                    valor_bruto = table.Column<decimal>(type: "numeric", nullable: false),
                    valor_liquido = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_precificacoes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "status_pedidos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status_pedidos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "status_pedidos_produtos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status_pedidos_produtos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tipos_usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipos_usuarios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "unidades_medidas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sigla = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_unidades_medidas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "categorias_produtos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    cardapio_id = table.Column<int>(type: "integer", nullable: false),
                    categoria_produto_superior_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categorias_produtos", x => x.id);
                    table.ForeignKey(
                        name: "FK_categorias_produtos_cardapios_cardapio_id",
                        column: x => x.cardapio_id,
                        principalTable: "cardapios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_categorias_produtos_categorias_produtos_categoria_produto_s~",
                        column: x => x.categoria_produto_superior_id,
                        principalTable: "categorias_produtos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateTable(
                name: "receitas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descricao = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: true),
                    qtd_porcoes = table.Column<int>(type: "integer", nullable: false),
                    tempo = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    precificacao_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_receitas", x => x.id);
                    table.ForeignKey(
                        name: "FK_receitas_precificacoes_precificacao_id",
                        column: x => x.precificacao_id,
                        principalTable: "precificacoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    login = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    senha = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    tipo_usuario_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.id);
                    table.ForeignKey(
                        name: "FK_usuarios_tipos_usuarios_tipo_usuario_id",
                        column: x => x.tipo_usuario_id,
                        principalTable: "tipos_usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ingredientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    marca = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    preco = table.Column<decimal>(type: "numeric", nullable: false),
                    quantidade = table.Column<int>(type: "integer", nullable: false),
                    medida = table.Column<decimal>(type: "numeric", nullable: false),
                    unidade_medida_id = table.Column<int>(type: "integer", nullable: false),
                    fornecedor_id = table.Column<int>(type: "integer", nullable: false),
                    categoria_ingrediente_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ingredientes", x => x.id);
                    table.ForeignKey(
                        name: "FK_ingredientes_categorias_ingredientes_categoria_ingrediente_~",
                        column: x => x.categoria_ingrediente_id,
                        principalTable: "categorias_ingredientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ingredientes_fornecedores_fornecedor_id",
                        column: x => x.fornecedor_id,
                        principalTable: "fornecedores",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ingredientes_unidades_medidas_unidade_medida_id",
                        column: x => x.unidade_medida_id,
                        principalTable: "unidades_medidas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "produtos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    preco = table.Column<decimal>(type: "numeric", nullable: false),
                    receita_id = table.Column<int>(type: "integer", nullable: false),
                    categoria_produto_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_produtos", x => x.id);
                    table.ForeignKey(
                        name: "FK_produtos_categorias_produtos_categoria_produto_id",
                        column: x => x.categoria_produto_id,
                        principalTable: "categorias_produtos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_produtos_receitas_receita_id",
                        column: x => x.receita_id,
                        principalTable: "receitas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "receitas_categorias_ingredientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    medida = table.Column<decimal>(type: "numeric", nullable: false),
                    receita_id = table.Column<int>(type: "integer", nullable: false),
                    categoria_ingrediente_id = table.Column<int>(type: "integer", nullable: false),
                    unidade_medida_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_receitas_categorias_ingredientes", x => x.id);
                    table.ForeignKey(
                        name: "FK_receitas_categorias_ingredientes_categorias_ingredientes_ca~",
                        column: x => x.categoria_ingrediente_id,
                        principalTable: "categorias_ingredientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_receitas_categorias_ingredientes_receitas_receita_id",
                        column: x => x.receita_id,
                        principalTable: "receitas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_receitas_categorias_ingredientes_unidades_medidas_unidade_m~",
                        column: x => x.unidade_medida_id,
                        principalTable: "unidades_medidas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pedidos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    data_hora_entrega = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    usuario_id = table.Column<int>(type: "integer", nullable: false),
                    status_pedido_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pedidos", x => x.id);
                    table.ForeignKey(
                        name: "FK_pedidos_status_pedidos_status_pedido_id",
                        column: x => x.status_pedido_id,
                        principalTable: "status_pedidos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pedidos_usuarios_usuario_id",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pedidos_produtos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    quantidade = table.Column<int>(type: "integer", nullable: false),
                    pedido_id = table.Column<int>(type: "integer", nullable: false),
                    produto_id = table.Column<int>(type: "integer", nullable: false),
                    status_pedido_produto_id = table.Column<int>(type: "integer", nullable: false),
                    personalizacao_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pedidos_produtos", x => x.id);
                    table.ForeignKey(
                        name: "FK_pedidos_produtos_pedidos_pedido_id",
                        column: x => x.pedido_id,
                        principalTable: "pedidos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pedidos_produtos_personalizacoes_personalizacao_id",
                        column: x => x.personalizacao_id,
                        principalTable: "personalizacoes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pedidos_produtos_produtos_produto_id",
                        column: x => x.produto_id,
                        principalTable: "produtos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pedidos_produtos_status_pedidos_produtos_status_pedido_prod~",
                        column: x => x.status_pedido_produto_id,
                        principalTable: "status_pedidos_produtos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_categorias_produtos_cardapio_id",
                table: "categorias_produtos",
                column: "cardapio_id");

            migrationBuilder.CreateIndex(
                name: "IX_categorias_produtos_categoria_produto_superior_id",
                table: "categorias_produtos",
                column: "categoria_produto_superior_id");

            migrationBuilder.CreateIndex(
                name: "IX_decoracoes_bolos_pedidos_personalizacoes_decoracao_bolo_ped~",
                table: "decoracoes_bolos_pedidos_personalizacoes",
                column: "decoracao_bolo_pedido_id");

            migrationBuilder.CreateIndex(
                name: "IX_decoracoes_bolos_pedidos_personalizacoes_personalizacao_id",
                table: "decoracoes_bolos_pedidos_personalizacoes",
                column: "personalizacao_id");

            migrationBuilder.CreateIndex(
                name: "IX_ingredientes_categoria_ingrediente_id",
                table: "ingredientes",
                column: "categoria_ingrediente_id");

            migrationBuilder.CreateIndex(
                name: "IX_ingredientes_fornecedor_id",
                table: "ingredientes",
                column: "fornecedor_id");

            migrationBuilder.CreateIndex(
                name: "IX_ingredientes_unidade_medida_id",
                table: "ingredientes",
                column: "unidade_medida_id");

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_status_pedido_id",
                table: "pedidos",
                column: "status_pedido_id");

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_usuario_id",
                table: "pedidos",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_produtos_pedido_id",
                table: "pedidos_produtos",
                column: "pedido_id");

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_produtos_personalizacao_id",
                table: "pedidos_produtos",
                column: "personalizacao_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_produtos_produto_id",
                table: "pedidos_produtos",
                column: "produto_id");

            migrationBuilder.CreateIndex(
                name: "IX_pedidos_produtos_status_pedido_produto_id",
                table: "pedidos_produtos",
                column: "status_pedido_produto_id");

            migrationBuilder.CreateIndex(
                name: "IX_produtos_categoria_produto_id",
                table: "produtos",
                column: "categoria_produto_id");

            migrationBuilder.CreateIndex(
                name: "IX_produtos_receita_id",
                table: "produtos",
                column: "receita_id");

            migrationBuilder.CreateIndex(
                name: "IX_receitas_precificacao_id",
                table: "receitas",
                column: "precificacao_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_receitas_categorias_ingredientes_categoria_ingrediente_id",
                table: "receitas_categorias_ingredientes",
                column: "categoria_ingrediente_id");

            migrationBuilder.CreateIndex(
                name: "IX_receitas_categorias_ingredientes_receita_id",
                table: "receitas_categorias_ingredientes",
                column: "receita_id");

            migrationBuilder.CreateIndex(
                name: "IX_receitas_categorias_ingredientes_unidade_medida_id",
                table: "receitas_categorias_ingredientes",
                column: "unidade_medida_id");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_tipo_usuario_id",
                table: "usuarios",
                column: "tipo_usuario_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "decoracoes_bolos");

            migrationBuilder.DropTable(
                name: "decoracoes_bolos_pedidos_personalizacoes");

            migrationBuilder.DropTable(
                name: "gastos");

            migrationBuilder.DropTable(
                name: "ingredientes");

            migrationBuilder.DropTable(
                name: "pedidos_produtos");

            migrationBuilder.DropTable(
                name: "receitas_categorias_ingredientes");

            migrationBuilder.DropTable(
                name: "decoracoes_bolos_pedidos");

            migrationBuilder.DropTable(
                name: "fornecedores");

            migrationBuilder.DropTable(
                name: "pedidos");

            migrationBuilder.DropTable(
                name: "personalizacoes");

            migrationBuilder.DropTable(
                name: "produtos");

            migrationBuilder.DropTable(
                name: "status_pedidos_produtos");

            migrationBuilder.DropTable(
                name: "categorias_ingredientes");

            migrationBuilder.DropTable(
                name: "unidades_medidas");

            migrationBuilder.DropTable(
                name: "status_pedidos");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "categorias_produtos");

            migrationBuilder.DropTable(
                name: "receitas");

            migrationBuilder.DropTable(
                name: "tipos_usuarios");

            migrationBuilder.DropTable(
                name: "cardapios");

            migrationBuilder.DropTable(
                name: "precificacoes");
        }
    }
}
