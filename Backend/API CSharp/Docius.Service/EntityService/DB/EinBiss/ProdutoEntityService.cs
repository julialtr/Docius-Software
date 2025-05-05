using Docius.Repository.EinBiss;
using Docius.Repository.EinBiss.Entities.Models;
using Docius.Service.EntityService.Core;
using Docius.Service.EntityService.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Docius.Service.EntityService.DB.EinBiss;

public sealed class ProdutoEntityService : EntityServiceBase<EinBissEntityService, Produto, int, ProdutoFiltro>
{
    private readonly IWebHostEnvironment _env;

    public ProdutoEntityService(EinBissEntityService service, EinBissContext context, IWebHostEnvironment env) : base(service, context)
    {
        _env = env;
    }

    protected override void OnCreateQuery(ref IQueryable<Produto> query, ProdutoFiltro filter)
    {
    }

    protected override void OnValidateEntity(Produto entity)
    {
        if (string.IsNullOrEmpty(entity.Nome))
            throw new WarningException("Nome deve ser informado.");

        if (entity.Preco < 0)
            throw new WarningException("Preço deve ser positivo.");

        EntityService.Receita.ValidateId(entity.ReceitaId, "Receita deve ser informada.", "Receita informada é inválida.");
    }

    public List<ProdutoDetalhado> LeProdutos(ProdutoFiltro filtro)
    {
        var produtos = EntityService.Produto.Entity
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.CategoriaIngrediente)
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.UnidadeMedida)
            .Include(e => e.PedidoProduto)
            .Where(e => filtro.Ids != null && filtro.Ids.Any() ? filtro.Ids.Contains(e.Id) : true)
            .ToList();

        if (!produtos.Any())
        {
            return new List<ProdutoDetalhado>();
        }

        var produtosDetalhados = produtos.Select(produto => new ProdutoDetalhado
        {
            Id = produto.Id,
            Nome = produto.Nome,
            Preco = produto.Preco,
            QtdPedidos = produto.PedidoProduto?.Count() ?? 0,
            CategoriaProdutoId = produto.CategoriaProdutoId,
            CaminhoFoto = produto.CaminhoFoto,
            Receita = produto.Receita != null ? new ReceitaDetalhada
            {
                Id = produto.Receita.Id,
                Nome = produto.Receita.Nome,
                Descricao = produto.Receita.Descricao,
                Tempo = produto.Receita.Tempo,
                QtdPorcoes = produto.Receita.QtdPorcoes,
                ReceitaCategoriaIngrediente = produto.Receita.ReceitaCategoriaIngrediente?
                    .Select(receitaIngrediente => new ReceitaCategoriaIngredienteDetalhada
                    {
                        Id = receitaIngrediente.Id,
                        Medida = receitaIngrediente.Medida,
                        ReceitaId = receitaIngrediente.ReceitaId,
                        CategoriaIngrediente = receitaIngrediente.CategoriaIngrediente != null ? new CategoriaIngrediente
                        {
                            Id = receitaIngrediente.CategoriaIngrediente.Id,
                            Nome = receitaIngrediente.CategoriaIngrediente.Nome
                        } : null,
                        UnidadeMedida = receitaIngrediente.UnidadeMedida != null ? new UnidadeMedida
                        {
                            Id = receitaIngrediente.UnidadeMedida.Id,
                            Sigla = receitaIngrediente.UnidadeMedida.Sigla
                        } : null
                    }).ToList() ?? new List<ReceitaCategoriaIngredienteDetalhada>()
            } : null
        }).ToList();

        return produtosDetalhados;
    }

    public async Task DeletaProdutoAsync(int id)
    {
        var produto = EntityService.Produto.Entity
            .Where(p => p.Id.Equals(id))
            .FirstOrDefault();

        var caminhoFisico = Path.Combine(_env.WebRootPath ?? "wwwroot", produto.CaminhoFoto.TrimStart('/'));

        if (File.Exists(caminhoFisico))
            File.Delete(caminhoFisico);

        await DeleteAsync(produto);
    }

    public async Task<ProdutoDetalhado> CriaProdutoAsync(Produto dados, List<IFormFile> imagens)
    {
        if (!string.IsNullOrEmpty(dados.CaminhoFoto) && imagens != null && imagens.Count != 0)
        {
            var chaveImagem = dados.CaminhoFoto;

            var imagem = imagens.FirstOrDefault(f => f.FileName == (chaveImagem + Path.GetExtension(f.FileName)));
            if (imagem == null)
                return null;

            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var nomeImagem = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
            var caminhoImagem = Path.Combine(uploadsFolder, nomeImagem);

            using (var stream = new FileStream(caminhoImagem, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            var caminhoRelativoImagem = $"/uploads/{nomeImagem}";

            dados.CaminhoFoto = caminhoRelativoImagem;
        }

        var createdEntity = await EntityService.Produto.CreateAsync(dados);

        return LeProdutos(new ProdutoFiltro { Ids = new int[] { createdEntity.Id } }).FirstOrDefault();
    }

    public async Task<ProdutoDetalhado> UpdateProdutoAsync(int id, Produto dados, List<IFormFile> imagens)
    {
        Produto data = EntityService.Produto.Entity
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.CategoriaIngrediente)
            .Include(e => e.Receita)
                .ThenInclude(r => r.ReceitaCategoriaIngrediente)
                    .ThenInclude(ri => ri.UnidadeMedida)
            .Include(e => e.PedidoProduto)
            .Where(e => e.Id.Equals(id))
            .FirstOrDefault();

        if (data == null)
            return null;

        bool bAlterarFoto = true;

        if (!string.IsNullOrEmpty(dados.CaminhoFoto))
        {
            var caminhoAntigo = Path.Combine(_env.WebRootPath ?? "wwwroot", dados.CaminhoFoto.TrimStart('/'));
            if (File.Exists(caminhoAntigo))
                bAlterarFoto = false;
        }

        if (bAlterarFoto)
        {
            if (!string.IsNullOrEmpty(data.CaminhoFoto))
            {
                var caminhoAntigo = Path.Combine(_env.WebRootPath ?? "wwwroot", data.CaminhoFoto.TrimStart('/'));
                if (File.Exists(caminhoAntigo))
                    File.Delete(caminhoAntigo);
            }

            if (imagens != null && imagens.Count != 0)
            {
                var chaveImagem = dados.CaminhoFoto;

                var imagem = imagens.FirstOrDefault(f => f.FileName == (chaveImagem + Path.GetExtension(f.FileName)));
                if (imagem == null)
                    return null;

                var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var nomeImagem = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
                var caminhoImagem = Path.Combine(uploadsFolder, nomeImagem);

                using (var stream = new FileStream(caminhoImagem, FileMode.Create))
                {
                    await imagem.CopyToAsync(stream);
                }

                var caminhoRelativoImagem = $"/uploads/{nomeImagem}";

                dados.CaminhoFoto = caminhoRelativoImagem;
            }
        }

        data.Nome = dados.Nome;
        data.ReceitaId = dados.ReceitaId;
        data.CaminhoFoto = dados.CaminhoFoto;

        await UpdateAsync(data);

        return LeProdutos(new ProdutoFiltro { Ids = new int[] { id } }).FirstOrDefault();
    }
}
