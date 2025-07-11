﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Docius.Repository.Core;

namespace Docius.Repository.EinBiss.Entities.Models;

public class PedidoFiltro : FiltroBase<int>
{
    public int UsuarioId { get; set; }
}

[Table("pedidos")]
public class Pedido : EntityBase<int>
{
    [Column("data_hora_entrega")]
    [Required]
    public DateTime DataHoraEntrega { get; set; }

    [Column("identificador")]
    [Required]
    public string Identificador { get; set; }

    [Column("usuario_id")]
    [Required]
    public int UsuarioId { get; set; }

    public virtual Usuario Usuario { get; set; }

    [Column("status_pedido_id")]
    public int StatusPedidoId { get; set; }

    public virtual StatusPedido StatusPedido { get; set; }
    public virtual List<PedidoProduto> PedidoProduto { get; set; }
}
