namespace Docius.API.Dtos.V1;

public class ReadIngredienteCategoriaIngredienteDto : ReadDtoBase<int>
{
    public string Marca { get; set; }

    public decimal Preco { get; set; }

    public int Quantidade { get; set; }

    public decimal Medida { get; set; }

    public ReadUnidadeMedidaDto UnidadeMedida { get; set; }

    public ReadFornecedorIngredientesDto Fornecedor { get; set; }
}
